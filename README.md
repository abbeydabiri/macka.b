<p align="center">
     <a href="https://github.com/facebook/jest/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Jest is released under the MIT license." />
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=abbeydabiri">
        <img src="https://img.shields.io/twitter/follow/abbeydabiri.svg?style=social&label=Follow%20@abbeydabiri" alt="Follow on Twitter" />
    </a>
</p>


<p align="left"><img src="https://i.ytimg.com/vi/i5PO6iKNJLs/maxresdefault.jpg" width="" style="width:25rem"/></p>

Health is wealth </br>
Ital is Vital </br>
Try and take care of yourself </br>
Health is wealth </br>
Ital is Vital </br>
Link: https://www.youtube.com/watch?v=i5PO6iKNJLs



<br/>
<br/>
<br/>

# MackaB REST API example application



This is a bare-bones example of a rest api built with the javascript programming language.


## Table of Contents

- [Getting Started](#getting-started)
    - [Install](#install)
    - [Run the app](#run-the-app)
    - [Run the tests](#run-the-tests)
- [API Reference](#api-reference)
    - [To add or update item inventory in stock right now](#to-add-or-update-item-inventory-in-stock-right-now)
    - [To buy a single item during a show](#to-buy-a-single-item-during-a-show)
    - [Return the name and quantity of item_id sold by show_ID](#return-the-name-and-quantity-of-item_id-sold-by-show_id)
- [License](#license)

## Getting Started

Install dependencies, run the app and also run tests


### Install

using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn install
```

Or [`npm`](https://www.npmjs.com/package/jest):

```bash
npm install 
```


### Run the app

using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
npm start
```

Or [`npm`](https://www.npmjs.com/package/jest):

```bash
yarn start
```

### Run the tests

using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
npm test
```

Or [`npm`](https://www.npmjs.com/package/jest):

```bash
yarn test
```

## API Reference

Learn more about using MackaB below


## To add or update item inventory in stock right now

### Request

`POST /inventory`

    curl -i -H 'Accept: application/json' -d '[ { "itemID": 1,  "itemName": "Fancy Red Dress", "quantity": 15}, { "itemID": 2,  "itemName": "Glass Slippers", "quantity": 3} ]' http://localhost:1960/inventory

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 49
    ETag: W/"31-wEusBE+743ngiWjbOL5HDE296Jg"
    Date: Sat, 22 Jan 2022 14:40:09 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"code":200,"message":"Total inventory is now 2"}


## To buy a single item during a show

### Request

`POST /show/[show_ID]/buy_item/[item_ID]`

    curl -i -H 'Accept: application/json' -d '' http://localhost:1960/show/101/buy_item/2
### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 72
    ETag: W/"48-b5n6hCBV6Y/gEcx3XpQTPrJ6ma0"
    Date: Sat, 22 Jan 2022 14:40:47 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"code":200,"message":"Item [Glass Slippers] has been sold on show 101"}



## Return the name and quantity of item_id sold by show_ID

### Request

`GET /show/[show_ID]/sold_items/[item_id]`

    curl -i -H 'Accept: application/json' http://localhost:1960/show/101/sold_items/2

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 62
    ETag: W/"3e-yy3yvVvKUv0KfjQCpRWIOhOiKuM"
    Date: Sat, 22 Jan 2022 14:41:13 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"itemID":"2","itemName":"Glass Slippers","quantity_sold":1}]%


## License

MackaB is [MIT licensed](./LICENSE).