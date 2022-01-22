import express from "express";
const router = express.Router();

router.post('/:show_ID/buy_item/:item_ID', async (req, res) => {

    let jsonResp = { "code": 400, "message": "Item does not exist in inventory" }
    
    if (!memorydb.items[req.params.item_ID]) {
        return res.status(jsonResp.code).json(jsonResp)
    }
    
    if (memorydb.items[req.params.item_ID].quantity <= 0) {
        jsonResp.message = "Item has been sold out"
        return res.status(jsonResp.code).json(jsonResp)
    }

    let solditem = {
        "showID": req.params.show_ID,
        "itemID": req.params.item_ID,
        "itemName": memorydb.items[req.params.item_ID].itemName,
        "quantity_sold": 1,
        "timestamp": new Date().toString()
    }

    let solditemkey = `${req.params.show_ID}-${req.params.item_ID}`
    if (!memorydb.solditems[solditemkey]){
        memorydb.solditems[solditemkey] = []
    }
    memorydb.solditems[solditemkey].push(solditem)
    memorydb.items[req.params.item_ID].quantity--
    
    jsonResp = { "code": 200, "message": `Item [${solditem.itemName}] has been sold on show ${req.params.show_ID}` }
    
    return res.status(jsonResp.code).json(jsonResp)
});

router.get('/:show_ID/sold_items', async (req, res) => {

    let salesreport = []
    
    for (const solditemkey in memorydb.solditems) {

        let show_ID = solditemkey.split("-")[0]
        let item_ID = solditemkey.split("-")[1]
        if (show_ID !== req.params.show_ID) {
            continue
        }
        
        let itemName = ""
        if (memorydb.items[item_ID]) {
            itemName = memorydb.items[item_ID].itemName
        }

        let salesreportline = {
            "itemID": item_ID,
            "itemName": itemName,
            "quantity_sold": 0
        }

        memorydb.solditems[solditemkey].forEach(item => {
            salesreportline.quantity_sold += item.quantity_sold
        });
        salesreport.push(salesreportline)
    }

    return res.status(200).json(salesreport)

});

router.get('/:show_ID/sold_items/:item_ID', async (req, res) => {    
    
    let salesreport  = []

    let itemName = ""
    if (memorydb.items[req.params.item_ID]) {
        itemName = memorydb.items[req.params.item_ID].itemName
    }

    let salesreportline = {
        "itemID": req.params.item_ID,
        "itemName": itemName,
        "quantity_sold": 0
    }
    
    let solditems = memorydb.solditems[`${req.params.show_ID}-${req.params.item_ID}`]
    if (Array.isArray(solditems)){
        solditems.forEach(item => {
            salesreportline.quantity_sold += item.quantity_sold
        });
    }
    salesreport.push(salesreportline)

    return res.status(200).json(salesreport)

});

export default router;