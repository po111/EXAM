import {Router} from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import rideService from "../services/rideService.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const rideController = Router();

rideController.get('/catalog', async (req, res) => {

    const rides = await rideService.getAll();
   
    res.render('catalog', {rides, pageTitle: 'Catalog'});
});


rideController.get('/create', isAuth, (req, res) => {
    res.render('ride/create', {pageTitle: 'Create ride'})
});

rideController.post('/create', isAuth, async (req, res) => {
    const rideData = req.body;

    const ownerId = req.user.id;

    try {
        await rideService.create(rideData, ownerId);

        res.redirect('/rides/catalog');
    } catch (err) {
        res.render('ride/create', {error: getErrorMessage(err), ride: rideData});
    }
    
});

rideController.get('/:rideId/details', async (req, res) => {
    const rideId = req.params.rideId; 
    console.log('ride id:', rideId) 

    const ride = await rideService.getOne(rideId);

    console.log('ride obj:', ride) 
    
    const isLiked = ride.likes.includes(req.user?.id);

    console.log('ride isLiked:', isLiked) 
     
    const isOwner = ride.owner?.equals(req.user?.id);
    
    const author = await userService.findUserById(ride.owner);

      let authorName = author.firstName + ' ' + author.lastName;
      //authorName = authorName.

    const totalLikes = ride.likes.length;
    const hasLikes = totalLikes>0;

    let peopleLiked = await userService.findPeopleLikedById(ride.likes);

     let peopleLikedEmails = peopleLiked.map(user => user.email).join(', ');
      
    
    res.render('ride/details', {ride, isOwner, authorName, hasLikes, peopleLikedEmails, isLiked, totalLikes, pageTitle: 'Details'});
});

rideController.get('/:rideId/like', async (req, res) => {
    const rideId = req.params.rideId;

    const userId = req.user.id;

        try {
            await rideService.like(rideId, userId);

            res.redirect(`/rides/${rideId}/details`);

        } catch (err) {
            res.render('notFound', { error: getErrorMessage(err)});
        }
    
});

rideController.get('/:rideId/delete', isAuth, async (req, res) => {

    const  rideId = req.params.rideId; 

    const userId = req.user.id;

    try {
        await rideService.delete(rideId, userId);

          res.redirect('/rides/catalog');

    } catch (err) {
        res.render('notFound', {error: 'Only owner can delete products!'})

    }   
});

rideController.get('/:rideId/edit', isAuth, async (req, res) => {

    const rideId = req.params.rideId;

    const ride = await rideService.getOne(rideId);

    res.render('ride/edit', {ride});
});

rideController.post('/:rideId/edit', isAuth, async (req, res) => {

    const rideId = req.params.rideId;
    //console.log(rideId);
    const rideData = req.body;
    //console.log(rideData);
    const userId = req.user.id;

    try {

        await rideService.edit(rideId, rideData, userId);

        res.redirect(`/rides/${rideId}/details`);

    } catch (err) {

        res.render('ride/edit', {error: getErrorMessage(err), ride: rideData})
    }
    
});


export default rideController;