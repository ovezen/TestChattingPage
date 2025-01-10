import React, { useState } from "react";
import { FormDetails } from "../page";

interface HashTagsProps {
  formData: FormDetails; // 전체 FormDetails 타입
  onPrev: () => void; // 이전 단계로 이동하는 함수
}

interface HashTagsProps {
  formData: FormDetails; // 전체 FormDetails 타입
  onPrev: () => void; // 이전 단계로 이동하는 함수
}

export default function HashTags({ formData, onPrev }: HashTagsProps) {
  const [hashtags, setHashtags] = useState<string[]>(formData.hashtags || []);

  const handleAddTag = (tag: string) => {
    if (tag && !hashtags.includes(tag)) {
      setHashtags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div>
      <h2>HashTags</h2>
      {/* Summary 단계에서 입력한 title과 subtitle 표시 */}
      <p>
        <strong>Title:</strong> {formData.title}
      </p>
      <p>
        <strong>Subtitle:</strong> {formData.subtitle}
      </p>

      <div>
        {hashtags.map((tag) => (
          <span key={tag} onClick={() => handleRemoveTag(tag)}>
            #{tag} ✕
          </span>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTag(e.currentTarget.value.trim());
            e.currentTarget.value = "";
          }
        }}
        placeholder="Add a hashtag"
      />
      <button onClick={onPrev}>Previous</button>
    </div>
  );
}