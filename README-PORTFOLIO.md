# Mend0z0 Portfolio — GitHub Pages

Replace `portfolio.html` and upload `assets/css/style.css` and `assets/js/projects.js` to your existing site, keeping their paths. The ZIP also contains the shared assets.

## Add a project
Open `assets/js/projects.js`, find `PORTFOLIO_PROJECTS`, and add a JavaScript object for each real project. Required fields: `title`, `category` (`pcb` or `firmware`), `description`, `github` (a full HTTPS GitHub repository URL). Optional: `tags` (array), `image` (relative image path in `assets/img/`). Upload your image into `assets/img/`.

Example:
```js
{ title: "Motor Controller", category: "pcb", description: "Compact motor control PCB", tags: ["KiCad", "Motor"], image: "assets/img/motor-controller.jpg", github: "https://github.com/YOUR_USERNAME/YOUR_REPOSITORY" }
```

Replace placeholders with your real content. Cards appear automatically, and visitors can search, filter, scroll, and click to open GitHub. No API key or server is required. GitHub Pages is a static host. Only add public repositories you want visitors to access.
