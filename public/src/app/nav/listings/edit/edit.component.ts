import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../listing.service';
import { Listing } from '../../../listing';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
myListings: Listing[]

  constructor(private _listingService: ListingService, private _router: Router) {    
  }

  ngOnInit() {
    this._listingService.getMyList(myListings => this.myListings = myListings)
  }

  update(listid, data){
    let content = {
      lid: listid,
      data: data.form.value
    }
    content.data._id = listid;
    this._listingService.update(content, res => {
      console.log(res)
      this.myListings = this._listingService.myListings      
    })
  }

  delete(listid) {
    this._listingService.delete(listid, res => {
      console.log(res)
      this.myListings = this._listingService.myListings
    })
  }
}
