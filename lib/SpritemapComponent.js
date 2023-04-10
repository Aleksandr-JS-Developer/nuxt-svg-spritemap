import { defineComponent, h } from 'vue';

export default (path2Spritemap) => {
  return defineComponent({
    async setup() {
      const spritemap = await import(`${path2Spritemap}?raw`);

      return () => h('div', {}, spritemap);
    },
  });
};
