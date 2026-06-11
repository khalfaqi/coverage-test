#!/usr/bin/env bash
# Auto-build agent runner — double-click or run: ./build.sh
#
# Override defaults via env vars:
#   AGENT_CMD="..."     # the agent CLI invocation (default: Claude with stream-json flags)
#   PROMPT_FILE="..."   # path to the prompt/contract file (default: AGENTS.md)
#   PROGRESS_LOG="..."  # raw NDJSON event log (default: .build/progress.log)
#
# The default jq renderer assumes Claude Code's `--output-format stream-json`
# schema. If you swap AGENT_CMD to a non-Claude provider, the rendered stdout
# will likely be empty — read PROGRESS_LOG for the raw event stream instead.

set -euo pipefail
cd "$(dirname "$0")"

AGENT_CMD="${AGENT_CMD:-claude -p --output-format stream-json --verbose --dangerously-skip-permissions}"
PROMPT_FILE="${PROMPT_FILE:-AGENTS.md}"
PROGRESS_LOG="${PROGRESS_LOG:-.build/progress.log}"
MODEL="${CLAUDE_MODEL:-sonnet}"

mkdir -p "$(dirname "$PROGRESS_LOG")"

echo "========================================="
echo "  Code Auto-Builder - ver 0.10"
echo "========================================="
echo ""
echo "  Agent:   $AGENT_CMD"
echo "  Prompt:  $PROMPT_FILE"
echo "  Log:     $PROGRESS_LOG"
echo ""
echo "  Steps:"
echo "    1. Read $PROMPT_FILE and scan project"
echo "    2. Scaffold app structure"
echo "    3. Generate code from pseudocode + hints"
echo "    4. Write UI from .png + .structure.txt"
echo "    5. Install dependencies"
echo "    6. Verify dev server starts"
echo ""
echo "========================================="
echo "Starting analysis"

$AGENT_CMD "$(cat "$PROMPT_FILE")" \
  | tee "$PROGRESS_LOG" \
  | jq --unbuffered -j '
      if .type=="assistant" then
        .message.content[]? |
        if .type=="text" then "\n" + .text + "\n"
        elif .type=="tool_use" then "."
        else empty end
      elif .type=="user" then
        .message.content[]? |
        if .type=="tool_result" then "."
        else empty end
      elif .type=="result" then
        "\n✅ done (cost: $\(.total_cost_usd // 0), tokens: in=\(.usage.input_tokens // 0) out=\(.usage.output_tokens // 0) total=\((.usage.input_tokens // 0) + (.usage.output_tokens // 0)))\n"
      else empty end
    '
