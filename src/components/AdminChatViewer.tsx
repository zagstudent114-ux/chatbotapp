import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Trash2, User, X } from 'lucide-react';
import { getAllUsers, getUserChats, deleteChatMessage } from '../lib/adminApi';
import { Database } from '../lib/database.types';
import { ChatMessage } from './ChatMessage';
import { ConfirmDialog } from './ConfirmDialog';
import { format } from 'date-fns';

type Athlete = Database['public']['Tables']['athletes']['Row'];
type ChatMessageType = Database['public']['Tables']['chat_messages']['Row'];

export function AdminChatViewer() {
  const [users, setUsers] = useState<Athlete[]>([]);
  const [selectedUser, setSelectedUser] = useState<Athlete | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    messageId: string | null;
  }>({ isOpen: false, messageId: null });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadUserChats(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserChats = async (userId: string) => {
    try {
      setLoadingMessages(true);
      const data = await getUserChats(userId);
      setMessages(data);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteChatMessage(messageId);
      if (selectedUser) {
        await loadUserChats(selectedUser.id);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const getUserLastMessageTime = (userId: string) => {
    const userMessages = messages.filter((m) => m.athlete_id === userId);
    if (userMessages.length === 0) return null;
    return userMessages[userMessages.length - 1].timestamp;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Chat History</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">{users.length} users</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map((user) => {
            const isSelected = selectedUser?.id === user.id;
            return (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-4 text-left border-b border-gray-100 transition-colors ${
                  isSelected ? 'bg-emerald-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{user.name}</div>
                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedUser.name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {messages.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {messages.length} messages
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">Loading messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageSquare className="w-12 h-12 mb-3 text-gray-300" />
                  <p>No messages yet</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className="group relative">
                      <ChatMessage
                        message={{
                          id: message.id,
                          role: message.role,
                          content: message.content,
                          timestamp: message.timestamp,
                        }}
                      />
                      <button
                        onClick={() =>
                          setConfirmDialog({ isOpen: true, messageId: message.id })
                        }
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">Select a user to view their chat history</p>
            <p className="text-sm mt-1">Choose from the list on the left</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, messageId: null })}
        onConfirm={() => {
          if (confirmDialog.messageId) {
            handleDeleteMessage(confirmDialog.messageId);
          }
        }}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
