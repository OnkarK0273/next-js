"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  RotateCcw,
  Gauge,
  Code2,
} from "lucide-react";

export function RecaptchaV3Form() {
  const v3SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
  // Hook from react-google-recaptcha-v3 providing programmatic execution
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRawDetails, setShowRawDetails] = useState(false);
  const [apiResult, setApiResult] = useState<{
    success: boolean;
    score: number;
    assessment?: string;
    action?: string;
    message: string;
    details?: { timestamp?: string; hostname?: string };
    errorCodes?: string[];
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // 1. Ensure the reCAPTCHA v3 script and hook are fully loaded
    if (!executeRecaptcha) {
      setApiResult({
        success: false,
        score: 0,
        message:
          "reCAPTCHA v3 is not yet ready or NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY is not configured.",
      });
      return;
    }

    setIsSubmitting(true);
    setApiResult(null);

    try {
      // 2. Execute reCAPTCHA v3 with a contextual action name ('contact_form')
      // Google recommends specific action names for granular analytics in your dashboard
      const token = await executeRecaptcha("contact_form");

      if (!token) {
        throw new Error("Failed to generate reCAPTCHA v3 token.");
      }

      // 3. Post data and invisible token to backend verification endpoint
      const response = await fetch("/api/v3-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          token,
        }),
      });

      const result = await response.json();

      setApiResult({
        success: result.success,
        score: result.score ?? 0,
        assessment: result.assessment,
        action: result.action,
        message: result.message,
        details: result.details,
        errorCodes: result.errorCodes,
      });

      if (response.ok && result.success) {
        reset();
      }
    } catch (err) {
      setApiResult({
        success: false,
        score: 0,
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during submission.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 0.5) return "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <Card className="border border-border/80 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">reCAPTCHA v3 (Invisible Score)</CardTitle>
            <CardDescription>
              Frictionless user experience. Runs silently in the background, assigns
              a risk score between 0.0 and 1.0, and never presents puzzle challenges.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Missing Key Notice */}
          {!v3SiteKey && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Missing v3 Site Key</AlertTitle>
              <AlertDescription>
                <code>NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY</code> is not configured.
                Create a v3 key in the Google reCAPTCHA Console and add it to{" "}
                <code>.env.local</code> to execute live score-based verification.
              </AlertDescription>
            </Alert>
          )}

          {/* Form Fields */}
          <div className="space-y-1.5">
            <Label htmlFor="v3-name">Your Name</Label>
            <Input
              id="v3-name"
              placeholder="e.g. Alex Johnson"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="v3-email">Email Address</Label>
            <Input
              id="v3-email"
              type="email"
              placeholder="alex@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="v3-message">Message</Label>
            <Textarea
              id="v3-message"
              placeholder="Type your message here (min. 10 characters)..."
              rows={3}
              {...register("message")}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Invisible Verification Info Box */}
          <div className="rounded-lg border bg-muted/30 p-3.5 text-xs text-muted-foreground space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-emerald-500" />
              How v3 Works Under the Hood
            </div>
            <p>
              When you click <strong>Submit</strong>, <code>useGoogleReCaptcha()</code> executes{" "}
              <code>executeRecaptcha(&apos;contact_form&apos;)</code>. A single-use token is generated
              seamlessly without disrupting the user. The backend compares the score against the{" "}
              <code>0.5</code> threshold.
            </p>
          </div>

          {/* Live Score Display / Feedback Banner */}
          {apiResult && (
            <div className="space-y-3 pt-2">
              <div
                className={`rounded-xl border p-4 transition-all ${getScoreColor(
                  apiResult.score
                )}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {apiResult.success ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      )}
                      <span className="font-bold text-base">
                        {apiResult.success
                          ? "reCAPTCHA v3 Passed"
                          : "reCAPTCHA v3 Verification Rejected"}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{apiResult.message}</p>
                  </div>

                  {/* Score Pill */}
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black tracking-tight">
                      {apiResult.score.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                      Score (0.0 - 1.0)
                    </div>
                  </div>
                </div>

                {/* Score Risk Meter Gauge */}
                <div className="mt-4 pt-3 border-t border-current/10 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="text-rose-600 dark:text-rose-400">
                      0.0 (High Risk / Bot)
                    </span>
                    <span className="text-amber-600 dark:text-amber-400">
                      0.5 (Threshold)
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      1.0 (Low Risk / Human)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-current transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          Math.max(apiResult.score * 100, 5),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs font-semibold pt-1">
                    Assessment:{" "}
                    <span className="font-bold">
                      {apiResult.assessment ||
                        (apiResult.score >= 0.5
                          ? "Likely Human"
                          : "Likely Bot")}
                    </span>
                    {apiResult.action && (
                      <span className="ml-2 opacity-80 font-mono text-[11px]">
                        (Action: {apiResult.action})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Developer Debug Toggle */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setShowRawDetails((prev) => !prev)}
                  className="text-xs text-muted-foreground gap-1"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  {showRawDetails ? "Hide Response Data" : "Inspect Raw Response"}
                </Button>
              </div>

              {showRawDetails && (
                <pre className="p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800">
                  {JSON.stringify(apiResult, null, 2)}
                </pre>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              reset();
              setApiResult(null);
            }}
            disabled={isSubmitting}
            className="text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset Form
          </Button>

          <Button type="submit" disabled={isSubmitting || !v3SiteKey}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Executing v3 Verification...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit with reCAPTCHA v3
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
