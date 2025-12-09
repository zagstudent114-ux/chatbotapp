import { ChatPanel } from '../components/ChatPanel';
import { MetricsPanel } from '../components/MetricsPanel';

export function ChatPage() {
  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatPanel />
      </div>
      <div className="hidden lg:block lg:w-[450px] border-l border-gray-200 bg-white">
        <MetricsPanel />
      </div>
    </div>
  );
}
