#import "utils.typ": *

#let cell-tl = body => table.cell(inset: (top: 0pt, left: 0pt), body)
#let cell-tr = body => table.cell(inset: (top: 0pt, right: 0pt), body)
#let cell-bl = body => table.cell(inset: (bottom: 0pt, left: 0pt), body)
#let cell-br = body => table.cell(inset: (bottom: 0pt, right: 0pt), body)
#let cell-l = body => table.cell(inset: (left: 0pt), body)
#let cell-r = body => table.cell(inset: (right: 0pt), body)


= Freikampf

#table(
  columns: (75%, 1fr),
  stroke: none,
  align: (left, right),
  inset: (x: 0pt),
  [*Prüfungsrelevante Auszüge aus der DTU-Wettkampfordnung WOT*], text(size: 9pt)[*Stand: 01.05.2024*],
)

#table(
  columns: (35%, 1fr),
  inset: 8pt,
  [Kampfkleidung], [Dobok, Ty, komplette Schutzausrüstung],
  [Schutzausrüstung], [Weste, Kopfschutz, Tiefschutz, Zahnschutz oben (bei fester Zahnspange oben und unten) / Unterarm- und Schienbeinschutz, #linebreak() Jugend B / C / D ohne elektronisches System zusätzlich Fußschützer],
  [Fuß- und Fingernägel], [kurz geschnitten],
  [Kampffläche], [grundsätzlich Oktagon Ø #si-unit(8, "m") inkl. Grenzlinie #si-unit("0,6", "m")],
  [Kampfzeit], table(
    columns: 2,
    stroke: none,
    cell-tl[Jugend A / Damen / Herren:], cell-tr[3 x #si-unit(2, "min"), Pause #si-unit(1, "min")],
    cell-bl[Jugend B / C / D:], cell-br[3 x #si-unit("1,5", "min"), Pause #si-unit(1, "min")],
  ),
  [Zutritt Startpunkt], [Kopfschutz unter linkem Arm, Gesicht zum Gegner, bei elektronischem System Hardware-Test, Kommandos "Charyot" (Achtung) / "Kyeong-rye" (Verbeugen)],
  [Kampfbeginn], [Kommandos "Junbi" (Achtung) / "Shijak" (Start)],
  [Rundenende], [Kommando "Keuman" (Ende)],
  [Kampfende], [Kommandos "Charyot" (Achtung) / "Kyeong-rye (Verbeugen)Kopfschutz selbständig abnehmen, Ergebnis abwarten],
  [Siegerbekanntgabe], table(
    columns: (25%, 1fr),
    // align: (left, right),
    stroke: none,
    cell-tl[Kommandos], cell-tr["Hong Seung" (rot gewinnt)],
    cell-bl[], cell-br["Chung Seung" (blau gewinnt)],
  ),
  [erlaubte Techniken], [
    - Faust (Knöchel Zeige- / Mittelfinger) gestreckt und gerade
    - Fuß (Teile unterhalb des Fußknöchels)
  ],
  [Trefferpunkte], [blau / rot gekennzeichnete Teile der Schutzwestegesamter Kopf oberhalb Schlüsselbein - Ausnahme Hinterkopf],
  [Punktevergabe #linebreak() (nur erlaubte / kraftvolle Techniken)], table(
    columns: 2,
    stroke: none,
    cell-tl[1 Punkt:], cell-tr[Treffer Kampfweste Faust],
    cell-l[2 Punkte:], cell-r[Treffer Kampfweste Tritt],
    cell-l[4 Punkte:], cell-r[Drehtritt Kampfweste],
    cell-l[3 Punkte:], cell-r[Kopftreffer],
    cell-bl[5 Punkte:], cell-br[Drehtritt Kopf],
  ),
  [Strafe bei Regelverstoß], [Gam-jeom (Strafpunkt) - 1~Gam-jeom wird als Pluspunkt für den Gegner gewertet],
  [
    verbotene Handlungen
    #linebreak()
    - bei 5 Strafpunkten in einer Runde ist diese verloren
    - bei insgesamt 10 Strafpunkten ist der Kampf verloren
  ], [
    + ein Fuß übertritt Grenzlinie
    + Wettkämpfer stürzt
    + Kampf wird vermieden / verzögert (mehr als #si-unit(3, "s") / 3 Steps)
    + Frage nach Kampfunterbrechung, um Equipment zu richten
    + Fassen / Festhalten / Klammern / Schieben
    + Anheben des Beins zum Block
    + absichtlicher Angriff unterhalb der Hüfte
    + Kopfstoß oder Angriff mit dem Knie
    + Schläge zum Gesicht (Faust / Hand / Arm / Ellenbogen)
    + unsportliches Verhalten (Verzögerung / Beeinflussung / Kritik am Kampfleiter / körperliches o. verbales Missverhalten)
    + Anheben des Knies, um Angriff zu ver- oder behindern
    + absichtlicher Angriff nach Kampfunterbrechung
    + Angriff auf am Boden liegenden Gegner
    + absichtliches Werfen des Gegners
    + absichtlicher Angriff mit Faust / Hand zum Kopf (Aufwärtsschlag / Angriff aus Nahdistanz)
    + Behinderung des Kampfes von Kämpfer oder Coach (Coach verlässt Platz o. betritt Matte / Beleidigung Kampfleitung)
    + grobes unsportliches Verhalten
    + absichtliches Vermeiden des Kampfes (Gegner den  Rücken zudrehen oder weglaufen)
  ],
  [
    Kampfmodus #linebreak()
    - aktuell grundsätzlich Best-of-Three
  ], [Der Kampf ist grundsätzlich beendet, sobald ein Wettkämpfer 2 Runden für sich entscheiden konnte, da der andere Wettkämpfer diesen Vorsprung nicht mehr aufholen kann.],
  [
    Kampfmodus #linebreak()
    - altes System Sieg nach Punkten
  ], [Bei absolutem Gleichstand nach regulärer Kampfzeit folgt eine 4. Runde, die mit dem zweiten gültigen Punkt (Golden Point) beendet ist (zu Beginn Runde 4 werden alle Punkte und Verwarnungen gestrichen). #linebreak() Alternativ verliert derjenige, welcher zuerst 2 Gam-jeoms erhält.],
  [mögliche Kampfergebnisse vor Ende der regulären Kampfzeit], [
    Sieg durch / nach
    + KO
    + Kampfleiter-Abbruch (techn. KO)
    + Punkten
    + 12-Punkte-Unterschied (nur Best-of-Three)
    + 20-Punkte-Unterschied (erst nach 2. Runde)
    + Überlegenheit (nach 4. Runde)
    + Aufgabe
    + Disqualifikation durch unsportliches Verhalten
    + Strafmaßnahmen des Kampfleiters (gelbe Karte)
    + insgesamt 10 Strafpunkte
  ],
  [Wettkampf-Kommandos], table(
    columns: 2,
    stroke: none,
    cell-tl[Chung], cell-tr[Blau],
    cell-l[Hong], cell-r[Rot],
    cell-l[Cha-ryeot], cell-r[Achtung],
    cell-l[Kyeong-rye], cell-r[Verbeugen],
    cell-l[Tscha-u-yang-u], cell-r[Drehen],
    cell-l[Junbi], cell-r[Fertig (Kampfstellung)],
    cell-l[Shi-jak], cell-r[Start],
    cell-l[Kal-yeo], cell-r[Trennen],
    cell-l[Keu-man], cell-r[Stop / Ende],
    cell-l[Kye-sok / Fight], cell-r[Kämpfen / Weiterkämpfen],
    cell-l[Kye-shi], cell-r[Zeitstop für max. 1 Minute],
    cell-l[Shi-gan], cell-r[unbegrenzter Zeitstop],
    cell-l[Joo-eui], cell-r[Ermahnung],
    cell-l[Gam-jeon], cell-r[Strafpunkt],
    cell-l[Chung Seung], cell-r[Blau gewinnt],
    cell-l[Hong Seung], cell-r[Rot gewinnt],
    cell-bl[Bi Kim], cell-br[Punktegleichstand / Unentschieden],
  ),
)
