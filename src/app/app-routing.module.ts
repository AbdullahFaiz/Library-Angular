import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ {
  path: 'author',
  component: AuthorComponent
},
{ path: 'home', component: HomeComponent },
{ path: '', component: HomeComponent },
{
  path: 'book',
  component: BookComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
