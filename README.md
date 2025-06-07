# Taska

A simple, lightweight to-do app that runs entirely in your browser.

> ✨ **Try out Taska now at** https://taska.airoflare.com (hosted on Cloudflare Pages for free!)


<br />

## 📸 Screenshots

<details>
<summary><strong>Desktop view</strong></summary>

<table>
  <tr>
    <td align="center">
      <img src="/images/light-1.png" alt="Light Mode 1" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-1.png" alt="Dark Mode 1" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-2.png" alt="Light Mode 2" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-2.png" alt="Dark Mode 2" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-3.png" alt="Light Mode 3" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-3.png" alt="Dark Mode 3" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-4.png" alt="Light Mode 4" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-4.png" alt="Dark Mode 4" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-5.png" alt="Light Mode 5" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-5.png" alt="Dark Mode 5" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-6.png" alt="Light Mode 6" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-6.png" alt="Dark Mode 6" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-7.png" alt="Light Mode 7" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-7.png" alt="Dark Mode 7" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/images/light-8.png" alt="Light Mode 8" width="400" /><br/>
      Light Mode
    </td>
    <td align="center">
      <img src="/images/dark-8.png" alt="Dark Mode 8" width="400" /><br/>
      Dark Mode
    </td>
  </tr>
</table>
</details>

<details>
<summary><strong>Mobile view</strong></summary>

<p align="center">
  <img src="/images/mobile.png" alt="Mobile Screenshot" width="600" />
</p>
</details>

<br />

## ✨ What It Can Do

* **Add, edit, and delete tasks**
* **Mark tasks as done or undone**
* **Set deadlines and see what’s overdue**
* **Check times across multiple time zones**
* **Switch between light and dark mode**
* **Filter and search tasks by name or status**
* **Works great on phones and desktops**
* **Private -- everything stays in your browser**
* **Install as a PWA (Progressive Web Application) on mobile or desktop**
* **Blazing fast -- no external database**

<br />

## How It Works

Taska is built with [Next.js](https://nextjs.org), but everything runs in your browser.

All your data is saved in **LocalStorage**, so there's no need for an external database.

<br />

## ⚠️ Limitations

- **No sync across devices**
  - Your tasks are saved only in your current browser. If you switch devices or clear your browser data, you’ll lose them.

- **Manual backups only**
  - You can export and import it manually, ask ChatGPT if you need help.

- **Time zone options are limited**
  - You can add more in the code if needed (`/components/timezone-modal.tsx`, line 18), or open an issue on this repository (mention which timezone you need on that issue).

<br />

## Why I Built This

I saw a [post on X](https://x.com/haydenbleasel/status/1930022190453535205) showing off a nice looking to-do app that uses LocalStorage. 

It wasn’t open source, so I decided to build my own version as a weekend project.

<br />

## How I Use It

I’ve added Taska to my Mac and phone as a PWA (Progressive Web Application).

Each day, I write down what I need to do and check things off as I go.

I use separate lists for each device, so I don't need syncing.

The timezone feature is super helpful when I’m working with people in different parts of the world.

<br />

## How to Deploy

Pick your favorite platform. It just works, no config, no env files.

### **Vercel (Free)**

1. Create a new project
2. Enter this repository link
3. Select Next.js as framework
4. Deploy!

### **Cloudflare Pages (Free)**

1. Create a new Pages project
2. Enter this repository link
3. Select Next.js as framework
4. Deploy!

### **Coolify**

1. Add a new resource → Docker Image
2. Use this image: `ghcr.io/airoflare/taska:latest`
3. Deploy!

<br />

## For Developers

```bash
# Clone the repo
git clone https://github.com/airoflare/taska.git
cd taska

# Install dependencies and run the dev server
bun install
bun run dev
# → Opens at http://localhost:3000

# Build the static site
bun run build
# → Output goes to the `out/` folder
```

<br />

## A Quick Note

I built this with [v0.dev](https://v0.dev) and ChatGPT.

I don’t really know much about Next.js or React, so the codebase is kind of a mess — but it works!
