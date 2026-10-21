import type { FaqItem } from "@/types/rental";

export const faqItems: FaqItem[] = [
  {
    id: "b-license",
    question: "Tarvitsenko erillisen ajokortin vaunun vetämiseen?",
    answer:
      "Ei. Molemmat vuokrakohteet ovat vetettävissä tavallisella B-ajokortilla, kun kokonaispaino pysyy lain sallimissa rajoissa. Annamme noudossa lyhyen perehdytyksen kytkentään ja turvalliseen ajoon.",
  },
  {
    id: "insurance",
    question: "Miten vakuutus ja omavastuu toimivat?",
    answer:
      "Vuokraan sisältyy vastuuvakuutus. Omavastuu on 800 € vahinkotapahtumaa kohden. Voit halutessasi pienentää omavastuuta 200 €:n lisämaksulla (sovitaan varauksen yhteydessä). Ilmoita vahingosta meille heti.",
  },
  {
    id: "pickup",
    question: "Milloin voin noutaa ja palauttaa laitteen?",
    answer:
      "Noutomahdollisuus sopimuksen mukaan sekä Lahdesta että Pertunmaalta (Penttilänpolku 161, 19430 Pertunmaa). Kuljetuspalvelu alkaen 30 € (Lahti ja Päijät-Häme sekä lähialueet). Paljuvaunun tavanomainen vuokrausaika alkaa klo 14:00 ja päättyy palautuspäivänä klo 12:00, ellei toisin sovita. Yhteydenotot: puhelut, tekstiviestit ja WhatsApp (044 340 2069).",
  },
  {
    id: "cleaning",
    question: "Pitääkö laitteen siivota palautuksen yhteydessä?",
    answer:
      "Asuntovaunu palautetaan siistissä kunnossa: roskat tyhjennetty, astiat pestyt ja lattiat imuroitu. Paljuvaunulle voit tilata loppupesun ja desinfioinnin (+35 €). Jokainen palju desinfioidaan ja pestään huolellisesti ennen seuraavaa luovutusta.",
  },
];
