import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { NamingScreen } from "@/components/screens/NamingScreen";
import { VerdictScreen } from "@/components/screens/VerdictScreen";
import { JourneyScreen } from "@/components/screens/JourneyScreen";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import type { ClassId } from "@/lib/levelmon";

export const Route = createFileRoute("/")({
  component: LevelMonApp,
});

type Step = "login" | "onboarding" | "naming" | "verdict" | "journey" | "dashboard";

function LevelMonApp() {
  const [step, setStep] = useState<Step>("login");
  const [classId, setClassId] = useState<ClassId | null>(null);
  const [levelmonName, setLevelmonName] = useState<string>("");

  return (
    <PhoneFrame>
      {step === "login" && <LoginScreen onContinue={() => setStep("onboarding")} />}
      {step === "onboarding" && (
        <OnboardingScreen
          onBack={() => setStep("login")}
          onDone={({ classId }) => {
            setClassId(classId);
            setStep("naming");
          }}
        />
      )}
      {step === "naming" && classId && (
        <NamingScreen
          classId={classId}
          onBack={() => setStep("onboarding")}
          onDone={(name) => {
            setLevelmonName(name);
            setStep("verdict");
          }}
        />
      )}
      {step === "verdict" && classId && (
        <VerdictScreen
          classId={classId}
          levelmonName={levelmonName}
          onBack={() => setStep("naming")}
          onContinue={() => setStep("journey")}
        />
      )}
      {step === "journey" && classId && (
        <JourneyScreen
          classId={classId}
          onBack={() => setStep("verdict")}
          onAccept={() => setStep("dashboard")}
        />
      )}
      {step === "dashboard" && classId && (
        <DashboardScreen
          classId={classId}
          levelmonName={levelmonName}
          onReset={() => {
            setClassId(null);
            setLevelmonName("");
            setStep("login");
          }}
        />
      )}
    </PhoneFrame>
  );
}
