"use client";

// 채팅방 id에 따라 각 채팅방이 동적으로 라우팅되는 페이지입니다.

import { useState } from "react";
import ChatInput from "./_components/ChatInput";
import ChatMessages from "./_components/ChatMessages";
import { exitChatRoom } from "../_utils/chat";
// 퇴장 함수 import

interface ChatRoomPageProps {
  params: { id: string }; // App Router에서 제공하는 동적 경로 파라미터
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id: roomId } = params;
  const memberId = "eeebe519-c2b1-4f55-ad15-757334452a2b"; // 실제 로그인된 사용자 ID로 변경 필요

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExitChatRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const { success, error } = await exitChatRoom(memberId, roomId);

      if (!success) {
        throw new Error(error);
      }

      // 채팅방 퇴장 성공 시 로직 (예: 페이지 리디렉션)
      alert("채팅방에서 퇴장했습니다.");
      window.location.href = "/"; // 홈으로 이동
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>채팅방</h1>
      <ChatMessages roomId={roomId} />
      <ChatInput roomId={roomId} memberId={memberId} />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleExitChatRoom}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Leaving..." : "Leave Chat Room"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}
