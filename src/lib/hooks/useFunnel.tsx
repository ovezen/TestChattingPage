import React, { ReactNode, ReactElement, useState } from "react";

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: ReactElement[];
}

export const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState<string>(initialStep);

  const Step = ({ name, children }: StepProps): ReactNode => {
    return <>{children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const steps = React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement<StepProps>(child) && child.type === Step) {
          return child;
        }
        return null;
      })
      .filter(Boolean) as ReactElement<StepProps>[];
    const activeStep = steps.find((child) => child.props.name === currentStep);
    return activeStep || null;
  };

  const next = (nextStep: string): void => {
    setCurrentStep(nextStep);
  };

  const prev = (prevStep: string): void => {
    setCurrentStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep };
};
