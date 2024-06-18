const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hubSchema = new Schema({
    hubName: String,
    regionName: String,
    stateName: String,
    cityName: String,
    hubTier: String
});


const OrdersSchema = new mongoose.Schema({
    origin:{type: hubSchema, required: [true, 'must provide value']},
    destination: {type: hubSchema, required: [true, 'must provide value']},
    dispatchMedium: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    orderId: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    orderSize: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    riderName: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    pickupRemark: {type: String, maxlength :[50, 'cannot be more than 50']},
    orderCategory: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    orderStatus: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    orderCreationTime: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 50']},
    busDriverNumber:{type: String, maxlength :[50, 'cannot be more than 50']},
    busName:{type: String, maxlength :[50, 'cannot be more than 50']},
    busNumber:{type: String, maxlength :[50, 'cannot be more than 50']},
    eta:{type: String, maxlength :[50, 'cannot be more than 50']},
    localDeliveryRemark:{type: String, maxlength :[50, 'cannot be more than 50']},
    recieveRemark:{type: String, maxlength :[50, 'cannot be more than 50']},
    deliveryRemark:{type: String, maxlength :[50, 'cannot be more than 50']},
    pickupDate:{type: String, maxlength :[50, 'cannot be more than 50']},
    pickupTime:{type: String, maxlength :[50, 'cannot be more than 50']},
    dispatchDate:{type: String, maxlength :[50, 'cannot be more than 50']},
    dispatchTime:{type: String, maxlength :[50, 'cannot be more than 50']},
    deliverDate:{type: String, maxlength :[50, 'cannot be more than 50']},
    deliverTime:{type: String, maxlength :[50, 'cannot be more than 50']},
    recieveDate:{type: String, maxlength :[50, 'cannot be more than 50']},
    recieveTime:{type: String, maxlength :[50, 'cannot be more than 50']},
    deliveryPersonName:{type: String, maxlength :[50, 'cannot be more than 50']},
    remoteRecieverName:{type: String, maxlength :[50, 'cannot be more than 50']},
    // kind: {
    //     type: String,
    //     enum : {
    //         values :['Bus', 'Local Delivery'],
    //         message : '{VALUE} is not supported'
    //     },
    //     default: 'Local Delivery'
    // },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required: [true, 'Please provide user']
    },
    createdByName: String,
    createdByEmail: String
},{timestamps:true});

OrdersSchema.pre('save', async function () {
    try {
        const User = mongoose.model('Users');
        const user = await User.findById(this.createdBy);
        if (!user) {
            this.createdByName = 'Unknown';
            this.createdByEmail = 'Unknown';
        } else {
            this.createdByName = user.name; 
            this.createdByEmail = user.email;
            // Assuming 'name' is the field in the Users model that stores the user's name
        }
    } catch (error) {
        console.error('Error:', error);
        this.createdByName = 'Unknown'; 
        this.createdByEmail = 'Unknown';// Set default name if there's an error
    }
});

module.exports = mongoose.model('Orders', OrdersSchema)