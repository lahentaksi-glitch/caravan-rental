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
      "Nouto arkisin klo 9–18 ja lauantaisin klo 10–15, ellei toisin sovita. Palautus yleensä sunnuntai-iltaan mennessä klo 18. Joustavat ajat ovat mahdollisia sesongin ulkopuolella — kysy rohkeasti.",
  },
  {
    id: "cleaning",
    question: "Pitääkö laitteen siivota palautuksen yhteydessä?",
    answer:
      "Asuntovaunu palautetaan siistissä kunnossa: roskat tyhjennetty, astiat pestyt ja lattiat imuroitu. Paljuvaunulle voit tilata loppusiivouksen (+30 €) tai tyhjentää ja huuhtele itse ohjeidemme mukaan.",
  },
];
