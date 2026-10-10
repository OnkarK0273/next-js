import { NextResponse } from "next/server";

interface RecaptchaV3Response {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, name, email, message } = body;

    // 1. Validate incoming token
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          score: 0,
          message: "Verification failed: reCAPTCHA v3 token was not provided.",
        },
        { status: 400 }
      );
    }

    // 2. Retrieve reCAPTCHA v3 secret key
    const secretKey = process.env.RECAPTCHA_V3_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          score: 0,
          message:
            "Server configuration error: RECAPTCHA_V3_SECRET_KEY is missing from environment variables.",
        },
        { status: 500 }
      );
    }

    // 3. Query Google's siteverify endpoint with URL-encoded parameters
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    const verificationParams = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const googleResponse = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: verificationParams.toString(),
    });

    const data: RecaptchaV3Response = await googleResponse.json();

    // 4. Handle Google API rejection (e.g. invalid-secret, timeout-or-duplicate)
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          score: data.score ?? 0,
          action: data.action,
          message: "Google reCAPTCHA v3 token validation failed.",
          errorCodes: data["error-codes"] || [],
        },
        { status: 400 }
      );
    }

    // 5. Evaluate the Score:
    // reCAPTCHA v3 returns a score between 0.0 (likely bot) and 1.0 (likely human).
    // The standard default threshold recommended by Google is 0.5.
    const score = typeof data.score === "number" ? data.score : 0;
    const isHuman = score >= 0.5;

    let assessment = "Likely Bot (High Risk)";
    if (score >= 0.7) {
      assessment = "Likely Human (Low Risk)";
    } else if (score >= 0.5) {
      assessment = "Acceptable Interaction (Medium Risk)";
    }

    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          score,
          assessment,
          action: data.action,
          message: `Suspicious activity detected! Score: ${score.toFixed(2)} is below the required 0.5 threshold.`,
          details: {
            timestamp: data.challenge_ts,
            hostname: data.hostname,
          },
        },
        { status: 403 }
      );
    }

    // 6. Safe to proceed with normal operation
    return NextResponse.json(
      {
        success: true,
        score,
        assessment,
        action: data.action,
        message: `Success! Interaction verified for ${name || "User"}. Score: ${score.toFixed(2)} - ${assessment}`,
        details: {
          timestamp: data.challenge_ts,
          hostname: data.hostname,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("reCAPTCHA v3 verification error:", error);
    return NextResponse.json(
      {
        success: false,
        score: 0,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during reCAPTCHA v3 verification.",
      },
      { status: 500 }
    );
  }
}
