import getNuxtSvgSprite from './SpriteComponent.js';

export default (
  nuxtApp,
  { spriteComponentName = 'SVGSprite', outputFilename = '' } = {}
) => {
  nuxtApp.vueApp.component(
    spriteComponentName,
    getNuxtSvgSprite(outputFilename)
  );
};
