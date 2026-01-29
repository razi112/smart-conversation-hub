import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Conversation {
  id: string;
  title: string;
  updated_at: string;
  pinned: boolean;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("id, title, updated_at, pinned")
      .order("pinned", { ascending: false })
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setConversations(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const createConversation = useCallback(async () => {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ title: "New Chat" })
      .select()
      .single();

    if (!error && data) {
      setConversations((prev) => [data, ...prev]);
      return data.id;
    }
    return null;
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    await supabase.from("conversations").delete().eq("id", id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const renameConversation = useCallback(async (id: string, newTitle: string) => {
    const { error } = await supabase
      .from("conversations")
      .update({ title: newTitle })
      .eq("id", id);

    if (!error) {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
      );
    }
  }, []);

  const togglePinConversation = useCallback(async (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;

    const newPinned = !conv.pinned;
    const { error } = await supabase
      .from("conversations")
      .update({ pinned: newPinned })
      .eq("id", id);

    if (!error) {
      setConversations((prev) => {
        const updated = prev.map((c) =>
          c.id === id ? { ...c, pinned: newPinned } : c
        );
        // Re-sort: pinned first, then by updated_at
        return updated.sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
      });
    }
  }, [conversations]);

  const refreshConversations = useCallback(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    renameConversation,
    togglePinConversation,
    refreshConversations,
  };
};
