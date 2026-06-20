// India-specific education data. Drives the form dropdowns AND grounds the AI prompt
// so the generated roadmaps stay anchored to the Indian education system.

export const EDUCATION_LEVELS = [
  "Below Class 10",
  "Class 10 passed",
  "Currently in Class 11–12",
  "Class 12 passed",
  "ITI / Vocational training",
  "Diploma",
  "Undergraduate (pursuing)",
  "Graduate (completed)",
  "Postgraduate",
  "Doctorate / PhD",
] as const;

export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

// Streams only make sense for 11–12 / 12 passed students.
export const STREAMS = [
  "Science (PCM)",
  "Science (PCB)",
  "Science (PCMB)",
  "Commerce",
  "Arts / Humanities",
] as const;

export type Stream = (typeof STREAMS)[number];

// Levels where asking for a stream is relevant.
export const LEVELS_WITH_STREAM: readonly EducationLevel[] = [
  "Currently in Class 11–12",
  "Class 12 passed",
];

// Levels where asking for a course/degree (and its specialization) is relevant.
export const LEVELS_WITH_DEGREE: readonly EducationLevel[] = [
  "ITI / Vocational training",
  "Diploma",
  "Undergraduate (pursuing)",
  "Graduate (completed)",
  "Postgraduate",
  "Doctorate / PhD",
];

// --- Marks: which scores to ask for, by level (used for eligibility) ---

// Class 10 marks: anyone who has passed Class 10.
export const LEVELS_WITH_CLASS10_MARKS: readonly EducationLevel[] = [
  "Class 10 passed",
  "Currently in Class 11–12",
  "Class 12 passed",
  "ITI / Vocational training",
  "Diploma",
  "Undergraduate (pursuing)",
  "Graduate (completed)",
  "Postgraduate",
  "Doctorate / PhD",
];

// Class 12 marks: anyone who has finished Class 12.
export const LEVELS_WITH_CLASS12_MARKS: readonly EducationLevel[] = [
  "Class 12 passed",
  "Undergraduate (pursuing)",
  "Graduate (completed)",
  "Postgraduate",
  "Doctorate / PhD",
];

// Latest degree/diploma CGPA or percentage.
export const LEVELS_WITH_DEGREE_SCORE: readonly EducationLevel[] = [
  "ITI / Vocational training",
  "Diploma",
  "Undergraduate (pursuing)",
  "Graduate (completed)",
  "Postgraduate",
  "Doctorate / PhD",
];

// Comprehensive list of Indian courses (UG, PG, professional, vocational).
// Used as suggestions in the course field — students can also type their own.
export const COURSES = [
  // Undergraduate
  "B.Tech / B.E.",
  "B.Sc",
  "B.Sc (Nursing)",
  "B.Sc (Agriculture)",
  "B.Com",
  "B.A",
  "BBA / BMS",
  "BCA",
  "MBBS",
  "BDS (Dental)",
  "BAMS (Ayurveda)",
  "BHMS (Homeopathy)",
  "BPT (Physiotherapy)",
  "B.Pharm",
  "B.Arch",
  "B.Des",
  "BFA (Fine Arts)",
  "BHM (Hotel Management)",
  "BJMC (Journalism & Mass Comm.)",
  "B.Ed",
  "B.Voc",
  "LLB / Integrated Law (BA LLB)",
  // Diploma / Vocational
  "Diploma (Polytechnic)",
  "ITI Trade",
  // Postgraduate
  "M.Tech / M.E.",
  "M.Sc",
  "M.Com",
  "M.A",
  "MBA / PGDM",
  "MCA",
  "MD / MS (Medical)",
  "M.Pharm",
  "LLM",
  "M.Des",
  "M.Ed",
  "MSW",
  // Research & Professional
  "PhD / Research",
  "CA (Chartered Accountancy)",
  "CS (Company Secretary)",
  "CMA (Cost & Management)",
  "Other",
] as const;

// Backwards-compatible alias.
export const DEGREE_EXAMPLES = COURSES;

// Specialisations / branches available within each course.
export const COURSE_SPECIALIZATIONS: Record<string, string[]> = {
  "B.Tech / B.E.": [
    "Computer Science (CSE)",
    "Information Technology (IT)",
    "Artificial Intelligence & Data Science",
    "Electronics & Communication (ECE)",
    "Electrical (EE)",
    "Mechanical",
    "Civil",
    "Chemical",
    "Aerospace",
    "Biotechnology",
    "Automobile",
    "Mechatronics",
    "Metallurgy",
  ],
  "B.Sc": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Computer Science",
    "Statistics",
    "Biology",
    "Botany",
    "Zoology",
    "Biotechnology",
    "Microbiology",
    "Biochemistry",
    "Electronics",
    "Environmental Science",
    "Geology",
    "Home Science",
  ],
  "B.Sc (Nursing)": ["General Nursing"],
  "B.Sc (Agriculture)": [
    "Agronomy",
    "Horticulture",
    "Soil Science",
    "Plant Pathology",
    "Agricultural Economics",
  ],
  "B.Com": [
    "General",
    "Honours",
    "Accounting & Finance",
    "Banking & Insurance",
    "Taxation",
    "Computer Applications",
    "Business Analytics",
  ],
  "B.A": [
    "English",
    "Hindi / Regional Language",
    "History",
    "Political Science",
    "Economics",
    "Psychology",
    "Sociology",
    "Geography",
    "Philosophy",
    "Public Administration",
    "Journalism & Mass Communication",
    "Fine Arts",
    "Social Work",
  ],
  "BBA / BMS": [
    "General",
    "Finance",
    "Marketing",
    "Human Resources (HR)",
    "International Business",
    "Business Analytics",
    "Operations",
    "Entrepreneurship",
  ],
  "BCA": [
    "General",
    "Data Science",
    "AI & Machine Learning",
    "Cloud Computing",
    "Cyber Security",
    "Web Development",
  ],
  MBBS: ["General (pre-specialisation)"],
  "BDS (Dental)": ["General (pre-specialisation)"],
  "B.Pharm": [
    "Pharmaceutics",
    "Pharmacology",
    "Pharmaceutical Chemistry",
    "Pharmacognosy",
  ],
  "B.Arch": ["General", "Urban Planning", "Landscape Architecture"],
  "B.Des": [
    "Fashion Design",
    "Graphic / Communication Design",
    "Product / Industrial Design",
    "Interior Design",
    "UX/UI Design",
    "Animation & VFX",
    "Textile Design",
    "Game Design",
  ],
  "BFA (Fine Arts)": ["Painting", "Sculpture", "Applied Arts", "Photography"],
  "BHM (Hotel Management)": [
    "Culinary Arts",
    "Food & Beverage",
    "Front Office",
    "Hospitality Management",
  ],
  "BJMC (Journalism & Mass Comm.)": [
    "Journalism",
    "Advertising",
    "Public Relations",
    "Film & TV Production",
    "Digital Media",
  ],
  "B.Ed": ["Primary", "Secondary", "Special Education"],
  "B.Voc": [
    "Software Development",
    "Healthcare",
    "Retail Management",
    "Hospitality",
    "Automobile",
  ],
  "LLB / Integrated Law (BA LLB)": [
    "Corporate Law",
    "Criminal Law",
    "Constitutional Law",
    "Intellectual Property",
    "Cyber Law",
    "International Law",
  ],
  "Diploma (Polytechnic)": [
    "Computer Engineering",
    "Mechanical",
    "Civil",
    "Electrical",
    "Electronics & Communication",
    "Automobile",
  ],
  "ITI Trade": [
    "Electrician",
    "Fitter",
    "Welder",
    "Mechanic (Motor Vehicle)",
    "Computer Operator (COPA)",
    "Plumber",
    "Turner",
  ],
  "M.Tech / M.E.": [
    "Computer Science",
    "Data Science / AI",
    "VLSI",
    "Power Systems",
    "Structural Engineering",
    "Thermal Engineering",
  ],
  "M.Sc": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Computer Science",
    "Biotechnology",
    "Microbiology",
    "Statistics",
    "Environmental Science",
  ],
  "M.Com": ["Accounting & Finance", "Banking", "Taxation", "Business Management"],
  "M.A": [
    "English",
    "Economics",
    "Political Science",
    "History",
    "Psychology",
    "Sociology",
    "Public Administration",
  ],
  "MBA / PGDM": [
    "Finance",
    "Marketing",
    "Human Resources (HR)",
    "Operations",
    "Business Analytics",
    "International Business",
    "Information Technology",
    "Entrepreneurship",
    "Healthcare Management",
  ],
  MCA: ["General", "Data Science", "AI & ML", "Cyber Security", "Cloud Computing"],
  "MD / MS (Medical)": [
    "General Medicine",
    "Surgery",
    "Pediatrics",
    "Gynaecology",
    "Orthopaedics",
    "Radiology",
    "Dermatology",
    "Anaesthesia",
  ],
  "M.Pharm": ["Pharmaceutics", "Pharmacology", "Pharmaceutical Chemistry"],
  LLM: [
    "Corporate Law",
    "Criminal Law",
    "Constitutional Law",
    "Intellectual Property",
    "International Law",
  ],
  "M.Des": ["UX/UI Design", "Product Design", "Communication Design", "Animation"],
  "M.Ed": ["Primary", "Secondary", "Educational Leadership"],
  MSW: ["Community Development", "HR & Labour Welfare", "Medical & Psychiatric"],
  "PhD / Research": [
    "Sciences",
    "Engineering",
    "Humanities",
    "Management",
    "Medical",
  ],
  "CA (Chartered Accountancy)": ["Foundation", "Intermediate", "Final"],
  "CS (Company Secretary)": ["Foundation", "Executive", "Professional"],
  "CMA (Cost & Management)": ["Foundation", "Intermediate", "Final"],
};

// Returns the specialisation suggestions for a given course (case-insensitive,
// trims trailing notes). Empty array if the course is unknown / free-typed.
export function specializationsFor(course: string): string[] {
  if (!course) return [];
  const exact = COURSE_SPECIALIZATIONS[course];
  if (exact) return exact;
  const key = course.trim().toLowerCase();
  const match = Object.keys(COURSE_SPECIALIZATIONS).find(
    (k) => k.toLowerCase() === key
  );
  return match ? COURSE_SPECIALIZATIONS[match] : [];
}

export const INTEREST_AREAS = [
  // Traditional fields
  "Technology & Coding",
  "Engineering",
  "Medicine & Healthcare",
  "Business & Finance",
  "Law",
  "Government & Civil Services",
  "Teaching & Education",
  "Science & Research",
  "Design & Arts",
  "Media & Communication",
  "Agriculture",
  "Hospitality & Tourism",
  "Defence & Armed Forces",
  // Creator & modern careers (Gen-Z)
  "Content Creation (YouTube/Reels)",
  "Gaming & Esports",
  "Travel & Vlogging",
  "Photography & Videography",
  "Social Media & Influencing",
  "Music & Performing Arts",
  "Fashion & Beauty",
  "Fitness & Wellness",
  "Entrepreneurship & Startups",
  "Digital Marketing",
] as const;

export type InterestArea = (typeof INTEREST_AREAS)[number];

// Grouped for display in the interest picker.
export const INTEREST_GROUPS: { label: string; items: InterestArea[] }[] = [
  {
    label: "Fields",
    items: [
      "Technology & Coding",
      "Engineering",
      "Medicine & Healthcare",
      "Business & Finance",
      "Law",
      "Government & Civil Services",
      "Teaching & Education",
      "Science & Research",
      "Design & Arts",
      "Media & Communication",
      "Agriculture",
      "Hospitality & Tourism",
      "Defence & Armed Forces",
    ],
  },
  {
    label: "Creator & Modern 🚀",
    items: [
      "Content Creation (YouTube/Reels)",
      "Gaming & Esports",
      "Travel & Vlogging",
      "Photography & Videography",
      "Social Media & Influencing",
      "Music & Performing Arts",
      "Fashion & Beauty",
      "Fitness & Wellness",
      "Entrepreneurship & Startups",
      "Digital Marketing",
    ],
  },
];

// A short reference list injected into the prompt so the model names real Indian exams.
export const INDIAN_EXAMS_REFERENCE =
  "JEE Main/Advanced, NEET, CUET, CLAT, NDA, GATE, CAT, NID/NIFT/UCEED, NATA, " +
  "UPSC Civil Services, SSC, Banking (IBPS/SBI), CA/CS/CMA foundation, state CETs";
