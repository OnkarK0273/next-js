import { NextResponse } from "next/server";

interface RecaptchaV2Response {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, name, email, message } = body;

    // 1. Validate that the client provided the reCAPTCHA v2 token
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed: reCAPTCHA v2 token was not provided.",
        },
        { status: 400 }
      );
    }

    // 2. Retrieve secret key from environment variables (Server-side ONLY)
    const secretKey = process.env.RECAPTCHA_V2_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration error: RECAPTCHA_V2_SECRET_KEY is missing from environment variables.",
        },
        { status: 500 }
      );
    }

    // 3. Verify the token with Google's siteverify API endpoint
    // reCAPTCHA verification requires application/x-www-form-urlencoded format
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

    const data: RecaptchaV2Response = await googleResponse.json();

    // 4. Inspect verification result
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Google reCAPTCHA v2 validation failed. Checkbox invalid or expired.",
          errorCodes: data["error-codes"] || [],
        },
        { status: 400 }
      );
    }

    // 5. Verification passed: Safe to process form data (e.g. store to DB, send email)
    return NextResponse.json(
      {
        success: true,
        message: `Success! Form submitted and reCAPTCHA v2 verified for ${name || "User"}.`,
        details: {
          timestamp: data.challenge_ts,
          hostname: data.hostname,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("reCAPTCHA v2 verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during reCAPTCHA verification.",
      },
      { status: 500 }
    );
  }
}
