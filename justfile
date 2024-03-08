export PATH := "./node_modules/.bin:" + env_var('PATH')

info:
    just --list


stapler-section RANK:
    @mkdir -p src/typst/include/exam-catalog/
    nunjucks \
        --extension ./nunjucks/filters.cjs \
        --defines src/pages/rules/exam-catalog/data/{{ RANK }}.yml \
        --output src/typst/include/exam-catalog/{{ RANK }}.typ \
        src/typst/templates/section.njk

stapler-prepare-exam-catalog:
    #!/usr/bin/env bash
    files=$(ls src/pages/rules/exam-catalog/data/*.yml)
    for f in $files; do
        rank=$(basename -s .yml $f)
        just stapler-section $rank
    done

# CMD: "compile" | "watch"
stapler CMD="compile": stapler-prepare-exam-catalog
    typst {{ CMD }} --root=. src/typst/main.typ public/pdfs/vereinshefter.pdf
