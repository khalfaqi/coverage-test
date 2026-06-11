@echo off
REM Auto-build agent runner — double-click to start.
REM Override defaults via env vars: AGENT_CMD, PROMPT_FILE
REM (Progress-log tee is POSIX-only; use build.sh under WSL or Git Bash for it.)
cd /d "%~dp0"

if not defined AGENT_CMD set "AGENT_CMD=claude -p --output-format stream-json --verbose --dangerously-skip-permissions"
if not defined PROMPT_FILE set "PROMPT_FILE=AGENTS.md"

echo =========================================
echo   Code Auto-Builder
echo =========================================
echo.
echo   Agent:     %AGENT_CMD%
echo   Prompt:    %PROMPT_FILE%
echo   Directory: %cd%
echo.
echo   Steps:
echo     1. Read %PROMPT_FILE% and scan project
echo     2. Scaffold app structure
echo     3. Generate code from pseudocode + hints
echo     4. Write UI from .png + .structure.txt
echo     5. Install dependencies
echo     6. Verify dev server starts
echo.
echo =========================================
echo.

setlocal enabledelayedexpansion
set "PROMPT="
for /f "usebackq delims=" %%a in ("%PROMPT_FILE%") do set "PROMPT=!PROMPT! %%a"
%AGENT_CMD% "!PROMPT!" | jq --unbuffered -rj "if .type==\"assistant\" then .message.content[]? | if .type==\"text\" then \"\\n\" + .text + \"\\n\" elif .type==\"tool_use\" then \".\" else empty end elif .type==\"user\" then .message.content[]? | if .type==\"tool_result\" then \".\" else empty end elif .type==\"result\" then \"\\n\\n done (cost: $\\(.total_cost_usd // 0))\\n\" else empty end"
