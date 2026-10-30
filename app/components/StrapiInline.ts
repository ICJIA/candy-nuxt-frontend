import { h, type PropType, type VNodeChild } from 'vue'

// Inline children of a Strapi blocks node: text with marks, and links
export default defineComponent({
  name: 'StrapiInline',
  props: {
    nodes: { type: Array as PropType<InlineNode[]>, required: true },
  },
  setup(props) {
    const render = (nodes: InlineNode[]): VNodeChild[] =>
      nodes.map((node) => {
        if (node.type === 'link') {
          return h('a', { href: safeUrl(node.url) }, render(node.children))
        }
        let child: VNodeChild = node.text
        if (node.code) child = h('code', child)
        if (node.bold) child = h('strong', child)
        if (node.italic) child = h('em', child)
        if (node.underline) child = h('u', child)
        if (node.strikethrough) child = h('s', child)
        return child
      })

    return () => render(props.nodes)
  },
})
