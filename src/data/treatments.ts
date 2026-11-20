/**
 * Treatments offered by ToothCraft.
 *
 * The list of services and the substance of each page come from the treatment
 * pages on toothcrafts.com, rewritten for clarity. Copy is deliberately
 * measured: no guaranteed outcomes, no prices, and timelines are described as
 * typical rather than promised. Imagery is licensed stock photography and does
 * not depict ToothCraft patients.
 */
export type TreatmentCategoryId = "smile" | "restorative" | "gums" | "alignment" | "family";

export const treatmentCategories: { id: TreatmentCategoryId; label: string; clinical: string; blurb: string }[] = [
  {
    id: "smile",
    label: "Smile Aesthetics",
    clinical: "Conservative Dentistry",
    blurb: "Refine the colour, shape and harmony of your smile.",
  },
  {
    id: "restorative",
    label: "Restore & Replace",
    clinical: "Prosthodontics & Endodontics",
    blurb: "Save, rebuild and replace teeth for lasting function.",
  },
  {
    id: "gums",
    label: "Gum Care",
    clinical: "Periodontics",
    blurb: "Healthy gums — the foundation of every smile.",
  },
  {
    id: "alignment",
    label: "Alignment",
    clinical: "Orthodontics",
    blurb: "Braces and aligners for a straighter, healthier bite.",
  },
  {
    id: "family",
    label: "Family & Comfort",
    clinical: "Pediatric & Sedation Dentistry",
    blurb: "Gentle care for children and anxious patients.",
  },
];

export type TreatmentFaq = { q: string; a?: string; list?: string[] };

export type Treatment = {
  slug: string;
  name: string;
  /** "treatment" pages are individual services; "category" pages group several; "guide" is patient education. */
  kind: "treatment" | "category" | "guide";
  category: TreatmentCategoryId;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for cropped cards. */
  focal?: string;
  intro: string[];
  faqs: TreatmentFaq[];
  /** For category pages: the treatments that sit within it. */
  includes?: string[];
  seoTitle: string;
  seoDescription: string;
};

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    kind: "treatment",
    category: "restorative",
    tagline: "A fixed replacement for missing teeth",
    summary: "A fixed, natural-looking replacement for one or more missing teeth.",
    image: "/images/stock/implants.jpg",
    imageAlt: "Gloved hand holding a dental implant with a ceramic crown",
    focal: "50% 30%",
    intro: [
      "A dental implant is a man-made replacement for the root of a natural tooth. Once it has healed in place it supports a crown, bridge or denture, giving you teeth that stay fixed.",
      "Which type of implant suits you depends on your individual needs and the condition of your teeth and jaw. Your dentist will examine you and take X-rays to assess the bone and space available before recommending a plan.",
    ],
    faqs: [
      {
        q: "Who is a candidate for dental implants?",
        a: "People missing one tooth, several teeth or all of their teeth may be candidates. An implant with a crown or bridge can replace one or a few teeth; where all teeth are missing, implants can be used to anchor a loose denture. Where bone has been lost, bone regeneration techniques may make implants possible.",
      },
      {
        q: "How long does implant treatment take?",
        a: "Implant treatment is an advanced procedure completed in stages. It typically takes around four to nine months, and sometimes longer, depending on the individual case. Temporary teeth can be provided during this period.",
      },
      {
        q: "Is the treatment painful?",
        a: "The procedure is carried out under anaesthesia, with sedation where appropriate, to keep you comfortable. Some discomfort and swelling for two to three days afterwards is common, and your dentist will prescribe medication to help manage it.",
      },
      {
        q: "Can the body reject an implant?",
        a: "Implants are made of titanium, a biocompatible material that is widely used in medicine. Implants can occasionally fail — for example because of poor healing, misalignment or an underlying health condition — and your dentist will discuss your individual risk factors with you.",
      },
      {
        q: "When can I return to work?",
        a: "Expect some discomfort and swelling on the day of surgery and the day after, and avoid strenuous exercise. When you return to work depends on how you feel; your dentist will advise you.",
      },
      {
        q: "What happens if a missing tooth is not replaced?",
        a: "When a tooth is lost, the bone that supported it gradually shrinks. Neighbouring teeth can weaken or drift, chewing becomes harder and dentures may become loose or sore. Starting treatment early usually keeps it simpler.",
      },
      {
        q: "How much do dental implants cost in Chennai?",
        a: "The cost is determined after a thorough examination, because it depends on your individual requirements. Your dentist will explain the estimate before any treatment begins.",
      },
    ],
    seoTitle: "Dental Implants in Chennai",
    seoDescription:
      "Dental implants at ToothCraft, Chennai — a fixed replacement for missing teeth. Learn who is a candidate, how long treatment takes and what to expect.",
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    kind: "treatment",
    category: "restorative",
    tagline: "Relief from infection, with your natural tooth preserved",
    summary: "Relieves pain and infection while preserving your natural tooth.",
    image: "/images/stock/root-canal.jpg",
    imageAlt: "Dental mirror and explorer on a white surface",
    intro: [
      "Root canal treatment — also called endodontic therapy — treats infection in the soft tissue (pulp) at the centre of a tooth. Bacteria can reach the pulp through deep decay, a crack, or a filling that has broken down.",
      "Treating the infection relieves pain and allows you to keep your natural tooth, which helps protect your bite and the teeth around it.",
    ],
    faqs: [
      {
        q: "What are the signs that I may need a root canal?",
        list: [
          "Pain when chewing or biting",
          "A sudden, intense or nagging toothache — including pain that wakes you at night",
          "Lingering sensitivity to hot or cold food and drinks",
          "A tooth that feels loose",
          "A small swelling or pimple on the gum near the tooth",
        ],
        a: "If you notice any of these, see a dentist promptly so the cause can be diagnosed.",
      },
      {
        q: "What happens during treatment?",
        a: "The area is numbed and the tooth is isolated with a rubber dam. The dentist removes the infected pulp through a small opening in the crown, cleans and shapes the canals, then fills them with gutta-percha and a sealer. A temporary filling may be placed between visits.",
      },
      {
        q: "How many visits will I need?",
        a: "Treatment is often completed over more than one visit. At the final visit the temporary filling is replaced with a permanent one, and the tooth is usually restored with a crown.",
      },
      {
        q: "Is root canal treatment painful?",
        a: "Treatment is carried out under local anaesthesia to keep you comfortable. Some tenderness for a few days afterwards is normal; your dentist will advise on pain relief and may prescribe antibiotics where needed.",
      },
      {
        q: "Why save the tooth rather than remove it?",
        a: "Keeping your natural tooth helps maintain your bite and prevents the neighbouring teeth from moving out of position.",
      },
    ],
    seoTitle: "Root Canal Treatment in Chennai",
    seoDescription:
      "Root canal treatment at ToothCraft, Chennai. Understand the symptoms, what happens during endodontic treatment and how it helps you keep your natural tooth.",
  },
  {
    slug: "orthodontics",
    name: "Orthodontics",
    kind: "treatment",
    category: "alignment",
    tagline: "Braces and aligners for a well-aligned smile",
    summary: "Braces and clear aligners to correct crowded, spaced or misaligned teeth.",
    image: "/images/stock/orthodontics.jpg",
    imageAlt: "Smiling woman wearing braces beside a sheer curtain",
    focal: "50% 25%",
    intro: [
      "Orthodontics is the branch of dentistry that focuses on preventing and correcting misaligned teeth and jaws. Orthodontists are dentists who complete an additional three years of specialist training.",
      "Well-aligned teeth are easier to clean, help the jaws work as they should, and can make a real difference to confidence.",
    ],
    faqs: [
      {
        q: "Who is orthodontic treatment for?",
        a: "Anyone with crowded, crooked, protruding or overlapping teeth, or with gaps between their teeth.",
      },
      {
        q: "What does treatment involve?",
        list: [
          "Records — medical history, clinical examination, photographs, models of your teeth and X-rays",
          "Active treatment — appliances are fitted and adjusted periodically so the teeth move in the right direction",
          "Retention — a retainer holds the teeth in their new position",
        ],
      },
      {
        q: "What types of braces are available?",
        a: "Metal braces are the conventional and most widely used option. Ceramic braces are tooth-coloured and popular with adults. Clear aligners such as Invisalign are nearly invisible and can be removed.",
      },
      {
        q: "At what age should a child see an orthodontist?",
        a: "A first orthodontic evaluation is recommended at around age seven, as the adult teeth begin to come through. Early (phase I) treatment may be advised for some children, with full braces considered at around 12 to 13 if still needed.",
      },
      {
        q: "Can adults have braces?",
        a: "Yes. There is no upper age limit for orthodontic treatment, and many adults choose it.",
      },
      {
        q: "How long does treatment take?",
        a: "Around 22 months on average, though this varies with individual needs.",
      },
      {
        q: "How much do invisible braces cost in Chennai?",
        a: "The cost of clear aligners varies with the number of aligners needed and the complexity of the case; conventional metal braces generally cost less. Your orthodontist will give you an estimate after assessing your teeth.",
      },
    ],
    seoTitle: "Orthodontist in Chennai — Braces & Clear Aligners",
    seoDescription:
      "Orthodontic treatment at ToothCraft, Chennai: metal braces, ceramic braces and clear aligners for children and adults. Learn how treatment works and how long it takes.",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    kind: "treatment",
    category: "smile",
    tagline: "Considered care for the way your smile looks",
    summary: "Treatments focused on the appearance and harmony of your smile.",
    image: "/images/stock/cosmetic.jpg",
    imageAlt: "Woman with long hair smiling softly and looking down",
    focal: "60% 30%",
    intro: [
      "Cosmetic dentistry is concerned with improving the appearance of your smile — teeth that are misaligned, widely spaced, misshapen or discoloured. It commonly includes teeth whitening, veneers and other restorative procedures.",
      "It works alongside general dentistry, which focuses on maintaining oral health and hygiene.",
    ],
    faqs: [
      {
        q: "What does cosmetic dentistry include?",
        list: [
          "Teeth whitening to lift stains and discolouration",
          "Porcelain veneers to refine the shape and colour of teeth",
          "Crowns, bonding and other restorations",
          "Smile makeovers that combine several treatments",
        ],
      },
      {
        q: "How does in-clinic teeth whitening work?",
        a: "A whitening gel is applied to the enamel and activated with a light, in a single visit supervised by your dentist. Professional home whitening is also effective but takes longer to show results.",
      },
      {
        q: "What are porcelain veneers?",
        a: "Wafer-thin shells of porcelain bonded to the front surface of teeth to improve their appearance.",
      },
      {
        q: "How do I know which treatment is right for me?",
        a: "Your dentist will examine your teeth, talk through what you would like to change and recommend the options that suit you.",
      },
    ],
    seoTitle: "Cosmetic Dentistry in Chennai",
    seoDescription:
      "Cosmetic dentistry at ToothCraft, Chennai — teeth whitening, veneers and smile makeovers planned around your face, goals and oral health.",
  },
  {
    slug: "dental-veneers",
    name: "Dental Veneers",
    kind: "treatment",
    category: "smile",
    tagline: "Fine porcelain laminates, made for your smile",
    summary: "Wafer-thin laminates that refine the shape and colour of your teeth.",
    image: "/images/stock/veneers.jpg",
    imageAlt: "Close-up of a natural smile",
    focal: "50% 40%",
    intro: [
      "Veneers are very thin laminates made of ceramic, porcelain or composite material, bonded over the visible surface of the teeth to enhance their appearance.",
      "Dentists use them for discoloured teeth, worn enamel and minor misalignment.",
    ],
    faqs: [
      {
        q: "What are the advantages of veneers?",
        a: "Veneers are long-lasting, need relatively little tooth preparation and are made to look natural.",
      },
      {
        q: "How long do veneers last?",
        a: "Around 10 to 15 years, sometimes longer, after which they may need replacing. Good care and regular check-ups help them last.",
      },
      {
        q: "What preparation is involved?",
        a: "A thin layer of enamel is removed so the veneer bonds strongly and sits flush with the tooth. An impression is taken and sent to the laboratory, where the veneer is made to match the colour of your surrounding teeth.",
      },
      {
        q: "Is fitting veneers painful?",
        a: "The tooth is numbed while the enamel is reshaped. Fitting the veneer itself is not painful, though some sensitivity to hot and cold can occur afterwards.",
      },
      {
        q: "How many visits are required?",
        a: "Usually three: a consultation to examine your teeth and discuss the plan and cost; a preparation visit where impressions are taken; and, two to three weeks later, a fitting visit where the veneers are bonded and polished.",
      },
      {
        q: "Are there alternatives to veneers?",
        a: "Veneers are a cosmetic treatment. Where a tooth needs repair or strengthening, a crown may be more suitable — your dentist will advise.",
      },
      {
        q: "How do I look after veneers?",
        a: "Brush twice a day, see your dentist regularly, and avoid biting hard objects or grinding your teeth.",
      },
    ],
    seoTitle: "Dental Veneers in Chennai",
    seoDescription:
      "Porcelain and composite dental veneers at ToothCraft, Chennai. How veneers work, how long they last and what the procedure involves.",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    kind: "treatment",
    category: "smile",
    tagline: "A brighter smile, professionally supervised",
    summary: "Professional whitening to lift stains and brighten your smile.",
    image: "/images/stock/whitening.jpg",
    imageAlt: "Profile close-up of a bright, natural smile",
    focal: "65% 50%",
    intro: [
      "Teeth whitening is a bleaching process that lightens stains and discolouration on the enamel.",
      "Results are noticeable but not permanent, and they last longer with good oral hygiene.",
    ],
    faqs: [
      {
        q: "What causes teeth to stain?",
        a: "Extrinsic stains sit on the tooth surface and come from dark-coloured drinks, tobacco, food and everyday wear. Intrinsic stains form inside the tooth through ageing, trauma, or exposure to certain minerals or medicines while the teeth were developing.",
      },
      {
        q: "What whitening options are available?",
        list: [
          "In-clinic whitening — a higher-concentration gel applied with the gums protected, for noticeable results in a short time",
          "Take-home kits from your dentist — a lower-concentration gel worn in custom-made trays, working more gradually",
          "Over-the-counter products — convenient, though they may not whiten evenly",
        ],
      },
      {
        q: "Are there any risks?",
        a: "Temporary sensitivity to hot, cold or pressure, and mild gum irritation that usually settles within about a week. Crowns, veneers, bonding and fillings do not change colour with bleaching, so your dentist will plan around any existing restorations.",
      },
      {
        q: "How long do results last?",
        a: "Whitening is not permanent. How long it lasts depends on your age, diet and habits such as smoking.",
      },
    ],
    seoTitle: "Teeth Whitening in Chennai",
    seoDescription:
      "Professional teeth whitening at ToothCraft, Chennai. In-clinic and take-home options, what causes stains and what results to expect.",
  },
  {
    slug: "smile-makeover",
    name: "Smile Makeover",
    kind: "treatment",
    category: "smile",
    tagline: "A personalised plan for the smile you have in mind",
    summary: "A personalised plan combining treatments to transform your smile.",
    image: "/images/stock/smile-makeover.jpg",
    imageAlt: "Woman in a white lace top smiling outdoors",
    focal: "50% 30%",
    intro: [
      "A smile makeover is a personalised combination of cosmetic treatments — such as teeth whitening, straightening, veneers, bonding, crowns or replacing missing teeth.",
      "It is planned around your face, age, lifestyle and what you would like to change, so the result looks natural on you.",
    ],
    faqs: [
      {
        q: "What can a smile makeover address?",
        list: [
          "Broken or chipped teeth — with porcelain crowns, veneers or cosmetic bonding",
          "Crooked teeth — with orthodontic straightening",
          "Missing teeth — with implants, bridges or dentures",
          "A gummy smile — with laser or minor surgical contouring",
          "Stained teeth — with professional whitening",
        ],
      },
      {
        q: "How many visits are required?",
        a: "It varies from person to person. After a detailed consultation about what you would like to change, your dentist will explain the plan, the number of visits and the cost.",
      },
      {
        q: "How long do the results last?",
        a: "With proper care and regular check-ups, the results of a smile makeover can last for several years.",
      },
      {
        q: "What does a smile makeover cost?",
        a: "It depends on the treatments and materials involved. You will receive an estimate before treatment starts.",
      },
      {
        q: "Is a smile makeover covered by insurance?",
        a: "Smile makeovers are cosmetic and are generally not covered by insurance.",
      },
    ],
    seoTitle: "Smile Makeover in Chennai",
    seoDescription:
      "Smile makeovers at ToothCraft, Chennai — whitening, veneers, crowns, alignment and tooth replacement combined into one personalised plan.",
  },
  {
    slug: "dental-bridges",
    name: "Dental Bridges",
    kind: "treatment",
    category: "restorative",
    tagline: "Closing the gap left by missing teeth",
    summary: "A fixed way to close the gap left by one or more missing teeth.",
    image: "/images/stock/bridges.jpg",
    imageAlt: "Smiling man wearing glasses and a maroon kurta",
    focal: "50% 25%",
    intro: [
      "A dental bridge fills the gap left by one or more missing teeth with a false tooth, called a pontic, anchored to the teeth on either side.",
      "Closing the gap helps prevent neighbouring teeth from drifting and reduces the risk of gum problems.",
    ],
    faqs: [
      {
        q: "What materials are used?",
        a: "Porcelain, porcelain fused to metal, or gold alloys. The choice affects how much the supporting teeth need to be prepared.",
      },
      {
        q: "What types of bridges are there?",
        list: [
          "Fixed bridges — a false tooth anchored to crowns on the teeth either side of the gap",
          "Cantilever bridges — anchored on one side only, for low-stress areas such as front teeth",
          "Resin-bonded bridges — attached with wings bonded behind the adjacent teeth, needing little or no preparation",
        ],
      },
      {
        q: "How is a bridge fitted?",
        a: "Usually over two to three visits. The supporting teeth are prepared and an impression is taken; at the next visit the bridge is fitted, adjusted for a comfortable bite and then fixed permanently.",
      },
      {
        q: "How do I care for a bridge?",
        a: "Clean carefully under and around the bridge every day — your dentist can show you the brushes and floss that reach awkward areas — and keep up regular check-ups.",
      },
      {
        q: "What are the alternatives?",
        a: "Dental implants or dentures. Your dentist will help you compare the options.",
      },
    ],
    seoTitle: "Dental Bridges in Chennai",
    seoDescription:
      "Fixed, cantilever and resin-bonded dental bridges at ToothCraft, Chennai. How bridges replace missing teeth and how to care for them.",
  },
  {
    slug: "dental-crowns",
    name: "Dental Crowns",
    kind: "treatment",
    category: "restorative",
    tagline: "Strength and shape, restored",
    summary: "A custom cap that restores a tooth's shape, strength and appearance.",
    image: "/images/stock/crowns.jpg",
    imageAlt: "Close-up of a natural, even smile",
    intro: [
      "A crown is a tooth-shaped cap placed over a tooth to restore its shape, size, strength and appearance.",
      "Crowns are made in several materials, and your dentist will recommend one based on where the tooth sits and how much load it carries.",
    ],
    faqs: [
      {
        q: "When is a crown needed?",
        list: [
          "To protect a weak tooth from breaking",
          "To hold together a cracked or chipped tooth",
          "To support a tooth with a large filling",
          "To hold a dental bridge in place",
          "To cover a discoloured or misshapen tooth",
          "To restore a broken or worn-down tooth",
          "To cover a dental implant",
        ],
      },
      {
        q: "What types of crowns are available?",
        list: [
          "Metal — very strong and needs less tooth removal; suited to back teeth",
          "Porcelain fused to metal — can be matched to the colour of your teeth",
          "All-resin — economical, though it wears faster over time",
          "All-porcelain or all-ceramic — the most natural colour match, suited to front teeth and to people with metal allergies",
        ],
      },
      {
        q: "Will I have a temporary crown?",
        a: "Yes. A temporary crown made in the clinic protects the tooth while your permanent crown is made in the laboratory.",
      },
      {
        q: "How long does a crown last?",
        a: "Typically five to fifteen years, depending on care and habits. Avoid biting nails or hard objects, brush twice a day and floss daily.",
      },
      {
        q: "What problems should I look out for?",
        a: "Sensitivity to hot or cold once the anaesthetic wears off, a bite that feels uneven, or a crown that becomes loose. See your dentist if you notice any of these.",
      },
    ],
    seoTitle: "Dental Crowns in Chennai",
    seoDescription:
      "Dental crowns at ToothCraft, Chennai — metal, porcelain-fused-to-metal and all-ceramic options to restore damaged or weakened teeth.",
  },
  {
    slug: "dentures",
    name: "Dentures",
    kind: "treatment",
    category: "restorative",
    tagline: "Comfortable replacements, carefully fitted",
    summary: "Comfortable, natural-looking replacements for missing teeth.",
    image: "/images/stock/dentures.jpg",
    imageAlt: "Smiling older woman wearing a yellow sari",
    focal: "50% 22%",
    intro: [
      "Dentures replace missing teeth and are supported by the surrounding gums and tissues.",
      "They help you chew and speak more easily, and support the lips and cheeks.",
    ],
    faqs: [
      {
        q: "What types of dentures are available?",
        a: "Complete dentures replace all the teeth in an upper or lower arch. Removable partial dentures replace some missing teeth. Fixed options, such as bridges and crowns, are also available.",
      },
      {
        q: "Is it difficult to eat with dentures?",
        a: "It takes a little practice. Start with soft food cut into small pieces, chew on both sides, and gradually return to your usual diet. Avoid very hard or very hot foods.",
      },
      {
        q: "How do I care for my dentures?",
        a: "Brush your dentures after meals to remove plaque and food. Avoid bleaching agents, which can discolour them.",
      },
      {
        q: "Can adhesive fix a loose denture?",
        a: "Adhesive can add retention to a well-fitting denture, but it is not a fix for a loose one. Loose dentures can cause irritation and sores, and should be relined or replaced.",
      },
      {
        q: "How long do dentures last?",
        a: "Around five to ten years. The gums and jaw change shape over time, so dentures need periodic adjustment or replacement, along with regular check-ups.",
      },
    ],
    seoTitle: "Dentures in Chennai — Complete & Partial",
    seoDescription:
      "Complete and partial dentures at ToothCraft, Chennai. Types of dentures, how to care for them and how long they last.",
  },
  {
    slug: "teeth-scaling",
    name: "Teeth Scaling",
    kind: "treatment",
    category: "gums",
    tagline: "A thorough professional clean",
    summary: "Professional cleaning that removes plaque and tartar for healthier gums.",
    image: "/images/stock/scaling.jpg",
    imageAlt: "Gloved hand holding dental examination instruments",
    focal: "50% 40%",
    intro: [
      "Scaling is a routine professional cleaning that removes food debris, tartar (calculus) and surface stains that brushing cannot.",
      "It helps keep the gums healthy and usually needs no anaesthetic.",
    ],
    faqs: [
      {
        q: "What is tartar?",
        a: "Plaque is a soft, sticky, colourless film of food particles and bacteria. If it is not brushed away it hardens into calculus, or tartar, which cannot be removed by brushing.",
      },
      {
        q: "Does scaling loosen teeth or create gaps?",
        a: "No. Any gaps you notice were previously filled with tartar, and teeth that feel loose were already affected by gum disease. Mild sensitivity after scaling usually settles in a day or two.",
      },
      {
        q: "How is scaling done?",
        a: "Mostly with an ultrasonic scaler, whose fine vibrating tip and water spray dislodge tartar above and below the gum line. Hand instruments are used where needed.",
      },
      {
        q: "How often should I have my teeth scaled?",
        a: "Visit your dentist every six months. They will check your teeth and gums and advise whether scaling is needed.",
      },
    ],
    seoTitle: "Teeth Scaling & Polishing in Chennai",
    seoDescription:
      "Teeth scaling and polishing at ToothCraft, Chennai. Professional cleaning to remove plaque and tartar and keep gums healthy.",
  },
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry",
    kind: "treatment",
    category: "gums",
    tagline: "Precision care for gums and soft tissue",
    summary: "Precise, laser-assisted care for gums and soft tissue.",
    image: "/images/stock/laser.jpg",
    imageAlt: "Dental equipment in a modern treatment room",
    intro: [
      "Laser dentistry uses focused light energy to carry out certain dental procedures with precision.",
      "In trained hands it can make treatment of the gums and soft tissue more comfortable.",
    ],
    faqs: [
      {
        q: "What are the benefits of laser dentistry?",
        list: [
          "Minimal effect on the surrounding tissue",
          "Some procedures need little or no anaesthesia",
          "Less bleeding during treatment",
          "Soft-tissue procedures often need no stitches",
          "A lower risk of infection in the treated area",
          "Wounds tend to heal faster",
        ],
      },
      {
        q: "Can lasers help treat gum disease?",
        a: "Yes. Lasers can remove diseased gum tissue while leaving healthy tissue intact, as an alternative to conventional surgery in suitable cases.",
      },
      {
        q: "How long is recovery?",
        a: "Recovery is usually quick, and many people return to normal activities soon after treatment. Your dentist will give you aftercare advice.",
      },
      {
        q: "Are lasers used for every procedure?",
        a: "No. Lasers are often combined with conventional instruments — existing metal fillings, for example, are removed with a drill.",
      },
      {
        q: "What does laser treatment cost?",
        a: "It depends on the procedure and your individual needs. Some insurance plans cover laser therapy, so check before treatment.",
      },
    ],
    seoTitle: "Laser Dentistry in Chennai",
    seoDescription:
      "Laser dentistry at ToothCraft, Chennai — precise, comfortable laser-assisted treatment for gums and soft tissue.",
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    kind: "treatment",
    category: "family",
    tagline: "Gentle beginnings for lifelong healthy smiles",
    summary: "Gentle, friendly dental care for infants, children and teenagers.",
    image: "/images/stock/pediatric.jpg",
    imageAlt: "Close-up of a smiling child brushing their teeth",
    focal: "50% 35%",
    intro: [
      "Pediatric dentistry looks after the oral health of infants, children and adolescents, including children with special needs.",
      "Pediatric dentists complete additional training in child growth, development and psychology, and care for everything from cavities to crooked teeth.",
    ],
    faqs: [
      {
        q: "When should my child first visit the dentist?",
        a: "The American Academy of Pediatric Dentistry recommends a first visit by your child's first birthday, when the first teeth are appearing. The dentist can guide you on diet, teething, habits and fluoride.",
      },
      {
        q: "How often should children see the dentist?",
        a: "Twice a year is recommended, or more often if your dentist advises it.",
      },
      {
        q: "Why do baby teeth matter?",
        a: "They help children chew, speak clearly and smile, and they hold space for the permanent teeth. Losing them early can lead to crowded or crooked adult teeth.",
      },
      {
        q: "How should I clean my child's teeth?",
        a: "Wipe an infant's gums with a soft cloth after feeds. Once the first tooth appears, use a soft toothbrush, and help your child brush until they can do it well on their own. Ask your dentist which toothpaste, and how much, is right for your child's age.",
      },
      {
        q: "What are dental sealants?",
        a: "A protective coating applied to the grooves of the back teeth to help prevent cavities.",
      },
      {
        q: "Does thumb sucking harm the teeth?",
        a: "Encourage your child to stop before the permanent teeth come through. A persistent habit can affect how the teeth meet.",
      },
    ],
    seoTitle: "Pediatric Dentistry in Chennai — Children's Dentist",
    seoDescription:
      "Children's dentistry at ToothCraft, Chennai. Gentle care for infants, children and teens, with guidance for parents on healthy habits.",
  },
  {
    slug: "sedation-dentistry",
    name: "Sedation Dentistry",
    kind: "treatment",
    category: "family",
    tagline: "Calm, comfortable care for anxious patients",
    summary: "Sedation options that help anxious patients feel calm and comfortable.",
    image: "/images/stock/sedation.jpg",
    imageAlt: "Woman with her eyes lowered in soft, bright light",
    focal: "50% 30%",
    intro: [
      "Sedation dentistry helps you feel relaxed during treatment.",
      "It can be especially helpful if you are anxious about dental care, have a strong gag reflex, find it hard to get numb, or need a longer procedure.",
    ],
    faqs: [
      {
        q: "Who is sedation dentistry suited to?",
        list: [
          "People who feel fearful about dental treatment",
          "Those who have had a difficult dental experience in the past",
          "People with a strong gag reflex",
          "Those who have difficulty getting numb or have very sensitive teeth",
          "Anyone uncomfortable with needles, or with the sounds and smells of treatment",
        ],
      },
      {
        q: "What types of sedation are used?",
        a: "Oral sedation — a tablet taken before your appointment — is the most convenient. IV sedation is used for some oral surgery. General anaesthesia is reserved for specific cases.",
      },
      {
        q: "Who administers the sedation?",
        a: "Sedation at ToothCraft is provided by an anaesthetist trained in dental sedation and general anaesthesia.",
      },
      {
        q: "How safe is sedation?",
        a: "Your medical history is reviewed beforehand and the process is explained to you. During treatment your oxygen level, blood pressure and heart rate are monitored continuously.",
      },
      {
        q: "Are there side effects?",
        a: "Some people notice a dry mouth or hiccups afterwards. Your dentist will give you instructions to follow before and after your appointment.",
      },
    ],
    seoTitle: "Sedation Dentistry in Chennai",
    seoDescription:
      "Sedation dentistry at ToothCraft, Chennai — helping anxious patients receive dental care calmly, with monitoring throughout.",
  },
  {
    slug: "conservative-dentistry",
    name: "Conservative Dentistry",
    kind: "category",
    category: "smile",
    tagline: "Preserve what is natural, refine what you see",
    summary: "Preserving natural teeth while refining how your smile looks.",
    image: "/images/stock/conservative.jpg",
    imageAlt: "Smiling woman with wavy blonde hair outdoors",
    focal: "50% 28%",
    intro: [
      "At ToothCraft, conservative dentistry brings together the treatments that preserve your natural teeth while improving the appearance of your smile.",
      "It covers cosmetic dentistry, dental veneers, teeth whitening and complete smile makeovers — each planned around your teeth and what you would like to change.",
    ],
    includes: ["cosmetic-dentistry", "dental-veneers", "teeth-whitening", "smile-makeover"],
    faqs: [
      {
        q: "Which treatment is right for me?",
        a: "That depends on your teeth and your goals. At your consultation the dentist will examine your teeth, listen to what you would like to change and explain the options that suit you.",
      },
      {
        q: "Will the result look natural?",
        a: "Treatment is planned around your face, age and lifestyle, and restorations are colour-matched to your surrounding teeth. Your dentist will explain what is realistically achievable in your case.",
      },
    ],
    seoTitle: "Conservative Dentistry in Chennai",
    seoDescription:
      "Conservative and cosmetic dentistry at ToothCraft, Chennai: veneers, whitening and smile makeovers that preserve natural teeth.",
  },
  {
    slug: "periodontics",
    name: "Periodontics",
    kind: "category",
    category: "gums",
    tagline: "Healthy gums, the foundation of every smile",
    summary: "Care for the gums and the structures that support your teeth.",
    image: "/images/stock/periodontics.jpg",
    imageAlt: "Bamboo toothbrushes in a glass with eucalyptus leaves",
    intro: [
      "Periodontics is the care of the gums and the tissues that support your teeth. Healthy gums are the foundation for every other dental treatment.",
      "At ToothCraft, gum care includes professional teeth scaling and laser dentistry, with periodontists among our consultant specialists.",
    ],
    includes: ["teeth-scaling", "laser-dentistry"],
    faqs: [
      {
        q: "What are the signs of gum problems?",
        a: "Bleeding when you brush, swollen or receding gums, persistent bad breath, or teeth that feel loose are all reasons to see a dentist.",
      },
      {
        q: "How can I keep my gums healthy?",
        a: "Brush twice a day with good technique, clean between your teeth, and see your dentist every six months so plaque and tartar can be removed before they cause problems.",
      },
    ],
    seoTitle: "Periodontics & Gum Care in Chennai",
    seoDescription:
      "Gum care at ToothCraft, Chennai — professional scaling and laser dentistry to keep the foundations of your smile healthy.",
  },
  {
    slug: "brushing-techniques",
    name: "Brushing Techniques",
    kind: "guide",
    category: "gums",
    tagline: "A patient guide to brushing well",
    summary: "A short guide to brushing well, for adults and children.",
    image: "/images/stock/brushing.jpg",
    imageAlt: "Bamboo toothbrushes in a glass jar on a white surface",
    intro: [
      "Brushing keeps teeth and gums healthy by removing plaque from the tooth surfaces and along the gum line.",
      "Technique matters more than force: gentle on the gums, thorough on the teeth.",
    ],
    faqs: [
      {
        q: "What are the recommended brushing methods?",
        list: [
          "Bass technique (adults) — hold the brush at 45° to the gum line and use short back-and-forth strokes with a gentle vibrating action, then clean the chewing surfaces",
          "Fones technique (children) — with the teeth closed, move the brush in gentle circles over the outer surfaces; it is simple for children to follow",
        ],
      },
      {
        q: "How often should I brush?",
        a: "Twice a day — in the morning and at night before bed. The quality of brushing matters more than the number of times.",
      },
      {
        q: "Which toothbrush should I use?",
        a: "Soft brushes suit sensitive gums; medium brushes suit healthy teeth and gums. Hard brushes can abrade the teeth and make them sensitive.",
      },
      {
        q: "Does toothpaste matter?",
        a: "A fluoride toothpaste helps prevent decay and protects against the acid produced by bacteria in the mouth.",
      },
      {
        q: "What can incorrect brushing cause?",
        a: "Staining, bleeding or receding gums, worn or sensitive teeth and bad breath.",
      },
      {
        q: "When should I replace my toothbrush?",
        a: "About every three months, and after a cold or flu.",
      },
      {
        q: "When should children start brushing?",
        a: "As soon as their baby teeth appear. Children's teeth are prone to cavities, so encourage regular brushing from the start.",
      },
    ],
    seoTitle: "Brushing Techniques — A Patient Guide",
    seoDescription:
      "How to brush well: the Bass and Fones techniques, choosing a toothbrush and how often to brush. A patient guide from ToothCraft, Chennai.",
  },
];

/** The 16 services shown across the site (the brushing guide is patient education, not a service). */
export const services = treatments.filter((treatment) => treatment.kind !== "guide");

export function getTreatment(slug: string) {
  return treatments.find((treatment) => treatment.slug === slug);
}

export function treatmentsByCategory(category: TreatmentCategoryId) {
  return services.filter((treatment) => treatment.category === category);
}

export function relatedTreatments(treatment: Treatment, limit = 3) {
  const sameCategory = services.filter(
    (candidate) => candidate.category === treatment.category && candidate.slug !== treatment.slug,
  );
  const others = services.filter(
    (candidate) => candidate.category !== treatment.category && candidate.slug !== treatment.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
