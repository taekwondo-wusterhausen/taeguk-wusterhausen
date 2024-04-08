import { initModals } from 'flowbite/lib/esm/components/modal'
import Fuse from 'fuse.js'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import type {
    NormalizedSection,
    SEARCH_KEY,
    SearchResult,
} from '@pages/rules/exam-catalog/types'
import { flattenedSections, search } from '@pages/rules/exam-catalog/utils'
import { Button, NoResults, ResultLink } from './SearchComponents'

const MIN_MATCH_CHAR_LENGTH = 4

interface Props {
    sections: NormalizedSection[]
    formId?: string
    inputId?: string
    resultsId?: string
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
                shouldSort: false, // Keep order from 10th Kup to 1st Dan
                includeMatches: true,
                findAllMatches: true,
                minMatchCharLength: MIN_MATCH_CHAR_LENGTH,
                useExtendedSearch: true,
                ignoreLocation: true,
                keys: [SEARCH_KEY],
            }),
        [],
    )

    useLayoutEffect(() => {
        // See index.astro
        document.querySelector('#staticSearchButton').classList.add('hidden')
    }, [])
    useEffect(() => {
        initModals()
    }, [])

    return (
        <>
            <Button
                data-modal-target="searchModal"
                data-modal-toggle="searchModal"
                onClick={() => searchInputRef.current.focus()}
            />
            <div
                id="searchModal"
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
                                            const input = event.target
                                            setQuery(input.value)
                                        }}
                                        className="block w-full p-4 pl-10 text-gray-900 border border-white rounded-t-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="z. B. Il-Jang"
                                        required
                                    />
                                    {/* Close button */}
                                    <button
                                        type="button"
                                        className="absolute top-[13px] right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="searchModal"
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
