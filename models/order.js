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
    dispatchMedium: {type: String, required: [true, 'must provide value'], maxlength :[20, 'cannot be more than 20']},
    orderId: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 20']},
    orderSize: {type: String, required: [true, 'must provide value'], maxlength :[20, 'cannot be more than 20']},
    riderName: {type: String, required: [true, 'must provide value'], maxlength :[20, 'cannot be more than 20']},
    pickupRemark: {type: String, maxlength :[20, 'cannot be more than 20']},
    orderCategory: {type: String, required: [true, 'must provide value'], maxlength :[20, 'cannot be more than 20']},
    orderStatus: {type: String, required: [true, 'must provide value'], maxlength :[20, 'cannot be more than 20']},
    orderCreationTime: {type: String, required: [true, 'must provide value'], maxlength :[50, 'cannot be more than 20']},
    busDriverNumber:{type: String, maxlength :[20, 'cannot be more than 20']},
    busName:{type: String, maxlength :[20, 'cannot be more than 20']},
    busNumber:{type: String, maxlength :[20, 'cannot be more than 20']},
    eta:{type: String, maxlength :[20, 'cannot be more than 20']},
    localDeliveryRemark:{type: String, maxlength :[20, 'cannot be more than 20']},
    recieveRemark:{type: String, maxlength :[20, 'cannot be more than 20']},
    deliveryRemark:{type: String, maxlength :[20, 'cannot be more than 20']},
    pickupDate:{type: String, maxlength :[20, 'cannot be more than 20']},
    pickupTime:{type: String, maxlength :[20, 'cannot be more than 20']},
    dispatchDate:{type: String, maxlength :[20, 'cannot be more than 20']},
    dispatchTime:{type: String, maxlength :[20, 'cannot be more than 20']},
    deliverDate:{type: String, maxlength :[20, 'cannot be more than 20']},
    deliverTime:{type: String, maxlength :[20, 'cannot be more than 20']},
    recieveDate:{type: String, maxlength :[20, 'cannot be more than 20']},
    recieveTime:{type: String, maxlength :[20, 'cannot be more than 20']},
    deliveryPersonName:{type: String, maxlength :[20, 'cannot be more than 20']},
    remoteRecieverName:{type: String, maxlength :[20, 'cannot be more than 20']},
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
    }
},{timestamps:true});

module.exports = mongoose.model('Orders', OrdersSchema)