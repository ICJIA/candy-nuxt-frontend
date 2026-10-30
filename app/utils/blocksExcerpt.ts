type Node = BlockNode | ListItemNode | InlineNode

const nodeText = (node: Node): string =>
  node.type === 'text' ? node.text : (node.children as Node[]).map(nodeText).join('')

// Plain-text summary of a blocks field's paragraphs, cut at a word boundary
export const blocksExcerpt = (blocks: BlockNode[] | null | undefined, maxLength = 160) => {
  const text = (blocks ?? [])
    .filter((block) => block.type === 'paragraph')
    .map(nodeText)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  const cut = text.lastIndexOf(' ', maxLength)
  return `${text.slice(0, cut > 0 ? cut : maxLength).replace(/[\s.,;:]+$/, '')}…`
}
