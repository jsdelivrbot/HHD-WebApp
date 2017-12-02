import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../model/user';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthenticationApiService {

  constructor(private http: HttpClient) { }

  public signIn(token: String) {
    return this.http.post<User>(API_URL + '/login', token);
  }

}
