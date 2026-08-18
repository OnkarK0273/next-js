"use client";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FieldError, FieldGroup } from "@/components/ui/field";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SocialProvider = "google" | "github";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

export default function LoginForm() {
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value", value);
    },
  });

  return (
    <div className="flex items-center justify-center h-dvh bg-neutral-900">
      <Card className="w-full max-w-110  bg-[#121212] ">
        <CardHeader className="space-y-4 pt-4 text-center">
          <CardTitle className="text-[32px] font-semibold tracking-tight text-[#ececec]">
            Log in CodersGPT
          </CardTitle>
          <CardDescription className="mx-auto max-w-80 text-[15px] leading-relaxed text-[#b4b4b4]">
            You&apos;ll get smarter responses and can upload files, images, and
            more.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 px-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="flex flex-col gap-1">
              {/* Email Field */}
              <form.Field name="email">
                {(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="flex flex-col">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className={cn(
                          "h-13 rounded-xl border-[#424242] bg-transparent px-4 text-base transition-colors text-[#676767] focus:ring-0",
                          hasError
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      {/* Reserved space for error to prevent layout shift */}
                      <div className="min-h-5 px-1 py-0.5">
                        {hasError && (
                          <FieldError
                            className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200"
                            errors={field.state.meta.errors}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
              </form.Field>

              {/* Password Field */}
              <form.Field name="password">
                {(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="flex flex-col">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className={cn(
                          "h-13 rounded-xl border-[#424242] bg-transparent px-4 text-base transition-colors text-[#676767] focus:ring-0",
                          hasError
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      {/* Reserved space for error to prevent layout shift */}
                      <div className="min-h-5 px-1 py-0.5">
                        {hasError && (
                          <FieldError
                            className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200"
                            errors={field.state.meta.errors}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
              </form.Field>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDirty,
                ]}
              >
                {([canSubmit, isSubmitting, isDirty]) => (
                  <Button
                    type="submit"
                    className="mt-2 h-13 w-full rounded-full bg-[#ececec] text-[16px] font-semibold text-black hover:bg-white active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ececec]"
                    disabled={!canSubmit || !isDirty}
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center pb-4">
          <div className="text-sm text-[#b4b4b4]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
