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

// import { createClient } from "@/lib/utils/supabase/client";

// const supabase = createClient();

// interface ChatRoomPageProps {
//   params: { id: string }; // App Router에서 제공하는 동적 경로 파라미터
// }

// export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
//   const { id } = params;

//   // Supabase에서 채팅방 데이터를 가져오기
//   const { data: roomDetails, error } = await supabase
//     .from("chat_rooms")
//     .select("*")
//     .eq("room_id", id)
//     .single();

//   if (error) {
//     return (
//       <p style={{ color: "red" }}>채팅방 정보를 가져오는 데 실패했습니다.</p>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//       <h1>{roomDetails.room_title}</h1>
//       <p>{roomDetails.room_description}</p>
//       <p>해시태그: {roomDetails.room_hashtags.join(", ")}</p>
//     </div>
//   );
// }
