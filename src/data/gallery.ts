/**
 * Smile gallery and clinic tour media.
 * Every photograph here is ToothCraft's own, taken from toothcrafts.com.
 * Treatment labels for the comparison pairs are the ones published with them.
 */
export type ComparisonPair = {
  id: string;
  treatment: string;
  before: string;
  after: string;
};

export const comparisonPairs: ComparisonPair[] = [
  {
    id: "whitening",
    treatment: "Teeth Whitening",
    before: "/images/results/pair-1-before.jpg",
    after: "/images/results/pair-1-after.jpg",
  },
  {
    id: "smile-correction",
    treatment: "Smile Correction",
    before: "/images/results/pair-4-before.jpg",
    after: "/images/results/pair-4-after.jpg",
  },
  {
    id: "teeth-replacement",
    treatment: "Teeth Replacement",
    before: "/images/results/pair-3-before.jpg",
    after: "/images/results/pair-3-after.jpg",
  },
  {
    id: "braces",
    treatment: "Braces",
    before: "/images/results/pair-2-before.jpg",
    after: "/images/results/pair-2-after.jpg",
  },
  {
    id: "dental-implants",
    treatment: "Dental Implants",
    before: "/images/results/pair-5-before.jpg",
    after: "/images/results/pair-5-after.jpg",
  },
];

export type CaseImage = { src: string; width: number; height: number };

/** Side-by-side case photographs from the existing Smile Gallery (before on the left, after on the right). */
export const caseImages: CaseImage[] = [
  { src: "/images/results/case-9.jpg", width: 950, height: 550 },
  { src: "/images/results/case-6.jpg", width: 950, height: 550 },
  { src: "/images/results/case-12.jpg", width: 950, height: 550 },
  { src: "/images/results/case-10.jpg", width: 950, height: 550 },
  { src: "/images/results/case-8.jpg", width: 950, height: 550 },
  { src: "/images/results/case-11.jpg", width: 950, height: 550 },
  { src: "/images/results/case-1.jpg", width: 950, height: 550 },
  { src: "/images/results/case-2.jpg", width: 950, height: 550 },
  { src: "/images/results/case-7.jpg", width: 950, height: 550 },
  { src: "/images/results/case-4.jpg", width: 950, height: 550 },
  { src: "/images/results/case-3.jpg", width: 950, height: 258 },
];

export type TourImage = { src: string; label: string; alt: string; width: number; height: number };

export type TourSet = {
  clinic: "ashok-nagar" | "saidapet" | "mugalivakkam";
  name: string;
  images: TourImage[];
};

export const tourSets: TourSet[] = [
  {
    clinic: "ashok-nagar",
    name: "Ashok Nagar",
    images: [
      {
        src: "/images/clinic/ashok-nagar-reception.jpg",
        label: "Reception",
        alt: "Reception desk beneath the Tooth Craft sign",
        width: 1022,
        height: 684,
      },
      {
        src: "/images/clinic/ashok-nagar-waiting-area.jpg",
        label: "Waiting area",
        alt: "Waiting area with a leather sofa",
        width: 1068,
        height: 714,
      },
      {
        src: "/images/clinic/ashok-nagar-treatment-room-1.jpg",
        label: "Treatment room",
        alt: "Dental chair and equipment in a treatment room",
        width: 1049,
        height: 699,
      },
      {
        src: "/images/clinic/ashok-nagar-treatment-room-3.jpg",
        label: "Treatment room",
        alt: "Bright treatment room with a dental chair",
        width: 1034,
        height: 692,
      },
      {
        src: "/images/clinic/ashok-nagar-treatment-room-2.jpg",
        label: "Dental chair",
        alt: "Close view of a dental chair",
        width: 1045,
        height: 699,
      },
      {
        src: "/images/clinic/ashok-nagar-treatment-room-4.jpg",
        label: "Modern equipment",
        alt: "Dental chair with a monitor and equipment",
        width: 1045,
        height: 699,
      },
      {
        src: "/images/clinic/team-at-reception.jpg",
        label: "Our team",
        alt: "Four members of the ToothCraft team standing at reception",
        width: 950,
        height: 665,
      },
      {
        src: "/images/clinic/ashok-nagar-entrance.jpg",
        label: "Entrance",
        alt: "Clinic entrance with Tooth Craft signage",
        width: 950,
        height: 665,
      },
    ],
  },
  {
    clinic: "saidapet",
    name: "Saidapet",
    images: [
      {
        src: "/images/clinic/saidapet-1.jpg",
        label: "Consultation room",
        alt: "Consultation desk and dental chair at the Saidapet clinic",
        width: 950,
        height: 665,
      },
      {
        src: "/images/clinic/saidapet-4.jpg",
        label: "Treatment room",
        alt: "Dental chair and instruments at the Saidapet clinic",
        width: 950,
        height: 665,
      },
      {
        src: "/images/clinic/saidapet-2.jpg",
        label: "Treatment room",
        alt: "Treatment room at the Saidapet clinic",
        width: 950,
        height: 665,
      },
      {
        src: "/images/clinic/saidapet-5.jpg",
        label: "Treatment room",
        alt: "Dental unit with a monitor at the Saidapet clinic",
        width: 950,
        height: 665,
      },
      {
        src: "/images/clinic/saidapet-3.jpg",
        label: "Treatment room",
        alt: "Dental chair at the Saidapet clinic",
        width: 950,
        height: 665,
      },
    ],
  },
  {
    clinic: "mugalivakkam",
    name: "Mugalivakkam",
    images: [
      {
        src: "/images/clinic/mugalivakkam-reception.jpg",
        label: "Reception",
        alt: "Reception desk at the Mugalivakkam clinic",
        width: 1336,
        height: 752,
      },
      {
        src: "/images/clinic/mugalivakkam-treatment-room-1.jpg",
        label: "Treatment room",
        alt: "Dental chair at the Mugalivakkam clinic",
        width: 752,
        height: 1336,
      },
      {
        src: "/images/clinic/mugalivakkam-reception-2.jpg",
        label: "Reception",
        alt: "Reception area at the Mugalivakkam clinic",
        width: 752,
        height: 1336,
      },
      {
        src: "/images/clinic/mugalivakkam-treatment-room-2.jpg",
        label: "Treatment room",
        alt: "Treatment room at the Mugalivakkam clinic",
        width: 752,
        height: 1336,
      },
    ],
  },
];

/** Videos on ToothCraft's own YouTube channel, linked from the previous site. */
export const clinicVideos: { id: string; title: string }[] = [
  { id: "QxhXWr545jk", title: "Inside ToothCraft" },
  { id: "u7nLQtU37V4", title: "ToothCraft clinic walkthrough" },
  { id: "B8LckFnEiSc", title: "A patient's root canal experience" },
  { id: "-IHoneERS-o", title: "Root canal treatment, explained in Tamil" },
  { id: "DjxNiEvU3No", title: "Implant-supported overdenture" },
  { id: "kv36ZrLi8Pc", title: "ToothCraft, Chennai" },
];
