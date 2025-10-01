Here’s a ready-to-use demo plan you can hand to OpenHands later.

Title: Context7 Demo: Fixing a dependency upgrade break (node-fetch v2 → v3 ESM)

Overview
- What you’ll show: old dependency works; upgrade breaks; OpenHands uses Context7 to find the latest docs and migration guidance; OpenHands implements the fix; tests pass again.
- Dependency chosen: node-fetch (v3 became ESM-only; CommonJS require breaks).
- Duration: ~10 minutes end-to-end
- Why this demo: extremely common ecosystem break, tiny codebase, fast installs.

Prerequisites
- Node.js 18+ and npm installed
- Git available
- OpenHands connected to Context7 MCP server
- Do not push to any remote unless explicitly asked

Repository location
- Create the demo inside demos/context7-node-fetch (or any path you prefer inside your repo)

Script for OpenHands to follow

1) Initialize the demo (working baseline on node-fetch v2)
- Create folder and initialize git:
  - mkdir -p demos/context7-node-fetch
  - cd demos/context7-node-fetch
  - git init
- Create .gitignore:
  - Contents:
    node_modules/
    .DS_Store
    npm-debug.log*
- Create package.json:
  - Contents:
    {
      "name": "context7-demo-node-fetch",
      "version": "1.0.0",
      "type": "commonjs",
      "scripts": { "test": "node test.js" },
      "dependencies": { "node-fetch": "2.6.9" }
    }
- Create index.js (CommonJS, works with v2):
  const fetch = require('node-fetch');

  async function getStatus(url) {
    const res = await fetch(url);
    return res.status;
  }

  module.exports = { getStatus };
- Create test.js:
  const { getStatus } = require('./index');

  (async () => {
    const status = await getStatus('https://example.com');
    if (status !== 200) {
      console.error('Expected 200, got', status);
      process.exit(1);
    }
    console.log('PASS');
  })();
- Install and test:
  - npm install
  - npm test  # Expect PASS
- Commit:
  - git add -A
  - git commit -m "feat: initial working code on node-fetch v2" -m "Co-authored-by: openhands <openhands@all-hands.dev>"

2) Upgrade dependency to latest and capture the break
- Upgrade:
  - npm install node-fetch@latest
- Test:
  - npm test
  - Expect failure with ERR_REQUIRE_ESM (require() of ESM module)
- Commit the breaking state (optional but useful for the narrative):
  - git add -A
  - git commit -m "chore: upgrade node-fetch to latest (expected break due to ESM-only)" -m "Co-authored-by: openhands <openhands@all-hands.dev>"

3) Use Context7 to research the break and the fix
Ask Context7 these prompts:
- What’s the latest version of node-fetch on npm? Summarize the breaking changes from v2.x to v3.x, especially the ESM-only change. Link to the official README or migration notes.
- Show the minimal migration for CommonJS code that used require('node-fetch') in v2.x to work with v3.x without converting the whole project to ESM. Provide a short code snippet.
- Provide a one-file patch (index.js) to switch to a dynamic import approach that’s compatible with CommonJS.

Expected Context7 guidance (summary)
- node-fetch v3 is ESM-only; require('node-fetch') fails with ERR_REQUIRE_ESM
- Two options:
  1) Switch the project to ESM ("type": "module" and use import)
  2) Keep CommonJS and use dynamic import() to load node-fetch v3 at runtime
- Minimal patch is to use dynamic import inside the function

4) Implement the minimal fix and validate
- Edit index.js to use dynamic import:
  async function getStatus(url) {
    const { default: fetch } = await import('node-fetch');
    const res = await fetch(url);
    return res.status;
  }

  module.exports = { getStatus };
- Run tests:
  - npm test  # Expect PASS
- Commit:
  - git add -A
  - git commit -m "fix: support node-fetch v3 ESM in CommonJS via dynamic import" -m "Co-authored-by: openhands <openhands@all-hands.dev>"

Optional: Provide a PR description template
- Title: Fix break after upgrading node-fetch to v3 (ESM-only)
- Summary:
  - Upgraded node-fetch from 2.6.9 to latest (v3.x), which is ESM-only
  - CommonJS require broke with ERR_REQUIRE_ESM
  - Applied minimal fix using dynamic import() to preserve CommonJS project setup
- Migration notes/links:
  - Link to node-fetch README / migration notes (from Context7)
- Testing:
  - npm test passes locally

Time breakdown (approx.)
- Setup and initial PASS: 3–4 min
- Upgrade and break: 1–2 min
- Context7 research + patch: 2–3 min
- Implement fix + PASS: 1–2 min
- Total: ~8–10 min

What this demonstrates
- A realistic dependency upgrade break (CommonJS vs ESM)
- How Context7 quickly locates the authoritative docs and migration pattern
- OpenHands implementing the smallest viable change to restore functionality

If you’d like a Python alternative later
- pandas 1.5.3 → 2.x (DataFrame.append removed)
- Replace df.append(...) with pd.concat([df, pd.DataFrame([row])], ignore_index=True)
- Very similar flow; also fits in ~10 minutes

Let me know if you want me to adapt this plan for a different stack or integrate it with your existing repo structure.
