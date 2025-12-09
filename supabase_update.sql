-- Add new questionnaire columns to contracts table
-- These columns correspond to the 29 new biosimilar questions + demographics

-- First, add demographic columns if they don't exist
ALTER TABLE contracts 
ADD COLUMN IF NOT EXISTS age TEXT,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS practice_years TEXT,
ADD COLUMN IF NOT EXISTS workplace_type TEXT,
ADD COLUMN IF NOT EXISTS workplace_type_other TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS specialization TEXT;

-- Add all 29 biosimilar question columns
ALTER TABLE contracts 
ADD COLUMN IF NOT EXISTS q1_trust_expert TEXT,                    -- Question 1: Likert 1-5
ADD COLUMN IF NOT EXISTS q2_info_sources TEXT,                    -- Question 2: Multiple selection
ADD COLUMN IF NOT EXISTS q2_other TEXT,                           -- Question 2: Other specification
ADD COLUMN IF NOT EXISTS q3_better_orientation TEXT,              -- Question 3: Open question
ADD COLUMN IF NOT EXISTS q4_communication_form TEXT,              -- Question 4: Open question
ADD COLUMN IF NOT EXISTS q5_effectiveness_rating TEXT,            -- Question 5: Likert 1-4
ADD COLUMN IF NOT EXISTS q6_safety_rating TEXT,                   -- Question 6: Likert 1-4
ADD COLUMN IF NOT EXISTS q7_side_effects_risk TEXT,               -- Question 7: Likert 1-4
ADD COLUMN IF NOT EXISTS q8_safety_support TEXT,                  -- Question 8: Open question
ADD COLUMN IF NOT EXISTS q9_use_biosimilars TEXT,                 -- Question 9: Single selection (Yes/No)
ADD COLUMN IF NOT EXISTS q10_diagnoses_usage TEXT,                -- Question 10: Open question
ADD COLUMN IF NOT EXISTS q11_barriers_usage TEXT,                 -- Question 11: Open question
ADD COLUMN IF NOT EXISTS q12_prescribe_frequency TEXT,            -- Question 12: Likert 1-4
ADD COLUMN IF NOT EXISTS q13_prescription_reason TEXT,            -- Question 13: Single selection
ADD COLUMN IF NOT EXISTS q14_patient_transition TEXT,             -- Question 14: Likert 1-4
ADD COLUMN IF NOT EXISTS q15_original_response_influence TEXT,    -- Question 15: Single selection
ADD COLUMN IF NOT EXISTS q16_switching_motivators TEXT,           -- Question 16: Multiple selection
ADD COLUMN IF NOT EXISTS q17_transition_conditions TEXT,          -- Question 17: Open question
ADD COLUMN IF NOT EXISTS q18_patient_presentation TEXT,           -- Question 18: Open question
ADD COLUMN IF NOT EXISTS q19_discuss_origin_frequency TEXT,       -- Question 19: Single selection
ADD COLUMN IF NOT EXISTS q20_prescription_barriers TEXT,          -- Question 20: Multiple selection
ADD COLUMN IF NOT EXISTS q21_indication_experience TEXT,          -- Question 21: Open question
ADD COLUMN IF NOT EXISTS q22_transition_advantages TEXT,          -- Question 22: Open question
ADD COLUMN IF NOT EXISTS q23_patient_decision_factors TEXT,       -- Question 23: Open question
ADD COLUMN IF NOT EXISTS q24_info_accuracy_rating TEXT,           -- Question 24: Likert 1-4
ADD COLUMN IF NOT EXISTS q25_communication_improvements TEXT,     -- Question 25: Open question
ADD COLUMN IF NOT EXISTS q26_necessary_conditions TEXT,           -- Question 26: Open question
ADD COLUMN IF NOT EXISTS q27_additional_info_needed TEXT,         -- Question 27: Open question
ADD COLUMN IF NOT EXISTS q28_colleague_consultation_frequency TEXT, -- Question 28: Single selection
ADD COLUMN IF NOT EXISTS q29_patient_advantages TEXT;             -- Question 29: Open question

-- Optional: Add indexes for better query performance on frequently searched columns
CREATE INDEX IF NOT EXISTS idx_contracts_questionnaire_status ON contracts(questionnaire_status);
CREATE INDEX IF NOT EXISTS idx_contracts_contract_approved ON contracts(contract_approved);
CREATE INDEX IF NOT EXISTS idx_contracts_email ON contracts(email);
CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON contracts(created_at);