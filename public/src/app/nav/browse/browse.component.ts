import { Component, OnInit } from '@angular/core';
import { Listing } from '../../listing';
import { User } from '../../user';
import { ListingService } from '../../listing.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
listings: Listing[]
logged: User;

  constructor(private _listingService: ListingService) {
    this.logged = this._listingService.loggedIn;
  }

  ngOnInit() {
    this._listingService.getAll(listings => this.listings = listings)    
  }

  search(data){
    console.log('from form', data)
    let content = data.form.value
    console.log('search content brows', content)
    this._listingService.search(content, res => {
      this.listings = res;
      console.log('listings after', this.listings)
    })
  }

  delete(listid) {
    this._listingService.delete(listid, res => {
      console.log(res)
      this.listings = this._listingService.allListings
    })
  }
}
