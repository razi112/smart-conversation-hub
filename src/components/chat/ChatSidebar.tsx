import { useState } from "react";
import { Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeft, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { Conversation } from "@/hooks/useConversations";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ChatSidebarProps {
  conversations: Conversation[];
  currentId: string | null;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onToggle: () => void;
}

export const ChatSidebar = ({
  conversations,
  currentId,
  isCollapsed,
  onSelect,
  onNew,
  onDelete,
  onRename,
  onToggle,
}: ChatSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const saveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingId && editTitle.trim()) {
      onRename(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div
      className={cn(
        "h-full border-r border-border bg-card flex flex-col transition-all duration-300",
        isCollapsed ? "w-14" : "w-72"
      )}
    >
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center justify-between px-3 flex-shrink-0">
        {!isCollapsed && (
          <span className="font-medium text-sm text-foreground">Chats</span>
        )}
        <div className={cn("flex items-center gap-1", isCollapsed && "mx-auto")}>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNew}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* New chat button when collapsed */}
      {isCollapsed && (
        <div className="p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNew}
            className="w-full h-10 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Conversations list */}
      {!isCollapsed && (
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">
                No conversations yet
              </p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                    currentId === conv.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => onSelect(conv.id)}
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    {editingId === conv.id ? (
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(e as unknown as React.MouseEvent);
                          if (e.key === "Escape") cancelEdit(e as unknown as React.MouseEvent);
                        }}
                        className="h-6 text-sm py-0 px-1 bg-background"
                        autoFocus
                      />
                    ) : (
                      <>
                        <p className="text-sm truncate">{conv.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conv.updated_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {editingId === conv.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={saveEdit}
                          className="h-6 w-6 text-primary hover:text-primary"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEdit}
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => startEditing(conv, e)}
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(conv.id);
                          }}
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
