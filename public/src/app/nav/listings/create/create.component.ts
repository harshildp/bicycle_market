import { Component, OnInit } from '@angular/core';
import { Listing } from '../../../listing';
import { ListingService } from '../../../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
listing: Listing;

  constructor(private _listingService: ListingService, private _router: Router) {
    this.listing = new Listing();
  }

  ngOnInit() {
  }

  create() {
    this._listingService.create(this.listing, res => {
      this.listing = new Listing();
      this._router.navigate(['/nav/browse']);
    })
  }
}
