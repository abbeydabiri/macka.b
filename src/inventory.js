import express from "express";
const router = express.Router();

router.post('/', async (req, res) => {
    
    let jsonResp = { "code": 400, "message": "Invalid json message received" }
    if (!req.body) {
        return res.status(jsonResp.code).json(jsonResp)
    }

    if (!Array.isArray(req.body)) {
        jsonResp.message = `An array of items is expected like this ->  [ { 'itemID': 12345,  'itemName': 'Fancy Dress', 'quantity': 10} ]`
        return res.status(jsonResp.code).json(jsonResp)
    }
    
    let item = {}
    for (var index = 0; index < req.body.length; index++) {
        item = req.body[index]

        if (!item.itemID) {
            jsonResp.message = `field itemID of index ${index} is invalid`
            return res.status(jsonResp.code).json(jsonResp)
        }

        if (!item.itemName) {
            jsonResp.message = `field itemName of index ${index} is invalid`
            return res.status(jsonResp.code).json(jsonResp)
        }

        if (!item.quantity) {
            jsonResp.message = `field quantity of index ${index} is invalid`
            return res.status(jsonResp.code).json(jsonResp)
        }

        if (item.quantity < 2) {
            jsonResp.message = `minimum of 2 items required per inventory in index ${index}`
            return res.status(jsonResp.code).json(jsonResp)
        }

        if (memorydb.items[item.itemID]) {
            memorydb.items[item.itemID].itemName = item.Name
            memorydb.items[item.itemID].quantity += item.quantity
        } else {
            memorydb.items[item.itemID] = item
        }
    }

    let totalInventory = Object.keys(memorydb.items).length
    jsonResp = { "code": 200, "message": `Total inventory is now ${totalInventory}` }

    return res.status(jsonResp.code).json(jsonResp)
});

export default router;