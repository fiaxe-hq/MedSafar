import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Local stub store for enquiries.
 *
 * Everything lands in .data/ next to the project. The CRM, the email alert and
 * the WhatsApp hook replace this file later — nothing else has to change,
 * because the rest of the app only calls the four functions below.
 */

const dataDir = path.join(process.cwd(), ".data");
const leadsFile = path.join(dataDir, "leads.json");
const uploadsDir = path.join(dataDir, "uploads");

export type Lead = {
  id: string;
  /** Full number in E.164, e.g. +2348012345678 */
  phone: string;
  phoneIso: string;
  /** Page the enquiry came from: "/", "/ng" or "/treatments/knee-replacement" */
  source: string;
  createdAt: string;
  updatedAt: string;
  /** Filled in at step 2. */
  name?: string;
  email?: string;
  country?: string;
  treatment?: string;
  timeline?: string;
  notes?: string;
  reportFile?: string;
  consent?: boolean;
  completedAt?: string;
};

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await readFile(leadsFile, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf8");
}

/** Step 1. Called the moment a mobile number is submitted. */
export async function createLead(input: {
  phone: string;
  phoneIso: string;
  source: string;
}): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = { id: randomUUID(), ...input, createdAt: now, updatedAt: now };
  const leads = await readAll();
  leads.push(lead);
  await writeAll(leads);
  return lead;
}

/** Step 2. Adds the details to the lead saved at step 1. */
export async function updateLead(
  id: string,
  patch: Partial<Omit<Lead, "id" | "createdAt">>,
): Promise<Lead | null> {
  const leads = await readAll();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...patch, updatedAt: new Date().toISOString() };
  await writeAll(leads);
  return leads[index];
}

/** Stores an uploaded medical report and returns the stored file name. */
export async function saveReport(leadId: string, file: File): Promise<string> {
  await mkdir(uploadsDir, { recursive: true });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  const stored = `${leadId}-${safeName}`;
  await writeFile(path.join(uploadsDir, stored), Buffer.from(await file.arrayBuffer()));
  return stored;
}
