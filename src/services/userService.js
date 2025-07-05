import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { generateAuthToken } from "../utils/userUtils.js";



export default {
    async register(userData) {

        //Check if passwords are the same
        if(userData.password !==userData.rePassword){
            throw new Error('Password Mismatch!')
        }

        //Check if user exists
        const user = await User.findOne({email: userData.email});
        if (user) {
            throw new Error('User already exists!');
        }

        const newUser = await User.create(userData);
        const token = generateAuthToken(newUser);

        return token;
    },

    async login(email, password) {
        const user =  await User.findOne({ email });

        //Validate user
        if (!user) {
            throw new Error('No such user exists!')
        }

                //Validate password
        const isValid =  await bcrypt.compare(password, user.password);

        if(!isValid) {
            throw new Error('Invalid password!');
        }
//Generate token
        const token = generateAuthToken(user);

        return token;
    },
    findUserById(userId) {
        return User.findById(userId);
    },
    findPeopleLikedById(likeIds){
        return User.find({ _id: { $in: likeIds } }).lean();
    },
}

