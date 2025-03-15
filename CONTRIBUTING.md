## CONTRIBUTING

Please make a pull request to [Dev Branch](https://github.com/Ratimon/redprint-wizard/tree/dev)

### TODO

- Port to Svelte 5
- Port to Dailsy UI 5
- Abstrat Icon Component

### Developer's Quick Guide

>[!NOTE]
> For who want to scaffolding their own svelte project

Scaffolding:

```bash
pnpm init
pnpm create svelte@latest
nvm use v20.13.1
```

Integrating tailwind:

https://tailwindcss.com/docs/guides/sveltekit

Installing dependencies for theme:

```bash
pnpm add -D @tailwindcss/forms @tailwindcss/typography daisyui svelte-preprocess postcss-load-config
```

Adding icon lib:

```bash
pnpm add -D @iconify/svelte
```

Generating pwa-based logo:
```bash
pnpm add -D pwag
pnpm run generate_icon
```

>[!WARNING]
> This is only for basic UI dependencies only, you can checkout other dependencies at [package.json](./package.json)

### Writer's Quick Guide

Here is the main directory that you can contribute to the blog posts:

```sh
├── src
│   ├── routes                    # Svelte routes
│   │   ├── blog
└── static                        # Static files
    ├── blog
    └── pwa
```

### Publishing

>[!WARNING]
> For Repo Owner only!!

```bash
git add .
git commit -am "v1.0.0"
git push -u origin main
git tag v1.0.0 main
git push origin tag v1.0.0
```

>[!WARNING]
> DONT forget to add secret env `NPM_AUTH_TOKEN` at [repo](https://github.com/Ratimon/redprint-wizard/settings/secrets/actions)