import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
    ) {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentLibrarian = this.authenticationService.currentLibrarianValue;
        if (currentLibrarian && currentLibrarian.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `${currentLibrarian.token}`
                }
            });
        }

        return next.handle(request);
        }
}