export type Page = "home" | "about" | "work" | "contact";

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
}