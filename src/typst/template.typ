#let BLOCK_SPACING = 1.2em


// The project function defines how your document looks.
// It takes your content and some metadata and formats it.
// Go ahead and customize it to your liking!
#let project(
  title: "",
  subtitle: "",
  author: "",
  course: "",
  abstract: [],
  body,
) = {
  // Set the document's basic properties.
  set document(author: str(author), title: str(title))
  set page(
    numbering: none,
    header: locate(loc => {
      let page-counter = counter(page)
      let current-page = page-counter.at(loc)

      // No header on title page
      if current-page.first() > 1 {
        let headings-selector = (
          heading.where(level: 1)
          .or(heading.where(level: 2))
        )
        let headings = query(headings-selector, loc)
        let headings-on-page = headings.filter(m =>
          page-counter.at(m.location()) == current-page
        )

        let body = ""
        // Prefer headings on the current page
        if headings-on-page.len() > 0 {
          body = headings-on-page.first().body
        } else {
          // Otherwise use previous heading
          let headings-before-page = query(
            headings-selector.before(loc),
            loc,
          )
          body = headings-before-page.last().body
        }
        align(right, emph(body))
        v(-0.5em)
        line(length: 100%, stroke: 0.2pt)
      }
    }),
  )
  // counter(page).update(0)
  set text(font: "Arial", size: 10pt, lang: "de")
  show math.equation: set text(weight: 400)
  set heading(numbering: none)
  // show bibliography: set heading(numbering: "1.")
  set enum(numbering: "1.a.")
  set quote(block: true, quotes: true)

  // Set paragraph spacing.
  show par: set block(above: BLOCK_SPACING, below: BLOCK_SPACING)
  set par(leading: 0.75em, justify: true)

  // // Set run-in subheadings, starting at level 3.
  // Increase top-padding of level-2+ headings
  show heading: it => {
    if it.outlined {
      pad(top: 0.5em, it)
    }
    else {
      it
    }
  }
  set math.mat(gap: 0.66em)


  // Title row.
  align(center)[
    #block(text(weight: 700, 1.7em, title))
    #block(text(weight: 600, 1.25em, subtitle))
  ]

  // Author + course information.
  pad(
    top: 0.5em,
    x: 2em,
    align(center, strong[
      #author \
      #course
    ])
  )

  // Abstract.
  pad(x: 3em, y: 2em)[
    #align(center)[
      #heading(outlined: false, numbering: none)[
        // smallcaps not working for lang="de"
        #text(0.85em)[A]#text(0.65em)[BSTRACT]
      ]
    ]
    #par(justify: true, abstract)
  ]

  // Main body.
  outline(depth: 1)
  pagebreak()
  set page(numbering: "1", number-align: center)
  set par(justify: true)
  //show: columns.with(2, gutter: 1.3em)

  body
}
