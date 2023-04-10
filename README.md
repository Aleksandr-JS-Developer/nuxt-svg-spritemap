# nuxt-svg-spritemap

A library for creating a spritemap for an application on Nuxt 3.

## Why?

Using a spritemap is a technique that allows you not to load a bunch of icons as the user opens pages, but to pack all the icons into one file and add it once.

```html
<svg>
  <use xlink:href="#item1"></use>
</svg>
<svg>
  <use xlink:href="#item2"></use>
</svg>
<svg>
  <use xlink:href="#item3"></use>
</svg>

<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <symbol id="item1">
    <path>...</path>
  </symbol>
  <symbol id="item2">
    <path>...</path>
  </symbol>
  <symbol id="item3">
    <path>...</path>
  </symbol>
</svg>
```

If you have an application with a bunch of reusable icons, then this option is for you.

---

## Installation

```bash
npm i nuxt-svg-spritemap
```

or

```bash
yarn add nuxt-svg-spritemap
```

---

## Configuration

_nuxt.config.js_

```typescript
import nuxtSvgSpritemap from 'nuxt-svg-spritemap/vitePlugin';

const nuxtSvgSpritemapConfig = <Options>;

export default defineNuxtConfig({
  vite: {
    plugins: [nuxtSvgSpritemap(nuxtSvgSpritemapConfig)],
  },
  appConfig: {
    nuxtSvgSpritemapConfig,
  },
  buildModules: ['@nuxtjs/svg'],
});
```

### interface Options

```typescript
interface Options {
  path2svg: string;
  // path to svg folder.
  // by default: 'assets/svg/'

  logStat: boolean;
  // log build stat after buildings
  // example: Spritemap builded, finded "5" svg files
  // by default: false

  dirSeparator: string;
  // by default: '-'

  transform: function(spritemap:string):string | null;
  // You can transform your svg spritemap before inserting
  // See more in docs/examples/README.md

  outputFilename: string;
  // Filename for spritemap
  // You can use this field for control of output dir.
  // For example: './public/assets/spritemap.svg'
  // by default: './public/spritemap.svg'

  spriteComponentName: string;
  // Sprite vue component name
  // by default: 'SVGSprite'
}
```

---

_plugins/nuxt-svg-spritemap.js_

```javascript
import nuxtSvgSpritemapPlugin from 'nuxt-svg-spritemap/plugin';

export default defineNuxtPlugin((nuxtApp) =>
  nuxtSvgSpritemapPlugin(nuxtApp, useAppConfig().nuxtSvgSpritemapConfig)
);
```

After adding the `nuxt-svg-spritemap.js` file, you don't need to touch it anymore.
You must specify and/or change all configuration options in `nuxt.config.js`.
When viewing the examples in the `/docs/examples/README.md` folder, remember that they are based on the fact that you have already added the `plugins/nuxt-svg-spritemap.js` file.

---

> NOTE: currently this plugin does not support svg directory tracking. This means that you need to rebuild on changes to the svg directory or files in order to rebuild the spritemap.

---

## Usage

```
/ <app-root>
├── ...
├── assets
│   └── svg/
│       ├── menu/
│       │   └── unread.svg
│       └── logo.svg
├── pages/
|   └── index.vue
└── ...
```

_/\<app-root>/app.vue_

```html
<template>
  <NuxtPage />
  <SVGSpritemap />
</template>

<script setup>
  import SVGSpritemap from '/spritemap.svg'; // use path from your nuxtSvgSpritemapConfig.outputFilename
</script>
```

_/\<app-root>/pages/index.vue_

```html
<template>
  <SVGSprite name="logo" />
  <SVGSprite name="menu-unread" />
</template>
```
