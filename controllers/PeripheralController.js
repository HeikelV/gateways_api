const Peripheral=require('../models/Peripheral');
const Gateway=require('../models/Gateway');

module.exports = {
    create,
    getAll
};

async function create(req, res) {
    const {uid, vendor, status , gateway } = req.body

    const peripheral = new Peripheral({
        uid,
        vendor,
        status,
        gateway
    });

    try {
        const new_peripheral = await peripheral.save();

        const gatewayById = await Gateway.findById(gateway);
        gatewayById.peripherals.push(new_peripheral);
        await gatewayById.save();

        res.status(200).json({
            data: new_peripheral,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function getAll(req, res) {
    try {
        const peripherals = await Peripheral.find({}).populate("gateway");
        res.status(200).json({
            data: peripherals,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}