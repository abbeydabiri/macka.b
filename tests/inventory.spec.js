require('regenerator-runtime/runtime')
const supertest = require('supertest');
const app = require('../src/app.js').default;
const requestWithSupertest = supertest(app);



describe('Inventory test suite', () => {
    it('tests /inventory endpoint with nil data', async() => {
        try {
            const response = await requestWithSupertest.post('/inventory').send({});
            expect(response.statusCode).toBe(400);
        } catch (err) {
            console.log(`${err}`)
        }
    });


    it('tests /inventory endpoint with ivalid data', async () => {

        let itemList = [{
            "itemID": 1, "itemName": "Test", "quantity": 6
        }, {
            "itemID": 2, "itemName": "Test S", "quantity": 1
        }]
        let resp =  { code: 400, message: 'minimum of 2 items required per inventory in index 1' }
        try {
            const response = await requestWithSupertest.post('/inventory').send(itemList);
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });

    it('tests /inventory endpoint with valid data', async () => {

        let itemList = [{
            "itemID": 1, "itemName": "Test", "quantity": 6
        }, {
            "itemID": 2, "itemName": "Test", "quantity": 6
        }]
        let resp =  { code: 200, message: 'Total inventory is now 2' }
        try {
            const response = await requestWithSupertest.post('/inventory').send(itemList);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(resp)
        } catch (err) {
            console.log(`${err}`)
        }
    });
});
