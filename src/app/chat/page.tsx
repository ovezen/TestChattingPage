// 채팅방 리스트가 렌더링되는 페이지입니다.
"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation"; // useRouter 사용
import React from "react";
import { enterAsMember } from "./_api/supabase";
import Image from "next/image";

const supabase = createClient();

export default function ChatRoomListPage() {
  const router = useRouter();

  // Supabase에서 채팅방 리스트 가져오기
  const fetchChatRooms = async () => {
    const { data, error } = await supabase.from("chat_rooms").select(`
      room_id,
      room_title,
      room_subtitle,
      room_thumbnail_url
    `);

    return { chatRooms: data || [], error };
  };

  const [chatRooms, setChatRooms] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchChatRooms()
      .then(({ chatRooms, error }) => {
        if (error) setError("채팅방 정보를 가져오는 데 실패했습니다.");
        else setChatRooms(chatRooms);
      })
      .catch((err) => setError("데이터를 가져오는 중 오류가 발생했습니다."));
  }, []);

  // 클릭 이벤트 핸들러
  const handleRoomClick = (roomId: string) => {
    // 비동기 함수 호출
    enterRoom(roomId);
  };

  // 비동기 함수 (멤버 등록 및 라우팅)
  const enterRoom = async (roomId: string) => {
    const userId = "eeebe519-c2b1-4f55-ad15-757334452a2b"; // 현재 사용자의 ID (임시 값)
    try {
      const result = await enterAsMember(userId, roomId);

      if (!result.success) {
        alert(`채팅방 입장 실패: ${result.error}`);
        return;
      }

      // 상세 페이지로 이동
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("채팅방 입장 중 에러 발생:", error);
      alert("알 수 없는 에러가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>채팅방 리스트</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {chatRooms.map((room) => (
          <li
            key={room.room_id}
            onClick={() => handleRoomClick(room.room_id)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            <Image
              src={room.room_thumbnail_url || "https://via.placeholder.com/50"}
              alt={room.room_title}
              width={100}
              height={100}
            />
            <div>
              <h3 style={{ margin: 0 }}>{room.room_title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{room.room_subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 채팅방 생성 페이지로 이동하는 플로팅 버튼입니다.
