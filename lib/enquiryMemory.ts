/**
 * What the enquiry form remembers in this browser, so a visitor never types
 * the same thing twice: the problem they picked on the treatments page, and
 * the contact details they gave before. Kept in localStorage only; nothing
 * here leaves the device until they send the form.
 */

export type Issue = {
  /** Body part, in everyday words, e.g. "Knees". */
  area?: string;
  /** Treatment name, e.g. "Total knee replacement". Empty when unsure. */
  treatment?: string;
};

export type Contact = {
  iso?: string;
  phone?: string;
  name?: string;
  email?: string;
  country?: string;
};

const ISSUE = "medsafar:issue";
const CONTACT = "medsafar:contact";

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked or full: the form still works, it just won't remember.
  }
}

export const readIssue = () => read<Issue>(ISSUE);
export const saveIssue = (issue: Issue | null) => write(ISSUE, issue);

export const readContact = () => read<Contact>(CONTACT);
export const saveContact = (patch: Contact) => write(CONTACT, { ...read<Contact>(CONTACT), ...patch });

/** The issue as one line, for the form's notes and the banner above it. */
export function describeIssue(issue: Issue): string {
  return [issue.area, issue.treatment].filter(Boolean).join(": ");
}

/** Link to the contact form with the issue on it. */
export function contactHref(issue: Issue): string {
  const q = new URLSearchParams();
  if (issue.area) q.set("area", issue.area);
  if (issue.treatment) q.set("treatment", issue.treatment);
  return `/contact?${q}#plan`;
}
