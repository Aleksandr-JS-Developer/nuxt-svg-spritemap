import nuxtSvgSprite from './SpriteComponent.js';
import getNuxtSvgSpritemap from './SpritemapComponent.js';

export default (
  nuxtApp,
  {
    spriteComponentName = 'SVGSprite',
    spritemapComponentName = 'SVGSpritemap',
    outputFilename = '/spritemap.svg',
  } = {}
) => {
  nuxtApp.vueApp.component(spriteComponentName, nuxtSvgSprite);
  nuxtApp.vueApp.component(
    spritemapComponentName,
    getNuxtSvgSpritemap(outputFilename)
  );
};
