-- Rate limit for the enquiry form: at most 3 new enquiries in 24 hours from
-- one connection or one phone number. The IP address is never stored, only a
-- one-way hash of it.
ALTER TABLE leads ADD COLUMN ip_hash TEXT;

CREATE INDEX leads_ip_hash_created_at ON leads (ip_hash, created_at);
CREATE INDEX leads_phone_created_at ON leads (phone, created_at);
