export PATH := "./node_modules/.bin:" + env_var('PATH')

TYPST_SRC := "/src/typst"

info:
    just --list

stapler-section SRC DEST:
    @mkdir -p src/typst/include/exam-catalog/
    nunjucks \
        --extension ./nunjucks/filters.cjs \
        --defines src/pages/rules/exam-catalog/data/{{ SRC }}.yml \
        --output src/typst/include/exam-catalog/{{ DEST }}.typ \
        src/typst/templates/section.njk

stapler-exam-catalog:
    #!/usr/bin/env bash
    files=$(ls src/pages/rules/exam-catalog/data/*.yml)
    for f in $files; do
        src=$(basename -s .yml $f)
        dest=${src:3}  # rank[3:]
        just stapler-section $src $dest
    done

stapler-poomse:
    @mkdir -p src/typst/include/poomse/
    nunjucks \
        --defines src/pages/taekwondo/poomse/data.yml \
        --define TYPST_SRC={{ TYPST_SRC }} \
        --output src/typst/include/poomse/overview.typ \
        src/typst/templates/poomse-overview.njk
    nunjucks \
        --defines src/pages/taekwondo/poomse/data.yml \
        --output src/typst/include/poomse/taeguks.typ \
        src/typst/templates/poomse-taeguks.njk

# CMD: "compile" | "watch"
stapler CMD="compile": stapler-exam-catalog stapler-poomse
    typst {{ CMD }} --root=. src/typst/main.typ public/pdfs/vereinshefter.pdf
