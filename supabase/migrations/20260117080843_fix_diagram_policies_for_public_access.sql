/*
  # Fix Diagram Policies for Public Admin Access

  1. Changes
    - Update INSERT policy on diagrams to allow public access (not just authenticated)
    - Update UPDATE policy on diagrams to allow public access
    - Update DELETE policy on diagrams to allow public access
    - Update INSERT policy on diagram_versions to allow public access
    - Update DELETE policy on diagram_versions to allow public access

  2. Reason
    - The admin interface does not have authentication implemented yet
    - This allows the diagram editor to work without requiring auth
    - In a production environment, these would be restricted to authenticated admin users

  3. Security Note
    - These policies should be tightened once authentication is implemented
    - For now, this enables the admin tools to function properly
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create diagrams" ON diagrams;
DROP POLICY IF EXISTS "Authenticated users can update diagrams" ON diagrams;
DROP POLICY IF EXISTS "Authenticated users can delete diagrams" ON diagrams;
DROP POLICY IF EXISTS "Authenticated users can create diagram versions" ON diagram_versions;
DROP POLICY IF EXISTS "Authenticated users can delete diagram versions" ON diagram_versions;

-- Create new public policies for diagrams
CREATE POLICY "Anyone can create diagrams"
  ON diagrams FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update diagrams"
  ON diagrams FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete diagrams"
  ON diagrams FOR DELETE
  TO public
  USING (true);

-- Create new public policies for diagram_versions
CREATE POLICY "Anyone can create diagram versions"
  ON diagram_versions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can delete diagram versions"
  ON diagram_versions FOR DELETE
  TO public
  USING (true);
