---
title: "Why IAM Is the Hardest Part of Cloud (And How We Can Fix It)"
date: 2026-02-08
draft: false
description: "IAM is the single biggest source of friction in cloud adoption. After years of building identity systems at scale, here's what I think we're getting wrong — and a path forward."
tags: ["iam", "cloud-security", "developer-experience", "aws"]
categories: ["Cloud Security"]
author: "Punit Deotale"
---

There's a moment every developer hits when they're building on the cloud for the first time. They've picked their compute, set up their database, maybe even deployed a working prototype. Then they try to connect two services together and run headfirst into IAM.

And everything stops.

Suddenly they're reading about policies, principals, trust relationships, session tokens, and permission boundaries. The error messages are cryptic. The documentation is dense. They copy-paste a wildcard policy from Stack Overflow, tell themselves they'll fix it later, and move on.

They never fix it later.

I've spent years working on identity and access management at AWS — leading teams, making product and security decisions, and shipping features that affect how millions of developers interact with cloud security. I believe this is the single most important unsolved problem in cloud computing. Not because IAM is fundamentally broken — it's actually quite powerful — but because we've designed it for security engineers instead of the developers who actually have to use it every day.

## The developer experience gap

Cloud platforms have invested heavily in making compute, storage, and networking intuitive. Spinning up a server takes minutes. Deploying a container is a few clicks. But granting that container the right permissions to talk to a database? That still requires understanding a mental model that most developers never signed up to learn.

The core issue isn't complexity — it's that the complexity is front-loaded. A developer shouldn't need to understand the full IAM policy evaluation logic before they can ship their first feature. But right now, that's often exactly what happens.

This creates a predictable failure pattern: developers either over-permission everything (security risk) or under-permission and spend hours debugging access denied errors (productivity killer). Neither outcome is acceptable, and both are symptoms of the same root cause: we've made the secure path harder than the insecure path.

## What "developer-first security" actually means

I think about this problem through a lens I call "developer-first security." It's a simple principle: **the easiest thing to do should also be the secure thing to do.**

This isn't about dumbing down IAM or hiding complexity. Security teams still need fine-grained controls. Compliance requirements aren't going away. The goal is to design systems where developers naturally fall into secure patterns without needing to become security experts first.

What does this look like in practice? A few principles I've found effective:

**Start with zero, not everything.** Most developers don't know what permissions they need upfront. Instead of asking them to write a policy from scratch, observe what their application actually does and generate the minimum permissions needed. Shift from "declare what you need" to "we'll figure it out together."

**Make the feedback loop instant.** When a developer gets an access denied error, they shouldn't have to dig through CloudTrail logs, cross-reference policy documents, and file a ticket. They should know immediately: what was denied, why, and exactly what to change. Fast feedback loops are what turn frustrating security systems into educational ones.

**Remove unused access automatically.** Permissions accumulate like technical debt. That admin policy someone granted during a debugging session six months ago? It's still there. Rather than relying on periodic access reviews (which nobody enjoys), build systems that detect and remove unused access continuously. Make least privilege the default state, not a goal to aspire to.

**Make the right thing easy.** If the recommended way to set up cross-service communication requires 47 lines of JSON, developers will find a shortcut. Instead, provide high-level abstractions — "this service needs to read from that bucket" — and generate the underlying policy. Meet developers where they are.

## Why this is harder than it sounds

If the solution were obvious, someone would have built it already. There are real technical challenges:

**The permissions space is enormous.** Major cloud platforms have thousands of distinct actions across hundreds of services. The combinatorial space of possible policies is effectively infinite. Reasoning about what a given identity can and cannot do requires evaluating multiple layers of policies, boundaries, and conditions.

**Context matters more than you'd think.** The right permission depends on the environment (dev vs. production), the data sensitivity, the compliance regime, the organizational structure, and a dozen other factors. A policy that's perfectly fine in a development account could be a serious risk in production.

**Backward compatibility is non-negotiable.** You can't just redesign IAM from scratch when millions of workloads depend on the current model. Any improvement has to be additive and non-breaking. This constrains the design space significantly.

**Security and usability genuinely trade off — sometimes.** There are cases where the most secure option is also the most inconvenient, and you have to make a judgment call about where to draw the line. Pretending this tension doesn't exist leads to bad designs.

## What the industry should be building toward

Despite these challenges, I'm optimistic. I believe the following principles should guide how we design the next generation of IAM systems — and some of this thinking is already showing up across the industry:

**Smart defaults over blank slates.** Asking a developer to write a policy from scratch is like asking them to write a Dockerfile without a base image. Infrastructure-as-code templates already describe the relationships between services. That's enough information to infer a reasonable starting policy. The industry should be investing in systems that meet developers with sensible defaults instead of empty text boxes.

**Continuous right-sizing as a design principle.** The idea that you get permissions right once at deploy time and hope for the best has always been a fiction. What actually works is observing real usage patterns over time and tightening permissions accordingly. This is a well-understood concept — the industry term is "least privilege" — but the gap has always been in tooling that does it automatically and continuously rather than through painful quarterly access reviews.

**Permissions as code, not configuration.** When permissions live in a separate console from the application code, they inevitably drift. Treating access policies as first-class artifacts in your codebase — version controlled, code-reviewed, tested — is the direction most mature organizations are moving. It's not a new idea, but adoption is still early.

**Ephemeral credentials by default.** Long-lived access keys are one of the most common root causes of cloud security breaches. The entire industry is moving toward short-lived, automatically rotated credentials, and for good reason. Every long-lived key is a ticking clock.

**Passwordless authentication.** FIDO2 and passkeys represent something rare in security — a case where the more secure option is also the more convenient one. That almost never happens. When you find that combination, the industry should adopt it aggressively.

## The real measure of success

Here's how I think about whether we're winning: **count the number of security decisions a developer has to make to ship a feature.** If that number is going down over time without the actual security posture getting worse, you're on the right track.

The end state the industry should be aiming for is one where a developer can build and deploy a cloud application and never once think about IAM — not because security doesn't exist, but because it's been handled for them, correctly, by default.

We're not there yet. But every system that removes one more unnecessary security decision from a developer's day gets us closer. And I believe the teams and individuals working on these problems are doing some of the most important work in cloud computing.

---

*I lead teams building IAM features at AWS — from product strategy and security design to hands-on testing and launch. Opinions are my own.*

*If you're a developer with opinions about IAM — good or bad — I want to hear from you. Find me on [LinkedIn](https://www.linkedin.com/in/punitdeotale/).*
