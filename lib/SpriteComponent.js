import { defineComponent, h } from 'vue';

export default (path2Spritemap = '') =>
  defineComponent({
    props: {
      name: {
        type: String,
        require: true,
      },
      color: {
        type: String,
        default: '',
      },
      base: {
        type: String,
        default: path2Spritemap,
      },
    },
    setup(props) {
      return () =>
        h(
          'svg',
          {
            style: props.color
              ? {
                  color: props.color,
                }
              : {},
          },
          h('use', { 'xlink:href': `${props.base}#${props.name}` })
        );
    },
  });
