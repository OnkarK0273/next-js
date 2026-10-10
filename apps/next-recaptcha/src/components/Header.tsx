"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Bot, FileCode } from "lucide-react";
import Image from "next/image";

function Header() {
  const handleGithubClick = (placement: "header_desktop" | "header_mobile") => {
    sendGAEvent("event", "github_link_clicked", { placement });
  };

  return (
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
          <a
            href="https://github.com/OnkarK0273/next-js/tree/main/apps/next-recaptcha"
            target="_blank"
            rel="noreferrer"
            onClick={() => handleGithubClick("header_mobile")}
          >
            <Image
              src={"/github-light.svg"}
              alt="github"
              width={20}
              height={20}
              className="md:hidden"
            />
          </a>
        </div>
      </div>
      <a
        href="https://github.com/OnkarK0273/next-js/tree/main/apps/next-recaptcha"
        target="_blank"
        rel="noreferrer"
        onClick={() => handleGithubClick("header_desktop")}
      >
        <Image
          src={"/github-light.svg"}
          alt="github"
          width={20}
          height={20}
          className="hidden md:block absolute right-4 top-5"
        />
      </a>
    </header>
  );
}

export default Header;
