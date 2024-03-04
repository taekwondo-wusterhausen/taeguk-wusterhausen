export type Text = {
    text: string
    break?: boolean
    bold?: boolean
    italic?: boolean
    underline?: boolean
}
export type Heading = { heading: string; level: 1 | 2 | 3 | 4 | 5 | 6 }

export type Content =
    | Content[]
    | Text
    | Heading
    | { par: string }
    | { enumerate: Content[] }
    | { itemize: Content[] }
    | { table: { head?: Content[][]; body: Content[][] } }
    | undefined

export interface Section {
    title: string
    isFirst: boolean
    isLast: boolean
    colors?: [string, string]
    icon?: string
    parentTitles?: string[]
    content?: Content[]
    sections?: Section[]
}

export interface NormalizedSection extends Section {
    id: string
    parentTitles: string[]
    content: Content[]
    // stringifiedContent: string
    sections: NormalizedSection[]
}

export const SEARCH_KEY = 'stringified'

export type SearchableSection = Pick<
    NormalizedSection,
    'id' | 'title' | 'parentTitles'
> & {
    [SEARCH_KEY]: string
}

export type SearchResult = {
    id: string
    breadcrumbs: string[]
    preview: string
}
