## CONTRIBUTING

### Quick Guide

>[!NOTE]
> For who want to scaffolding their own svelte project

Scaffolding:

```bash
pnpm init
pnpm create svelte@latest
nvm use v20.12.2
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

### Publishing

>[!WARNING]
> For Repo Owner only!!

```bash
git add .
git commit -am "v0.0.5"
git push -u origin main
git tag v0.0.5 main
git push origin tag v0.0.5
```

DONT forget to add secret env `NPM_AUTH_TOKEN` at [repo](https://github.com/Ratimon/solid-grinder/settings/secrets/actions)