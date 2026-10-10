"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ShieldAlert,
  Server,
  Layers,
  CheckCircle,
  KeyRound,
  ExternalLink,
} from "lucide-react";

export function RecaptchaGuide() {
  const hasV2Site = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY);
  const hasV3Site = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY);

  return (
    <div className="space-y-6">
      {/* Configuration Status Card */}
      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            Environment Keys Status
          </CardTitle>
          <CardDescription className="text-xs">
            Keys configured in <code>.env.local</code> / <code>.env</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/60">
            <div className="font-mono truncate max-w-[210px]">
              NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-[11px] ${
                hasV2Site
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
              }`}
            >
              {hasV2Site ? "Configured" : "Missing"}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/60">
            <div className="font-mono truncate max-w-[210px]">
              RECAPTCHA_V2_SECRET_KEY
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              Server-only
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/60">
            <div className="font-mono truncate max-w-[210px]">
              NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY
            </div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-[11px] ${
                hasV3Site
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
              }`}
            >
              {hasV3Site ? "Configured" : "Missing"}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/60">
            <div className="font-mono truncate max-w-[210px]">
              RECAPTCHA_V3_SECRET_KEY
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              Server-only
            </span>
          </div>

          <div className="pt-2 text-[11px] text-muted-foreground">
            <a
              href="https://www.google.com/recaptcha/admin/create"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              Open Google reCAPTCHA Admin Console
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Guide */}
      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Architectural Comparison
          </CardTitle>
          <CardDescription className="text-xs">
            Understanding differences between reCAPTCHA v2 and v3
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 pr-2 font-medium">Feature</th>
                  <th className="py-2 px-2 font-medium text-blue-600 dark:text-blue-400">
                    v2 (Checkbox)
                  </th>
                  <th className="py-2 pl-2 font-medium text-emerald-600 dark:text-emerald-400">
                    v3 (Score)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-2 pr-2 font-medium">User Friction</td>
                  <td className="py-2 px-2">Explicit checkbox click</td>
                  <td className="py-2 pl-2 font-medium text-emerald-600 dark:text-emerald-400">
                    Zero friction (invisible)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-medium">Outcome</td>
                  <td className="py-2 px-2">Binary pass / fail</td>
                  <td className="py-2 pl-2 font-medium text-emerald-600 dark:text-emerald-400">
                    Risk score (0.0 to 1.0)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-medium">Provider</td>
                  <td className="py-2 px-2">Per-component render</td>
                  <td className="py-2 pl-2">Root layout context</td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 font-medium">Best For</td>
                  <td className="py-2 px-2">High-security forms, login</td>
                  <td className="py-2 pl-2">Lead forms, seamless UX</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-primary" />
              How Verification Works
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Never trust client-side claims. The frontend sends only a one-time
              challenge token. The backend verifies it against Google&apos;s{" "}
              <code>https://www.google.com/recaptcha/api/siteverify</code> using the
              private secret key.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
