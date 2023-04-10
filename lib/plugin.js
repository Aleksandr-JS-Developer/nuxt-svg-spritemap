import nuxtSvgSprite from './SpriteComponent.js';

export default (nuxtApp, { spriteComponentName = 'SVGSprite' } = {}) => {
  nuxtApp.vueApp.component(spriteComponentName, nuxtSvgSprite);
};
