/**
 * Clinic locations — addresses, phone numbers, hours and lead dentists exactly as
 * published on toothcrafts.com. Photographs are ToothCraft's own.
 */
export type ClinicPhone = { label: string; display: string; tel: string };

export type Clinic = {
  slug: "saidapet" | "ashok-nagar" | "mugalivakkam";
  name: string;
  area: string;
  addressLines: string[];
  postalCode: string;
  streetAddress: string;
  landmark: string;
  lead: string;
  phones: ClinicPhone[];
  hours: string;
  days: string;
  /** Link that opens directions in Google Maps. */
  directionsUrl: string;
  /** Embeddable map. */
  mapEmbedUrl: string;
  geo: { lat: number; lng: number };
  image: string;
  imageAlt: string;
  intro: string;
  summary: string;
};

export const clinics: Clinic[] = [
  {
    slug: "saidapet",
    name: "Saidapet",
    area: "Saidapet, Chennai",
    addressLines: ["No. 45, Karaneeswarar Koil Street", "Saidapet, Chennai – 600 015"],
    streetAddress: "No. 45, Karaneeswarar Koil Street",
    postalCode: "600015",
    landmark: "Near Karaneeswarar Koil",
    lead: "Dr. M. Anand",
    phones: [
      { label: "Mobile", display: "+91 99412 65427", tel: "+919941265427" },
      { label: "Landline", display: "044 4862 0201", tel: "+914448620201" },
    ],
    hours: "9 AM – 9 PM",
    days: "Monday to Sunday",
    directionsUrl: "https://goo.gl/maps/xruPJseERAyMwYGK9",
    mapEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s13.0241784,80.2230993!6i16",
    geo: { lat: 13.0241784, lng: 80.2230993 },
    image: "/images/clinic/saidapet-4.jpg",
    imageAlt: "Treatment room at the ToothCraft Saidapet clinic",
    summary: "Our Saidapet clinic on Karaneeswarar Koil Street, led by Dr. M. Anand.",
    intro:
      "At our Saidapet clinic, your smile is the priority. A dedicated team provides personalised, quality care across cosmetic, implant and family dentistry — and takes the time to explain every option, so you can make informed decisions about your dental health.",
  },
  {
    slug: "ashok-nagar",
    name: "Ashok Nagar",
    area: "Ashok Nagar, Chennai",
    addressLines: ["No. 47, 4th Avenue, 8th Avenue", "Ashok Nagar, Chennai – 600 083"],
    streetAddress: "No. 47, Ashok Nagar 4th Avenue, 8th Avenue",
    postalCode: "600083",
    landmark: "Near Tender Cuts",
    lead: "Dr. Maheshwari",
    phones: [
      { label: "Mobile", display: "+91 99402 69051", tel: "+919940269051" },
      { label: "Landline", display: "044 4211 9076", tel: "+914442119076" },
    ],
    hours: "9 AM – 9 PM",
    days: "Monday to Sunday",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=13.0427982%2C80.2169019",
    mapEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s13.0427982,80.2169019!6i17",
    geo: { lat: 13.0427982, lng: 80.2169019 },
    image: "/images/clinic/ashok-nagar-reception.jpg",
    imageAlt: "Reception at a ToothCraft clinic with the Tooth Craft sign",
    summary: "A one-stop clinic in central Chennai for cosmetic, implant and orthodontic care.",
    intro:
      "Centrally located in Chennai, this clinic brings a wide range of treatments under one roof — from cosmetic smile makeovers and implants to braces and more complex care. Patients visit us from across India and from overseas.",
  },
  {
    slug: "mugalivakkam",
    name: "Mugalivakkam",
    area: "Mugalivakkam, Chennai",
    addressLines: ["No. 43, Sriram Nagar, Mugalivakkam Main Road", "Mugalivakkam, Chennai – 600 116"],
    streetAddress: "No. 43, Sriram Nagar, Mugalivakkam Main Road",
    postalCode: "600116",
    landmark: "Near Rukmani Ramjee Convention Hall",
    lead: "Dr. Monica / Dr. Suganya",
    phones: [
      { label: "Mobile", display: "+91 73585 91022", tel: "+917358591022" },
      { label: "Landline", display: "044 4358 9272", tel: "+914443589272" },
    ],
    hours: "9 AM – 9 PM",
    days: "Monday to Sunday",
    directionsUrl: "https://maps.app.goo.gl/o8X1niBQjzo68i8d9",
    // The embed published on the previous website, which points at the clinic's own Google Maps listing.
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15548.656769395193!2d80.176302!3d13.025214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2f7a1f03c2181b29!2sTooth+craft+Multispeciality+dental+clinic.!5e0!3m2!1sen!2sin!4v1456479815536",
    geo: { lat: 13.025214, lng: 80.176302 },
    image: "/images/clinic/mugalivakkam-reception.jpg",
    imageAlt: "Reception desk at the ToothCraft Mugalivakkam clinic",
    summary: "Team-based, highly personalised care, a few minutes' drive from Guindy.",
    intro:
      "Our Mugalivakkam clinic, a few minutes' drive from Guindy, extends ToothCraft's care to west Chennai. The team here works closely together to offer highly personalised treatment for every patient.",
  },
];

export function getClinic(slug: string) {
  return clinics.find((clinic) => clinic.slug === slug);
}
