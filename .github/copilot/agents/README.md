# 🤖 AI Agent Pipeline for genai-saas

This folder contains 5 custom GitHub Copilot agents that form an end-to-end
feature development pipeline — from raw idea to tested, PR-ready code.

## Pipeline flow

```
Your raw idea
    │
    ▼
[Agent 1] prompt-refiner
    Cleans up your rough description into a structured feature request
    │
    ▼
[Agent 2] task-planner
    Produces a file-level development plan (no code yet)
    │
    ▼
[Agent 3] code-generator
    Writes the actual code following existing codebase patterns
    │
    ▼
[Agent 4] ai-integration-advisor
    Reviews for token waste, missing limits, expensive model usage
    │
    ▼
[Agent 5] test-and-pr-generator
    Writes Vitest tests + PR description
```

## How to use in VS Code + GitHub Copilot

1. Open GitHub Copilot Chat (Ctrl+Shift+I)
2. Type `@prompt-refiner` and paste your rough idea
3. Copy the output, type `@task-planner` and paste it
4. Copy the plan, type `@code-generator` and paste it
5. Copy the code, type `@ai-integration-advisor` and paste it
6. Copy everything, type `@test-and-pr-generator` and paste it

## Where to place these files

```
genai-saas/
└── .github/
    └── copilot/
        └── agents/
            ├── agent1-prompt-refiner.md
            ├── agent2-task-planner.md
            ├── agent3-code-generator.md
            ├── agent4-ai-integration-advisor.md
            └── agent5-test-and-pr-generator.md
```

## What to say in your resume / interviews

**Project bullet points:**
- Built a production GenAI SaaS with RAG pipeline (PDF → LangChain chunking →
  OpenAI embeddings → Supabase vector store → GPT-4 contextual answers)
- Implemented an AI agent pipeline using GitHub Copilot custom agents to automate
  feature development from raw description to tested, PR-ready code
- Integrated DALL·E image generation, resume ATS analyzer, and Stripe payment plans
  with usage-limit enforcement and GitHub Actions daily reset cron
- Designed token-efficient OpenAI integration keeping cost under $0.001 per user action

**If asked about agents in an interview:**
"I built a 5-agent pipeline in GitHub Copilot where Agent 1 refines raw feature
descriptions into structured prompts, Agent 2 creates a file-level dev plan,
Agent 3 generates code matching the existing codebase patterns, Agent 4 reviews
for token efficiency and missing usage limits, and Agent 5 writes tests and
the PR description. Each agent has a focused responsibility and passes its output
to the next — similar to how a real team would work."
