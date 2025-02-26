/*
  # Create quotes table

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `project_description` (text)
      - `additional_comments` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `quotes` table
    - Add policy for inserting quotes
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text,
  project_description text NOT NULL,
  additional_comments text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quotes"
  ON quotes
  FOR INSERT
  TO public
  WITH CHECK (true);