/**
 * Delivers the verification code to the visitor's phone.
 *
 * The SMS (or WhatsApp) provider is not chosen yet. When it is, its API call
 * goes in sendOtpSms and its keys in the Worker's secrets; smsReady then
 * reports true and the code step switches on by itself (see otpRequired in
 * lib/otp.ts). Nothing else has to change.
 */

/** True once a provider is wired in and its keys are set. */
export function smsReady(): boolean {
  return false;
}

/** The message, in English for now. Keep it short: one SMS segment. */
export function otpMessage(code: string): string {
  return `${code} is your Medsafar verification code. It expires in 10 minutes. Do not share it with anyone.`;
}

/**
 * Sends the code to a number in E.164 (+2348012345678). Returns false if it
 * did not go out, so the send is not counted against the visitor's limit.
 *
 * Until a provider is wired in, the code is only written to the dev server's
 * log, so the whole flow can be tried locally.
 */
export async function sendOtpSms(phone: string, code: string): Promise<boolean> {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[otp] code for ${phone}: ${code}`);
    return true;
  }
  return false;
}
