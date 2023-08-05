import { HASH_PREFIX } from '@components/utils'
import { SearchResult } from './types'

const MAX_BREADCRUMB_LENGTH = 77 // + '...

export function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
    return (
        <nav
            className="flex px-1 py-1 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center truncate">
                {crumbs.map((crumb, index) => (
                    <li key={crumb}>
                        <div className="flex items-center">
                            {
                                // Chevron right between items
                                index > 0 && (
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                )
                            }
                            <span className="ml-1 md:ml-2 text-xs font-medium text-gray-700 dark:text-gray-400">
                                {crumb.length > MAX_BREADCRUMB_LENGTH
                                    ? crumb.slice(0, MAX_BREADCRUMB_LENGTH) +
                                      '...'
                                    : crumb}
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export function ResultLink({
    result,
    isLast,
}: {
    result: SearchResult
    isLast: boolean
}) {
    return (
        <a
            href={`#${HASH_PREFIX}${result.id}`}
            className={
                'block w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600 ' +
                (isLast ? 'rounded-b-lg' : '')
            }
            // We must reload to trigger jumping to the correct section.
            // `setTimeout` is needed in order to set the correct hash (above) first.
            onClick={() => setTimeout(() => window.location.reload())}
        >
            <Breadcrumbs crumbs={result.breadcrumbs} />
            <p
                className="text-sm py-1"
                dangerouslySetInnerHTML={{ __html: result.preview }}
            />
        </a>
    )
}

export function NoResults(_props: any) {
    return (
        <div className="px-4 py-2 text-center text-gray-500 border-gray-200 dark:bg-gray-800 dark:border-gray-600">
            Gib einen Suchbegegriff ein und drücke Enter.
        </div>
    )
}

export function Button(
    props: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
) {
    return (
        <button
            className="block text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
            type="button"
            {...props}
        >
            Katalog durchsuchen
        </button>
    )
}
