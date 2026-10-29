import Image from "next/image";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { UserPlusIcon } from "@phosphor-icons/react/dist/ssr/UserPlus";
import { MIN_PASSWORD_LENGTH, hasAccounts, passwordSetup } from "@/lib/admin/auth";
import { AdminNotice, adminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { site } from "@/content/site";
import logo from "@/public/brand/medsafar-logo.png";
import { setupAction } from "../actions";

const errors: Record<string, string> = {
  key: "That setup key is not right. It is the ADMIN_PASSWORD secret set on the Worker.",
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  password: `Choose a password of at least ${MIN_PASSWORD_LENGTH} characters.`,
  confirm: "The two passwords are not the same.",
};

/** Shown once: while there are no accounts, it makes the first one, an owner. */
export default async function SetupPage({ searchParams }: PageProps<"/admin/setup">) {
  // Per request: whether accounts exist is read from the database.
  await connection();
  if (await hasAccounts()) redirect("/admin/login");
  const { error, name, email } = await searchParams;
  const setup = passwordSetup();

  return (
    <main className="band-deep relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
      <form
        action={setupAction}
        className="hero-rise w-full max-w-md rounded-lg border border-hairline bg-surface p-6 shadow-lift sm:p-8"
      >
        <Image src={logo} alt={`${site.brand.name} ${site.brand.country}`} priority width={104} height={44} className="h-11 w-auto" />
        <h1 className="mt-6 flex items-center gap-2 font-display text-2xl font-semibold tracking-[-0.02em]">
          <UserPlusIcon size={22} className="text-brand" aria-hidden />
          Create the first account
        </h1>
        <p className="mt-1 text-sm text-ink-3">
          This is done once. You become the owner and can then add the rest of the team.
        </p>

        {setup !== "ok" ? (
          <AdminNotice tone="error">
            Set the ADMIN_PASSWORD secret on the Worker first (at least 8 characters). It is the setup key asked for
            below.
          </AdminNotice>
        ) : null}
        {typeof error === "string" && errors[error] ? <AdminNotice tone="error">{errors[error]}</AdminNotice> : null}

        <label htmlFor="key" className={`${adminLabel} mt-6`}>
          Setup key
        </label>
        <input id="key" name="key" type="password" required autoComplete="off" className={`${adminInput} mt-1.5`} />
        <p className="mt-1.5 text-sm text-ink-3">The ADMIN_PASSWORD secret from Cloudflare.</p>

        <label htmlFor="name" className={`${adminLabel} mt-5`}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          defaultValue={typeof name === "string" ? name : undefined}
          className={`${adminInput} mt-1.5`}
        />
        <label htmlFor="email" className={`${adminLabel} mt-4`}>
          Your email
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
          Choose a password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
          className={`${adminInput} mt-1.5`}
        />
        <p className="mt-1.5 text-sm text-ink-3">At least {MIN_PASSWORD_LENGTH} characters.</p>
        <label htmlFor="confirm" className={`${adminLabel} mt-4`}>
          Type it again
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          autoComplete="new-password"
          className={`${adminInput} mt-1.5`}
        />
        <button type="submit" className={`${adminButton.primary} mt-6 min-h-12 w-full text-base`}>
          Create account
        </button>
      </form>
    </main>
  );
}
