import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})


export class AuthorComponent {
  constructor(
    private authorService: AuthorService,
    private router: Router,) {}

  authorList:Author[] = [];
  tempauthorList:Author[] = [];
  authorDelete : any;

  authorAddForm : FormGroup;
  authorEditForm : FormGroup;
  view : String = "default";
  ngOnInit() {
    this.initForm();

    this.getAllAuthor();
  }

   //Initialize the Add Form
   private initForm(){
    this.authorAddForm = new FormGroup({
      'firstName'  : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required)
    });

    this.authorEditForm = new FormGroup({
      'authorId'  : new FormControl(null, Validators.required),
      'firstName'  : new FormControl(null, Validators.required),
      'lastName'  : new FormControl(null, Validators.required)
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

  create(){
    let formData = new FormData();
    let data : object;
    data = {
      'firstName'             :  this.authorAddForm.value.firstName,
      'lastName'      :  this.authorAddForm.value.lastName
    }
    console.log(data);
    if(this.authorAddForm.valid){
      data = {
        'firstName'             :  this.authorAddForm.value.firstName,
        'lastName'      :  this.authorAddForm.value.lastName
      }

      this.authorService.create(data).subscribe((response) => {
        setTimeout(() => { }, 1500);


          Swal.fire({
            title: "Success",
            text: "Author Created Successfully!",
            icon: "success"
          });

          this.changeView('default', null);

      },
      error => {
        Swal.fire({
          title: "Failed",
          text: "Author Creation Unsuccessful!",
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

  //update author
  update(){

    let formData = new FormData();
    let data : object;

    if(this.authorEditForm.valid){
      data = {
        'authorId'  :  this.authorEditForm.value.authorId,
        'firstName'           :  this.authorEditForm.value.firstName,
        'lastName'           :  this.authorEditForm.value.lastName
      }



      this.authorService.update(data).subscribe((response) => {
        setTimeout(() => { }, 1500);

          Swal.fire({
            title: "Success",
            text: "Author Updated Successfully!",
            icon: "success"
          });
          this.changeView("default",null)
      },
       error => {
        Swal.fire({
          title: "Failed",
          text: "Author Update Unsuccessful!",
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
  deleteauthor(){

    console.log("delete");
    this.authorService.delete(this.authorDelete["authorId"]).subscribe((response) => {
    console.log("response");
    console.log(response);
    Swal.fire({
      title: "Success",
      text: "Author Updated Successfully!",
      icon: "success"
    });
    this.changeView("default",null)

    },
    error => {
     Swal.fire({
       title: "Failed",
       text: "Author Update Unsuccessful!",
       icon: "error"
     });
   });

  }
  changeView(view,data){
    this.view = view
    if(view == "add"){
      this.authorAddForm.reset();
    }else if (view == "edit"){
      this.authorEditForm.reset();
      this.authorEditForm.patchValue({

        'authorId'  : data.authorId,
        'firstName'  : data.firstName,
        'lastName'  : data.lastName

      });
    }else if(this.view === 'delete'){

      this.authorDelete = data;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {

          this.authorAddForm.reset();
          this.authorEditForm.reset();
          this.view = "default";
          console.log("then");
          if (result) {
              console.log("confirm");

              this.deleteauthor();
          }
      });

    }else{
      this.view = "default";
      this.getAllAuthor();
    }
  }



}
