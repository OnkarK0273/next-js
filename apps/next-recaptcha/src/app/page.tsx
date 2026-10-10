"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RecaptchaV2Form } from "@/components/recaptcha-v2-form";
import { RecaptchaV3Form } from "@/components/recaptcha-v3-form";
import { RecaptchaGuide } from "@/components/recaptcha-guide";
import {
  ShieldCheck,
  Sparkles,
  Bot,
  Terminal,
  FileCode,
  ShieldAlert,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-muted/30 via-background to-muted/20">
      {/* Top Banner / Navbar */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight">
                Google reCAPTCHA Hub
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                v2 &amp; v3 Next.js Demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border/80">
              <FileCode className="h-3.5 w-3.5 text-primary" />
              App Router &amp; TypeScript
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Complete Dual reCAPTCHA Implementation
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Experience how to seamlessly run Google reCAPTCHA v2 (interactive checkbox)
            and reCAPTCHA v3 (invisible score-based) side-by-side in a single Next.js application
            without script conflicts.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Tabs Column */}
          <div className="lg:col-span-7 space-y-4">
            <Tabs defaultValue="v2" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/80 rounded-xl border">
                <TabsTrigger
                  value="v2"
                  className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  <span>reCAPTCHA v2 (Checkbox)</span>
                </TabsTrigger>

                <TabsTrigger
                  value="v3"
                  className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span>reCAPTCHA v3 (Score)</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="v2">
                  <RecaptchaV2Form />
                </TabsContent>

                <TabsContent value="v3">
                  <RecaptchaV3Form />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Guide / Architectural Details Column */}
          <div className="lg:col-span-5">
            <RecaptchaGuide />
          </div>
        </div>

        {/* Developer Quick-Start Reference Section */}
        <section className="pt-6 border-t space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            Quick Setup &amp; Configuration Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border bg-card text-card-foreground space-y-2">
              <div className="font-semibold text-sm flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" />
                1. Setting up reCAPTCHA v2 (Checkbox)
              </div>
              <p className="text-muted-foreground leading-relaxed">
                In the Google reCAPTCHA Console, select <strong>Challenge (v2)</strong> &rarr;{" "}
                <strong>&quot;I&apos;m not a robot&quot; Checkbox</strong>. Add <code>localhost</code> to domains.
              </p>
              <div className="p-2.5 rounded bg-muted/60 font-mono text-[11px] space-y-1">
                <div>NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY=your_v2_site_key</div>
                <div>RECAPTCHA_V2_SECRET_KEY=your_v2_secret_key</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-card text-card-foreground space-y-2">
              <div className="font-semibold text-sm flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                2. Setting up reCAPTCHA v3 (Invisible)
              </div>
              <p className="text-muted-foreground leading-relaxed">
                In the Google reCAPTCHA Console, select <strong>Score based (v3)</strong>.
                Add <code>localhost</code> to domains.
              </p>
              <div className="p-2.5 rounded bg-muted/60 font-mono text-[11px] space-y-1">
                <div>NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=your_v3_site_key</div>
                <div>RECAPTCHA_V3_SECRET_KEY=your_v3_secret_key</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
