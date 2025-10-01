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
