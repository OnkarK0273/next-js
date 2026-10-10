import { ShieldCheck, Sparkles, Terminal } from "lucide-react";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-muted/30 via-background to-muted/20">
      {/* Top Banner / Navbar */}
      <Header />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Complete Dual reCAPTCHA Implementation
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Experience how to seamlessly run Google reCAPTCHA v2 (interactive
            checkbox) and reCAPTCHA v3 (invisible score-based) side-by-side in a
            single Next.js application without script conflicts.
          </p>
        </div>

        {/* Dashboard Grid */}
        <Dashboard />

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
                In the Google reCAPTCHA Console, select{" "}
                <strong>Challenge (v2)</strong> &rarr;{" "}
                <strong>&quot;I&apos;m not a robot&quot; Checkbox</strong>. Add{" "}
                <code>localhost</code> to domains.
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
                In the Google reCAPTCHA Console, select{" "}
                <strong>Score based (v3)</strong>. Add <code>localhost</code> to
                domains.
              </p>
              <div className="p-2.5 rounded bg-muted/60 font-mono text-[11px] space-y-1">
                <div>NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=your_v3_site_key</div>
                <div>RECAPTCHA_V3_SECRET_KEY=your_v3_secret_key</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
