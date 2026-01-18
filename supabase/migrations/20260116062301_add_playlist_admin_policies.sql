/*
  # Add Admin Policies for Playlists Management

  1. Changes
    - Add INSERT policy for playlists (allow all authenticated users to create)
    - Add UPDATE policy for playlists (allow all authenticated users to update)
    - Add DELETE policy for playlists (allow all authenticated users to delete)
    - Add INSERT policy for playlist_items (allow managing playlist contents)
    - Add UPDATE policy for playlist_items (allow reordering)
    - Add DELETE policy for playlist_items (allow removing items)

  2. Security
    - These policies enable admin functionality for content management
    - In production, these should be restricted to admin users only
*/

-- Policies for playlists table
CREATE POLICY "Authenticated users can create playlists"
  ON playlists
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update playlists"
  ON playlists
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete playlists"
  ON playlists
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for playlist_items table
CREATE POLICY "Authenticated users can add playlist items"
  ON playlist_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update playlist items"
  ON playlist_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete playlist items"
  ON playlist_items
  FOR DELETE
  TO authenticated
  USING (true);
