import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ListingService } from '../../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
user: User;
cpassword: String;
failed: boolean;
  constructor(private _listingService: ListingService, private _router: Router) {
    this.user = new User();
    this.cpassword = '';
    this.failed = false;
  }

  ngOnInit() {
  }
  
  register(){
    this._listingService.register(this.user, res => {
      this.failed = false
      this._router.navigate(['/nav/browse'])
    }, 
    err => {
      console.log(err)
      this.failed = true;
    });
  }
}
