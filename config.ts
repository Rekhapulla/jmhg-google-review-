/**
 * Hospital & Review Configuration
 * 
 * Update GOOGLE_REVIEW_URL with the official Google Maps / Business Profile review link.
 * You can also set NEXT_PUBLIC_GOOGLE_REVIEW_URL in your .env or Vercel dashboard.
 */

export const HOSPITAL_NAME = "Jyothsna Maternity & General Hospital";
export const HOSPITAL_SHORT_NAME = "JMHG";

export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/CYpR2wMYi4b4EBE/review";

export const HOSPITAL_TAGLINE =
  "Excellence in maternity, women's health, and comprehensive general healthcare.";

export const HOSPITAL_WEBSITE = "https://jmgh.in";

export const CATEGORY_OPTIONS = [
  "Doctor consultation",
  "Staff support",
  "Communication",
  "Cleanliness",
  "Waiting experience",
  "Overall care",
  "Pharmacy",
  "Billing",
  "Other",
] as const;

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];
