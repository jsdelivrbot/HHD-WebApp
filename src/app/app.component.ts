import { Component } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private title: Title,
              private meta: Meta,
              private router: Router) {

    this.title.setTitle('Hungry Hungry Dev');
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     switch (event.urlAfterRedirects) {
    //       case '/':
    //         this.meta.updateTag({
    //           name: 'description',
    //           content: 'Home page'
    //         });
    //         break;
    //       case '/login':
    //         this.title.setTitle('Login');
    //         this.meta.updateTag({
    //           name: 'description',
    //           content: 'Login page'
    //         });
    //         break;
    //     }
    //   }
    // });
  }
}
