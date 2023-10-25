import path from 'node:path';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

let dirSep = '-';

const getFilesInDir = (dir, prefix = '') => {
  const res = fs.readdirSync(dir, { withFileTypes: true }).map((item) => {
    if (!item.isDirectory()) {
      const spritePath = path.join(prefix, item.name);

      return {
        path: spritePath,
        name: spritePath.replace(/\\|\//g, dirSep),
      };
    } else {
      return getFilesInDir(
        path.join(dir, item.name),
        path.join(prefix, item.name)
      );
    }
  });

  return res.flat().filter(({ name }) => /\.svg$/.test(name));
};

const buildSpriteMap = (path2svg) => {
  const pathes2svg = typeof path2svg === 'string' ? [path2svg] : path2svg;

  const sprites = pathes2svg.flatMap((_path) => {
    return getFilesInDir(path.normalize);
  });

  if (sprites.length === 0) return;

  const { document } = new JSDOM(
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
  ).window;

  const rootSVG = document.querySelector('body').querySelector('svg');

  sprites.forEach((item) => {
    const sprite = fs.readFileSync(path.resolve(path2svg, item.path), {
      encoding: 'utf-8',
    });

    const symbol = document.createElement('symbol');
    symbol.innerHTML = sprite;
    const svgNode = symbol.querySelector('svg');

    Array.from(svgNode.attributes).forEach((attr) => {
      symbol.setAttribute(attr.name, attr.value);
    });

    symbol.setAttribute('id', path.basename(item.name, '.svg'));
    symbol.innerHTML = symbol.innerHTML.replace(
      svgNode.outerHTML,
      svgNode.innerHTML
    );

    rootSVG.appendChild(symbol);
  });

  return {
    sprites,
    spritemapStr: rootSVG.outerHTML.replace(/\n|\r/g, '').replace(/\s+/g, ' '),
  };
};

const injectSpriteMap = (path2Spritemap, spritemapStr) => {
  fs.writeFileSync(path2Spritemap, spritemapStr);
};

export default function nuxtSvgSpritemap(appConfig) {
  const {
    path2svg = 'assets/svg',
    outputFilename = 'spritemap.svg',
    dirSeparator = dirSep,
    logStat = false,
    transform = null,
  } = appConfig;
  dirSep = dirSeparator;

  return {
    name: 'nuxt-svg-spritemap',
    buildStart() {
      const path2Spritemap = path.resolve(`./public/${outputFilename}`);
      const { spritemapStr, sprites } = buildSpriteMap(path2svg);

      injectSpriteMap(
        path2Spritemap,
        transform !== null ? transform(spritemapStr) : spritemapStr
      );

      if (logStat) {
        console.log(`Spritemap builded, finded "${sprites.length}" svg files`);
      }
    },
  };
}
