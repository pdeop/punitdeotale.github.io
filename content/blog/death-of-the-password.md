---
title: "The Password Is Finally Dying. Here's What Comes Next."
date: 2026-02-08
draft: false
description: "After decades of trying to kill the password, FIDO2 and passkeys might actually succeed. But the transition won't be as smooth as anyone hopes."
tags: ["authentication", "fido2", "passkeys", "security", "developer-experience"]
categories: ["Cloud Security"]
author: "Punit Deotale"
---

We've been trying to kill the password for twenty years. Every few years, a new technology promises to finally do it — biometrics, smart cards, one-time codes, push notifications. Each one nibbles at the edges but never lands the killing blow. Passwords are the cockroaches of the security world.

But something is different this time.

FIDO2 and passkeys represent a genuine inflection point, and I say that as someone who's deeply skeptical of "this changes everything" claims in security. Here's why I think this time is real, and what I think people are getting wrong about the transition.

## Why passwords refuse to die

Before we talk about what's next, it's worth understanding why passwords have been so durable despite being universally hated.

It's not because passwords are secure — they're terrible. Reused, phishable, leaked in breaches, stored in plaintext by companies that should know better. The average person has over 100 online accounts and reuses passwords across most of them. We've known this for years.

Passwords survive because they have three properties that every replacement has failed to match simultaneously:

**They're universal.** Passwords work on every device, every platform, every browser, every operating system. No special hardware, no app installation, no enrollment ceremony. Type a string, hit enter.

**They're recoverable.** Forget your password? Reset it. Lose your phone? Still have your password. Switch devices? Passwords come with you. Every alternative authentication method has a recovery problem that eventually loops back to... a password.

**They're understandable.** Everyone knows what a password is. Not everyone knows what a "security key" or "TOTP code" is. The mental model is simple, even if the security properties are poor.

Any replacement that doesn't address all three of these — universality, recoverability, and simplicity — will fail. And for twenty years, every replacement has fallen short on at least one.

## What makes passkeys different

Passkeys built on the FIDO2/WebAuthn standard are the first technology that credibly addresses all three.

**Universality:** Apple, Google, and Microsoft have all built passkey support directly into their operating systems and browsers. This isn't a niche protocol requiring dedicated hardware — it's a platform primitive. When the three companies that control 99% of consumer devices all agree to support something natively, that's a different starting position than any previous password replacement.

**Recoverability:** Synced passkeys solve the device-loss problem by backing up credentials through platform cloud accounts (iCloud Keychain, Google Password Manager, etc.). Lose your phone? Your passkeys are already on your new one. This was the critical missing piece — previous FIDO implementations using hardware security keys were more secure but created a "what if I lose the key?" problem that terrified both users and IT departments.

**Simplicity:** The user experience is a biometric scan or device PIN. That's it. No codes to type, no apps to open, no tokens to carry. Most users already unlock their phones this way hundreds of times a day.

And here's the part that matters most for security: passkeys are phishing-resistant by design. The cryptographic challenge-response is bound to the origin — a fake login page on a lookalike domain simply doesn't receive a valid credential. This isn't a user education problem or a "don't click suspicious links" problem. The protocol itself makes phishing structurally impossible.

## What people are getting wrong

Despite my optimism, I see three misconceptions in how the industry is approaching the transition:

**Misconception 1: "We can just turn off passwords."**

No, you can't. Not yet. Passkey support is broad but not universal. Older devices, embedded systems, automated scripts, and CI/CD pipelines all depend on credential types that can't easily become passkeys. The transition will take years, and during that time you need to support both methods — which means you still have the password attack surface.

The right framing isn't "replace passwords" — it's "make passkeys the default and passwords the fallback, then shrink the fallback over time."

**Misconception 2: "Synced passkeys are less secure than hardware keys."**

This is technically true and completely misses the point. Yes, a hardware security key that never leaves a secure enclave is cryptographically superior to a passkey synced through a cloud account. But security isn't measured in a vacuum — it's measured against the alternative. The alternative for 99% of users isn't a hardware key. It's "password123" reused across 40 sites.

A synced passkey is astronomically more secure than the passwords it replaces. Letting perfect be the enemy of good here means most users stay on passwords forever.

**Misconception 3: "The enterprise transition will be straightforward."**

For consumer accounts, passkeys are relatively simple — enroll, use, done. Enterprise adoption is much harder. Organizations have to think about shared accounts, break-glass access, compliance audit trails, cross-platform support, employee offboarding (how do you revoke a synced passkey when someone leaves?), and integration with existing identity providers.

These are solvable problems, but they require deliberate design work. Organizations that treat enterprise passkey rollout as a simple configuration change are going to have a rough time.

## Where this actually takes us

I think passkeys will follow the trajectory of HTTPS adoption. For years, HTTPS was optional and uncommon outside of banking and e-commerce. Then browsers started marking HTTP sites as "Not Secure," Let's Encrypt made certificates free, and within a few years HTTPS went from nice-to-have to default.

Passkeys are on a similar curve. Platform support is already there. The next forcing function is mandates — when major platforms require phishing-resistant MFA, organizations will move. We're already seeing the early signals of this.

The end state isn't a world without passwords — it's a world where passwords are the exception rather than the rule. Where the default authentication experience is a biometric scan, and passwords are relegated to legacy systems and recovery flows.

That's not a complete victory, but it's an enormous improvement. And unlike every previous attempt to kill the password, this one has the platform support, the user experience, and the industry alignment to actually get there.

---

*I lead teams building IAM features at AWS — from product strategy and security design to hands-on testing and launch. Opinions are my own.*

*If you're a developer with opinions about IAM — good or bad — I want to hear from you. Find me on [LinkedIn](https://www.linkedin.com/in/punitdeotale/).*
