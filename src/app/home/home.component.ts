import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  selectedBook: any = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBook().subscribe(
      (data: any) => {
        this.books = data.content; // assuming data is paginated
      },
      (error) => {
        console.error('Failed to fetch books:', error);
      }
    );
  }

  selectBook(book: any): void {
    this.selectedBook = book;
  }

  closePopup(): void {
    this.selectedBook = null;
  }
}
