My team and I just launched something and this one's special. This was almost a year in the making — multiple teams, months of effort, and a lot of people pouring themselves into getting this right.

We shipped inline IAM role creation across 11 AWS services — EC2, Lambda, EKS, ECS, Glue, CloudFormation, DMS, Systems Manager, Secrets Manager, RDS, and IoT Core. More coming.

You can now create and customize IAM roles with the right permissions directly inside the service workflow. No more opening the IAM console in a separate tab, no more losing context, no more copy-pasting wildcard policies just to keep moving.

This isn't just a UI update. There's serious infrastructure under the hood to keep this secure — IAM is the most security-critical service at AWS and there's no room to cut corners. IAM roles behave differently across services and every design decision here has security implications. Getting contextual permissions right without compromising the security model is a harder problem than it looks from the outside.

On a personal note, I led this effort across multiple teams within AWS and it pushed me in ways I didn't expect. Seeing it ship at this scale is one of the most fulfilling moments of my career. Thanks to everyone who contributed to getting this to our customers (too many across AWS to name, you know who you are)!

Check it out: https://aws.amazon.com/about-aws/whats-new/2026/03/aws-simplifies-iam-role-creation-and-setup/

If you try it, tell me how it goes!
