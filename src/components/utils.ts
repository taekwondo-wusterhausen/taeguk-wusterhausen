/**
 * Transforms the given string into a valid identifier.
 */
export function toId(str: string): string {
    const alphanum = str.replace(/[^\d\w]/g, '_')
    // Make sure, it doesn't start with numbers.
    return alphanum.replace(/^(\d)/, '_$1')
}

export const ID_SEPARATOR = '--'
export const BODY_PREFIX = 'accordion-collapse-body---'

// TODO: rename
export function accordionId(titles: string[]): string {
    return titles.map(toId).join(ID_SEPARATOR)
}

export function tabId(title: string): string {
    return `${toId(title)}-tab`
}

export function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.innerText || ''
}
