#import "utils.typ": *

= Ursprung und Bedeutung der Flagge von Südkorea

// #align(right, pub-img("skorea_flag.svg", width: 50%))
#img-right(
    [Die Flagge der heutigen Republik Süd-Korea, die bereits im Jahre 1883 offiziell eingeführt wurde, wird in der koreanischen Sprache *Tae Geuk Ki* (Tae: Größe. Geuk: Ewigkeit) genannt. Sie selbst enthält noch vieles von der Philosophie und Mystik Asiens. Die Tae Geuk Ki ist korrekt aufgehängt, wenn das Symbol Kien in Form von drei ununterbrochenen Strichen links oben steht.],
    rect(pub-img("skorea_flag.svg")),
    img-width: 5cm,
)

Die Flagge der heutigen Republik Süd-Korea, die bereits im Jahre 1883 offiziell eingeführt wurde, wird in der koreanischen Sprache *Tae Geuk Ki* (Tae: Größe. Geuk: Ewigkeit) genannt. Sie selbst enthält noch vieles von der Philosophie und Mystik Asiens. Die Tae Geuk Ki ist korrekt aufgehängt, wenn das Symbol Kien in Form von drei ununterbrochenen Strichen links oben steht.

Im Zentrum der Flagge befindet sich ein Kreis, bestehend aus zwei ineinander verschlungenen Tropfen in Rot und Blau, die die Urkräfte Yin (rot) und Yang (blau) darstellen. Yin und Yang, Begriffe aus dem Taoismus, stehen für die polarisierenden Kräfte des Universums, die sich stets ergänzen und nur zusammen als Kreis ein Ganzes bilden. Die beiden Kräfte stehen ständig in Bewegung. Wächst die Eine, schwindet die Andere, das Werden steht im Zentrum. Es herrscht ein dauernder Spannungszustand. Symbolhaft können das Männliche und das Weibliche, das Schwache und das Starke oder das Positive und das Negative für die beiden Urkräfte angesehen werden.

Damit wird der zentrale Gedanke ausgedrückt, dass trotz einer ständigen Bewegung innerhalb der Sphäre der Unendlichkeit, Ausgewogenheit und Harmonie herrschen.

Das dauernde durch die beiden Urkräfte getragene Werden, wird umschlossen von Elementen, von denen vier Elemente als Symbol das Yin-Yang-Zeichen umgeben.

Vier dieser Symbole. so genannte Trigramme, die auf koreanisch Kwae genannt werden, zieren die Flagge Süd-Koreas:

- oben links befindet sich _Kien_, das Schöpferische, dargestellt durch drei gerade Striche. Die Eigenschaft des _Kien_ ist die Stärke, es steht symbolhaft für den Himmel oder den Vater.
- unten links befindet sich _Li_, das Haftende, in der Mitte ist ein durchbrochener Strich. Die Eigenschaft des _Li_ ist das Licht, es steht für Feuer oder für die zweite Tochter.
- oben rechts befindet sich _Kan_, das Abgründige, nur der mittlere Strich ist durchgängig. Die Eigenschaft des _Kan_ ist das Wasser, es steht für die Gefahr oder den zweiten Sohn der Familie
- unten rechts befindet sich _Kun_, das Empfangende, es hat sechs halbe Stiche. _Kun_ steht für das Element der Erde und steht symbolhaft für die Hingabe.

Die Farbe Weiß steht für die Reinheit der Gedanken, ist aber auch die traditionelle Farbe der koreanischen Nation.

#let map = (kien: "il", li: "sam", kan: "yuk", kun: "pal")
#let i(sym) = pub-img(
    "poomse/" + map.at(sym) + "-jang.gif",
    width: 16mm,
)
#figure(
    table(
        columns: 4,
        inset: 6pt,
        align: left,
        [*Symbol*], [*Name*], [*Elemente*], [*Eigenschaft*],
        i("kien"), [_Kien_ \ (das Schöpferische)], [Himmel / Luft], [Stärke],
        i("li"), [_Li_ \ (das Haftende)], [Licht], [die zweite Tochter / Feuer],
        i("kan"), [_Kan_ \ (das Abgründige)], [Wasser], [der zweite Sohn / Gefahr],
        i("kun"), [_Kun_ \ (das Empfangende)], [Erde], [Hingabe],
    ),
    caption: [Flaggensymbole],
)
