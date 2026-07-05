# Target State Gap Analysis

Status: v0.1 implementation scorecard
Date: 2026-07-05
Owner: Weiyu Dang

This document turns the Personal OS blueprint into an implementation scorecard.
It should be used before opening a redesign slice, during Claude review, and
before merge/deploy.

The current site is no longer missing the main map. The gap has shifted from
route coverage to system depth: the site must feel like a living Personal OS,
not a collection of finished pages.

## Target State

`weiyudang.com` should become:

```text
public personal research studio
+ Doraemon as the entrance personality
+ native Doraemon Office dashboard
+ MiniDora team presence
+ owner-only cockpit
+ research-only trading console
```

The public visitor should understand the system quickly. The owner should have
a private working surface. The public/private boundary should be visible,
consistent, and technically enforced.

## Current Maturity Snapshot

| Layer | Current maturity | Evidence | Main gap |
| --- | ---: | --- | --- |
| Public identity | 70% | Public routes exist for Home, About, Projects, Lab, Journal, and Contact. Public i18n and content checks exist. | The site needs a stronger Apple-like first impression, clearer narrative continuity, and deeper bilingual content modeling. |
| Doraemon entry | 75% | `/dora` has a doorway hero, office CTA, MiniDora preview, activity strip, and safety boundary. | The first viewport must feel more like a premium command-room entrance and less like a sectioned explainer. |
| Doraemon Office | 60% | Native `/dora/*` routes exist for Office, Activity, Team, Tasks, Schedules, Knowledge, and System. | Pages need a shared live/demo/stale data spine, richer degraded states, and less bridge-like product feel. |
| Owner Cockpit | 45% | `/app/*` routes and auth gate exist. | It needs a daily work loop: Today -> Review -> Command -> Schedules -> Knowledge -> System Health. |
| Trading Team | 60% | Research-only boundary and private trading route exist. | It needs evidence packets, gates, replay, source health, desk disagreement, and clearer public methodology. |
| Public/private boundary | 80% | Public relay hardening and public Doraemon checks exist. | Native routes need continuous leak probes, bundle grep, and contract-level tests. |
| Design system | 60% | Warm Personal OS + Doraemon Office direction is present. | The site needs stronger shared tokens, motion rules, asset strategy, and reusable premium components. |

## Strategic Gaps

### 1. Living Data Spine

The native Doraemon Office and Owner Cockpit pages need a shared state model for:

- live public relay
- demo fallback
- stale or degraded source state
- empty safe state
- public-safe event projection
- private authenticated summaries

Success means every dashboard page can explain what it knows, what is missing,
and what remains private without inventing internal detail.

### 2. Daily Owner Usefulness

Owner Cockpit should become useful for daily work, not only a private mirror of
public concepts.

Target loop:

```text
Today
-> Review Queue
-> Command context
-> Agent status
-> Schedules
-> Knowledge
-> System Health
```

No write or execution path should appear until audited command APIs exist.

### 3. Premium Public First Impression

The homepage and `/dora` need to act as the public front door for the whole
system. The target visual language is:

- Apple-like clarity and polish
- warm white space
- precise Doraemon blue
- living but restrained motion
- one strong first-viewport product signal
- no generic SaaS clutter

The first screen should make the Personal OS and Doraemon Office feel real
before the visitor reads detailed sections.

### 4. Bilingual Content Model

The current i18n system covers many public UI strings. The target is content
level bilingual support:

- project summaries
- research notes
- journal metadata
- Doraemon Office labels
- MiniDora role descriptions
- public safety copy
- SEO metadata

DOM translation can remain a bridge, but durable content should be modeled
explicitly.

### 5. Native Doraemon Office Depth

`/dora/*` should increasingly replace bridge-like behavior with native product
surfaces:

- Office Live as the command-room stage
- Activity as the full event ledger
- Team Agents as the MiniDora roster and history
- Tasks as public-safe run/task posture
- Schedules as coarse public rhythm
- Knowledge as curated synthesis
- System as public-safe readiness

All pages must remain read-only and sanitized.

### 6. Research-Only Trading Console

Trading Team should feel like an evidence-first research desk, never a broker
terminal. The gap is not visual density alone; it is the evidence chain:

- signal origin
- source health
- desk disagreement
- missing evidence
- owner review gate
- replay
- public methodology

The fixed boundary remains:

```text
Research-only. Not an order, recommendation, or execution system.
```

## Slice Priority

1. Public first impression: homepage and `/dora` premium visual/narrative pass.
2. Native Doraemon Office depth: shared route language, live/demo/degraded states.
3. Owner daily loop: Today, Review, Command, Schedules, Knowledge, System.
4. Trading research evidence: packets, gates, replay, source health.
5. Hardening: leak probes, bundle grep, i18n guard, private auth checks.

## Acceptance Questions

Use these before calling a slice complete:

- Does this make the Personal OS target state more true?
- Can a new visitor understand the public/private boundary without reading docs?
- Does Doraemon feel like an entrance personality, not decoration?
- Does the UI show state, evidence, or rhythm instead of generic claims?
- Are private tasks, prompts, accounts, paths, orders, and credentials absent
  from public UI and bundle output?
- Does the slice work in English and Chinese?
- Was the slice locally verified and reviewed by Claude Opus 4.8 Max before PR?

