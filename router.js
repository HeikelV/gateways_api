const express = require("express");
const router =  express.Router();
const GatewaysController=require("./controllers/GatewaysController")
const PeripheralsController=require("./controllers/PeripheralController")

router.get('/',(_req,res)=>{
    res.send("ok")
})
//Gateways routes
router.post('/gateways',GatewaysController.create);
router.get('/gateways',GatewaysController.getAll);
router.get('/gateways/:id',GatewaysController.get);
router.get('/gateways/:id/peripherals',GatewaysController.getPeripherals);
router.put('/gateways/:id',GatewaysController.update);
router.delete('/gateways/:id',GatewaysController.deleteGateway);

//Peripheral routes
router.post('/peripherals',PeripheralsController.create);
router.get('/peripherals',PeripheralsController.getAll);
router.delete('/peripherals/:id',PeripheralsController.deletePeripheral);

module.exports=router