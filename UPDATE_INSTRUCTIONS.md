# Database Update Instructions

## Step 1: Execute SQL Query in Supabase

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Execute the SQL query from `supabase_update.sql` file to add new columns to the contracts table

## Step 2: Verify Table Structure

After running the SQL, verify that all new columns have been added to the contracts table:

- q1_trust_expert through q29_patient_advantages
- q2_other (for the "Other" specification in question 2)

## Step 3: Test the Application

1. Fill out the personal data form
2. Approve the contract
3. Complete the questionnaire with all 29 questions
4. Check the admin dashboard to see the responses

## Features Added

### Questionnaire:
- 29 comprehensive questions about biosimilar drugs
- Multiple question types: single, multi, multi_other, likert, open
- Proper handling of "Other" specifications
- Dynamic column mapping to database

### Admin Dashboard:
- Overview table with all respondents
- Detailed view for each respondent showing all responses
- Dynamic display of questionnaire answers
- Status indicators for contract approval and questionnaire completion
- Proper formatting of dates and status badges

### Database Schema:
- All 29 question columns added to contracts table
- Support for "other" text fields
- Proper data types for all response formats