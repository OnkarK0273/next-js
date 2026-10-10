"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
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
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Send,
  RotateCcw,
} from "lucide-react";

export function RecaptchaV2Form() {
  const v2SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<{
    success: boolean;
    message: string;
    details?: { timestamp?: string; hostname?: string };
    errorCodes?: string[];
  } | null>(null);

  // Initialize react-hook-form with zodResolver
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

  // Handler when user completes the checkbox challenge
  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setCaptchaError(null);
    }
  };

  // Handler when reCAPTCHA token expires (after ~2 minutes)
  const onCaptchaExpired = () => {
    setCaptchaToken(null);
    setCaptchaError("reCAPTCHA expired. Please tick the checkbox again.");
  };

  const onSubmit = async (data: ContactFormData) => {
    // 1. Explicit Checkbox Validation: Ensure the user ticked the box
    if (!captchaToken) {
      setCaptchaError("Please complete the reCAPTCHA challenge before submitting.");
      return;
    }

    setIsSubmitting(true);
    setApiResult(null);

    try {
      // 2. Transmit form data along with the client-generated token to the server
      const response = await fetch("/api/v2-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          token: captchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setApiResult({
          success: true,
          message: result.message,
          details: result.details,
        });
        // Reset form inputs & reCAPTCHA widget upon successful transmission
        reset();
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      } else {
        setApiResult({
          success: false,
          message: result.message || "reCAPTCHA v2 verification failed.",
          errorCodes: result.errorCodes,
        });
        // Reset widget so user can re-attempt
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (err) {
      setApiResult({
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Network error occurred while connecting to verification API.",
      });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-border/80 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">reCAPTCHA v2 (Checkbox)</CardTitle>
            <CardDescription>
              Requires explicit user interaction. The user checks &quot;I&apos;m not a
              robot&quot; and solves image puzzles if deemed suspicious.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Missing Key Notice */}
          {!v2SiteKey && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Missing Site Key</AlertTitle>
              <AlertDescription>
                <code>NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY</code> is not set in{" "}
                <code>.env.local</code>. Please configure your key to render the
                checkbox widget.
              </AlertDescription>
            </Alert>
          )}

          {/* Form Fields */}
          <div className="space-y-1.5">
            <Label htmlFor="v2-name">Your Name</Label>
            <Input
              id="v2-name"
              placeholder="e.g. Jane Doe"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="v2-email">Email Address</Label>
            <Input
              id="v2-email"
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="v2-message">Message</Label>
            <Textarea
              id="v2-message"
              placeholder="Write your message here (min. 10 characters)..."
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

          {/* reCAPTCHA v2 Checkbox Container */}
          <div className="pt-2 flex flex-col items-start gap-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Human Verification Checkbox
            </Label>

            {v2SiteKey ? (
              <div className="overflow-x-auto max-w-full rounded-md border border-border/50 p-2 bg-muted/20">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={v2SiteKey}
                  onChange={onCaptchaChange}
                  onExpired={onCaptchaExpired}
                />
              </div>
            ) : (
              <div className="p-4 border border-dashed rounded-md text-sm text-muted-foreground w-full text-center">
                reCAPTCHA v2 widget will render here once site key is configured.
              </div>
            )}

            {captchaError && (
              <p className="text-xs font-medium text-destructive">
                {captchaError}
              </p>
            )}
          </div>

          {/* Verification Feedback Banner */}
          {apiResult && (
            <Alert
              variant={apiResult.success ? "default" : "destructive"}
              className={
                apiResult.success
                  ? "border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-200"
                  : ""
              }
            >
              {apiResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle className="font-semibold">
                {apiResult.success
                  ? "reCAPTCHA v2 Verification Succeeded"
                  : "reCAPTCHA v2 Verification Failed"}
              </AlertTitle>
              <AlertDescription className="space-y-1">
                <p>{apiResult.message}</p>
                {apiResult.details && (
                  <div className="text-xs font-mono opacity-80 pt-1">
                    Host: {apiResult.details.hostname || "localhost"} | Timestamp:{" "}
                    {apiResult.details.timestamp || "Just now"}
                  </div>
                )}
                {apiResult.errorCodes && apiResult.errorCodes.length > 0 && (
                  <p className="text-xs font-mono">
                    Google Error Codes: {apiResult.errorCodes.join(", ")}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              reset();
              recaptchaRef.current?.reset();
              setCaptchaToken(null);
              setCaptchaError(null);
              setApiResult(null);
            }}
            disabled={isSubmitting}
            className="text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset Form
          </Button>

          <Button type="submit" disabled={isSubmitting || !v2SiteKey}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Verifying Token...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit with reCAPTCHA v2
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
