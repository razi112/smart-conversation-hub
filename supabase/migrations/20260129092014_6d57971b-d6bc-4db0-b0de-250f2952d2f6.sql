-- Add pinned column to conversations table
ALTER TABLE public.conversations 
ADD COLUMN pinned BOOLEAN NOT NULL DEFAULT false;

-- Create index for pinned conversations
CREATE INDEX idx_conversations_pinned ON public.conversations(pinned DESC, updated_at DESC);