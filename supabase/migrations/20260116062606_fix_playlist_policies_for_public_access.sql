/*
  # Fix Playlist Policies for Public Access

  1. Changes
    - Drop existing authenticated-only policies
    - Add new public access policies for playlists management
    - Admin panel has its own passcode protection layer

  2. Security Note
    - These policies allow public access to manage playlists
    - The admin panel itself is protected by a passcode
    - In production, consider implementing proper Supabase auth for admin users
*/

-- Drop existing authenticated policies
DROP POLICY IF EXISTS "Authenticated users can create playlists" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can update playlists" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can delete playlists" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can add playlist items" ON playlist_items;
DROP POLICY IF EXISTS "Authenticated users can update playlist items" ON playlist_items;
DROP POLICY IF EXISTS "Authenticated users can delete playlist items" ON playlist_items;

-- Create new public access policies for playlists
CREATE POLICY "Anyone can create playlists"
  ON playlists
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update playlists"
  ON playlists
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete playlists"
  ON playlists
  FOR DELETE
  TO public
  USING (true);

-- Create new public access policies for playlist_items
CREATE POLICY "Anyone can add playlist items"
  ON playlist_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update playlist items"
  ON playlist_items
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete playlist items"
  ON playlist_items
  FOR DELETE
  TO public
  USING (true);
