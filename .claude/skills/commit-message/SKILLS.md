---
name: commit-message
description: Writes a commit message. Use when the user asks to summarize all staged changes.
---

When writing a commit message:

1. Run `git diff --cached --stat` to understand the staged files at a glance.
2. Run `git diff --cached` to inspect the exact staged changes.
3. Summarize only staged changes. Do not include unstaged or untracked work unless the user explicitly asks for it.
4. Write a concise commit message using this format:

```text
<type>(<scope>): <short imperative summary>

<optional body explaining important context, grouped by change when useful>
```

5. Choose the most accurate type:

- `feat`: Adds or expands user-facing behavior
- `fix`: Corrects a bug or broken behavior
- `test`: Adds or updates tests only
- `docs`: Updates documentation only
- `style`: Changes formatting or visual styling without behavior changes
- `refactor`: Restructures code without changing behavior
- `chore`: Updates tooling, dependencies, configuration, or maintenance tasks

6. Add the most relevant scope for the commit.
7. Keep the subject line under 72 characters when possible.
8. Use imperative mood in the subject line, such as `fix date input validation`.
9. Add a body only when the staged changes need more detail than the subject can carry.
10. If there are no staged changes, say that clearly and do not invent a message.

When responding to the user, provide the commit message in a copy-ready code block and briefly mention that it was based on staged changes.
