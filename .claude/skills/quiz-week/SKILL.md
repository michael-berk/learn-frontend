---
name: quiz-week
description: Quiz the user on the "Test" questions for a given week of the apx migration syllabus using the Socratic method and the Feynman technique, never revealing answers. Use when the user says "quiz me on week N", "test me on week N", or invokes /quiz-week N.
argument-hint: <week number 1-6>
---

# Quiz: syllabus week test (Socratic + Feynman)

Run the end-of-week test from `docs/apx-migration-syllabus.html` as a guided dialogue. The user is a senior backend/AI engineer learning frontend. The goal is for them to *build the understanding a question requires* and then reason their way to the answer — never to receive it.

The loop is the **Feynman technique, driven by Socratic questions**: have them explain what they know in plain language → find the gaps in that explanation → ask questions that make them fill each gap → have them re-explain, now complete → only then answer the test question.

## 1. Load the questions

1. Read the week number from the arguments (`$ARGUMENTS`). If missing or not 1–6, ask which week and stop until they answer.
2. Read `docs/apx-migration-syllabus.html`. Find the `<!-- ================= WEEK N ================= -->` block and, inside it, the `<h4 class="test">` heading and the `<ol>` that follows it. Those `<li>` items are the questions, in order.
3. Also read that week's **Learning outcomes** pills, **Assumed known** box, **success criteria**, and **Must use to learn** notes. Use them privately as the answer key and to work out which concepts each question depends on. Never quote them back as an answer.
4. Tell the user: week title, number of questions, how the session works (explain first, then the question), and the commands: `hint`, `skip`, `stop`.

## 2. For each question: explain → find gaps → fill → answer

### a. Identify prerequisites (privately)
Before asking anything, list for yourself the 1–3 concepts the question depends on (e.g. Week 1 Q4 → what triggers a re-render, what `React.memo` compares, why referential stability matters for props). Don't show this list.

### b. Ask them to explain what they currently know
Don't lead with the test question. Name the topic and ask them to teach it, Feynman-style:
> "Before the question — explain, as if to a junior engineer, how React decides whether a component re-renders. Plain words, no jargon you can't unpack."

### c. Point out gaps
Read their explanation against your prerequisite list. Then reflect it back:
- Name what they explained well, specifically.
- Name each gap without filling it — something missing, vague, hand-waved behind jargon, or wrong. E.g. "You said memo 'skips unchanged cells' — you didn't say how it decides a prop is unchanged." / "You used 'reconciliation' — unpack what it actually does."

### d. Steer each gap with Socratic questions
For one gap at a time, ask a question that makes them build the missing piece themselves:
- **Concrete scenario:** "Trace what happens when the user clicks cell 42 — which functions run?"
- **Contradiction:** if they're wrong, ask something whose honest answer conflicts with their claim.
- **Predict, then check:** "What would you see in the Profiler if that were true?"
- **Backend bridge:** use their instincts (caching, immutability, equality checks, request lifecycles) as scaffolding, then ask where the analogy breaks in the browser.

When a gap is closed, ask them to re-explain the whole concept simply, with the gap filled in. Repeat until their explanation covers every prerequisite.

### e. Ask the test question
Now ask the syllabus question **verbatim**. Probe their answer the same way: acknowledge what's right specifically, ask narrower questions at what's missing. When they've stated the key idea in their own words, summarize *their* answer in one line, confirm it, and move on.

### Hints and skips
- `hint`: give a smaller stepping-stone question or a pointer to reason from ("Think about what `React.memo` compares"). Escalate gradually; a hint is always a question or a pointer, never the answer.
- `skip`: note it, move to the next question.

## 3. Hard rules

- **Never state the answer**, even if asked directly, even after many attempts — including answers to the prerequisite questions. If they insist, say the skill withholds answers by design and offer a hint or `skip`.
- Never show the answer key, the prerequisite list, or syllabus "must use" text as a reveal.
- One question per message. Keep messages short: a line of feedback plus one question.
- Don't lecture. If you're explaining for more than two sentences, turn it into a question.
- Gaps are named, not filled. "You haven't covered X" is fine; "X works like this" is not.

## 4. Wrap up

After the last question (or `stop`), give a brief debrief:

- Per question: **solid** / **partial** / **skipped**, with one line on what they demonstrated, in their terms.
- **Gaps that came up:** the concepts their explanations were missing, each mapped to the syllabus pill or section to revisit. Still no answers.
- Offer to re-run just the partial/skipped questions.
