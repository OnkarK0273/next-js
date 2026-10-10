"use client";

import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface ReCaptchaProviderProps {
  children: React.ReactNode;
}

/**
 * ReCaptchaProvider
 * 
 * Wraps the application with `GoogleReCaptchaProvider` using the v3 site key.
 * 
 * Conflict Prevention Strategy (v2 Checkbox vs v3 Invisible):
 * 1. `GoogleReCaptchaProvider` registers the reCAPTCHA v3 script in the document `<head>`.
 * 2. Google's global `grecaptcha` object is shared between both versions.
 * 3. The `react-google-recaptcha` (v2) component internally uses `react-async-script`,
 *    which checks if `window.grecaptcha` is already defined. If already loaded by this
 *    provider, v2 will NOT inject duplicate script tags, avoiding DOM collisions.
 * 4. We safely handle empty or missing v3 keys so the demo can run even before keys are added.
 */
export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const v3SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

  if (!v3SiteKey) {
    // Fallback: render children directly if v3 key is not configured yet
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={v3SiteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
