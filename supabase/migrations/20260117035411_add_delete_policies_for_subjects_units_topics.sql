/*
  # Add DELETE policies for subjects, units, and topics

  1. Changes
    - Add DELETE policy for subjects table
    - Add DELETE policy for units table
    - Add DELETE policy for topics table

  2. Security
    - Allow public (admin) users to delete subjects, units, and topics
    - This enables the admin interface to properly delete these entities
*/

-- Add delete policy for subjects
CREATE POLICY "Admin can delete subjects"
  ON subjects FOR DELETE
  TO public
  USING (true);

-- Add delete policy for units
CREATE POLICY "Admin can delete units"
  ON units FOR DELETE
  TO public
  USING (true);

-- Add delete policy for topics
CREATE POLICY "Admin can delete topics"
  ON topics FOR DELETE
  TO public
  USING (true);