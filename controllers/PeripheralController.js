const Peripheral=require('../models/Peripheral');
const Gateway=require('../models/Gateway');

module.exports = {
    create,
    getAll,
    deletePeripheral
};

async function create(req, res) {
    const {uid, vendor, status , gateway } = req.body

    const peripheral = new Peripheral({
        uid,
        vendor,
        status,
        gateway
    });

    let new_peripheral;
    try {
        const gatewayById = await Gateway.findById(gateway);

        if(gatewayById.peripherals.length < 10) {
            new_peripheral = await peripheral.save();
        }
        else {
            return res.status(500).json({
                details: "Gateways only admits 10 peripherals!",
            });
        }
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

async function deletePeripheral(req, res) {
    try {
      const { id } = req.params;

      const result = await Peripheral.findOneAndDelete({ _id: id });

      const gateway = await Gateway.findOneAndUpdate(
        { _id: result.gateway },
        { $pull: { peripherals: { _id: result._id } } },
        { safe: true, multi: false }
      );

      res.status(200).json({
        data: result,
        message: "Peripheral was succefully deleted!",
      });
    } catch (error) {
      res.status(500).json({
        details: error.message,
      });
    }
  }
  