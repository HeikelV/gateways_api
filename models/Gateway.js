const mongoose = require("mongoose");


const GatewaySchema = new mongoose.Schema({
    serial_number: {
        type: "String",
        required: true
    },
    name: {
        type: "String",
        required: true
    },
    ipv4_address: {
        type: "String",
        validate: {
            validator: function (v) {
                return /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(v);
            },
            message: props => `${props.value} is not a valid ip address!`
        },
        required: true
    },
    peripherals : {
       type:[{
           type: mongoose.Schema.Types.Object,
           ref:'Peripheral',
       }],
        validate: {
            validator: function(v) {
                console.log(v.length)
                return v.length <= 10;
            },
            message: props => `${props.value} is only 2`
        }
    },
})

module.exports = mongoose.model("Gateway", GatewaySchema)