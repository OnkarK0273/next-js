import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Database,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "@/components/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutBtn from "@/components/LogoutBtn";

const features = [
  {
    icon: KeyRound,
    eyebrow: "Identity layer",
    title: "Better-Auth Core",
    description:
      "Email/password auth plus Google and GitHub OAuth, with sessions wired through the catch-all route handler and authClient.",
    className: "md:col-span-2",
  },
  {
    icon: Database,
    eyebrow: "Data layer",
    title: "Drizzle + Postgres",
    description:
      "Docker-ready Postgres, generated auth schemas, and explicit drizzle-kit migrations you can review in git.",
    className: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Routing layer",
    title: "Protected by default",
    description:
      "Server-side session validation and layout redirects keep public and authenticated flows clearly separated.",
    className: "md:col-span-1",
  },
  {
    icon: Check,
    eyebrow: "Developer layer",
    title: "Type-safe fullstack",
    description:
      "A focused App Router foundation with end-to-end TypeScript, so your next feature starts with useful boundaries.",
    className: "md:col-span-2",
  },
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/doc");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(113,113,122,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_85%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[38rem] w-[48rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-12rem] top-[32rem] h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <header className="flex h-20 items-center justify-between border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-950">
              B
            </span>
            Better-Auth <span className="text-zinc-500">+</span> Drizzle Starter
          </Link>
          <nav className="flex items-center gap-1">
            {session ? (
              <LogoutBtn />
            ) : (
              <Button
                className="bg-indigo-400 text-indigo-950 hover:bg-indigo-300"
                nativeButton={false}
                render={<Link href="/signup" />}
              >
                Get started
              </Button>
            )}
          </nav>
        </header>

        <section className="mx-auto flex max-w-4xl flex-col items-center px-2 pb-20 pt-24 text-center sm:pt-32">
          <Badge
            variant="outline"
            className="border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-indigo-200"
          >
            <span className="mr-1.5">✨</span> Production-Ready Auth &amp;
            Database Stack
          </Badge>
          <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Next.js 16 auth,{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
              finally in its place.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Better-Auth, Drizzle ORM, and PostgreSQL, composed for the Next.js
            App Router. Email/password, Google and GitHub OAuth, sessions, and
            type-safe migrations are ready for your first commit.
          </p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-11 bg-white px-5 text-zinc-950 hover:bg-zinc-200"
              nativeButton={false}
              render={
                <a
                  href="https://www.better-auth.com/docs"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <BookOpen /> Read Article <ArrowRight className="ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/better-auth/better-auth"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <GithubIcon /> GitHub Repository
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 px-5 text-zinc-300 hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<Link href="/signin" />}
            >
              Live Demo <ArrowRight className="ml-1" />
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-zinc-500">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            Built for teams who care about the details
          </div>
        </section>

        <section className="pb-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
                The foundation
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Everything wired. Nothing in your way.
              </h2>
            </div>
            <span className="hidden text-sm text-zinc-500 sm:block">
              04 architectural primitives
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(
              ({ icon: Icon, eyebrow, title, description, className }) => (
                <Card
                  key={title}
                  className={`border-white/10 bg-white/[0.045] py-0 shadow-none transition-colors duration-300 hover:border-indigo-300/30 hover:bg-white/[0.07] ${className}`}
                >
                  <CardHeader className="p-6 pb-3">
                    <div className="mb-8 flex size-10 items-center justify-center rounded-lg border border-indigo-300/20 bg-indigo-400/10 text-indigo-300">
                      <Icon size={19} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {eyebrow}
                    </p>
                    <CardTitle className="mt-1 text-lg text-white">
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="max-w-xl leading-6 text-zinc-400">
                      {description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </section>

        <section className="border-y border-white/10 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="mb-5 sm:mb-0">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Start in seconds
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Clone the stack, then make it yours.
            </p>
          </div>
          <div className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-zinc-300">
            <span className="text-emerald-400">$</span>
            <code className="truncate">
              pnpm create next-app@latest &amp;&amp; pnpm add better-auth
              drizzle-orm pg
            </code>
          </div>
        </section>

        <footer className="flex flex-col gap-4 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Better-Auth + Drizzle Starter</span>
          <div className="flex items-center gap-4">
            <Separator
              orientation="vertical"
              className="hidden h-4 bg-white/10 sm:block"
            />
            <span>Next.js App Router · TypeScript · PostgreSQL</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
