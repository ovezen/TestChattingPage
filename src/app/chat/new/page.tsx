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
  const { Funnel, Step, next, prev } = useFunnel(steps[0]);
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

  return (
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
  );
}
