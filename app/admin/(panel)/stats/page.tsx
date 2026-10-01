import { listStats } from "@/lib/stats";
import { AdminHeading, AdminNotice, adminButton, adminInput } from "@/components/admin/ui";
import {
  addStatAction,
  deleteStatAction,
  moveStatDownAction,
  moveStatUpAction,
  publishStatAction,
  saveStatAction,
  unpublishStatAction,
} from "./actions";

const errors: Record<string, string> = {
  label: "The label needs 2 to 60 characters.",
  value: "The figure needs 1 to 24 characters.",
  duplicate: "A figure with that label already exists.",
  missing: "That figure no longer exists.",
};

const done: Record<string, string> = {
  added: "Figure added. It stays hidden until you publish it.",
  saved: "Saved.",
  published: "Published. It now shows on the home page and every country page.",
  unpublished: "Hidden from the site.",
  deleted: "Deleted.",
};

export default async function StatsPage({ searchParams }: PageProps<"/admin/stats">) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? errors[params.error] : undefined;
  const message = typeof params.done === "string" ? done[params.done] : undefined;
  const stats = await listStats();
  const published = stats.filter((s) => s.published).length;

  return (
    <>
      <AdminHeading
        title="Trust figures"
        intro="The figures in the trust strip on the home page and every country page. Publish only figures Medsafar can prove. While none is published, the site shows no figures at all."
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <p className="mt-8 text-sm text-ink-3">
        {published} of {stats.length} published. The site shows them in this order, four to a
        row.
      </p>

      {stats.length > 0 ? (
        <ol className="mt-4 space-y-3">
          {stats.map((stat, i) => (
            <li key={stat.id} className="rounded-lg border border-hairline bg-surface p-4 sm:p-5">
              {/* One form per figure; each button posts to its own action. */}
              <form className="grid gap-4 lg:grid-cols-[1fr_12rem_auto] lg:items-end">
                <input type="hidden" name="id" value={stat.id} />
                <div>
                  <label htmlFor={`label-${stat.id}`} className="block text-sm font-medium">
                    Label
                  </label>
                  <input
                    id={`label-${stat.id}`}
                    name="label"
                    defaultValue={stat.label}
                    required
                    maxLength={60}
                    className={`${adminInput} mt-1`}
                  />
                </div>
                <div>
                  <label htmlFor={`value-${stat.id}`} className="block text-sm font-medium">
                    Figure
                  </label>
                  <input
                    id={`value-${stat.id}`}
                    name="value"
                    defaultValue={stat.value}
                    required
                    maxLength={24}
                    className={`${adminInput} mt-1`}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="submit" formAction={saveStatAction} className={adminButton.quiet}>
                    Save
                  </button>
                  {stat.published ? (
                    <button
                      type="submit"
                      formAction={unpublishStatAction}
                      formNoValidate
                      className={adminButton.quiet}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      type="submit"
                      formAction={publishStatAction}
                      formNoValidate
                      className={adminButton.primary}
                    >
                      Publish
                    </button>
                  )}
                  <button
                    type="submit"
                    formAction={moveStatUpAction}
                    formNoValidate
                    disabled={i === 0}
                    aria-label={`Move ${stat.label} up`}
                    className={`${adminButton.quiet} disabled:opacity-40`}
                  >
                    Up
                  </button>
                  <button
                    type="submit"
                    formAction={moveStatDownAction}
                    formNoValidate
                    disabled={i === stats.length - 1}
                    aria-label={`Move ${stat.label} down`}
                    className={`${adminButton.quiet} disabled:opacity-40`}
                  >
                    Down
                  </button>
                  <button
                    type="submit"
                    formAction={deleteStatAction}
                    formNoValidate
                    className={adminButton.danger}
                  >
                    Delete
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-ink-3">
                {stat.published ? "Published" : "Hidden"} · key {stat.key} · updated{" "}
                {new Date(stat.updatedAt).toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })}{" "}
                IST
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 text-base text-ink-2">No figures yet.</p>
      )}

      <form
        action={addStatAction}
        className="mt-10 grid max-w-3xl gap-4 rounded-lg border border-hairline bg-surface p-4 sm:grid-cols-[1fr_12rem_auto] sm:items-end sm:p-5"
      >
        <h2 className="text-lg font-semibold sm:col-span-3">Add a figure</h2>
        <div>
          <label htmlFor="new-label" className="block text-sm font-medium">
            Label
          </label>
          <input
            id="new-label"
            name="label"
            required
            maxLength={60}
            className={`${adminInput} mt-1`}
          />
        </div>
        <div>
          <label htmlFor="new-value" className="block text-sm font-medium">
            Figure
          </label>
          <input
            id="new-value"
            name="value"
            required
            maxLength={24}
            className={`${adminInput} mt-1`}
          />
        </div>
        <button type="submit" className={adminButton.primary}>
          Add
        </button>
      </form>
    </>
  );
}
