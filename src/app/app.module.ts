import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LoginComponent} from './views/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {NavigationComponent} from './views/navigation/navigation.component';
import {HomeComponent} from './views/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';
import {NgGapiClientConfig} from './configs/GoogleApiClientConfig';
import {GoogleApiModule, NG_GAPI_CONFIG} from 'ng-gapi';
import {AuthenticationService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './interceptors/authenticationInterceptor';
import {UserService} from './services/user.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '270480568585-us8p7u9v587ev2rf3vkfai4tc6depvhu.apps.googleusercontent.com',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
  scope: 'profile'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [
    AuthenticationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
