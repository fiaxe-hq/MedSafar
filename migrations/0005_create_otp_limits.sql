-- Limits for the mobile number check (lib/otp.ts). One row per code sent and
-- one per wrong code typed. Neither holds the code itself or a raw IP address,
-- only a one-way hash of the IP. Rows older than a day are deleted as new ones
-- arrive.
CREATE TABLE otp_sends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  sent_at INTEGER NOT NULL
);

CREATE INDEX otp_sends_phone_time ON otp_sends (phone, sent_at);
CREATE INDEX otp_sends_ip_time ON otp_sends (ip_hash, sent_at);
CREATE INDEX otp_sends_time ON otp_sends (sent_at);

CREATE TABLE otp_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  attempted_at INTEGER NOT NULL
);

CREATE INDEX otp_attempts_phone_time ON otp_attempts (phone, attempted_at);
CREATE INDEX otp_attempts_time ON otp_attempts (attempted_at);
