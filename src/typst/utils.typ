// Narrow no-break space
// https://en.wikipedia.org/wiki/Non-breaking_space#Width_variation
#let thinsp = [\u{202F}]
#let dh = [d.#thinsp\h.]
#let Dh = [D.#thinsp\h.]
#let zB = [z.#thinsp\B.]
#let ZB = [Z.#thinsp\B.]
#let eV = [e.#thinsp\V.]

#let public-dir = "../../public/"
#let pub-img(path, ..args) = {
    image(public-dir + path, ..args)
}

// https://github.com/typst/typst/discussions/1069#discussioncomment-8040136
#let img-right(
    text,
    img,
    img-width: 50%,
    justify: true,
) = {
    grid(
        columns: (1fr, img-width),
        column-gutter: 1em,
        par(justify: justify, text),
        img,
    )
}
// #img-right(lorem(100), square(height: 200pt, width: 200pt), bottomtext: lorem(100))

#let incomplete = text(fill: red)[*_HINWEIS: Noch unvollständig!_*]
