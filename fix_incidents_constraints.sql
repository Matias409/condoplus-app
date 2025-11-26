-- Drop check constraints if they exist to allow flexible values
ALTER TABLE public.incidents DROP CONSTRAINT IF EXISTS incidents_category_check;
ALTER TABLE public.incidents DROP CONSTRAINT IF EXISTS incidents_priority_check;
ALTER TABLE public.incidents DROP CONSTRAINT IF EXISTS incidents_status_check;

-- Optional: If you want to ensure the columns allow any text, no further action is needed as they are TEXT type.
-- If you wanted to add new constraints, you would do it here, but for now we want flexibility for the AI/N8N.

-- Verify columns exist (just in case)
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Media';
