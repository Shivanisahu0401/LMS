export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed';
  coverUrl: string;
  publishedYear: number;
}

export interface AddBookFormData {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  coverUrl: string;
}