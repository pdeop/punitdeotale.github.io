# Deploy Your Hugo Site to GitHub Pages

Everything is ready — you just need to push it to GitHub and flip one setting.

## Step 1: Create the GitHub repo

Go to https://github.com/new and create a new repo:
- Name: `punitdeotale.github.io` (this naming convention automatically enables GitHub Pages at that URL)
- Set it to **Public** (required for free GitHub Pages)
- Do NOT initialize with README, .gitignore, or license (the repo already has content)

## Step 2: Commit and push from your local machine

Open your terminal, `cd` into the site folder, and run:

```bash
cd /path/to/punitdeotale.com

# Commit the latest changes
git add -A
git commit -m "Update blog posts and add LinkedIn launch post"

# Add GitHub as remote and push
git remote add origin https://github.com/punitdeotale/punitdeotale.github.io.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages with Actions

1. Go to your repo on GitHub: https://github.com/punitdeotale/punitdeotale.github.io
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment" → Source, select **GitHub Actions**
4. That's it — the workflow file (`.github/workflows/deploy.yml`) is already in the repo

The Action will trigger automatically on push. Give it 1-2 minutes.

## Step 4: Check your site

Go to: https://punitdeotale.github.io

You should see your PaperMod dark theme site with the IAM blog post.

## Later: Add a Custom Domain

When you buy `punitdeotale.com`:
1. At your registrar (Namecheap, Cloudflare, etc.), add these DNS records:
   - CNAME record: `www` → `punitdeotale.github.io`
   - A records for apex domain:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
2. In GitHub repo Settings → Pages → Custom domain, enter `punitdeotale.com`
3. Check "Enforce HTTPS"
4. Wait 15-30 minutes for DNS propagation and SSL provisioning

Delete this file after deployment — it's just instructions, not site content.
