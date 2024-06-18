import { Author } from "./author.model";

export interface Book {
  bookId: number;
  name: string;
  isbn: string;
  author: Author;
}
