# Publishing an article on orbsi.co

Written for you, not for a developer. You will not need to touch code.

---

## Before the first time: setup

These steps happen once. **You have to do them yourself** because they involve
creating accounts and granting access, which nobody else can do for you.

They also change how the site deploys. Right now you drag a folder onto Netlify.
After this, you push once and Netlify rebuilds the site every time you publish.
That change is what makes publishing without a developer possible.

### 1. Put the site on GitHub

1. Create a free account at github.com if you do not have one.
2. Click the plus icon, top right, then **New repository**.
3. Name it `orbsi-site`. Set it to **Private**. Do not tick any of the
   "initialize with" boxes. Click **Create repository**.
4. On the page that appears, find the section headed
   "…or push an existing repository from the command line" and keep it open.

Then, in a terminal, inside the folder I gave you:

```
git init
git add .
git commit -m "Site with Insights and CMS"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/orbsi-site.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

If the terminal is not something you want to do, GitHub Desktop does the same
thing with buttons. Install it, choose **Add existing repository**, point it at
the folder, then **Publish repository**.

### 2. Point Netlify at the repository

1. In Netlify, open your site, then **Site configuration**, then **Build and deploy**.
2. Under **Continuous deployment**, click **Link repository** and choose GitHub.
3. Authorise Netlify, then pick `orbsi-site`.
4. Netlify should read the settings from the file already in the folder. Confirm
   it shows:
   - Build command: `npm run build`
   - Publish directory: `_site`
5. Save. Netlify will build the site. The first build takes a minute or two.

**From this point on, do not drag folders onto Netlify.** Deploying that way
would overwrite the connection.

### 3. Turn on logins

1. In Netlify, go to your site, then **Integrations**, and enable **Identity**.
2. Open **Identity**, then **Invite users**, and invite your own email address.
3. Check your inbox and accept the invitation. Choose a password.
4. Still in Identity, open **Services**, find **Git Gateway**, and click
   **Enable Git Gateway**.
5. Under Identity settings, set **Registration** to **Invite only**, so nobody
   else can sign themselves up.

### 4. Check you can get in

Go to **https://www.orbsi.co/admin** and log in with the email and password you
just set. You should see a list with one article in it.

That is the setup done. You never repeat it.

---

## Every time: writing and publishing

### 1. Log in

Go to **https://www.orbsi.co/admin**

### 2. Start the article

Click **Insights** in the left sidebar, then **New Article**.

### 3. Fill in the fields

**Title.** The headline. This becomes the page title and the big heading.

**Web address.** The part that appears after `/insights/` in the link. Use
lowercase words joined by hyphens, for example `why-work-comes-back`. Keep it
short. **Set this before you publish and do not change it afterwards**, because
changing it breaks any link anyone has already shared.

**Publication date.** Today, unless you have a reason otherwise.

**One-line summary.** One sentence. This is what shows under the title on the
Insights page. It is the only thing a reader sees before deciding to click.

**Meta description.** What appears in Google results and link previews. Aim for
140 to 160 characters. Write it as a sentence, not a list of keywords.

**Social preview image.** Optional. If you skip it, the standard Orbsi image is
used. If you add one, make it 1200 by 630 pixels.

**Published.** Leave on. Turn it off if you want to save without going live.

**Body.** The article. The toolbar gives you bold, italic, links, two heading
levels, quotes, and lists. That is deliberately all of it.

### 4. Publish

Click **Publish** at the top.

The article is live in about two minutes. Netlify rebuilds the site each time
you publish, which is the pause you are waiting through.

### 5. Check it

Open `https://www.orbsi.co/insights` and confirm the article is at the top of
the list, then click into it.

---

## Editing something already published

Open **Insights** in the admin, click the article, make the change, click
**Publish** again. Same two-minute wait.

**Do not change the web address of a published article.** If you truly need to,
tell whoever maintains the site so a redirect can be added from the old address.

## Saving without publishing

Turn **Published** off and click Publish. The article is saved and is not on the
site. Turn it back on when you are ready.

## Deleting

Open the article and choose **Delete** from the menu at the top. If it was ever
live, mention it so a redirect can be put in place.

---

## Things worth knowing

**Two headings only.** The toolbar gives you Heading 2 and Heading 3. Heading 1
is the article title and is added for you. Two levels is enough for a
2,000-word article and keeps the page readable.

**Links.** Select the words, click the link button, paste the address. Use words
that describe where the link goes. Not "click here" or "learn more."

**The email signup** at the end of every article is added automatically and is
the same on all of them. You do not need to add it.

**Images inside the body** are not part of this setup. If you need one in an
article, ask and it can be added.

---

## If something goes wrong

**The admin page will not load or the login fails.** Check Identity is still
enabled in Netlify and that Git Gateway is on.

**You published but the site has not changed.** Open Netlify and look at
**Deploys**. A build may still be running, or it may have failed. If it failed,
the log will say why. This is almost always a temporary issue.

**The article looks wrong.** Check the body in the admin. Markdown formatting
can carry over oddly when pasting from Word or Google Docs. Pasting as plain
text first avoids it.
