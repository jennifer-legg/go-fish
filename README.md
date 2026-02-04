# GoFish Card Game
### Authors: 

## Design Rules and Information

### 1. Grid Logic and Breakpoints
The system transitions through three distinct "modes" to ensure content remains readable across all device types. 
| Screen Type | Breakpoint | Columns | Gutter | Margin | Tailwind
| :--- | :--- | :--- | :--- | :--- | :---
| **Mobile** | < 768px | 4 | 16px | 16px | sm
| **Tablet** | 768px - 1023px | 8 | 20px | 32px | md
| **Desktop** | 1024px+ | 12 | 24px | 40px (at 1440px) | lg

### 2. Sizing Logic
We will try to stick to the standard measurements of **8px Grid System**. This will help with:

* **Scalability**: Most screen resolutions (1080p, 4K etc.) are divisible by 8
* **Easy Maths**: It divides cleanly into 4 and 2, which is essential for centering items or creating smaller sub-elements without ending up with "blurry" half-pixels (like 7.5px).
* **Consistency**: It removes the guesswork. You don't have to wonder, "Should this gap be 15px or 20px?" You just pick 16px.

#### How to Apply It
When using this system, every dimension—padding, margins, heights, and widths—should be a multiple of 8 ($8, 16, 24, 32, 40, 48 \dots$).

**The Hard Grid vs. Soft Grid**
* Hard Grid: You place every element into a literal grid of 8x8 pixel squares. This is more common in icon design.

* Soft Grid: You focus on the space between elements. This is the standard for web layouts. You just ensure that margins and padding follow the 8px rule.

**Typography & the 4px Exception**
While 8px is great for layout, it can be too "chunky" for text. We will use a **4px baseline** for typography.
* **Line-Height**: If your text is 16px, you might set the line height to 24px (a multiple of 8) or 20px (a multiple of 4). This ensures the "box" the text sits in still fits into the overall grid.

**Using Relative Units (rem)**
In modern CSS, we don't usually hard-code 8px. Instead, we use rem units based on a default font size (usually 16px).
* $1 \text{rem} = 16\text{px}$ (2 units of 8)
* $0.5 \text{rem} = 8\text{px}$ (1 unit of 8)
* $1.5 \text{rem} = 24\text{px}$ (3 units of 8)

**Pro Tip:** If 8px feels too restrictive for tight spaces (like inside a small button), many systems allow for a 4px "half-step" to give you a bit more flexibility while staying within the family.

### 3. Component Structure and Styling


## Setup

### What's included

This repo includes:

* a single, simple API endpoint (`/api/v1/fruits`)
* frontend routing via react-router
* an auth0 setup waiting to be configured
* an example database module (`server/db/fruits.js`)
* an API client module (`client/apis/fruits.js`)
* configuration for Vitest and testing library
* configuration for server-side debugging in VS Code
* configuration for preprocessing css with tailwind support

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

```
git clone [your-project-ssh-address]
cd [your-project-name]
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=boilerplate-fullstack)
