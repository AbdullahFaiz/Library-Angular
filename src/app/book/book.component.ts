import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.model';
import Swal from 'sweetalert2';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  constructor(
    private bookService: BookService,
    private router: Router) {}

  bookList:Book[] = [];
  tempbookList:Book[] = [];
  bookDelete : any;

  bookAddForm : FormGroup;
  bookEditForm : FormGroup;
  view : String = "default";
  ngOnInit() {
    this.initForm();

    this.getAllBook();
  }

   //Initialize the Add Form
   private initForm(){
    this.bookAddForm = new FormGroup({
      'firstName'  : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required)
    });

    this.bookEditForm = new FormGroup({
      'bookId'  : new FormControl(null, Validators.required),
      'firstName'  : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required)
    });
  }

  //get all Book
  getAllBook(){
    this.bookService.getAllBook().subscribe((data: Book[]) => {
      this.bookList  = [];
      this.tempbookList  = [];

      setTimeout(() => {}, 1500);
      this.bookList  = data;
      this.tempbookList  = data;

      console.log("this.bookList");
      console.log(this.bookList);
      console.log("this.bookList");

    })
  }

  create(){
    let formData = new FormData();
    let data : object;
    data = {
      'firstName'             :  this.bookAddForm.value.firstName,
      'lastName'      :  this.bookAddForm.value.lastName
    }
    console.log(data);
    if(this.bookAddForm.valid){
      data = {
        'firstName'             :  this.bookAddForm.value.firstName,
        'lastName'      :  this.bookAddForm.value.lastName
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
        'firstName'           :  this.bookEditForm.value.firstName,
        'lastName'           :  this.bookEditForm.value.lastName
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
        'firstName'  : data.firstName,
        'lastName'  : data.lastName

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
