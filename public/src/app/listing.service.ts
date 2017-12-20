import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Listing } from './listing';
import { User } from './user';

@Injectable()
export class ListingService {
  allListings: Listing[];
  loggedIn: User;
  myListings: Listing[];

  constructor(private _http: Http) {
    this.loggedIn = new User()
  }
  
  login(user, cb, eb){
    this._http.post('/login', user).subscribe(
      res => {
        let r = res.json()
        console.log('r', r)
        if (r['registered'] !== undefined || r['loginStatus'] !== undefined) {
          eb('user not registered')          
        } else {
          this.loggedIn.email = r.email;
          this.loggedIn._id = r._id;
          console.log('loggedin', this.loggedIn)
          cb()
        }
      },
      err => eb(err)
    )
  }

  register(user, cb, eb){
    this._http.post('/register', user).subscribe(
      res => {
        let r = res.json()
        console.log(r)
        if (r['use'] !== undefined) {
          eb('email in use')
        } else {
          this.loggedIn.email = r.email;
          this.loggedIn._id = r._id;
          console.log('loggedin', this.loggedIn)
          cb()
        }
      },
      err => eb(err)
    )
  }

  logoff(){
    this._http.get('/logoff').subscribe(
      res => {
        console.log('Successfully logged out')
        this.loggedIn = new User();
        this.myListings = []
        this.allListings = []
        console.log('logoff', this.loggedIn)
      },
      err => console.log(err)
    )
  }

  getAll(cb){
    this._http.get('/listings').subscribe(
      res => { 
        console.log(res.json())
        this.allListings = res.json()         
        cb(res.json())
      },
      err => console.log(err)
    )
  }

  getMyList(cb){
    this._http.get('/listings/user').subscribe(
      res => { 
        let r = res.json()
        console.log('mylistings', res.json())
        this.myListings = r  
        console.log('my listings', this.myListings)    
        cb(res.json())
      },
      err => console.log(err)
    )
  }

  create(listing, cb) {
    this._http.post('/listings/add', listing).subscribe(
      res => { 
        let r = res.json();
        if (r['user'] === undefined) {
          cb(res.json())
        } else {
          console.log('not found')
        }
      },
      err => console.log(err)
    )
  }

  update(data, cb) {
    this._http.put('/listings/update', data).subscribe(
      res => {
        let idx = 0;
        for (let i = 0; i < this.myListings.length; i++) {
          if (this.myListings[i]._id == data.lid) {
            idx = i;
            break;
          }
        }
        this.myListings[idx] = data.data;
        let idx2 = 0;
        for (let i = 0; i < this.allListings.length; i++) {
          if (this.allListings[i]._id == data.lid) {
            idx2 = i;
            break;
          }
        }
        this.allListings[idx2]=data.data;
        cb(res.json())
      },
      err => console.log(err)
    )
  }

  delete(listid, cb) {
    this._http.delete(`/listings/delete/${listid}`).subscribe(
      res => {
        let idx = 0;
        for (let i = 0; i < this.myListings.length; i++) {
          if (this.myListings[i]._id == listid) {
            idx = i;
            break;
          }
        }
        this.myListings.splice(idx, 1);
        let idx2 = 0;
        for (let i = 0; i < this.allListings.length; i++) {
          if (this.allListings[i]._id == listid) {
            idx2 = i;
            break;
          }
        }
        this.allListings.splice(idx2, 1);
        cb(res.json())
      },
      err => console.log(err)
    )
  }

  search(data, cb) {
    if(data.searchby == undefined) {
      if (data.search.length > 0) {
        let ret = []
        for(let i = 0; i < this.allListings.length; i++){
            if (this.allListings[i].title.toLowerCase().includes(data.search.toLowerCase())){
                ret.push(this.allListings[i])
            }
        }
        console.log('ret', ret)
        return cb(ret);
      } else {
        return cb(this.allListings);
      }
    } else {
      if (data.search.length > 0) {
        let ret = []
        let by = data.searchby
        for(let i = 0; i < this.allListings.length; i++){
            if (this.allListings[i][data.searchby].toString().toLowerCase().includes(data.search.toString().toLowerCase())){
                ret.push(this.allListings[i])
            }
        }
        console.log('ret', ret)
        return cb(ret);
      } else {
        return cb(this.allListings);
      }
    }

  }
}
