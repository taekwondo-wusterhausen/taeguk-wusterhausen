/**
 * Transforms the given string into a valid identifier.
 */
export function toId(str: string): string {
    const alphanum = str.replace(/[^\d\w]/g, '_')
    // Make sure, it doesn't start with numbers.
    return alphanum.replace(/^(\d)/, '_$1')
}
