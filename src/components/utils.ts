export const HASH_PREFIX = '_'
export const ID_SEPARATOR = '--'
export const HEADING_PREFIX = 'accordion-collapse-heading--'
export const BODY_PREFIX = 'accordion-collapse-body---'

/**
 * Transforms the given string into a valid identifier.
 */
export function toId(str: string): string {
    const alphanum = str.replace(/[^\d\w]/g, '_')
    // Make sure, it doesn't start with numbers.
    return alphanum.replace(/^(\d)/, '_$1')
}

export function accordionId(titles: string[]): string {
    return titles.map(toId).join(ID_SEPARATOR)
}

export function tabId(title: string): string {
    return `${toId(title)}-tab`
}

export type DateTuple = [number, number, number]

/**
 * Parses an event date from dates.md, e.g. '14.02.', '07./08.03.',
 * '16. - 21.10.' or '30.12. - 02.01.', into inclusive start/end dates.
 * Missing months are taken from the next part.
 */
export function parseEventDate(
    date: string,
    year: number,
): { start: DateTuple; end: DateTuple } {
    const parts = (date.match(/\d+\.(\d+\.)?/g) ?? []).map((part) =>
        part.split('.').map((n) => parseInt(n, 10)),
    )
    for (let i = parts.length - 2; i >= 0; i--) {
        if (Number.isNaN(parts[i][1])) {
            parts[i][1] = parts[i + 1][1]
        }
    }
    const [startDay, startMonth] = parts[0]
    const [endDay, endMonth] = parts[parts.length - 1]
    return {
        start: [year, startMonth, startDay],
        // Event crossing new year
        end: [endMonth < startMonth ? year + 1 : year, endMonth, endDay],
    }
}

/** [2026, 3, 7] => '2026-03-07' */
export function toIsoDate([year, month, day]: DateTuple): string {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0',
    )}`
}
