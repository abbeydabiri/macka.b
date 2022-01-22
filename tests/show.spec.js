require('regenerator-runtime/runtime')
const supertest = require('supertest');
const app = require('../src/app.js').default;
const requestWithSupertest = supertest(app);


describe('Show test suite', () => {

    it('tests /show/101/buy_item/1 endpoint with invalid data', async () => {
        try {
            const response = await requestWithSupertest.post('/show/101/buy_item/1');
            let resp =  { code: 400, message: 'Item does not exist in inventory' }
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(resp);
        } catch (err) {
            console.log(`${err}`)
        }
    });


    it('tests /show/101/buy_item endpoint with multiple data', async () => {

        let itemList = [{
            "itemID": 1,
            "itemName": "Test Item Name",
            "quantity": 2
        }, {
            "itemID": 2,
            "itemName": "Test S",
            "quantity": 5
        }]
        let resp = {
            code: 200,
            message: 'Total inventory is now 2'
        }
        try {
            const response = await requestWithSupertest.post('/inventory').send(itemList);
            expect(response.statusCode).toBe(resp.code);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }

        try {
            const response = await requestWithSupertest.post('/show/101/buy_item/1');
            let resp = {
                code: 200,
                message: 'Item [Test Item Name] has been sold on show 101'
            }
            expect(response.statusCode).toBe(resp.code);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }

        try {
            const response = await requestWithSupertest.post('/show/101/buy_item/1');
            let resp = {
                code: 200,
                message: 'Item [Test Item Name] has been sold on show 101'
            }
            expect(response.statusCode).toBe(resp.code);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }

        try {
            const response = await requestWithSupertest.post('/show/101/buy_item/1');
            let resp = {
                code: 400,
                message: 'Item has been sold out'
            }
            expect(response.statusCode).toBe(resp.code);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });
    
    
    
    it('tests /show/101/sold_items/2 with 0 quantity', async () => {
        try {
            const response = await requestWithSupertest.get('/show/101/sold_items/2');
            let resp = [ { itemID: '2', itemName: 'Test S', quantity_sold: 0 } ]
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });

    it('tests /show/101/sold_items/1 endpoint and show sales of 1 item', async () => {
        try {
            const response = await requestWithSupertest.get('/show/101/sold_items/1');
            let resp = [{ itemID: '1', itemName: 'Test Item Name', quantity_sold: 2 }]
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });

    it('tests /show/101/sold_items endpoint and show multiple shows with sales', async () => {

        try {
            const response = await requestWithSupertest.post('/show/101/buy_item/2');
            let resp = {
                code: 200,
                message: 'Item [Test S] has been sold on show 101'
            }
            expect(response.statusCode).toBe(resp.code);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }


        try {
            const response = await requestWithSupertest.get('/show/101/sold_items');
            let resp = [{
                    itemID: '1',
                    itemName: 'Test Item Name',
                    quantity_sold: 2
                },
                {
                    itemID: '2',
                    itemName: 'Test S',
                    quantity_sold: 1
                }
            ]
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });

})