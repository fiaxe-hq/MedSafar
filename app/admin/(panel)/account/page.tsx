import { MIN_PASSWORD_LENGTH, requireAdmin } from "@/lib/admin/auth";
import { AdminHeading, AdminNotice, adminButton, adminCard, adminInput, adminLabel } from "@/components/admin/ui";
import { changeNameAction, changePasswordAction } from "./actions";

const errors: Record<string, string> = {
  name: "Please enter your name.",
  current: "Your current password is not right.",
  password: `Choose a new password of at least ${MIN_PASSWORD_LENGTH} characters.`,
  confirm: "The two new passwords are not the same.",
};

const done: Record<string, string> = {
  name: "Name saved.",
  password: "Password changed. Any other device you were signed in on is now signed out.",
};

export default async function AccountPage({ searchParams }: PageProps<"/admin/account">) {
  const me = await requireAdmin();
  const params = await searchParams;
  const error = typeof params.error === "string" ? errors[params.error] : undefined;
  const message = typeof params.done === "string" ? done[params.done] : undefined;

  return (
    <>
      <AdminHeading
        eyebrow={me.role === "owner" ? "Owner" : "Editor"}
        title="My account"
        intro={`You sign in as ${me.email}. To change the email, ask an owner.`}
      />
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <div className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-2">
        <form action={changeNameAction} className={`${adminCard} space-y-4 p-5 sm:p-6`}>
          <h2 className="font-display text-lg font-semibold">Your name</h2>
          <div>
            <label htmlFor="name" className={adminLabel}>Name</label>
            <input id="name" name="name" defaultValue={me.name} required className={`${adminInput} mt-1.5`} />
            <p className="mt-1.5 text-sm text-ink-3">Shown next to the changes you make.</p>
          </div>
          <button type="submit" className={adminButton.quiet}>Save name</button>
        </form>

        <form action={changePasswordAction} className={`${adminCard} space-y-4 p-5 sm:p-6`}>
          <h2 className="font-display text-lg font-semibold">Change password</h2>
          <div>
            <label htmlFor="current" className={adminLabel}>Current password</label>
            <input id="current" name="current" type="password" autoComplete="current-password" required className={`${adminInput} mt-1.5`} />
          </div>
          <div>
            <label htmlFor="password" className={adminLabel}>New password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              required
              className={`${adminInput} mt-1.5`}
            />
            <p className="mt-1.5 text-sm text-ink-3">At least {MIN_PASSWORD_LENGTH} characters.</p>
          </div>
          <div>
            <label htmlFor="confirm" className={adminLabel}>New password again</label>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className={`${adminInput} mt-1.5`} />
          </div>
          <button type="submit" className={adminButton.primary}>Change password</button>
        </form>
      </div>
    </>
  );
}
