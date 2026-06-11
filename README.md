# Build app

Three ways to build `/app/` from this bundle:

1. **In Antigravity / Cursor / VS Code:** open this folder → Command Palette → `Tasks: Run Task` → `Build App`.
2. **Double-click `build.sh`** (POSIX) or **`build.bat`** (Windows). Defaults to Claude Code.
3. **Swap providers:** `AGENT_CMD="gemini -p" ./build.sh`. See the header of `build.sh` for all env-var knobs (`AGENT_CMD`, `PROMPT_FILE`, `PROGRESS_LOG`).

## What's in here

- `AGENTS.md` — thin orchestrator. Sequences the five stage prompts.
- `tech-stack.md` — runtime, language, frameworks, project layout, install/dev commands, verification gate. Override per-request via the `tech_stack` field on the artifact API.
- `prompts/01-…05-…md` — staged build instructions, each with its own success criterion.
- `pseudocode/` `summary/` `assets/` `reference_code/` — the inputs the stages read.
- `tests/` — runnable scenarios.
- `.vscode/tasks.json` — `Build App` Command Palette entry.
- `.devcontainer/devcontainer.json` — Codespaces / VS Code dev container for the bundle itself.

## Logs

`build.sh` tees the raw NDJSON event stream to `.build/progress.log` while rendering pretty dots/text on stdout. Tail it from another terminal or an IDE panel for structured progress.
# coverage-test
