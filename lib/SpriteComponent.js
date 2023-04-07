import { defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      default: '',
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
        h('use', { 'xlink:href': `#${props.name}` })
      );
  },
});
