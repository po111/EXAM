import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt';

const rideSchema =  new Schema ({
    model: {
        type: String,
        required: [ true, 'Model is required'],
        minLength: [2,'Model must be at least 2 characters long!']
    },
    manufacturer: {
        type: String,
        required: [ true, 'Manufacturer is required'],
        minLength: [3,'Manufacturer must be at least 3 characters long!']

    },

    engine: {
        type: String,
        required: [true, 'Engine is required'],
        minLength: [3,'Engine must be at least 3 characters long!']

    },
    topSpeed: {
        type: Number,
        required: [true, 'Top speed is required'],
        min: [10,'Top speed must be at least 2 digit number!']

    },
    image: {
        type: String,
        required: [true, 'Image is required'],        
        validate: [/^https?:\/\//, 'Invalid image url'],

    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5,'Description must be between 5 and 500 characters!'],
        maxLength: [500,'Description must be between 5 and 500 characters!'],
        

    },
    
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }], 

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',   
    },

});



const Ride =  model('Ride', rideSchema);

export default Ride;