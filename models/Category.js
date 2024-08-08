const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
})
const Category = mongoose.model('Category',categorySchema);
module.exports = Category