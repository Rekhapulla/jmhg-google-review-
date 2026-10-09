import { CategoryOption } from "@/lib/config";

/**
 * Predefined natural-sounding review sentence fragments and full sentences for each category option.
 */
const CATEGORY_TEMPLATES: Record<
  CategoryOption,
  {
    standalone: string;
    clause: string;
  }
> = {
  "Doctor consultation": {
    standalone: "The doctor consultation was thorough, informative, and reassuring.",
    clause: "the doctor consultation was thorough and reassuring",
  },
  "Staff support": {
    standalone: "The nursing and support staff were extremely attentive, courteous, and helpful.",
    clause: "the staff were polite and supportive",
  },
  "Communication": {
    standalone: "Communication throughout my care was clear, prompt, and transparent.",
    clause: "communication was clear and informative",
  },
  "Cleanliness": {
    standalone: "The hospital premises and facilities were exceptionally clean and well-maintained.",
    clause: "the hospital was clean and well-maintained",
  },
  "Waiting experience": {
    standalone: "The waiting time was minimal and the entire process was smooth and organized.",
    clause: "the waiting experience was smooth and well-managed",
  },
  "Overall care": {
    standalone: "The overall medical care and attention provided was outstanding.",
    clause: "the overall medical care was outstanding",
  },
  "Pharmacy": {
    standalone: "The pharmacy service was prompt and the staff were very helpful with medications.",
    clause: "the pharmacy service was fast and helpful",
  },
  "Billing": {
    standalone: "The billing process was quick, clear, and hassle-free.",
    clause: "the billing process was smooth and transparent",
  },
  "Other": {
    standalone: "",
    clause: "",
  },
};

/**
 * Generates an intelligent, natural-sounding review paragraph based on the selected categories and optional rating.
 */
export function generateReviewFromCategories(
  categories: CategoryOption[],
  rating: number = 5
): string {
  if (!categories || categories.length === 0) {
    return "";
  }

  // If "Other" is selected, do not automatically generate text
  if (categories.includes("Other")) {
    return "";
  }

  // Deduplicate and retain order
  const selected = Array.from(new Set(categories)).filter(
    (cat) => cat !== "Other" && CATEGORY_TEMPLATES[cat]
  );

  if (selected.length === 0) {
    return "";
  }

  const opening =
    rating >= 4
      ? "I had a very positive experience at Jyothsna Hospital."
      : rating === 3
      ? "I had a satisfactory experience at Jyothsna Hospital."
      : "Here is my feedback regarding my visit to Jyothsna Hospital.";

  // 1 Option Selected
  if (selected.length === 1) {
    const template = CATEGORY_TEMPLATES[selected[0]];
    return `${opening} ${template.standalone}`;
  }

  // 2 Options Selected
  if (selected.length === 2) {
    const firstClause = CATEGORY_TEMPLATES[selected[0]].clause;
    const secondClause = CATEGORY_TEMPLATES[selected[1]].clause;
    return `${opening} ${firstClause.charAt(0).toUpperCase() + firstClause.slice(1)}, and ${secondClause}.`;
  }

  // 3 or more Options Selected
  const firstClause = CATEGORY_TEMPLATES[selected[0]].clause;
  const secondClause = CATEGORY_TEMPLATES[selected[1]].clause;
  const mainSentence = `${firstClause.charAt(0).toUpperCase() + firstClause.slice(1)}, and ${secondClause}.`;

  const remainingCategories = selected.slice(2);

  if (remainingCategories.length === 1) {
    const extraTemplate = CATEGORY_TEMPLATES[remainingCategories[0]];
    return `${opening} ${mainSentence} Additionally, ${extraTemplate.clause}.`;
  }

  // 4 or more options
  const extraSentences = remainingCategories.map(
    (cat) => CATEGORY_TEMPLATES[cat].standalone
  );

  return `${opening} ${mainSentence} ${extraSentences.join(" ")}`;
}

/**
 * Helper to check if a given feedback string matches an auto-generated output for any combination of categories.
 */
export function isGeneratedReviewText(text: string): boolean {
  if (!text || !text.trim()) return true;
  const trimmed = text.trim();
  return (
    trimmed.startsWith("I had a very positive experience at Jyothsna Hospital.") ||
    trimmed.startsWith("I had a satisfactory experience at Jyothsna Hospital.") ||
    trimmed.startsWith("Here is my feedback regarding my visit to Jyothsna Hospital.")
  );
}
