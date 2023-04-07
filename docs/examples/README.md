# Basic usage

_nuxt.config.js_

```typescript
import nuxtSvgSpritemap from 'nuxt-svg-spritemap/vitePlugin';

export default defineNuxtConfig({
  vite: {
    plugins: [nuxtSvgSpritemap()],
  },
});
```

# Custom path to .svg files

_nuxt.config.js_

```typescript
import nuxtSvgSpritemap from 'nuxt-svg-spritemap/vitePlugin';

const nuxtSvgSpritemapConfig = {
  path2svg: 'assets/sprites/',
};

export default defineNuxtConfig({
  vite: {
    plugins: [nuxtSvgSpritemap(nuxtSvgSpritemapConfig)],
  },
  appConfig: {
    nuxtSvgSpritemapConfig,
  },
});
```

# dirSeparator

_nuxt.config.js_

```typescript
import nuxtSvgSpritemap from 'nuxt-svg-spritemap/vitePlugin';

const nuxtSvgSpritemapConfig = {
  assets: 'assets/svg/',
  dirSeparator: '_-_',
  spriteComponentName: 'TheSprite',
};

export default defineNuxtConfig({
  vite: {
    plugins: [nuxtSvgSpritemap(nuxtSvgSpritemapConfig)],
  },
  appConfig: {
    nuxtSvgSpritemapConfig,
  },
});
```

Now if you have the following file structure:

```
/ <app-root>
├── ...
├── assets
│   └── svg/
│       ├── menu/
│       │   └── unread.svg
│       └── logo.svg
└── ...
```

To use the menu/unread.svg icon, you need to use the following code:

```html
<TheSprite name="menu_-_unread" />
```

And so on to an unlimited depth of nesting.

# transform

```javascript
import nuxtSvgSpritemap from 'nuxt-svg-spritemap/vitePlugin';

const nuxtSvgSpritemapConfig = {
  transform: (spritemap) => {
    return spritemap.replace(/%cta-color%/g, '#f00');
  },
};

export default defineNuxtConfig({
  vite: {
    plugins: [nuxtSvgSpritemap(nuxtSvgSpritemapConfig)],
  },
  appConfig: {
    nuxtSvgSpritemapConfig,
  },
});
```

This code will replace all occurrences of `%cta-color%` with `#f00`, which can be very useful when creating universal icons with variable colors.
