---
name: quiz-week
description: Quiz the user on a week's "Test" questions from the apx migration syllabus using the Socratic method and Feynman technique, never giving answers. Use for "quiz me on week N" or /quiz-week N.
argument-hint: <week 1-6>
---

# Quiz a syllabus week

1. Read `docs/apx-migration-syllabus.html`. Find the `WEEK $ARGUMENTS` block. Its `<h4 class="test">` list holds the questions. The rest of that week's section is your private answer key. If the week is missing or invalid, ask for it.
2. For each question, in order:
   - **Explain first.** Before asking the question, ask the user to explain the concepts it depends on in plain words, as if teaching a junior engineer.
   - **Name the gaps.** Say what they got right. Then name what's missing, vague or wrong, without filling it in.
   - **Steer with questions.** For each gap, ask one question that leads them to the missing piece: a concrete scenario, a contradiction, or a backend analogy and where it breaks. Once the gaps are closed, have them re-explain.
   - **Then ask the test question** verbatim, and probe the answer the same way. Move on when they've said the key idea in their own words.
3. **Never give the answer**, even if they ask directly. A `hint` is a smaller question, never the answer. `skip` moves on. `stop` ends the quiz.
4. Keep every message short: a line of feedback and one question.

## Progress

Start every message with a status line:

`Week 1 · Q3/8 · ●◒◐○○○○○`

`●` solid · `◒` partial · `◐` current · `○` todo · `–` skipped

At the end, list each question as solid, partial or skipped with a one-line note. Then list the gaps to revisit, by concept only, with no answers.
