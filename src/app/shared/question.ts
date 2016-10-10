export interface Question {
  id: string;
  content: string;
  published: boolean;
  choices: Choice[];
}

export interface Choice {
  content: string;
  content_short: string;
  slug: string;
}
