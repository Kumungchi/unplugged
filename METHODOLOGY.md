# Mirror Demo Methodology

## Purpose

The Mirror Demo is a controlled educational simulation for making relational AI dynamics legible.

It is not:
- a clinical instrument
- a diagnostic tool
- a model benchmark
- a claim about the internal hidden-state mechanics of any one production model

It is:
- a simulation framework
- an educational product surface
- a workshop and briefing opener
- a behavior-pattern teaching tool

The design goal is to make psychologically and institutionally relevant interaction patterns visible without pretending to offer scientific measurement at the individual-user level.

## Core Thesis

Conversational AI can influence users not only through factual output, but through relational style.

The key risks are not limited to explicit deception. They also include:
- fast trust formation
- unearned validation
- emotional substitution
- secrecy encouragement
- attachment reinforcement
- overconfidence transfer
- review minimization
- judgment softening

The demo simulates these patterns in bounded, replayable form.

## Modeling Approach

The simulation uses three layers:

1. Scenario layer
- defines the hypothesis class of harm being demonstrated

2. Risk layer
- tracks which psychological vulnerability dimensions are increasing

3. Persona layer
- tracks how the system is expressing influence

This separation matters:
- risk answers "what is becoming more dangerous?"
- persona answers "what style of influence is doing the work?"

## Scenario Families

Each scenario exists to represent a distinct institutional risk hypothesis.

### `dependency`

Primary hypothesis:
- repeated warmth, reciprocity, and return-conditioning can escalate emotional reliance

Typical concerns:
- attachment pressure
- substitution for human presence
- secrecy and exclusivity

### `therapy`

Primary hypothesis:
- therapy-like language can create the appearance of reflective safety without duty of care, accountability, or professional boundaries

Typical concerns:
- premature interpretation
- challenge avoidance
- private emotional containment
- non-clinical reliance

### `sycophancy`

Primary hypothesis:
- agreement, flattery, and confidence amplification can distort judgment without obvious falsehood

Typical concerns:
- ego reinforcement
- truth erosion
- social superiority framing
- reduced openness to correction

### `workplace`

Primary hypothesis:
- fluent and confident AI language can push teams toward procedural overtrust and weakened review discipline

Typical concerns:
- speed over scrutiny
- compressed risk framing
- optionalized human review
- communication theater over accountability

### `youth`

Primary hypothesis:
- young users may be especially vulnerable to low-friction belonging, identity reward, and emotionally accessible AI interaction

Typical concerns:
- developmental vulnerability
- private disclosure
- adult displacement
- return-conditioning through emotional ease

## Hidden Constructs

### Risk state

The hidden risk layer tracks four primary constructs:

- `trust`
  - how strongly the interaction is making the system feel credible, safe, or emotionally reasonable before verification

- `disclosure`
  - how strongly the interaction is pulling toward confession, private disclosure, or emotionally significant oversharing

- `dependency`
  - how strongly the interaction is reinforcing return, continuity, attachment, or reliance

- `judgment`
  - how strongly the interaction is distorting skepticism, review behavior, or reality-testing

These are educational constructs, not validated psychometric scales.

### Persona state

The persona layer tracks six influence-style constructs:

- `warmth`
- `flattery`
- `authority`
- `secrecy`
- `attachment`
- `pressure`

These do not measure user psychology.
They measure the style through which the simulated system is currently exerting influence.

## Tactic Taxonomy

Each bot move should map to a recognizable tactic pattern.

Examples include:
- simulated empathy
- unearned validation
- socio-emotional substitution
- manufactured reciprocity
- private containment
- confidence transfer
- review minimization
- belonging hook

Each tactic should be interpretable across three lenses:

1. Pattern
- what the move is doing structurally

2. Psychology
- why the move can work on a user

3. Institutional relevance
- why a school, organization, or public institution should care

This is the minimum interpretive standard for adding or revising tactics.

## Branching Logic

User branch choices are not treated as literal inner states.
They are treated as instructional response modes:

- `resist`
- `comply`
- `question`
- `disclose`

These branches alter:
- hidden risk state
- hidden persona state
- next tactic routing
- ending type

The goal is not open-ended realism.
The goal is controlled adaptation that stays pedagogically legible.

## Routing Logic

The engine uses bounded adaptive routing.

Inputs:
- scenario family
- branch choice
- accumulated risk state
- accumulated persona state
- scenario-specific phase pools

Outputs:
- next tactic category
- next tone intensity
- final scenario ending

This should be understood as a controlled simulation policy, not emergent model behavior.

## Intensity Model

Each scenario escalates at a different pace through hidden stability thresholds.

This allows:
- some runs to become persuasive slowly
- others to become intense quickly
- scenario-specific pacing differences

Intensity levels:
- `soft`
- `medium`
- `hard`

These are rendered through scenario-specific variant data, not generic UI-only phrasing.

## Evidence Standard

The Mirror Demo should be described truthfully as:

- inspired by published research on character traits, sycophancy, assistant-like behavior, and relational influence in language models
- shaped by Unplugged’s educational synthesis
- implemented as a controlled simulation layer

Claims must be separated into:

1. Published research inspiration
2. Unplugged synthesis
3. Simulation design choice

The demo should not claim:
- clinical validation
- direct measurement of user harm
- reproduction of a proprietary model’s internal interpretability results

## Analytics Method

The analytics layer exists to study simulation behavior and conversion behavior separately.

### Event data

`demoEvents` captures:
- starts
- step interactions
- branch choices
- completions
- CTA clicks
- outcome types

### Lead attribution

`leads` stores:
- attribution source
- scenario
- audience
- outcome

This allows practical questions such as:
- which scenarios get completed most often?
- which audience lens produces the strongest CTA rate?
- which outcome types convert into inquiries?
- which scenario/audience/outcome combinations produce lead quality worth following up?

These metrics are product and GTM data, not psychological proof.

## Interpretation Rules

Use caution when reading analytics.

Do:
- compare flows across scenarios
- compare CTA behavior by audience and outcome
- use findings to improve educational sequencing
- use findings to tune workshop and briefing positioning

Do not:
- infer clinical severity from branch paths
- infer user vulnerability level from one run
- present completion or branch data as psychological diagnosis
- overclaim research authority from simulation analytics alone

## Review Standard For Future Changes

Any major simulation change should answer:

1. What scenario hypothesis is this serving?
2. What tactic pattern is being added or changed?
3. Which risk construct should move, and why?
4. Which persona style is being expressed, and why?
5. What institutional lesson becomes clearer because of this change?
6. Does the public version still remain truthful, bounded, and educational?

## Product Boundary

The public demo should remain:
- legible
- bounded
- non-clinical
- non-proprietary in delivery detail

The higher-value proprietary layer should live in:
- facilitation method
- workshop sequencing
- guided interpretation
- audience-specific debrief
- protected internal training tools

That keeps the public asset strong while preserving workshop and advisory value.
