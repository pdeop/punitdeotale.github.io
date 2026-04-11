---
title: "Why IAM Is the Hardest Part of Cloud"
date: 2026-03-04
draft: false
description: "IAM is the single biggest source of friction in cloud adoption. After years of building identity systems at AWS, here's what I think we're getting wrong."
tags: ["iam", "cloud-security", "developer-experience", "aws"]
categories: ["Technology"]
authors: ["punit-deotale"]
---

Every developer I've talked to has the same story. They're setting up something on AWS. An EC2 instance, a Lambda function, an ECS task. They get to the part where it asks for an IAM role. They don't have one. So they open the IAM console in another tab, spend ten minutes trying to figure out what permissions they need, give up, paste a wildcard policy, and move on.

I've been working on IAM at AWS for years. Leading teams, driving product and security decisions, shipping features that millions of developers use. And I think IAM is the single hardest part of cloud computing! Not because it's broken. The underlying model is actually very good. But we built it for security engineers and then asked every developer to use it.

## The context switch is the real problem

IAM roles connect everything in AWS. Lambda needs to read from S3? Role. EC2 needs to write to CloudWatch? Role. ECS task needs to pull secrets? Role. Nearly every meaningful setup involves one.

But creating a role has always meant leaving whatever you're doing, opening the IAM console in a new tab, and navigating a completely different interface. You have to figure out trust policies, pick the right managed policies (or write your own JSON), scope it correctly. All while trying to remember what you were setting up in the first tab!

By the time you get back, you've lost your train of thought. And honestly? Most people just attach more permissions than they need so they don't have to do this again. Can you blame them??

## Frankenstein roles

Here's what happens over time. Developers stop creating new roles altogether! They find one that "works," usually some admin role from a debugging session months ago, and reuse it. Then someone else attaches another policy to it for a different use case. Then another.

Eventually you have these roles that are stitched together from five different purposes, with permissions nobody fully understands. They're everywhere, and they're a real security problem. But they exist because creating a properly scoped role was too annoying. That's on us!

## The inconsistency makes it worse

The other thing that doesn't get talked about enough. The IAM role experience is different depending on which AWS service you're using! Some services give you decent managed policies to start with. Others hand you an empty JSON editor. Others suggest policies that are way broader than what you actually need.

So even if you're willing to do the right thing, the guidance you get depends entirely on where you happen to be. That's a design problem!

## What I think the fix looks like

I've been thinking about this for a long time, and I keep coming back to one idea. The easiest path should be the secure path. I call it developer-first security. Not "dumb it down." IAM is complex for real reasons and security teams still need full control. But most developers aren't security engineers, and the system shouldn't require them to be!

What that means in practice: give people smart defaults instead of blank slates! If I'm setting up a Lambda that reads from a DynamoDB table, the system should know enough about that context to suggest the right permissions. Not make me go research the IAM docs first. Make the feedback instant. When something is denied, tell me exactly what and why, don't make me dig through CloudTrail. And stop letting unused permissions pile up forever!

## This is starting to happen

AWS [just announced](https://aws.amazon.com/about-aws/whats-new/2026/03/aws-simplifies-iam-role-creation-and-setup/) that you can now create and customize IAM roles directly inside service workflows. No more tab-switching! You get a panel right where you are, with default policies and a simplified way to set permissions. It works across EC2, Lambda, EKS, ECS, Glue, CloudFormation, DMS, Systems Manager, Secrets Manager, RDS, and IoT Core, with more coming.

This is the right direction!! It tackles the context switch. It reduces the temptation to reuse bloated roles. And it gives you contextual guidance instead of a blank editor.

## But we're still not there

Here's the thing though. AWS also gives you the ability to create default IAM roles when setting up services. If you've ever created a Lambda function, you've seen it. The console offers to create a default execution role for you. Sounds great, right?

The problem is what that default role actually gives you. The `AWSLambdaBasicExecutionRole` (the one Lambda creates by default) grants exactly three permissions: `logs:CreateLogGroup`, `logs:CreateLogStream`, and `logs:PutLogEvents`. That's it! Your Lambda can write CloudWatch logs and literally nothing else!

Need to read from S3? Add a policy. Need to query DynamoDB? Add a policy. Need to pull a secret from Secrets Manager? You guessed it. Add a policy! You're right back to where you started, digging through IAM docs trying to figure out the right permission strings.

So the default role gets you past the initial setup screen, but the moment your function needs to actually do something useful, you're back in permission-land! It's better than a blank slate, sure. But as a developer, what I'd love to see is the system being smarter about context. Imagine connecting a Lambda to a DynamoDB table and having the console suggest the right scoped permissions for that specific table automatically. That would be the dream! We're not there yet, but I think that's where this needs to go.

I'll say this. Getting permissions right in context across that many different services, without breaking the security model, is hard. IAM roles behave differently depending on the service, and there are real tradeoffs between making things convenient and keeping them secure. I know from experience that those tradeoffs have consequences at scale, and I'm glad to see them being taken seriously!

---

*I work on IAM at AWS. Opinions are my own.*

*I want to hear from you!! If you're a developer or a security engineer and you have thoughts on IAM, what's working, what's broken, what makes you want to throw your laptop out the window, reach out! I take this stuff seriously and your feedback shapes how I think about these problems. Find me on [LinkedIn](https://www.linkedin.com/in/punitdeotale/).*
