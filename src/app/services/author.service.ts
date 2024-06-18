import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type'                  : 'application/json',
        'Access-Control-Allow-Origin'   : '*'
    })
};


constructor(
    private router              : Router,
    private httpClient          : HttpClient
    ) { }

//api URL
apiUrl = "http://localhost:8080"+"/author";

// HTTP request error handling
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error('Backend returned code error'+ error);
    }
    return throwError(() => 'Something bad happened; please try again later.');
}

create(author : any){
    return this.httpClient.post(this.apiUrl, author, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

update(author : any){
    return this.httpClient.put(this.apiUrl+ '/' + author.authorId, author, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

delete(authorId : any){
    return this.httpClient.delete(this.apiUrl + '/' + authorId, this.httpOptions).pipe(
        catchError(this.handleError)
    );
}

getAllAuthor() {
    return this.httpClient.get<Author[]>(this.apiUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
}

}
