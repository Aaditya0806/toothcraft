/**
 * ToothCraft dentists — names, qualifications and roles exactly as listed on
 * toothcrafts.com (About Us and clinic pages). Portraits are ToothCraft's own.
 *
 * Years of experience shown on the old site were written several years ago and
 * are intentionally left out until the clinic confirms current figures.
 */
export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  role: string;
  focus: string[];
  intro: string;
  image?: string;
  clinic?: string;
};

export const doctors: Doctor[] = [
  {
    id: "dr-anand",
    name: "Dr. M. Anand",
    qualification: "B.D.S",
    role: "Dental Surgeon · Founder",
    focus: [],
    intro:
      "Founder of ToothCraft. The practice began in 2007 as a single-chair clinic; Dr. Anand consults at the Saidapet clinic.",
    image: "/images/doctors/dr-anand.jpg",
    clinic: "Saidapet",
  },
  {
    id: "dr-monica",
    name: "Dr. Monica",
    qualification: "B.D.S",
    role: "Dental Surgeon",
    focus: ["Cosmetic dentistry"],
    intro: "Dental surgeon with a focus on cosmetic dentistry. Consults at the Mugalivakkam clinic.",
    image: "/images/doctors/dr-monica.jpg",
    clinic: "Mugalivakkam",
  },
  {
    id: "dr-meena",
    name: "Dr. Meena",
    qualification: "B.D.S",
    role: "Dental Surgeon",
    focus: [],
    intro: "Dental surgeon and resident dentist on the ToothCraft team.",
    image: "/images/doctors/dr-meena.jpg",
  },
  {
    id: "dr-merlin",
    name: "Dr. Merlin",
    qualification: "M.D.S",
    role: "Oral Pathologist",
    focus: ["Oral pathology"],
    intro: "Oral pathologist on the ToothCraft team.",
    image: "/images/doctors/dr-merlin.jpg",
  },
  {
    id: "dr-preethi",
    name: "Dr. Preethi R.",
    qualification: "B.D.S",
    role: "Resident Dentist",
    focus: [],
    intro: "Resident dentist. At ToothCraft, a resident dentist carries out your initial consultation and talks you through X-rays and treatment options.",
    image: "/images/doctors/dr-preethi.jpg",
  },
  {
    id: "dr-deepak",
    name: "Dr. Deepak",
    qualification: "M.D.S",
    role: "Root Canal Specialist",
    focus: ["Root canal treatment"],
    intro: "Specialist dentist for root canal (endodontic) treatment.",
    image: "/images/doctors/dr-deepak.jpg",
  },
  {
    id: "dr-waleed",
    name: "Dr. Waleed",
    qualification: "M.D.S",
    role: "Implant & Gum Specialist",
    focus: ["Dental implants", "Gum care"],
    intro: "Specialist dentist for dental implants and gum treatment.",
    image: "/images/doctors/dr-waleed.jpg",
  },
];

/** Dentists named as clinic leads on the location listings (no published portrait). */
export const clinicLeads = [
  { name: "Dr. Maheshwari", clinic: "Ashok Nagar" },
  { name: "Dr. Suganya", clinic: "Mugalivakkam" },
];

export type ConsultantGroup = { speciality: string; description: string; members: string[] };

/** "Our Consultant Specialists" from the About Us page. */
export const consultants: ConsultantGroup[] = [
  {
    speciality: "Endodontists",
    description: "Root canal treatment",
    members: ["Dr. Akila, M.D.S", "Dr. Tamilselvan, M.D.S", "Dr. Sathish, M.D.S"],
  },
  {
    speciality: "Prosthodontist & Implantologist",
    description: "Implants, crowns, bridges and dentures",
    members: ["Dr. N. Vinoth, M.D.S"],
  },
  {
    speciality: "Orthodontists",
    description: "Braces and alignment",
    members: ["Dr. Ravindra Kumar, M.D.S", "Dr. Praveen, M.D.S"],
  },
  {
    speciality: "Oral & Maxillofacial Surgeons",
    description: "Surgical dentistry",
    members: ["Dr. Brighit, M.D.S", "Dr. Rohini, M.D.S", "Dr. Vijaya Kumar, M.D.S"],
  },
  {
    speciality: "Periodontists",
    description: "Gum care",
    members: ["Dr. Priyanka, M.D.S", "Dr. Anand Mohan, M.D.S"],
  },
  {
    speciality: "Pedodontist",
    description: "Children's dentistry",
    members: ["Dr. Hariharavel, M.D.S"],
  },
];

export const consultantCount = consultants.reduce((total, group) => total + group.members.length, 0);
