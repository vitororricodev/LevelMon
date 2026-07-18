import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { VerdictScreen } from "@/components/screens/VerdictScreen";
import { JourneyScreen } from "@/components/screens/JourneyScreen";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import type { ClassId } from "@/lib/levelmon";

export const Route = createFileRoute("/")({
  component: LevelMonApp,
});

type Step = "login" | "onboarding" | "verdict" | "journey" | "dashboard";

function LevelMonApp() {
  const [step, setStep] = useState<Step>("login");
  const [classId, setClassId] = useState<ClassId | null>(null);

  return (
    <PhoneFrame>
      {step === "login" && <LoginScreen onContinue={() => setStep("onboarding")} />}
      {step === "onboarding" && (
        <OnboardingScreen
          onDone={({ classId }) => {
            setClassId(classId);
            setStep("verdict");
          }}
        />
      )}
      {step === "verdict" && classId && (
        <VerdictScreen classId={classId} onContinue={() => setStep("journey")} />
      )}
      {step === "journey" && classId && (
        <JourneyScreen classId={classId} onAccept={() => setStep("dashboard")} />
      )}
      {step === "dashboard" && classId && (
        <DashboardScreen classId={classId} onReset={() => setStep("login")} />
      )}
    </PhoneFrame>
  );
}
