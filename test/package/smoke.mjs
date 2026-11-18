// Package smoke test.
// Packs the real tarball, installs it into a throwaway project and uses it
// the way users do: require, import and TypeScript.
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const work = mkdtempSync(join(tmpdir(), 'pkc-smoke-'));
const run = (cmd, cwd = work) => execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' });
const tsc = join(root, 'node_modules', 'typescript', 'bin', 'tsc');

try {
  // 1. Pack exactly what npm would publish.
  const [{ filename }] = JSON.parse(
    run(`npm pack --json --ignore-scripts --pack-destination "${work}"`, root),
  );

  // 2. A fresh "user" project with the tarball installed.
  cpSync(join(import.meta.dirname, 'fixture'), work, { recursive: true });
  writeFileSync(join(work, 'package.json'), JSON.stringify({ name: 'smoke-user', private: true }));
  run(`npm install "./${filename}" --no-audit --no-fund`);

  // 3. Use it like real users.
  run('node use.cjs');
  console.log('ok  require (CommonJS)');
  run('node use.mjs');
  console.log('ok  import (ESM)');
  run(`node "${tsc}" --noEmit --strict --module nodenext --moduleResolution nodenext use-esm.mts use-cjs.cts`);
  console.log('ok  TypeScript types (ESM + CommonJS)');

  console.log(`\nSmoke test passed for ${filename}`);
} catch (err) {
  console.error('Smoke test FAILED\n');
  console.error(err.stdout || '', err.stderr || err.message);
  process.exitCode = 1;
} finally {
  rmSync(work, { recursive: true, force: true });
}
