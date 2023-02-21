const mongoose = require(`mongoose`);
const { Schema } = mongoose;
const PuppieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },

    color: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },

    weight: {
        type: String,
        required: true,
    },

    breed: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    about: {
        type: String,
        required: true,
    },

    amount:{
        type:String,
        required: true,
    },

    status:{
        type:String,
        required: true,
    },

    image1: {
        type: String,
        required: true,
    },

    image2: {
        type: String,
        required: true,
    },

    image3: {
        type: String,
        required: true,
    },

    image4: {
        type: String,
        required: true,
    },

    image5: {
        type: String,
        required: true,
    },

    
    video1: {
        type: String,
        required: false,
    },

    video2: {
        type: String,
        required: false,
    }

})

const Puppie = mongoose.model(`puppie`, PuppieSchema);
module.exports = Puppie;