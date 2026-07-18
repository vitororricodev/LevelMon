import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { NamingScreen } from "@/components/screens/NamingScreen";
import { VerdictScreen } from "@/components/screens/VerdictScreen";
import { ConditioningScreen } from "@/components/screens/ConditioningScreen";
import { JourneyScreen } from "@/components/screens/JourneyScreen";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import type { MonsterStage } from "@/components/MonsterAvatar";
import type { ClassId, Tier } from "@/lib/levelmon";

export const Route = createFileRoute("/")({
  component: LevelMonApp,
});

type Step =
  "login" | "onboarding" | "naming" | "verdict" | "conditioning" | "journey" | "dashboard";

function LevelMonApp() {
  const [step, setStep] = useState<Step>("login");
  const [classId, setClassId] = useState<ClassId | null>(null);
  const [monsterStage, setMonsterStage] = useState<MonsterStage>("baby");
  const [levelmonName, setLevelmonName] = useState<string>("");
  const [tier, setTier] = useState<Tier>("moderado");
  const [conditioningIndex, setConditioningIndex] = useState<number>(5);

  return (
    <PhoneFrame>
      {step === "login" && <LoginScreen onContinue={() => setStep("onboarding")} />}
      {step === "onboarding" && (
        <OnboardingScreen
          onBack={() => setStep("login")}
          onDone={({ classId, stage }) => {
            setClassId(classId);
            setMonsterStage(stage);
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
          stage={monsterStage}
          levelmonName={levelmonName}
          onBack={() => setStep("naming")}
          onContinue={() => setStep("conditioning")}
        />
      )}
      {step === "conditioning" && classId && (
        <ConditioningScreen
          classId={classId}
          levelmonName={levelmonName}
          onBack={() => setStep("verdict")}
          onDone={(index, t) => {
            setConditioningIndex(index);
            setTier(t);
            setStep("journey");
          }}
        />
      )}
      {step === "journey" && classId && (
        <JourneyScreen
          classId={classId}
          tier={tier}
          onBack={() => setStep("conditioning")}
          onAccept={() => setStep("dashboard")}
        />
      )}
      {step === "dashboard" && classId && (
        <DashboardScreen
          classId={classId}
          stage={monsterStage}
          levelmonName={levelmonName}
          tier={tier}
          conditioningIndex={conditioningIndex}
          onReset={() => {
            setClassId(null);
            setLevelmonName("");
            setTier("moderado");
            setConditioningIndex(5);
            setStep("login");
          }}
        />
      )}
    </PhoneFrame>
  );
}
