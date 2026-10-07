import Image from "next/image";
import { redirect } from "next/navigation";
import { LockKeyIcon } from "@phosphor-icons/react/dist/ssr/LockKey";
import { MIN_PASSWORD_LENGTH, isAdmin, passwordSetup } from "@/lib/admin/auth";
import { AdminNotice, adminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { site } from "@/content/site";
import logo from "@/public/brand/medsafar-logo.png";
import { signInAction } from "../actions";

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const setup = passwordSetup();

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
        <p className="mt-1 text-sm text-ink-3">Enquiries and trust figures for the site.</p>
        <label htmlFor="password" className={`${adminLabel} mt-6`}>
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
        {setup === "missing" ? (
          <AdminNotice tone="error">
            Sign-in is not set up yet: the ADMIN_PASSWORD secret is missing on the Worker.
          </AdminNotice>
        ) : setup === "too-short" ? (
          <AdminNotice tone="error">
            Sign-in is turned off: the ADMIN_PASSWORD secret is shorter than {MIN_PASSWORD_LENGTH}{" "}
            characters. Set a longer one in Cloudflare and try again.
          </AdminNotice>
        ) : error ? (
          <AdminNotice tone="error">That password is not right.</AdminNotice>
        ) : null}
        <button type="submit" className={`${adminButton.primary} mt-6 min-h-12 w-full text-base`}>
          Sign in
        </button>
      </form>
    </main>
  );
}
