import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginDto} from '../model/loginDto';
import {User} from '../model/user';
import * as jwtDecode from 'jwt-decode';

const API_URL = environment.apiUrl;
const AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER_INFO = 'USER_INFORMATION';
const ONE_MINUTE = 60000;

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  public signIn(token: String) {
    return this.http.post<LoginDto>(API_URL + '/login', token)
      .subscribe((loginDto) => {
        window.localStorage.setItem(AUTHENTICATION_TOKEN, loginDto.authenticationToken);
        window.localStorage.setItem(REFRESH_TOKEN, loginDto.refreshToken);
        window.localStorage.setItem(USER_INFO, JSON.stringify(loginDto.user));
        console.log('User: ' + JSON.stringify(loginDto.user));
      }, () => {
        alert('Unsupported domain. Please contact an administrator.'); // FIXME replace with something proper.
      });
  }

  public getRefreshToken(): string {
    return window.localStorage.getItem(REFRESH_TOKEN);
  }

  public getUser(): User {
    const userInfo = window.localStorage.getItem(USER_INFO);
    return new User(userInfo);
  }

  public getAuthenticationToken(): string {
    const authenticationToken = window.localStorage.getItem(AUTHENTICATION_TOKEN);
    if (!authenticationToken) {
      return null;
    }

    const tokenExpired = this.isTokenExpired(authenticationToken);
    if (tokenExpired) {
      this.refreshToken();
    }

    return authenticationToken;
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate === undefined) {
      return true;
    }

    return expirationDate.valueOf() < new Date().valueOf() - ONE_MINUTE;
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private refreshToken() {
    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN);
    return this.http.post<string>(API_URL + '/tokenRefresh', refreshToken, {responseType: 'text' as 'json'})
      .subscribe((authenticationToken) => {
        window.localStorage.setItem(AUTHENTICATION_TOKEN, authenticationToken);
      }, (error) => {
        console.log('Failed to refresh token: ' + JSON.stringify(error));
      });
  }

}
