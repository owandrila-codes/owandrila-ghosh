-- ====================================================================
-- DATABASE PERFORMANCE & SCALABILITY SCHEMA (PostgreSQL / Supabase)
-- ====================================================================

-- 1. Partial Index for Unread Contact Messages & Inquiries
-- Prevents full sequential scans for unread/pending message queues
CREATE INDEX IF NOT EXISTS idx_contact_messages_unread
ON contact_messages (created_at DESC)
WHERE is_read = FALSE;

-- 2. Partial Index for Published Projects & Portfolio Items
CREATE INDEX IF NOT EXISTS idx_projects_published
ON projects (display_order ASC)
WHERE is_published = TRUE;

-- 3. Foreign Key & Join Column Indexes
CREATE INDEX IF NOT EXISTS idx_project_skills_project_id
ON project_skills (project_id);

CREATE INDEX IF NOT EXISTS idx_project_skills_skill_id
ON project_skills (skill_id);

-- 4. Full-Text Search Optimization (tsvector + GIN Indexing)
-- Avoids unindexed ILIKE '%term%' full table scans

-- Add generated tsvector search column
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(category, ''))
) STORED;

-- Create GIN Index for sub-millisecond full-text queries
CREATE INDEX IF NOT EXISTS idx_projects_search_gin 
ON projects USING GIN (search_vector);

-- Example Scalable Search Query:
-- SELECT * FROM projects 
-- WHERE search_vector @@ to_tsquery('english', 'data & science & ai')
-- ORDER BY display_order ASC;
