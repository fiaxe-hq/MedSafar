import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { listStats } from "@/lib/stats";
import {
  AdminBadge,
  AdminHeading,
  AdminNotice,
  adminButton,
  adminCard,
  adminInput,
  adminLabel,
} from "@/components/admin/ui";
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
  const live = stats.filter((s) => s.published);

  return (
    <>
      <AdminHeading
        eyebrow="Home and country pages"
        title="Trust figures"
        intro="The figures in the trust strip on the home page and every country page. Publish only figures Medsafar can prove. While none is published, the site shows no figures at all."
      />

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      {/* The figures as the trust strip shows them right now. */}
      <section aria-labelledby="preview" className={`${adminCard} mt-8 bg-surface-2 p-5 sm:p-6`}>
        <h2 id="preview" className="text-sm font-medium text-ink-2">
          On the site now · {live.length} of {stats.length} published
        </h2>
        {live.length > 0 ? (
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {live.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col-reverse rounded-md border border-hairline bg-surface p-4"
              >
                <dt className="mt-2 text-sm font-medium text-ink">{stat.label}</dt>
                <dd className="numeral text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-2 text-base text-ink-3">Nothing published, so the site shows no figures.</p>
        )}
      </section>

      <h2 className="mt-12 font-display text-xl font-semibold">All figures</h2>
      <p className="mt-1 text-sm text-ink-3">The site shows published ones in this order, four to a row.</p>

      {stats.length > 0 ? (
        <ol className="mt-4 space-y-3">
          {stats.map((stat, i) => (
            <li
              key={stat.id}
              className={`${adminCard} p-4 transition-shadow hover:shadow-card sm:p-5 ${
                stat.published ? "border-s-4 border-s-brand" : ""
              }`}
            >
              {/* One form per figure; each button posts to its own action. */}
              <form className="grid gap-4 lg:grid-cols-[1fr_12rem_auto] lg:items-end">
                <input type="hidden" name="id" value={stat.id} />
                <div>
                  <label htmlFor={`label-${stat.id}`} className={adminLabel}>
                    Label
                  </label>
                  <input
                    id={`label-${stat.id}`}
                    name="label"
                    defaultValue={stat.label}
                    required
                    maxLength={60}
                    className={`${adminInput} mt-1.5`}
                  />
                </div>
                <div>
                  <label htmlFor={`value-${stat.id}`} className={adminLabel}>
                    Figure
                  </label>
                  <input
                    id={`value-${stat.id}`}
                    name="value"
                    defaultValue={stat.value}
                    required
                    maxLength={24}
                    className={`${adminInput} mt-1.5`}
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
                    className={adminButton.icon}
                  >
                    <ArrowUpIcon size={18} aria-hidden />
                  </button>
                  <button
                    type="submit"
                    formAction={moveStatDownAction}
                    formNoValidate
                    disabled={i === stats.length - 1}
                    aria-label={`Move ${stat.label} down`}
                    className={adminButton.icon}
                  >
                    <ArrowDownIcon size={18} aria-hidden />
                  </button>
                  <button
                    type="submit"
                    formAction={deleteStatAction}
                    formNoValidate
                    className={adminButton.danger}
                  >
                    <TrashIcon size={17} aria-hidden />
                    Delete
                  </button>
                </div>
              </form>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-3">
                <AdminBadge tone={stat.published ? "good" : "neutral"}>
                  {stat.published ? "Published" : "Hidden"}
                </AdminBadge>
                key {stat.key} · updated{" "}
                {new Date(stat.updatedAt).toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })}{" "}
                IST
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className={`${adminCard} mt-4 px-6 py-10 text-center text-base text-ink-2`}>No figures yet. Add the first one below.</p>
      )}

      <form
        action={addStatAction}
        className={`${adminCard} mt-10 grid max-w-3xl gap-4 border-dashed border-line p-4 sm:grid-cols-[1fr_12rem_auto] sm:items-end sm:p-6`}
      >
        <div className="sm:col-span-3">
          <h2 className="font-display text-xl font-semibold">Add a figure</h2>
          <p className="mt-1 text-sm text-ink-3">It stays hidden until you publish it.</p>
        </div>
        <div>
          <label htmlFor="new-label" className={adminLabel}>
            Label
          </label>
          <input
            id="new-label"
            name="label"
            required
            maxLength={60}
            className={`${adminInput} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor="new-value" className={adminLabel}>
            Figure
          </label>
          <input
            id="new-value"
            name="value"
            required
            maxLength={24}
            className={`${adminInput} mt-1.5`}
          />
        </div>
        <button type="submit" className={adminButton.primary}>
          Add
        </button>
      </form>
    </>
  );
}
