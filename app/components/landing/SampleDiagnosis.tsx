import DiagnosisCard from "@/app/components/chat/DiagnosisCard";
import type { Diagnosis } from "@/app/types/chat";

// Sample data rendered with the same card the chat uses for a real diagnosis.
const SAMPLE: Diagnosis = {
  summary: "Squealing from the front wheels when braking",
  vehicle: "2019 Volkswagen Golf 1.5 TSI",
  severity: "Moderate",
  drive_safety: "safe",
  safety_note: null,
  causes: [
    {
      name: "Worn brake pads",
      likelihood: "High",
      detail:
        "The most common cause, especially if the noise is high-pitched and worst when cold.",
      check: null,
    },
    {
      name: "Glazed pads or rotors",
      likelihood: "Medium",
      detail:
        "Hard braking can glaze the surfaces, which then squeal at low speed.",
      check: null,
    },
    {
      name: "Debris between pad and rotor",
      likelihood: "Low",
      detail: "Small stones or dirt can cause a temporary squeal.",
      check: null,
    },
  ],
  diy: {
    verdict: "yes",
    difficulty: "Moderate",
    summary: "You'll need a jack, a socket set and new pads.",
    steps: [],
  },
  costs: [
    {
      repair: "Front brake pads and labour at a shop",
      low: 150,
      high: 300,
      note: null,
    },
  ],
  cost_note: "Prices vary by region.",
};

const SampleDiagnosis = () => <DiagnosisCard diagnosis={SAMPLE} />;

export default SampleDiagnosis;
