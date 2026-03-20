export type Worksheet = {
  id: string;
  user_id: string;
  child_id: string;
  topic: string | null;
  html_content: string;
  created_at: string;
  feedback?: WorksheetFeedback;
};

export type WorksheetFeedback = {
  id: string;
  worksheet_id: string;
  user_id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comments: string | null;
  created_at: string;
};

export type FeedbackSummary = {
  avgRating: number;
  totalFeedbacks: number;
  commonThemes: string[];
  recentComments: string[];
};
