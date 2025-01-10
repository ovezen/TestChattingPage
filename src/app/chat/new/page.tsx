"use client";

import { useFunnel } from "@/lib/hooks/useFunnel";
import { useState } from "react";
import Summary from "./_components/Summary";
import ThumbnailImage from "./_components/ThumbnailImage";
import HashTags from "./_components/HashTags";

const steps = ["Summary", "Thumbnail", "HashTags"];

export interface FormDetails {
  title: string;
  subtitle: string;
  description: string;
  thumbnail: File | null;
  hashtags: string[];
}

export default function Funnel() {
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps[0]);
  const [formData, setFormData] = useState<FormDetails>({
    title: "",
    subtitle: "",
    description: "",
    thumbnail: null,
    hashtags: [],
  });

  const handleNext = (data: Partial<FormDetails>, nextStep: string) => {
    setFormData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  // 진행도 계산
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 컨텐츠 영역 */}
      <div style={{ flex: 1 }}>
        <Funnel>
          <Step name={steps[0]}>
            <Summary
              formData={formData}
              onNext={(data) => handleNext(data, steps[1])}
            />
          </Step>
          <Step name={steps[1]}>
            <ThumbnailImage
              formData={formData}
              onNext={(data) => handleNext(data, steps[2])}
              onPrev={() => handlePrev(steps[0])}
            />
          </Step>
          <Step name={steps[2]}>
            <HashTags formData={formData} onPrev={() => handlePrev(steps[1])} />
          </Step>
        </Funnel>
      </div>

      {/* 진행도 UI */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#000",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        {/* 단계 표시 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "12px",
          }}
        >
          {steps.map((step, index) => (
            <span
              key={index}
              style={{
                color: index <= currentStepIndex ? "#000" : "#999",
              }}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
