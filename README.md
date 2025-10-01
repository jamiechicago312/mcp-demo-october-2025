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

---

## How to Run This Demo with OpenHands CLI

This repository contains a completed Context7 demo that you can run with OpenHands CLI to see the dependency upgrade fix in action.

### Prerequisites

1. **OpenHands CLI installed** with Context7 MCP server configured
2. **Node.js 18+** and npm installed on your system
3. **Git** available

### Quick Start

1. **Clone this repository:**
   ```bash
   git clone https://github.com/jamiechicago312/mcp-demo-october-2025.git
   cd mcp-demo-october-2025
   ```

2. **Switch to the demo branch:**
   ```bash
   git checkout context7-node-fetch-demo
   ```

3. **Run OpenHands CLI** and give it one of these prompts:

### Demo Prompts for OpenHands CLI

#### Option 1: Full Demo from Scratch
```
Please recreate the Context7 demo by following these steps:

1. Navigate to demos/context7-node-fetch and examine the current state
2. Reset to the baseline by checking out the first commit in that folder's history
3. Show me the working v2 baseline by running npm test
4. Upgrade node-fetch to latest and demonstrate the ESM break
5. Use Context7 to research the migration solution
6. Implement the fix and show tests passing again

This demonstrates how Context7 helps solve real dependency upgrade issues.
```

#### Option 2: Examine the Completed Demo
```
Please examine the completed Context7 demo in demos/context7-node-fetch:

1. Show me the final working code and explain the fix
2. Run the tests to demonstrate it works
3. Explain what Context7 research would have revealed about this node-fetch v2→v3 migration
4. Show me the git history to see the progression from working→broken→fixed

This shows the end result of using Context7 for dependency migration guidance.
```

#### Option 3: Test the Fix Manually
```
Please test the Context7 demo solution:

1. Go to demos/context7-node-fetch
2. Install dependencies with npm install
3. Run the tests with npm test
4. Explain how the dynamic import solution works
5. Show me what the error would look like if we reverted to the old require() approach

This validates that the Context7-guided fix actually works.
```

### What You'll See

When you run this demo, OpenHands will:

1. **Navigate to the demo folder** and examine the code structure
2. **Install Node.js dependencies** (node-fetch v3.x and related packages)
3. **Run the tests** showing the working solution
4. **Explain the fix** - how dynamic import() solves the ESM/CommonJS compatibility issue
5. **Demonstrate Context7's value** in researching migration patterns

### Expected Output

The demo should show:
- ✅ **Tests passing** with `npm test` → "PASS"
- 📁 **Clean project structure** with package.json, index.js, test.js
- 🔧 **Working fix** using `await import('node-fetch')` instead of `require()`
- 📚 **Context7 research** explaining the node-fetch v2→v3 ESM migration

### Troubleshooting

If you encounter issues:

1. **Node.js version**: Ensure you have Node.js 18+ installed
2. **Dependencies**: Run `npm install` in the demos/context7-node-fetch folder
3. **Branch**: Make sure you're on the `context7-node-fetch-demo` branch
4. **Context7**: Ensure your OpenHands CLI has Context7 MCP server configured

### Demo Variations

You can also ask OpenHands to:
- **Compare approaches**: Show the difference between the dynamic import fix vs converting to full ESM
- **Explain alternatives**: Research other solutions like using node-fetch v2 or switching to native fetch
- **Show the break**: Temporarily revert to `require()` to demonstrate the ERR_REQUIRE_ESM error
- **Extend the demo**: Add more complex fetch usage patterns

This demo showcases how Context7 enables OpenHands to quickly research and implement solutions for real-world dependency upgrade challenges.
