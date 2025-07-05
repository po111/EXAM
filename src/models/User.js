import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt';

const userSchema =  new Schema ({
    firstName: {
        type: String,
        required: [ true, 'First name is required'],
        minLength: [3,'First name must be at least 3 characters long!']
    },
lastName: {
        type: String,
        required: [ true, 'Last name is required'],
        minLength: [3,'Last name must be at least 3 characters long!']

    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10,'Email must be at least 10 characters long!']

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4,'Password must be at least 4 characters long!']

    }
});

//Hash password before db save
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

const User =  model('User', userSchema);

export default User;