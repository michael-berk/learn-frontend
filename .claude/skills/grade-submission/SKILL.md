---
name: grade-submission
description: Grade the user's code for a syllabus week against that week's success criteria, must-use items, and TS challenge, listing gaps without giving fixes. Use for "grade week N" or /grade-submission N.
argument-hint: <week 1-6>
---

# Grade a week's submission

1. Read `docs/apx-migration-syllabus.html`. Find the `WEEK $ARGUMENTS` block and collect its checklist: every **success criteria** bullet, every item in **Must use to learn**, and the **TS challenge**. If the week is missing or invalid, ask for it.
2. Find the submission folder for that week, such as `week-1/`, `week1/` or `w1/`. If you can't find one, or more than one matches, ask the user for the path.
3. Read the code, then grade each checklist item:
   - `✓ met`: cite `file:line` as evidence.
   - `◒ partial`: say what's there and what's missing.
   - `✗ missing`: say nothing was found.
   - `? runtime`: the item can only be confirmed by running the app, such as "proven in the Profiler" or "feels instant". Say what the user should check.
4. **List gaps only. Don't give fixes, code or hints about the solution.** Name what the criterion requires that the code doesn't do. Don't say how to do it.

## Output

```
Week 1 — Generalized Tic-Tac-Toe            5/12 met

Success criteria
 ✓  Board size and K are parameters          src/Board.tsx:12
 ◒  Win check independent of N               scans full row, not from last move
 ?  Only changed cells re-render              confirm in React Profiler

Must use
 ✗  shadcn Dialog for win banner             not found
 ...

TS challenge
 ◒  Result as discriminated union             no 'draw' variant
```

End with the list of open gaps, one line each.
