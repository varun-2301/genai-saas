-- Enable the pgvector extension if not already
create extension if not exists vector;

-- Create the documents table if it doesn’t exist
create table if not exists documents (
    id uuid primary key default gen_random_uuid(),
    content text,
    embedding vector(1536),
    metadata jsonb
);

-- Drop if already exists (safety)
drop function if exists match_documents;

-- Create match_documents function
create or replace function match_documents (
  filter jsonb,
  match_count int,
  query_embedding vector(1536)
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where (filter is null or metadata @> filter)  -- optional filtering
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
