export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chat_fevertime_rooms: {
        Row: {
          chat_per_hour: string | null;
          created_at: string | null;
          id: string;
          room_id: string | null;
        };
        Insert: {
          chat_per_hour?: string | null;
          created_at?: string | null;
          id?: string;
          room_id?: string | null;
        };
        Update: {
          chat_per_hour?: string | null;
          created_at?: string | null;
          id?: string;
          room_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chat_fevertime_rooms_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["room_id"];
          }
        ];
      };
      chat_members: {
        Row: {
          isActive: boolean;
          isAdmin: boolean;
          member_id: string;
          room_id: string;
        };
        Insert: {
          isActive?: boolean;
          isAdmin?: boolean;
          member_id: string;
          room_id: string;
        };
        Update: {
          isActive?: boolean;
          isAdmin?: boolean;
          member_id?: string;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_members_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "chat_members_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["room_id"];
          }
        ];
      };
      chat_messages: {
        Row: {
          content: string | null;
          created_at: string;
          image_url: string | null;
          member_id: string;
          message_id: string;
          room_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          image_url?: string | null;
          member_id: string;
          message_id?: string;
          room_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          image_url?: string | null;
          member_id?: string;
          message_id?: string;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_member_id_room_id_fkey";
            columns: ["member_id", "room_id"];
            isOneToOne: false;
            referencedRelation: "chat_members";
            referencedColumns: ["member_id", "room_id"];
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["room_id"];
          }
        ];
      };
      chat_rooms: {
        Row: {
          created_at: string;
          isActive: boolean;
          room_description: string;
          room_hashtags: string[];
          room_id: string;
          room_subtitle: string;
          room_thumbnail_url: string;
          room_title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          isActive?: boolean;
          room_description: string;
          room_hashtags: string[];
          room_id?: string;
          room_subtitle: string;
          room_thumbnail_url: string;
          room_title: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          isActive?: boolean;
          room_description?: string;
          room_hashtags?: string[];
          room_id?: string;
          room_subtitle?: string;
          room_thumbnail_url?: string;
          room_title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_room_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          nickname: string;
          profile_url: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          nickname: string;
          profile_url?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          nickname?: string;
          profile_url?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
