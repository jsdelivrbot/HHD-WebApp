import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/authentication.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(AuthenticationService);

    if (request.url.includes('/login') || request.url.includes('/tokenRefresh')) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getAuthenticationToken()}`
      }
    });

    return next.handle(request);
  }
}
