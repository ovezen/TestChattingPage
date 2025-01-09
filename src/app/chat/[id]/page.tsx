// 채팅방 id에 따라 각 채팅방이 동적으로 라우팅되는 페이지입니다.

import ChatInput from "./_components/ChatInput";
import ChatMessages from "./_components/ChatMessages";

interface ChatRoomPageProps {
  params: { id: string }; // App Router에서 제공하는 동적 경로 파라미터
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id: roomId } = params;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>채팅방</h1>
      <ChatMessages roomId={roomId} />
      <ChatInput
        roomId={roomId}
        memberId="eeebe519-c2b1-4f55-ad15-757334452a2b"
      />
    </div>
  );
}