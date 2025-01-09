"use client";

// 새로운 채팅방을 생성할 수 있는 페이지입니다.
import React, { useState } from "react";
import { createChatRoom } from "../_api/supabase";

const CreateChatRoomPage = () => {
  // 로딩 상태와 에러 메시지 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 임시 데이터 (테스트용)
  const tempUserId = "b8a8ecd2-c1fb-4242-98c2-ad46662a12b3"; // 생성자의 user_id
  const tempRoomDetails = {
    title: "My Awesome Chat Room3",
    subtitle: "Let's chat and have fun!",
    description: "This is a great chat room for everyone to join.",
    hashtags: ["fun", "chat", "awesome"],
    thumbnailUrl: "https://example.com/thumbnail.jpg", // 임시 썸네일 URL
  };

  // 채팅방 생성 함수
  const handleCreateChatRoom = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const result = await createChatRoom(tempUserId, tempRoomDetails);

    if (result.success) {
      setSuccessMessage("채팅방이 성공적으로 생성되었습니다!");
    } else {
      setError(
        result.error || "채팅방 생성 중 알 수 없는 오류가 발생했습니다."
      );
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>채팅방 생성</h1>
      <p>새로운 채팅방을 생성하고 관리자를 등록합니다.</p>

      {/* 로딩 상태 표시 */}
      {loading && <p>채팅방을 생성 중입니다...</p>}

      {/* 성공 메시지 */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* 에러 메시지 */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 생성 버튼 */}
      <button
        onClick={handleCreateChatRoom}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        채팅방 생성하기
      </button>
    </div>
  );
};

export default CreateChatRoomPage;
