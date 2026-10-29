-- Translations typed in /admin, field by field or from a CSV (lib/translations.ts).
-- One row per record and language. `data` maps each sentence's place in the
-- record (as in public/i18n/*.json, e.g. "faq.0.answer") to the translation
-- and the English it was made from; when the English changes, the old
-- translation stops showing until it is redone.
-- kind: hospital, doctor, treatment, post, settings (slug 'contact') or
-- figure (slug = the trust figure's key).
CREATE TABLE content_translations (
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  lang TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  PRIMARY KEY (kind, slug, lang)
);

CREATE INDEX content_translations_lang ON content_translations (lang);
