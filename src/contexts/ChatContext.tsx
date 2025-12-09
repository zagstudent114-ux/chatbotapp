import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatContextType {
  messages: Message[];
  loading: boolean;
  historyLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  sessionId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());
  
  // Ref to track if we have already loaded history for the current user
  const loadedRef = useRef<string | null>(null);

  useEffect(() => {
    // Only load history if we have a user and haven't loaded for this user yet
    if (user && loadedRef.current !== user.id) {
      loadChatHistory(user.id);
    } else if (!user) {
      setMessages([]);
      loadedRef.current = null;
    }
  }, [user]);

  const loadChatHistory = async (userId: string) => {
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('athlete_id', userId)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading chat history:', error);
        return;
      }

      setMessages((data || []).reverse());
      loadedRef.current = userId;
    } finally {
      setHistoryLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !user || loading) return;

    setLoading(true);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Save to DB (Fire and forget for UI responsiveness, but usually good to await to ensure consistency)
    await supabase.from('chat_messages').insert({
      athlete_id: user.id,
      session_id: sessionId,
      role: 'user',
      content: content,
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            message: content,
            athlete_id: user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      await supabase.from('chat_messages').insert({
        athlete_id: user.id,
        session_id: sessionId,
        role: 'assistant',
        content: data.response,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, loading, historyLoading, sendMessage, sessionId }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
