import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _listingService: ListingService, private _router: Router) { }

  ngOnInit() {
  }

  logoff() {
    this._listingService.logoff();
    this._router.navigate(['/']);
  }
}
