import type Fuse from 'fuse.js'

import { tabId as _tabId, accordionId, toId } from '@components/utils'
import {
    type Content,
    type NormalizedSection,
    SEARCH_KEY,
    type SearchResult,
    type SearchableSection,
    type Section,
} from './types'

export function tabId(section: Section): string {
    return _tabId(section.title)
}

// ****************************************************************************
// SECTION-RELATED FUNCTIONS

export function normalizedSection(
    section: Section,
    parents: Section[],
): NormalizedSection {
    if (section.parentTitles?.length) {
        throw new Error('Section already has `parentTitles`')
    }
    return {
        content: [], // Make sure it's not `undefined`
        ...section,
        sections: (section.sections ?? []).map((subSection) =>
            normalizedSection(subSection, [...parents, section]),
        ),
        id: toId(section.title),
        parentTitles: parents.map((parent) => parent.title),
    }
}

export function stringifyContent(content: Content): string {
    if (content === undefined) {
        return ''
    }
    if (Array.isArray(content)) {
        return content.map(stringifyContent).join(' ')
    }
    const asText = (value: string | Content[]) =>
        typeof value === 'string' ? value : stringifyContent(value)
    if ('href' in content) {
        return content.text
    }
    if ('text' in content) {
        return asText(content.text)
    }
    if ('par' in content) {
        return asText(content.par)
    }
    if ('heading' in content) {
        return asText(content.heading)
    }
    if ('enumerate' in content) {
        return content.enumerate.map(stringifyContent).join('\n- ')
    }
    if ('itemize' in content) {
        return content.itemize.map(stringifyContent).join('\n- ')
    }
    const { head = [], body } = content.table
    return [...head, ...body]
        .map((row) => row.map(stringifyContent).join(' '))
        .join('\n')
}

export function flattenedSections(
    nestedSections: NormalizedSection[],
): SearchableSection[] {
    const flatSections: SearchableSection[] = []
    nestedSections.forEach(({ id, title, content, parentTitles, sections }) => {
        flatSections.push(
            {
                id,
                title,
                parentTitles,
                stringified: `${title}\n\n${content.map(stringifyContent).join('\n\n')}`,
            },
            ...flattenedSections(sections),
        )
    })
    return flatSections
}

// ****************************************************************************
// SEARCH-RELATED FUNCTIONS

export function highlightMatches(
    value: string,
    indices: readonly [number, number][],
    highlightMatch: (match: string) => string = (match) =>
        `<strong>${match}</strong>`,
    maxContextBefore: number = 40,
    maxContextAfter: number = 30,
): string {
    let result = ''
    let lastMatchEnd = 0

    for (const [start, end] of indices) {
        // Beginning to first match
        if (result.length === 0) {
            let contextBefore = value.slice(0, start)
            if (contextBefore.length > maxContextBefore) {
                contextBefore =
                    '... ' +
                    wholeWordContext(
                        contextBefore.slice(-maxContextBefore),
                        'before',
                    )
            }
            result += contextBefore
        }
        // Last match to next match
        if (lastMatchEnd) {
            let context = value.slice(lastMatchEnd, start)
            // So long that we put the ellipsis in the middle
            if (context.length > maxContextAfter + maxContextBefore) {
                context =
                    wholeWordContext(
                        context.slice(0, maxContextAfter),
                        'after',
                    ) +
                    ' ... ' +
                    wholeWordContext(context.slice(-maxContextBefore), 'before')
            }
            result += context
        }
        // Match
        result += highlightMatch(value.slice(start, end + 1))
        lastMatchEnd = end + 1
    }

    let contextAfter = value.slice(lastMatchEnd)
    if (contextAfter.length > maxContextAfter) {
        contextAfter =
            wholeWordContext(contextAfter.slice(0, maxContextAfter), 'after') +
            ' ...'
    }
    result += contextAfter
    return result
}

/**
 * Makes sure the (search) context starts/ends at a word boundary
 * (excluding line breaks). E.g. for a "before context" the first word is dropped,
 * even if it's coincidentally a whole word.
 */
function wholeWordContext(text: string, kind: 'before' | 'after'): string {
    const parts = text.replace(/\n+/g, '<br>').split(/\s+/g)
    switch (kind) {
        case 'before':
            return parts.slice(1).join(' ')
        case 'after':
            return parts.slice(0, -1).join(' ')
    }
}

export function search(
    fuse: Fuse<SearchableSection>,
    query: string,
): SearchResult[] {
    // '<query> matches string containing the query (not fuzzy)
    const results: Fuse.FuseResult<SearchableSection>[] = fuse.search(
        `'"${query}"`,
    )
    return results.map(({ item, matches = [] }) => ({
        id: accordionId([...item.parentTitles, item.title]),
        breadcrumbs: [...item.parentTitles, item.title],
        preview: highlightMatches(item[SEARCH_KEY], matches[0].indices),
    }))
}
