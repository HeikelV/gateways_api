const mongoose = require("mongoose");

const PeripheralSchema = new mongoose.Schema({
        uid: {
            type: Number,
            required: true
        },
        vendor: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum : ['online','offline'],
            default: 'online'
        },
        gateway: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Gateway'
        }
    }, {
        timestamps: {
            createdAt:true,
            updatedAt:false
        }
    }
)

module.exports=mongoose.model("Peripheral", PeripheralSchema)