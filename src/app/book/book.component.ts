import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.model';
import Swal from 'sweetalert2';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author.model';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,) {}

  authorList:Author[] = [];
  tempauthorList:Author[] = [];

  bookList:Book[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  tempbookList:Book[] = [];
  bookDelete : any;

  bookAddForm : FormGroup;
  bookEditForm : FormGroup;
  view : String = "default";
  ngOnInit() {
    this.initForm();
    this.getAllAuthor();
    this.getAllBook();
  }

   //Initialize the Add Form
   private initForm(){
    this.bookAddForm = new FormGroup({
      'name'  : new FormControl(null, Validators.required),
      'isbn'  : new FormControl(null, Validators.required),
      'author'  : new FormControl(null, Validators.required)
    });

    this.bookEditForm = new FormGroup({
      'bookId'  : new FormControl(null, Validators.required),
      'name'  : new FormControl(null, Validators.required),
      'isbn'  : new FormControl(null, Validators.required),
      'author'  : new FormControl(null, Validators.required)
    });
  }

  //get all Author
  getAllAuthor(){
    this.authorService.getAllAuthor().subscribe((data: Author[]) => {
      this.authorList  = [];
      this.tempauthorList  = [];

      setTimeout(() => {}, 1500);
      this.authorList  = data;
      this.tempauthorList  = data;

      console.log("this.authorList");
      console.log(this.authorList);
      console.log("this.authorList");

    })
  }
  //get all Book
  getAllBook(){
    this.bookService.getAllBook(this.page, this.size).subscribe((data: any) => {
      this.bookList = data.content;
      this.totalPages = data.totalPages;
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getAllBook();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAllBook();
    }
  }

  create(){
    let formData = new FormData();
    let data : object;
    data = {
      'name'             :  this.bookAddForm.value.name,
      'isbn'      :  this.bookAddForm.value.isbn,
      'author'      :  {'authorId':this.bookAddForm.value.author}
    }
    console.log(data);
    if(this.bookAddForm.valid){
      data = {
        'name'             :  this.bookAddForm.value.name,
        'isbn'      :  this.bookAddForm.value.isbn,
        'author'      :  {'authorId':this.bookAddForm.value.author}
      }

      this.bookService.create(data).subscribe((response) => {
        setTimeout(() => { }, 1500);


          Swal.fire({
            title: "Success",
            text: "Book Created Successfully!",
            icon: "success"
          });

          this.changeView('default', null);

      },
      error => {
        Swal.fire({
          title: "Failed",
          text: "Book Creation Unsuccessful!",
          icon: "error"
        });
      });
    }else{
      Swal.fire({
        title: "Invalid",
        text: "Form Data Invalid",
        icon: "warning"
      });
    }
  }

  //update book
  update(){

    let formData = new FormData();
    let data : object;

    if(this.bookEditForm.valid){
      data = {
        'bookId'  :  this.bookEditForm.value.bookId,
        'name'             :  this.bookEditForm.value.name,
        'isbn'      :  this.bookEditForm.value.isbn,
        'author'      :  {'authorId':this.bookEditForm.value.author}
      }



      this.bookService.update(data).subscribe((response) => {
        setTimeout(() => { }, 1500);

          Swal.fire({
            title: "Success",
            text: "Book Updated Successfully!",
            icon: "success"
          });
          this.changeView("default",null)
      },
       error => {
        Swal.fire({
          title: "Failed",
          text: "Book Update Unsuccessful!",
          icon: "error"
        });
      });
    }else{

      Swal.fire({
        title: "Invalid",
        text: "Form Data Invalid",
        icon: "warning"
      });

    }
  }
  deletebook(){

    console.log("delete");
    this.bookService.delete(this.bookDelete["bookId"]).subscribe((response) => {
    console.log("response");
    console.log(response);
    Swal.fire({
      title: "Success",
      text: "Book Updated Successfully!",
      icon: "success"
    });
    this.changeView("default",null)

    },
    error => {
     Swal.fire({
       title: "Failed",
       text: "Book Update Unsuccessful!",
       icon: "error"
     });
   });

  }
  changeView(view,data){
    this.view = view
    if(view == "add"){
      this.bookAddForm.reset();
    }else if (view == "edit"){
      this.bookEditForm.reset();
      this.bookEditForm.patchValue({

        'bookId'  : data.bookId,
        'name'  : data.name,
        'isbn'  : data.isbn,
        'author' : data.author.authorId

      });
    }else if(this.view === 'delete'){

      this.bookDelete = data;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {

          this.bookAddForm.reset();
          this.bookEditForm.reset();
          this.view = "default";
          console.log("then");
          if (result) {
              console.log("confirm");

              this.deletebook();
          }
      });

    }else{
      this.view = "default";
      this.getAllBook();
    }
  }


}
