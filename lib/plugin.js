import getNuxtSvgSprite from './SpriteComponent.js';
import path from 'path';

function processFilePath(filePath) {
  const splitted = path.normalize(filePath).split(path.sep);
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
