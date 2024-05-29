export interface Book {
  id: string;
  user_id: string | null;
  title: string;
  author: string;
  published_date: string;
  genre: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
