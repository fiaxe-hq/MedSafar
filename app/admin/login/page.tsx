import { redirect } from "next/navigation";
import { MIN_PASSWORD_LENGTH, isAdmin, passwordSetup } from "@/lib/admin/auth";
import { AdminNotice, adminButton, adminInput } from "@/components/admin/ui";
import { signInAction } from "../actions";

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const setup = passwordSetup();

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <form
        action={signInAction}
        className="w-full max-w-sm rounded-lg border border-hairline bg-surface p-6 shadow-card sm:p-8"
      >
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Medsafar admin</h1>
        <label htmlFor="password" className="mt-6 block text-base font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={`${adminInput} mt-2`}
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
        <button type="submit" className={`${adminButton.primary} mt-6 w-full`}>
          Sign in
        </button>
      </form>
    </main>
  );
}
