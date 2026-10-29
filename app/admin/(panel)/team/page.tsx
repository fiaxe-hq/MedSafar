import { UserPlusIcon } from "@phosphor-icons/react/dist/ssr/UserPlus";
import { MIN_PASSWORD_LENGTH, listUsers, requireOwner } from "@/lib/admin/auth";
import {
  AdminBadge,
  AdminHeading,
  AdminNotice,
  adminButton,
  adminCard,
  adminInput,
  adminLabel,
  adminWhen,
} from "@/components/admin/ui";
import { addMemberAction, resetPasswordAction, setAccessAction, updateMemberAction } from "./actions";

const errors: Record<string, string> = {
  name: "Please enter a name.",
  email: "Please enter a valid email address.",
  password: `Passwords need at least ${MIN_PASSWORD_LENGTH} characters.`,
  taken: "Someone on the team already uses that email.",
  missing: "That person is no longer on the team.",
  "last-owner": "There must always be at least one owner.",
  self: "You cannot remove your own access. Ask another owner.",
};

const done: Record<string, string> = {
  added: "Added. Send them the address of this page, their email and the password you chose; they can change it under their name at the top.",
  saved: "Saved.",
  password: "New password set. They are signed out everywhere and sign in with the new one.",
  off: "Access removed. They were signed out at once.",
  on: "Access given back.",
};

const roles = [
  { value: "editor", label: "Editor", hint: "Changes hospitals, doctors, treatments, blog, contact details and figures." },
  { value: "owner", label: "Owner", hint: "Everything an editor can do, and manages the team." },
];

function RoleSelect({ id, value }: { id: string; value: string }) {
  return (
    <select id={id} name="role" defaultValue={value} className={`${adminInput} mt-1.5`}>
      {roles.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
}

export default async function TeamPage({ searchParams }: PageProps<"/admin/team">) {
  const me = await requireOwner();
  const params = await searchParams;
  const error = typeof params.error === "string" ? errors[params.error] : undefined;
  const message = typeof params.done === "string" ? done[params.done] : undefined;
  const users = await listUsers();

  return (
    <>
      <AdminHeading
        eyebrow="Owners only"
        title="Team"
        intro="Everyone who can sign in to this admin. Each person has their own email and password, and the home page shows who changed what."
      />
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <dl className="mt-6 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
        {roles.map((r) => (
          <div key={r.value} className={`${adminCard} px-4 py-3`}>
            <dt className="font-medium text-ink">{r.label}</dt>
            <dd>{r.hint}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 space-y-3">
        {users.map((user) => (
          <li key={user.id} className={`${adminCard} p-4 sm:p-5 ${user.active ? "" : "opacity-75"}`}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-base font-medium text-ink">
                {user.name}
                {user.id === me.id ? <span className="font-normal text-ink-3"> (you)</span> : null}
              </p>
              <AdminBadge tone={user.role === "owner" ? "good" : "neutral"}>
                {user.role === "owner" ? "Owner" : "Editor"}
              </AdminBadge>
              {user.active ? null : <AdminBadge tone="off">No access</AdminBadge>}
            </div>
            <p className="mt-1 text-sm text-ink-3">
              {user.email} · {user.lastSignInAt ? `Last signed in ${adminWhen(user.lastSignInAt)}` : "Has not signed in yet"}
            </p>

            <details className="mt-3">
              <summary className="cursor-pointer py-3 text-sm font-medium text-accent">Change details or password</summary>
              <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <form action={updateMemberAction} className="space-y-3">
                  <input type="hidden" name="id" value={user.id} />
                  <div>
                    <label htmlFor={`name-${user.id}`} className={adminLabel}>Name</label>
                    <input id={`name-${user.id}`} name="name" defaultValue={user.name} required className={`${adminInput} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor={`email-${user.id}`} className={adminLabel}>Email</label>
                    <input id={`email-${user.id}`} name="email" type="email" defaultValue={user.email} required className={`${adminInput} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor={`role-${user.id}`} className={adminLabel}>Role</label>
                    <RoleSelect id={`role-${user.id}`} value={user.role} />
                  </div>
                  <button type="submit" className={adminButton.quiet}>Save details</button>
                </form>
                <div className="space-y-6">
                  <form action={resetPasswordAction} className="space-y-3">
                    <input type="hidden" name="id" value={user.id} />
                    <div>
                      <label htmlFor={`password-${user.id}`} className={adminLabel}>New password</label>
                      <input
                        id={`password-${user.id}`}
                        name="password"
                        type="text"
                        autoComplete="off"
                        minLength={MIN_PASSWORD_LENGTH}
                        required
                        className={`${adminInput} mt-1.5`}
                      />
                      <p className="mt-1.5 text-sm text-ink-3">
                        At least {MIN_PASSWORD_LENGTH} characters. Tell them the new password in person or by phone.
                      </p>
                    </div>
                    <button type="submit" className={adminButton.quiet}>Set new password</button>
                  </form>
                  {user.id === me.id ? null : (
                    <form action={setAccessAction}>
                      <input type="hidden" name="id" value={user.id} />
                      <input type="hidden" name="active" value={user.active ? "no" : "yes"} />
                      <button type="submit" className={user.active ? adminButton.danger : adminButton.quiet}>
                        {user.active ? "Remove access" : "Give access again"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>

      <form action={addMemberAction} className={`${adminCard} mt-10 border-dashed p-5 sm:p-6`}>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
          <UserPlusIcon size={22} className="text-brand" aria-hidden />
          Add a person
        </h2>
        <p className="mt-1 text-sm text-ink-3">Choose a first password for them. They can change it after signing in.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="new-name" className={adminLabel}>Name</label>
            <input id="new-name" name="name" required className={`${adminInput} mt-1.5`} />
          </div>
          <div>
            <label htmlFor="new-email" className={adminLabel}>Email</label>
            <input id="new-email" name="email" type="email" required className={`${adminInput} mt-1.5`} />
          </div>
          <div>
            <label htmlFor="new-role" className={adminLabel}>Role</label>
            <RoleSelect id="new-role" value="editor" />
          </div>
          <div>
            <label htmlFor="new-password" className={adminLabel}>First password</label>
            <input
              id="new-password"
              name="password"
              type="text"
              autoComplete="off"
              minLength={MIN_PASSWORD_LENGTH}
              required
              className={`${adminInput} mt-1.5`}
            />
            <p className="mt-1.5 text-sm text-ink-3">At least {MIN_PASSWORD_LENGTH} characters.</p>
          </div>
        </div>
        <button type="submit" className={`${adminButton.primary} mt-6`}>Add to the team</button>
      </form>
    </>
  );
}
