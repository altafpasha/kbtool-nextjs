-- Create tables for company search history
CREATE TABLE company_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT NOT NULL,
    search_type VARCHAR(50) NOT NULL CHECK (search_type IN ('basic', 'relationship', 'news')),
    search_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID,
    search_successful BOOLEAN DEFAULT true
);

-- For company relationship searches
CREATE TABLE company_relationship_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_one TEXT NOT NULL,
    company_two TEXT NOT NULL,
    search_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID,
    search_successful BOOLEAN DEFAULT true
);

-- For news media searches
CREATE TABLE company_news_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT NOT NULL,
    search_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID,
    search_successful BOOLEAN DEFAULT true
);

-- Create indexes for faster searches
CREATE INDEX idx_company_searches_company_name ON company_searches(company_name);
CREATE INDEX idx_company_searches_created_at ON company_searches(created_at);
CREATE INDEX idx_company_relationship_searches_companies 
    ON company_relationship_searches(company_one, company_two);
CREATE INDEX idx_company_news_searches_company_name 
    ON company_news_searches(company_name);

-- Enable Row Level Security (RLS)
ALTER TABLE company_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_relationship_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_news_searches ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access to all users" 
    ON company_searches FOR SELECT USING (true);
CREATE POLICY "Enable insert access to all users" 
    ON company_searches FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access to all users" 
    ON company_relationship_searches FOR SELECT USING (true);
CREATE POLICY "Enable insert access to all users" 
    ON company_relationship_searches FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access to all users" 
    ON company_news_searches FOR SELECT USING (true);
CREATE POLICY "Enable insert access to all users" 
    ON company_news_searches FOR INSERT WITH CHECK (true);

-- Add comments for documentation
COMMENT ON TABLE company_searches IS 'Stores basic company search history';
COMMENT ON TABLE company_relationship_searches IS 'Stores company relationship comparison search history';
COMMENT ON TABLE company_news_searches IS 'Stores company news and media search history';

COMMENT ON COLUMN company_searches.search_type IS 'Type of search: basic, relationship, or news';
COMMENT ON COLUMN company_searches.search_url IS 'The URL that was used for the search';
COMMENT ON COLUMN company_searches.user_id IS 'Optional: ID of the user who performed the search if authenticated';
COMMENT ON COLUMN company_searches.search_successful IS 'Indicates if the search was completed successfully';
