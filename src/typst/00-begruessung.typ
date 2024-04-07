#import "utils.typ": *

#let offset-y = 2cm

#hide[#heading(outlined: true)[Begrüßung]]
// HEADER
#place(dy: -offset-y)[
  #block(
    stroke: (bottom: 0.5pt + black),
    inset: (bottom: 5pt),
    width: 100%,
    // height: 1cm,
    // fill: yellow,
  )[
    #figure(pub-img("logo.png", width: 1in))
    #place(horizon + right)[*Taekwondo Verein \ Taeguk e.~V.*]
  ]

  #table(
    columns: (3.8cm, 1fr, 1fr),
    align: (left, center, right),
    stroke: none,
    inset: 0pt,
    text(size: 8pt)[Fon: #link("tel:+493397913739")[033979 / 13739]],
    text(size: 8pt)[E-Mail: #link("mailto:info@taekwondo-wusterhausen.de")],
    text(size: 8pt)[Internet: #link("https://taekwondo-wusterhausen.de")[taekwondo-wusterhausen.de]]
  )
]
#v(offset-y)


#heading(
  outlined: false,
  text(
    tracking: -0.05pt,
    spacing: 90%,
  )[Herzlich willkommen im Taekwondo Verein Taeguk Wusterhausen e.~V.],
)

Hier erste Hinweise zur Arbeit und Organisation des Vereins:

#set list(marker: [☯])
- Unsere Vereinstrainer heißen Leonie Winkler, Jacqueline Berger und Marko Neuendorf.
- Der Verein ist dem Brandenburger TKD-Landesfachverband TVBB angeschlossen und damit zugleich Mitglied im Bundesverband DTU (Deutsche Taekwondo Union).
- Aufgrund dieser Mitgliedschaften wird bei Aufnahme in den Verein eine einmalige Gebühr von 26,00~€ fällig. Diese wird grundsätzlich an den TVBB weitergereicht, über welchen der DTU-Pass zu beziehen ist. In diesen Ausweis werden Prüfungen, Erfolge usw. eingetragen. Die Aufnahmegebühr wird mit dem ersten Beitrag eingezogen. Für den Pass ist ein *Passbild* nötig. Bitte *beim Vorstand abgeben*.
- Im Januar eines jeden Folgejahres werden 10,00~€ als anteiliger Betrag für die Mitgliedschaft in DTU und TVBB fällig. Dadurch erhöht sich der Januar-Einzug regelmäßig um 10,00~€ gegenüber dem regulären Beitrag. Im Gegenzug wird über eine sog. Jahressichtmarke die DTU-Mitgliedschaft nachgewiesen. Diese wird im 1.~Quartal jedes Jahres in die letzte Seite des DTU-Passes eingeklebt.
- Die DTU-Mitgliedschaft sichert Gürtelprüfungen nach nationalem Standard und ist Voraussetzung für die Teilnahme an von der DTU bzw. deren Landesverbände organisierten Turnieren, Lehrgänge und sonstigen Veranstaltungen.
- Informationen über uns als Verein können über #link("https://taekwondo-wusterhausen.de")[taekwondo-wusterhausen.de], über unseren Landesverband auf dessen Website #link("https://tvbb.info/")[tvbb.info], abgerufen werden. Die DTU verfügt unter #link("https://www.dtu.de/")[www.dtu.de] ebenfalls über ein Internet-Angebot. Ein regelmäßiger Besuch insbesondere unserer Seite ist immer informativ und wird vom Vorstand empfohlen. _Hier findet Ihr auch den Inhalt des Vereinshefters mit vielen Informationen zu unserem Sport und den Prüfungsinhalten!_
- TKD-Sportkleidung und -Zubehör kann neben dem eigenen Kauf auch über den Verein bestellt werden. Über diesen Weg bietet die Firma KWON günstigere Preise an. Bei Bedarf bitte nachfragen.
- Bei allen Fragen einfach die Trainer oder den Vorstand ansprechen.

#linebreak()
#text(size: 13pt)[_Euer Vorstand_]

#place(bottom + center)[
  #block(
    stroke: (top: 0.5pt + black),
    inset: (top: 5pt),
    width: 100%,
  )[
    #set text(size: 6pt)
    #table(
      columns: (1fr, 1fr, 6.7cm),
      align: left,
      inset: 1.5pt,
      stroke: none,
      underline[Vorstand:], underline[Bankverbindung:], underline[Mitglied im:],
      [Marko Neuendorf (Vorsitzender)], [Raiffeisenbank Ostprignitz-Ruppin eG], [Deutsche Taekwondo Union e.~V. (DTU)],
      [Birgit Fenske, Sandra Kruschel], [IBAN: DE29 1606 1938 0005 0530 99], [Taekwondo Verband der Länder Berlin und Brandenburg e.~V. (TVBB)],
      [Jacqueline Berger (Jugendreferentin)], [BIC: #h(1.4mm)GENODEF 1NPP], [Landessportbund Brandenburg e.~V. (LSB)],
      [], [], [Kreissportbund Ostprignitz-Ruppin e.~V. (KSB)],
    )
  ]
]
