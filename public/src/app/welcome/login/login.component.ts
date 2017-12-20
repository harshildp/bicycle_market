import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ListingService } from '../../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: User;
failed: boolean;

  constructor(private _listingService: ListingService, private _router: Router) {
    this.user = new User();
    this.failed = false;
  }

  ngOnInit() {
  }

  login(){
    this._listingService.login(this.user, res => {
      this.failed = false
      this._router.navigate(['/nav/browse'])
    }, 
    err => {
      console.log(err)
      this.failed = true;
    });
  }
}
