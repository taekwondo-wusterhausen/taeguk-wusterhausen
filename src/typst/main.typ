#import "template.typ": project
#import "utils.typ": *

#show: project.with(
  title: "Vereinshefter Taeguk e. V.",
  subtitle: "",
  author: "Taeguk e. V.",
  abstract: [
      ...
  ],
)

#include "01-vereinsregeln.typ"
#pagebreak()
#include "02-flagge.typ"
#pagebreak()
#include "03-woerterbuch.typ"
#pagebreak()
#include "04-pruefungsinhalte.typ"
#pagebreak()
#include "05-poomse.typ"
#pagebreak()
#include "06-ilbo-taeryon.typ"
#pagebreak()
#include "07-notwehr.typ"
#pagebreak()
#include "08-hosinsul.typ"
