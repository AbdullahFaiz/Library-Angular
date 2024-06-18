import { Author } from "./author.model";

export interface Book {
  id: number;
  name: string;
  isbn: string;
  author: Author;
}
