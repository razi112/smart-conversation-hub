import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    conversations,
    createConversation,
    deleteConversation,
    renameConversation,
    togglePinConversation,
    refreshConversations,
  } = useConversations();

  const { messages, isLoading, isStreaming, sendMessage } = useChat(currentConversationId);

  // Create a new conversation when user sends first message without one
  const handleSend = async (input: string) => {
    if (!currentConversationId) {
      const newId = await createConversation();
      if (newId) {
        setCurrentConversationId(newId);
        // Wait a tick for state to update, then send
        setTimeout(() => sendMessage(input), 0);
      }
    } else {
      sendMessage(input);
    }
  };

  const handleNewChat = async () => {
    const newId = await createConversation();
    if (newId) {
      setCurrentConversationId(newId);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation(id);
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  // Refresh conversations after sending a message (to update title/timestamp)
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      refreshConversations();
    }
  }, [isLoading, messages.length, refreshConversations]);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentId={currentConversationId}
        isCollapsed={sidebarCollapsed}
        onSelect={setCurrentConversationId}
        onNew={handleNewChat}
        onDelete={handleDeleteConversation}
        onRename={renameConversation}
        onTogglePin={togglePinConversation}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center px-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Hikma AI</span>
          </div>
        </header>

        {/* Chat area */}
        <main className="flex-1 min-h-0">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            isStreaming={isStreaming}
            onSend={handleSend}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
