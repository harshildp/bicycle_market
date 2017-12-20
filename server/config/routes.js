var listingController = require('../controllers/listings');

module.exports = app => {
    app
        .get('/listings', listingController.getAll)
        .get('/listings/user', listingController.getUserListings)
        .post('/listings/add', listingController.create)
        .delete('/listings/delete/:id', listingController.delete)
        .put('/listings/update', listingController.update)
        .post('/login', listingController.login)
        .post('/register', listingController.register)
        .get('/logoff', listingController.logoff)
        
        .all("*", (req,res,next) => {
            res.sendFile(path.resolve("./public/dist/index.html"))
        })
}