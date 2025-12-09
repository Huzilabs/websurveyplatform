// Survey data models for MedInsights 2025
export type SurveyQuestion = {
  id: string;
  type: 'likert_1_7' | 'Áno_Nie_Neviem' | 'slider_1_10' | 'open_text';
  mandatory: boolean;
  question_text: string;
  scale?: {
    min: number;
    max: number;
    labels?: Record<string, string>;
    min_label?: string;
    max_label?: string;
  };
  options?: { value: string; label: string }[];
  constraints?: { min_characters?: number };
};

export type Survey = {
  survey_id: string;
  version: string;
  autosave_interval_seconds: number;
  questions: SurveyQuestion[];
};

export type SurveyResponse = {
  respondent_id: string;
  timestamp_started: string;
  timestamp_submitted: string;
  status: 'not_started' | 'in_progress' | 'submitted';
  answers: { id: string; value: string | number }[];
};
