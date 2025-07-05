import {Router} from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import rideService from "../services/rideService.js";

const homeController = Router();

homeController.get('/', (req, res) => {
    //res.send('It really works! | Home Controller');
    res.render('home', {pageTitle: 'Home'});
});

homeController.get('/showcase', isAuth, async (req, res) => {
    //const userId = req.user.id;

    const rides = await rideService.getAll({owner: req.user.id});
    

    res.render('myPosts', {rides, titlePage: 'My Showcase'})
    
});


export default homeController;