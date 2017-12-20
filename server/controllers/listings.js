var mongoose = require('mongoose');
var Listing = mongoose.model('Listing');
var User = mongoose.model('User');

module.exports = {
    getAll: function (req, res) {
        Listing.find({}, function (err, listings) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('all listings', listings);
                return res.json(listings);
            }
        });
    },
    create: function (req, res) {
        console.log('ses', req.session.userid)
        User.findOne({ _id: req.session.userid }, function (err, user) {
            console.log(user)
            if (user) {
                var listing = new Listing(req.body);
                listing._user = user._id;
                listing.save(function (err) {
                    console.log('listing', listing);
                    console.log('errors', err);
                    user.listings.push(listing);
                    user.save(function (err) {
                        console.log(user)
                        if (err) {
                            console.log(err);
                            res.json({created:'failed'})
                        }else {
                            res.json(listing)
                        }
                    });
                });
            } else {
                console.log('not found')
                res.json({user:'not found'})
            }
        });
    },
    delete: function (req, res) {
        console.log(req.params)
        Listing.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            } else {
                return res.json({Deleted: true});
            }
        });
    },

    update: function (req, res) {
        Listing.findOne({_id:req.body.lid}, function(err, result) {
            console.log('old listing', result)
            result.update(req.body.data, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({Updatedstatus: true});
                }
            })
        })
    },
    getUserListings: function(req,res) {
        User.find({_id: req.session.userid}).populate('listings').exec(function (err, listings) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('my listings ses', req.session.userid)
                console.log('node server my listings', listings[0].listings);
                return res.json(listings[0].listings);
            }
        })
    },
    login: function(req,res){
        User.findOne({email: req.body.email}, function(err, user) {
            if (user) {
                console.log('user', user)
                console.log('body', req.body)
                if (user.password === req.body.password) {
                    req.session.userid = user._id;
                    console.log('user in session', req.session.userid)
                    return res.json(user)
                } else {
                    return res.json({loginStatus: false})
                }
            } else {
                return res.json({registered:'no'})
            }
        })
    },
    register: function(req, res){
        console.log(req.body)
        User.findOne({email: req.body.email}, function (err, u) {
            if (!u) {
                let user = new User(req.body);
                user.save(function(err){
                    if (err) {
                        console.log(err);
                        return res.json({register: false})
                    }
                    else {
                        req.session.userid = user._id;
                        console.log('user in session', req.session.userid)                    
                        return res.json(user)
                    }
                })
            } 
            else {
                return res.json({use:'in use'});
            }
        })
        
    },
    logoff: function(req,res){
        req.session.destroy();
        return res.json({logout:'true'});
    },
    // search: function(req, res) {
    //     console.log('node search body', req.body)
    //     if (req.body.search.length > 0) {
    //         Listing.find({}, function(err, listings){
    //             console.log('node search after', listings)
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 let ret = []
    //                 for(let i = 0; i < listings.length; i++){
    //                     if (listings[i].title.includes(req.body.search)){
    //                         ret.push(listings[i])
    //                     }
    //                 }
    //                 console.log('ret', ret)
    //                 return res.json(ret)
    //             }
    //         })
    //     } else {
    //         Listing.find({}, function(err, listings){
    //             console.log('node search after', listings)        
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 return res.json(listings)
    //             }
    //         })
    //     }
    // }
}