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
#include "02-flagge.typ"
#include "03-woerterbuch.typ"
#include "04-pruefungsinhalte.typ"
