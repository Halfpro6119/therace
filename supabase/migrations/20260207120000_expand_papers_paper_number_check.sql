-- Allow paper_number 1–6 (Combined Science has 6, Languages have 4).
-- Drop the original check that only allowed (1, 2, 3) and add a range check.
ALTER TABLE papers
  DROP CONSTRAINT IF EXISTS papers_paper_number_check;

ALTER TABLE papers
  ADD CONSTRAINT papers_paper_number_check CHECK (paper_number >= 1 AND paper_number <= 10);
