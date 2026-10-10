"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RecaptchaV2Form } from "@/components/recaptcha-v2-form";
import { RecaptchaV3Form } from "@/components/recaptcha-v3-form";
import { RecaptchaGuide } from "@/components/recaptcha-guide";
import { ShieldCheck, Sparkles } from "lucide-react";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Form Tabs Column */}
      <div className="lg:col-span-7 space-y-4">
        <Tabs defaultValue="v2" className="w-full">
          <TabsList className="grid w-full grid-cols-2  bg-muted/80 rounded-xl border">
            <TabsTrigger
              value="v2"
              className="flex items-center justify-center gap-2 py-1 rounded-lg text-sm font-medium transition-all"
            >
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              <span>reCAPTCHA v2</span>
            </TabsTrigger>

            <TabsTrigger
              value="v3"
              className="flex items-center justify-center gap-2 py-1 rounded-lg text-sm font-medium transition-all"
            >
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>reCAPTCHA v3</span>
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
  );
}

export default Dashboard;
