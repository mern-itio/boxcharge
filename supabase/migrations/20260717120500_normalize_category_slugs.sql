-- Older categories could save after the first character was typed, producing
-- one-letter slugs such as /category/a. Normalize only those malformed slugs.
UPDATE public.categories
SET slug = trim(
  both '-'
  FROM regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g')
)
WHERE char_length(slug) <= 1;
