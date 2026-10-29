import Image from "next/image";
import { redirect } from "next/navigation";
import { LockKeyIcon } from "@phosphor-icons/react/dist/ssr/LockKey";
import { hasAccounts, isAdmin, passwordSetup } from "@/lib/admin/auth";
import { AdminNotice, adminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { site } from "@/content/site";
import logo from "@/public/brand/medsafar-logo.png";
import { signInAction } from "../actions";

const errors: Record<string, string> = {
  wrong: "That email and password do not match an account. Check them and try again.",
  locked: "Too many tries. For your safety, sign-in is paused for 15 minutes.",
  setup: "Sign-in is not set up yet: the ADMIN_PASSWORD secret is missing or too short on the Worker.",
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await isAdmin()) redirect("/admin");
  if (passwordSetup() === "ok" && !(await hasAccounts())) redirect("/admin/setup");
  const { error, email } = await searchParams;
  const message =
    passwordSetup() !== "ok" ? errors.setup : typeof error === "string" ? errors[error] : undefined;

  return (
    <main className="band-deep relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
      <form
        action={signInAction}
        className="hero-rise w-full max-w-sm rounded-lg border border-hairline bg-surface p-6 shadow-lift sm:p-8"
      >
        <Image
          src={logo}
          alt={`${site.brand.name} ${site.brand.country}`}
          priority
          width={104}
          height={44}
          className="h-11 w-auto"
        />
        <h1 className="mt-6 flex items-center gap-2 font-display text-2xl font-semibold tracking-[-0.02em]">
          <LockKeyIcon size={22} className="text-brand" aria-hidden />
          Admin sign-in
        </h1>
        <p className="mt-1 text-sm text-ink-3">For the Medsafar team.</p>
        <label htmlFor="email" className={`${adminLabel} mt-6`}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          defaultValue={typeof email === "string" ? email : undefined}
          className={`${adminInput} mt-1.5`}
        />
        <label htmlFor="password" className={`${adminLabel} mt-4`}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={`${adminInput} mt-1.5`}
        />
        {message ? <AdminNotice tone="error">{message}</AdminNotice> : null}
        <button type="submit" className={`${adminButton.primary} mt-6 min-h-12 w-full text-base`}>
          Sign in
        </button>
        <p className="mt-4 text-sm text-ink-3">Forgot your password? Ask the person who added you to the team to set a new one.</p>
      </form>
    </main>
  );
}
