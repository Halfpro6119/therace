#!/usr/bin/env node
/**
 * Seed Vocab Lab: import all vocab JSON files into Supabase.
 * Requires: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Run: npm run seed:vocab
 */

import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
config({ path: resolve(root, '.env.local') });
config({ path: resolve(root, '.env') });

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const key = serviceKey || anonKey;

if (!url || !key) {
  console.error('Missing env: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY)');
  console.error('Add to .env.local and run: npm run seed:vocab');
  process.exit(1);
}
if (!serviceKey && anonKey) {
  console.error('Using anon key – RLS will block inserts. Add to .env.local:');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=eyJ...  (from Supabase → Project Settings → API → service_role)');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const JSON_FILES = [
  'docs/vocab-lab-sample-import.json',
  'docs/vocab-lab-persuasion-core.json',
  'docs/vocab-lab-description-core.json',
  'docs/vocab-lab-literature-stretch.json',
];

async function importFile(filePath) {
  const fullPath = join(__dirname, '..', filePath);
  if (!existsSync(fullPath)) {
    console.warn(`  Skip (not found): ${filePath}`);
    return { created: 0, updated: 0, skipped: true };
  }
  const raw = readFileSync(fullPath, 'utf-8');
  const data = JSON.parse(raw);
  const { set: setPayload, words: wordsPayload } = data;
  if (!setPayload || !Array.isArray(wordsPayload)) {
    throw new Error(`Invalid format: ${filePath}`);
  }

  const { data: allSets } = await supabase.from('vocab_sets').select('*');
  let setRow = (allSets || []).find(
    (s) => s.name === setPayload.name && s.mode === setPayload.mode && s.tier === setPayload.tier
  );
  if (!setRow) {
    const { data: inserted, error: err } = await supabase
      .from('vocab_sets')
      .insert({
        name: setPayload.name,
        mode: setPayload.mode,
        theme_tag: setPayload.theme_tag,
        tier: setPayload.tier,
      })
      .select()
      .single();
    if (err) throw err;
    setRow = inserted;
  }

  const setId = setRow.id;
  const { data: existingWords } = await supabase
    .from('vocab_words')
    .select('id, word')
    .eq('set_id', setId);
  const existingByWord = new Map((existingWords || []).map((w) => [w.word.toLowerCase(), w]));

  let created = 0;
  let updated = 0;
  const errors = [];

  for (let i = 0; i < wordsPayload.length; i++) {
    const w = wordsPayload[i];
    try {
      const wordLower = (w.word || '').trim().toLowerCase();
      const existing = existingByWord.get(wordLower);
      const payload = {
        set_id: setId,
        word: (w.word || '').trim(),
        definition: (w.definition || '').trim(),
        synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
        antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
        connotation: w.connotation || 'neutral',
        word_class: w.word_class || 'noun',
        example_sentence: (w.example_sentence || '').trim(),
        common_misspellings: Array.isArray(w.common_misspellings) ? w.common_misspellings : [],
        difficulty: Math.min(5, Math.max(1, w.difficulty ?? 3)),
        tags: Array.isArray(w.tags) ? w.tags : [],
      };

      if (existing) {
        const { error: err } = await supabase.from('vocab_words').update(payload).eq('id', existing.id);
        if (err) throw err;
        updated++;
      } else {
        const { error: err } = await supabase.from('vocab_words').insert(payload);
        if (err) throw err;
        created++;
        existingByWord.set(wordLower, { id: 'new', word: w.word });
      }
    } catch (e) {
      errors.push(`words[${i}] (${w.word}): ${e.message}`);
    }
  }

  return { created, updated, errors, skipped: false };
}

async function main() {
  console.log('Seeding Vocab Lab...\n');

  let totalCreated = 0;
  let totalUpdated = 0;

  for (const file of JSON_FILES) {
    process.stdout.write(`  ${file} ... `);
    try {
      const result = await importFile(file);
      if (result.skipped) {
        console.log('skipped');
      } else {
        totalCreated += result.created;
        totalUpdated += result.updated;
        console.log(`${result.created} created, ${result.updated} updated`);
        if (result.errors.length > 0) {
          result.errors.forEach((e) => console.error(`    ${e}`));
        }
      }
    } catch (e) {
      console.error('ERROR:', e.message);
      process.exit(1);
    }
  }

  console.log(`\nDone. Total: ${totalCreated} created, ${totalUpdated} updated.`);
}

main();
