import type { Option } from "./records";
import type { Field, KindInfo, OptionList } from "./schema";

/**
 * Checks a record sent by an editor, field by field, against lib/admin/schema.ts.
 * Only the fields the form shows are taken from what was sent; every other
 * part of the record is kept from `base`. Errors are plain sentences, keyed
 * by field, for the form to show beside each one.
 */

export type Errors = Record<string, string>;

type Picture = { src: string | null; alt: string; pending: boolean; focus?: string };

const text = (value: unknown) => (typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "");

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** Photos are either the site's own files or ones uploaded in /admin. */
function safeSrc(src: unknown): string | null {
  return typeof src === "string" && /^\/(photos|media)\/[\w./-]+$/.test(src) && !src.includes("..") ? src : null;
}

function cleanPicture(value: unknown, base: unknown): Picture | "alt" {
  const input = isObject(value) ? value : {};
  const src = safeSrc(input.src);
  const alt = text(input.alt).slice(0, 200);
  if (src && !alt) return "alt";
  const keep = isObject(base) && base.src === src && typeof base.focus === "string" ? { focus: base.focus } : {};
  return { src, alt, pending: !src, ...keep };
}

function cleanLines(value: unknown): string[] {
  return (Array.isArray(value) ? value : []).map(text).filter(Boolean).map((line) => line.slice(0, 300));
}

function cleanField(
  field: Field,
  value: unknown,
  base: unknown,
  options: Record<OptionList, Option[]>,
): { value?: unknown; remove?: true; error?: string } {
  const required = "required" in field && field.required;
  switch (field.type) {
    case "text":
    case "textarea": {
      const v = text(value);
      if (!v) return required ? { error: "This is needed." } : { remove: true };
      if (field.max && v.length > field.max) return { error: `Keep this under ${field.max} characters (now ${v.length}).` };
      return { value: v };
    }
    case "lines": {
      const lines = cleanLines(value);
      if (required && lines.length === 0) return { error: "Add at least one line." };
      // Optional lists (a hospital's centres) are left out when empty, so the page hides them.
      return lines.length === 0 && field.omitEmpty ? { remove: true } : { value: lines };
    }
    case "paragraphs": {
      const paragraphs = cleanLines(value).map((p) => p.slice(0, 5000));
      if (required && paragraphs.length === 0) return { error: "Write at least one paragraph." };
      return { value: paragraphs };
    }
    case "select": {
      const v = text(value);
      if (!v) return required ? { error: "Choose one." } : { remove: true };
      if (!options[field.options].some((o) => o.value === v)) return { error: "Choose one from the list." };
      return { value: v };
    }
    case "checklist": {
      const allowed = new Set(options[field.options].map((o) => o.value));
      const list = Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && allowed.has(v)) : [];
      return { value: [...new Set(list)] };
    }
    case "checkbox":
      return { value: value === true };
    case "number": {
      const v = text(typeof value === "number" ? String(value) : value);
      if (!v) return { remove: true };
      const n = Number(v);
      if (!Number.isInteger(n) || n < field.min || n > field.max)
        return { error: `Use a whole number from ${field.min} to ${field.max}.` };
      return { value: n };
    }
    case "date": {
      const v = text(value);
      if (!v) return { value: null };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v))) return { error: "Use a date like 2026-10-29." };
      return { value: v };
    }
    case "picture": {
      const picture = cleanPicture(value, base);
      if (picture === "alt") return { error: "Describe the photo in a few words, for people who cannot see it." };
      if (!picture.src && field.omitEmpty) return { remove: true };
      return { value: picture };
    }
    case "gallery": {
      const baseList = Array.isArray(base) ? base : [];
      const list: Picture[] = [];
      for (const item of Array.isArray(value) ? value : []) {
        const picture = cleanPicture(item, baseList.find((b) => isObject(b) && isObject(item) && b.src === item.src));
        if (picture === "alt") return { error: "Every photo needs a short description." };
        if (picture.src) list.push(picture);
      }
      return { value: list };
    }
    case "faq": {
      const list = [];
      for (const item of Array.isArray(value) ? value : []) {
        const question = text(isObject(item) ? item.question : "");
        const answer = text(isObject(item) ? item.answer : "");
        if (!question && !answer) continue;
        if (!question || !answer) return { error: "Every question needs an answer, and every answer a question." };
        list.push({ question: question.slice(0, 300), answer: answer.slice(0, 3000) });
      }
      return { value: list };
    }
    case "packages": {
      const groups = [];
      for (const group of Array.isArray(value) ? value : []) {
        if (!isObject(group)) continue;
        const items = [];
        for (const item of Array.isArray(group.items) ? group.items : []) {
          if (!isObject(item)) continue;
          const name = text(item.name);
          const stay = text(item.stay);
          const priceText = text(String(item.priceUsd ?? "")).replace(/[$,\s]/g, "");
          if (!name && !stay && !priceText) continue;
          const price = Number(priceText);
          if (!name) return { error: "Every package needs a name." };
          if (!priceText || !Number.isFinite(price) || price <= 0) return { error: `Give "${name}" a price in US dollars, numbers only.` };
          items.push({ name: name.slice(0, 160), stay: stay.slice(0, 20), priceUsd: Math.round(price) });
        }
        const category = text(group.category);
        if (items.length === 0) continue;
        if (!category) return { error: "Every group of packages needs a heading." };
        groups.push({ category: category.slice(0, 120), items });
      }
      return groups.length === 0 ? { remove: true } : { value: groups };
    }
    case "sources": {
      const list = [];
      for (const item of Array.isArray(value) ? value : []) {
        const label = text(isObject(item) ? item.label : "");
        const href = text(isObject(item) ? item.href : "");
        if (!label && !href) continue;
        if (!label) return { error: "Every source needs a name." };
        if (!/^https?:\/\/\S+$/.test(href)) return { error: `The address for "${label}" must start with https://` };
        list.push({ label: label.slice(0, 200), href: href.slice(0, 500) });
      }
      return list.length === 0 && base === undefined ? { remove: true } : { value: list };
    }
  }
}

export function cleanRecord(
  info: KindInfo,
  input: unknown,
  base: Record<string, unknown>,
  options: Record<OptionList, Option[]>,
): { record: Record<string, unknown>; errors: Errors } {
  const sent = isObject(input) ? input : {};
  const record: Record<string, unknown> = { ...base };
  const errors: Errors = {};
  for (const field of info.sections.flatMap((s) => s.fields)) {
    const result = cleanField(field, sent[field.key], base[field.key], options);
    if (result.error) errors[field.key] = result.error;
    else if (result.remove) delete record[field.key];
    else record[field.key] = result.value;
  }
  return { record, errors };
}
