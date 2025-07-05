import Ride from "../models/Ride.js";


export default {

   // getAll() {      
   //    return Ride.find();;
   // },

   getAll(filter = {}) { 

        let query = Ride.find();

        if(filter.owner) {

        query = query.find({owner: filter.owner});
        };

        return query;
   },

   getOne(rideId) {
      return Ride.findById(rideId);
   },

 create(rideData, ownerId){
 
    return Ride.create({ ...rideData, owner: ownerId});
 }, 
   async like(rideId, userId) {
      const ride = await this.getOne(rideId);

      if (ride.owner.equals(userId)) {
         throw new Error('Owners cannot recommend!');
      }
      
      ride.likes.push(userId);

      return ride.save();
     
   },


   async delete(rideId, userId) {

      const ride = await this.getOne(rideId);

   if (!ride.owner.equals(userId)){
      throw new Error('Only owner can delete rides!');
   }

      return Ride.findByIdAndDelete(rideId);
   },

   async edit( rideId,rideData, userId) {

      const ride = await Ride.findById(rideId);

      if (!ride.owner.equals(userId)) {
         throw new Error('Only owner can edit rides!');
      }

      return Ride.findByIdAndUpdate(rideId, rideData, {runValidators: true});
   }

}