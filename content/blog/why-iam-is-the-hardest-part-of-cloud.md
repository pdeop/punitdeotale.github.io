---
title: "Why IAM Is the Hardest Part of Cloud"
date: 2026-03-04
draft: false
description: "IAM is the single biggest source of friction in cloud adoption. After years of building identity systems at AWS, here's what I think we're getting wrong."
tags: ["iam", "cloud-security", "developer-experience", "aws"]
categories: ["Cloud Security"]
author: "Punit Deotale"
---

Every developer I've talked to has the same story. They're setting up something on AWS — an EC2 instance, a Lambda function, an ECS task — and they get to the part where it asks for an IAM role. They don't have one. So they open the IAM console in another tab, try to figure out what permissions they need, give up after ten minutes, paste a wildcard policy, and move on.

I've been working on IAM at AWS for years. Leading teams, driving product and security decisions, shipping features that millions of developers use. And I think IAM is the single hardest part of cloud computing. Not because it's broken — the underlying model is actually very good — but because we built it for security engineers and then asked every developer to use it.

## The problem is the context switch

IAM roles connect everything in AWS. Your Lambda needs to read from S3? Role. Your EC2 instance needs to write to CloudWatch? Role. Your ECS task needs to pull secrets? Role. Nearly every meaningful setup involves one.

But creating a role has always meant leaving whatever you're doing, opening the IAM console in a new tab, and navigating a completely different interface. You have to figure out trust policies, pick the right managed policies (or write your own JSON), scope it correctly — all while trying to remember what you were setting up in the first tab.

By the time you get back, you've lost your train of thought. And honestly? Most people just attach more permissions than they need so they don't have to do this again.

## Frankenstein roles

Here's what happens over time. Developers stop creating new roles altogether. They find one that "works" — usually some admin role from a debugging session months ago — and reuse it. Then someone else attaches another policy to it for a different use case. Then another.

Eventually you have these roles that are stitched together from five different purposes, with permissions nobody fully understands. I call them Frankenstein roles. They're everywhere, and they're a real security problem. But they exist because creating a properly scoped role was too annoying.

## The inconsistency makes it worse

The other thing that doesn't get talked about enough: the IAM role experience is different depending on which AWS service you're using. Some services give you decent managed policies to start with. Others hand you an empty JSON editor. Others suggest policies that are way broader than what you actually need.

So even if you're willing to do the right thing, the guidance you get depends entirely on where you happen to be. That's a design problem, not a developer problem.

## What I think the fix looks like

I've been thinking about this for a long time, and I keep coming back to one idea: the easiest path should be the secure path. I call it developer-first security. Not "dumb it down" — IAM is complex for real reasons and security teams still need full control. But most developers aren't security engineers, and the system shouldn't require them to be.

What that means in practice: give people smart defaults instead of blank slates. If I'm setting up a Lambda that reads from a DynamoDB table, the system should know enough about that context to suggest the right permissions — not make me go research the IAM docs first. Make the feedback instant — when something is denied, tell me exactly what and why, don't make me dig through CloudTrail. And stop letting unused permissions pile up forever.

## This is starting to happen

AWS [just announced](https://aws.amazon.com/about-aws/whats-new/2026/03/aws-simplifies-iam-role-creation-and-setup/) that you can now create and customize IAM roles directly inside service workflows. No more tab-switching. You get a panel right where you are, with default policies and a simplified way to set permissions. It works across EC2, Lambda, EKS, ECS, Glue, CloudFormation, DMS, Systems Manager, Secrets Manager, RDS, and IoT Core, with more coming.

This is the right direction. It tackles the context switch. It reduces the temptation to reuse bloated roles. And it gives you contextual guidance instead of a blank editor.

I'll say this — getting permissions right in context across that many different services, without breaking the security model, is genuinely hard. IAM roles behave differently depending on the service, and there are real tradeoffs between making things convenient and keeping them secure. I know from experience that those tradeoffs have consequences at scale, and I'm glad to see them being taken seriously.

## How I measure progress

I have a simple test: count the number of security decisions a developer has to make before they can ship a feature. If that number goes down without the security posture getting worse, you're moving in the right direction.

The goal is a world where developers don't have to think about IAM — not because it doesn't exist, but because the system handles it correctly by default. We're not there. But we're closer than we were last week.

---

*I work on IAM at AWS. Opinions are my own.*

*If you've tried the new inline role creation, or if you have opinions about IAM — I want to hear from you. [LinkedIn](https://www.linkedin.com/in/punitdeotale/).*
