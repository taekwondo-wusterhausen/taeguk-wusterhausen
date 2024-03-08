export type Only = {
    only?: 'web' | 'pdf'
}
export type Text = Only & {
    text: string | Content[]
    break?: boolean
    bold?: boolean
    italic?: boolean
    underline?: boolean
}
export type Heading = Only & {
    heading: string | Content[]
    level: 1 | 2 | 3 | 4 | 5 | 6
}
export type Link = Only & {
    href: string | Content[]
    text: string
}
export type Par = Only & { par: string | Content[] }

export type Content =
    | (Only & Content[])
    | Text
    | Heading
    | Link
    | Par
    | (Only & { enumerate: Content[] })
    | (Only & { itemize: Content[] })
    | (Only & { table: { head?: Content[][]; body: Content[][] } })
    | undefined

export interface Section extends Only {
    title: string
    isFirst?: boolean
    isLast?: boolean
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
