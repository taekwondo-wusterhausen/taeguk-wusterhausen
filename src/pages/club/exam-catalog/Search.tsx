import { initModals } from 'flowbite/lib/esm/components/modal'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useRef, useState } from 'react'

import { NormalizedSection, SEARCH_KEY, SearchResult } from './types'
import { flattenedSections, search } from './utils'

const MIN_MATCH_CHAR_LENGTH = 4
const MAX_BREADCRUMB_LENGTH = 77 // + '...

interface Props {
    sections: NormalizedSection[]
    formId?: string
    inputId?: string
    resultsId?: string
}

function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
    return (
        <nav
            className="flex px-1 py-1 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center truncate">
                {crumbs.map((crumb, index) => (
                    <li
                        key={crumb}
                        // className={`max-w-[${Math.round(100 / crumbs.length)}%]`}
                    >
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

function ResultLink({
    result,
    isLast,
}: {
    result: SearchResult
    isLast: boolean
}) {
    return (
        <a
            href={`#${result.id}`}
            className={
                'block w-full px-4 py-2 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600 ' +
                (isLast ? 'rounded-b-lg' : '')
            }
            onClick={() => window.location.reload()}
        >
            <Breadcrumbs crumbs={result.breadcrumbs} />
            <p
                className="text-sm py-1"
                dangerouslySetInnerHTML={{ __html: result.preview }}
            />
        </a>
    )
}

function NoResults(props) {
    return (
        <div className="px-4 py-2 border-b rounded-b-lg text-sm text-gray-500 border-gray-200 dark:bg-gray-800 dark:border-gray-600 cursor-not-allowed">
            Noch keine Suchergebnisse...
        </div>
    )
}

/**
 * Search component
 */
export function Search(props: Props) {
    const {
        sections,
        formId = 'searchForm',
        inputId = 'searchInput',
        resultsId = 'searchResults',
    } = props

    const searchInputRef = useRef<HTMLInputElement>(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const fuse = useMemo(
        () =>
            new Fuse(flattenedSections(sections), {
                // isCaseSensitive: false,
                includeScore: true,
                // shouldSort: false,
                includeMatches: true,
                findAllMatches: true,
                minMatchCharLength: MIN_MATCH_CHAR_LENGTH,
                // location: 0,
                // threshold: 0.6,
                // distance: 2000,
                useExtendedSearch: true,
                ignoreLocation: true,
                // ignoreFieldNorm: true,
                // fieldNormWeight: 1,
                keys: [SEARCH_KEY],
            }),
        [],
    )

    useEffect(() => {
        initModals()
    }, [])

    return (
        <>
            {/* Modal toggle */}
            <button
                data-modal-target="searchModel"
                data-modal-toggle="searchModel"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => searchInputRef.current.focus()}
            >
                Katalog durchsuchen
            </button>
            {/* Main modal */}
            <div
                id="searchModel"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full not-prose"
            >
                <div className="relative w-full max-w-2xl max-h-full h-full overflow-y-hidden">
                    {/* Modal content */}
                    <div className="relative max-h-full h-full overflow-y-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="border-b rounded-t-lg dark:border-gray-600">
                            {/* Search bar */}
                            <form
                                id={formId}
                                className="w-full"
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    const results = search(fuse, query)
                                    setResults(results)
                                }}
                            >
                                {/* <label
                                    htmlFor={inputId}
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label> */}
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        // type="search"
                                        type="text"
                                        ref={searchInputRef}
                                        id={inputId}
                                        value={query}
                                        onChange={(event) => {
                                            const input = event.target //as HTMLInputElement
                                            setQuery(input.value)
                                        }}
                                        className="block w-full p-4 pl-10 text-gray-900 border border-white rounded-t-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="z. B. Il-Jang"
                                        required
                                    />
                                    {/* <button
                                    type="submit"
                                    id={buttonId}
                                    className="text-white absolute right-10 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:dark:bg-blue-500 disabled:cursor-not-allowed"
                                    disabled>Suchen</button
                                > */}
                                    {/* Close button */}
                                    <button
                                        type="button"
                                        className="absolute top-[13px] right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="searchModel"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Modal body */}
                        <div className="relative max-h-full h-[calc(100%-58px)] overflow-y-auto">
                            <div id={resultsId} className="rounded-b-lg">
                                {results.length === 0 ? (
                                    <NoResults />
                                ) : (
                                    results.map((result, index) => (
                                        <ResultLink
                                            key={result.breadcrumbs.join('-')}
                                            result={result}
                                            isLast={
                                                index === results.length - 1
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
