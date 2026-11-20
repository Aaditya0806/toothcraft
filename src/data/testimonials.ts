/**
 * Patient testimonials published on toothcrafts.com ("International Patient
 * Testimonials"). Wording is the patients' own, lightly edited for spelling,
 * punctuation and length. Names of third parties mentioned in the originals
 * have been left out. No star ratings are shown because none were published.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  treatment?: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "syed",
    quote:
      "We had come to Chennai for dental treatment and I somehow landed up in your clinic. You completed the entire treatment with no pain. I'm very happy after the treatment — now I have very good teeth. My wife says she will marry me again with these teeth.",
    name: "Mr. Syed Al Ajmer Fazullah",
    location: "Iraq",
    image: "/images/patients/syed-al-ajmer-fazullah.png",
  },
  {
    id: "antony",
    quote:
      "It's been one year since I visited you for fixing my teeth. Now, after one year, my teeth look strong and I am able to eat all kinds of food. I am happy that I have done the treatment with you, and I will happily refer my friends.",
    name: "Mr. Antony Arull Doss",
    location: "USA",
    image: "/images/patients/antony-arull-doss.png",
  },
  {
    id: "alima",
    quote:
      "I have undergone root canal treatment and teeth fixation in your clinic. I was worried about the pain during root canal treatment, but as you promised, you completed the entire treatment very fast and with no pain. Your team was also very kind and warm — I appreciate it very much.",
    name: "Miss Sajid Alima",
    location: "Iraq",
    treatment: "Root canal treatment",
    image: "/images/patients/sajid-alima.png",
  },
  {
    id: "sajid",
    quote:
      "Your power bleaching to whiten my teeth was done very effectively, and very cost-effectively when compared to other clinics I know. My teeth look really bright. Good job, Doctor.",
    name: "Mr. Sajid Ali",
    location: "Muscat",
    treatment: "Teeth whitening",
    image: "/images/patients/sajid-ali.png",
  },
  {
    id: "haj",
    quote:
      "My wife and I both underwent dental treatment with you. Now we are very happy with your treatment and patient care. Thank you, Doctor.",
    name: "Mr. Haj Anwar Maqzood",
    location: "Oman",
    image: "/images/patients/haj-anwar-maqzood.png",
  },
];
