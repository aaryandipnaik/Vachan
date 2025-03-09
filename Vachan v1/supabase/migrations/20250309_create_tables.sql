-- Create profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_profiles_if_not_exists()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            display_name TEXT,
            phone_number TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Set up RLS
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Users can view their own profile"
            ON public.profiles
            FOR SELECT
            USING (auth.uid() = id);
            
        CREATE POLICY "Users can update their own profile"
            ON public.profiles
            FOR UPDATE
            USING (auth.uid() = id);
            
        CREATE POLICY "Users can insert their own profile"
            ON public.profiles
            FOR INSERT
            WITH CHECK (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'saved_articles') THEN
        CREATE TABLE public.saved_articles (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
            article_title TEXT NOT NULL,
            article_data JSONB NOT NULL,
            saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index for faster lookups
        CREATE INDEX saved_articles_user_id_idx ON public.saved_articles(user_id);
        
        -- Set up RLS
        ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Users can view their own saved articles"
            ON public.saved_articles
            FOR SELECT
            USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert their own saved articles"
            ON public.saved_articles
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can delete their own saved articles"
            ON public.saved_articles
            FOR DELETE
            USING (auth.uid() = user_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_profiles_if_not_exists();

