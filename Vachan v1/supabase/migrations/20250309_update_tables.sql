-- Add article_token field to saved_articles table if it doesn't exist
ALTER TABLE public.saved_articles ADD COLUMN IF NOT EXISTS article_token TEXT;

-- Create index on article_token for faster lookups
CREATE INDEX IF NOT EXISTS saved_articles_article_token_idx ON public.saved_articles(article_token);

-- Update existing rows to have a token based on the title
UPDATE public.saved_articles 
SET article_token = encode(digest(article_title, 'sha256'), 'base64')
WHERE article_token IS NULL;

