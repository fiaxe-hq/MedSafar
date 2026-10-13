-- Two more questions at step 2 of the enquiry form: what matters most when we
-- suggest a hospital, and any city or hospital the visitor already has in mind.
ALTER TABLE leads ADD COLUMN budget TEXT;
ALTER TABLE leads ADD COLUMN preference TEXT;
