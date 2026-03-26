-- Create categories table with hierarchical structure (adjacency list)
-- This supports 3 levels: Main Category -> Sub Category -> Sub Sub Category

CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_mm TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id INTEGER REFERENCES public.categories(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster parent lookups
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_level ON public.categories(level);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access (categories are public)
DROP POLICY IF EXISTS "categories_select_public" ON public.categories;
CREATE POLICY "categories_select_public" ON public.categories 
  FOR SELECT USING (true);
