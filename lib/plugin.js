import getNuxtSvgSprite from './SpriteComponent.js';
import { sep, normalize } from 'pathe';

function processFilePath(filePath) {
  const splitted = normalize(filePath).split(sep);
  if (splitted[0] === 'public') splitted.shift();

  return `/${splitted.join('/')}`;
}

export default (
  nuxtApp,
  {
    spriteComponentName = 'SVGSprite',
    outputFilename = './public/spritemap.svg',
  } = {}
) => {
  const spritemapName = processFilePath(outputFilename);

  nuxtApp.vueApp.component(
    spriteComponentName,
    getNuxtSvgSprite(spritemapName)
  );
};
