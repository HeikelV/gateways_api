const Gateway=require('../models/Gateway');

module.exports = {
    create,
    getAll,
    get,
    update,
    deleteGateway,
    getPeripherals
};

async function create(req, res) {
    const gateway = new Gateway({
        serial_number: req.body.serial_number,
        name: req.body.name,
        ipv4_address: req.body.ipv4_address
    });

    try {
        const new_gateway = await gateway.save();
        res.status(200).json({
            data: new_gateway,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function getAll(req, res) {
    try {
        const gateways = await Gateway.find();
        res.status(200).json({
            data: gateways,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function get(req, res) {
    try {
        const gateway = await Gateway.find();
        res.status(200).json({
            data: gateway,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function getPeripherals(req, res) {
    try {
        const { id } = req.params;
        const gateway = await Gateway.findById(req.params.id).populate("peripherals");
        res.status(200).json({
            data: gateway.peripherals,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function update(req, res) {
    try {
        const gateway = await Gateway.findOneAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).json({
            data: gateway,
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}

async function deleteGateway(req, res) {
    try {
        await Gateway.findOneAndRemove(req.params.id);
        res.status(200).json({
            message: "Gateway deleted",
        });

    }catch (error){
        res.status(500).json({
            details: error.message,
        });
    }
}