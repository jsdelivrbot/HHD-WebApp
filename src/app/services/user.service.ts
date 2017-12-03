import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<User> {
    return this.http.get<User>(API_URL + '/users/me');
  }

}
