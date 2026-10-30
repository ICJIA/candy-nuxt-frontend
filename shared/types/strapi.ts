// Shapes returned by the Strapi 5 REST API for this project's content types.
// Mirrors candy-strapi-linux/src/api/*/content-types/*/schema.json; update both together.

export interface StrapiDocument {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  mime: string
  url: string
}

export interface StrapiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

// Blocks editor (type: "blocks") nodes

export interface TextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface LinkNode {
  type: 'link'
  url: string
  children: TextNode[]
}

export type InlineNode = TextNode | LinkNode

export interface ListItemNode {
  type: 'list-item'
  children: InlineNode[]
}

export interface ListNode {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: (ListItemNode | ListNode)[]
}

export type BlockNode =
  | { type: 'paragraph', children: InlineNode[] }
  | { type: 'heading', level: 1 | 2 | 3 | 4 | 5 | 6, children: InlineNode[] }
  | { type: 'quote', children: InlineNode[] }
  | { type: 'code', children: TextNode[] }
  | { type: 'image', image: StrapiMedia, children: TextNode[] }
  | ListNode

// Content types

export interface Category extends StrapiDocument {
  Name: string
  slug: string | null
  sciences?: Science[]
}

export interface Science extends StrapiDocument {
  Name: string
  slug: string | null
  Description: BlockNode[] | null
  Cover: StrapiMedia | null
  categories?: Category[]
}

export interface Technology extends StrapiDocument {
  Name: string
  slug: string | null
  Description: BlockNode[] | null
  Cover: StrapiMedia | null
}

export interface DefaultSeo {
  id: number
  metaTitle: string
  // Field name is misspelled in the Strapi schema
  metaDesciption: string
  shareImage: StrapiMedia | null
}

export interface Homepage extends StrapiDocument {
  SiteName: string
  favicon: StrapiMedia | null
  // Field name is misspelled in the Strapi schema
  siteDecription: BlockNode[]
  defaultSeo: DefaultSeo | null
}

export interface About extends StrapiDocument {
  Name: string
  // Field name is misspelled in the Strapi schema
  Decription: BlockNode[] | null
}
