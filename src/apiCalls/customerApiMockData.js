
export const customerList = [
    { _id: 1, name: "Angelina", surname: "Jolie", address:" address1", email:"example2@domain.com" },
    { _id: 2, name: "Brad", surname: "Pitt", address:" address2", email:"example@domain.com" },

]


export const customerDetailsList = [
    {
        "_id": 1,
        "name": "Angelina",
        "surname": "Jolie",
        "address": "address1",
        "email": "example2@domain.com",
        "rents": [
            {
                "_id": 2,
                "address": "address2",
                "rentalDate": "2011-02-01",
                "customer_id": 1,
                "car_id": 2,
                "car": {
                    "_id": 2,
                    "carModel": "AUDI 3",
                    "VIN": "JT2BF12K6T0171246",
                    "manufactured": "German automaker",
                }
            },
            {
                "_id": 1,
                "address": "address1",
                "rentalDate": "2009-01-02",
                "customer_id": 1,
                "car_id": 1,
                "car": {
                    "_id": 1,
                    "carModel": "Ford Fiesta",
                    "VIN": "2G1FS1EP1C9846009",
                    "manufactured": "Cologne",
                }
            }
        ]
    },
    {
        "_id": 2,
        "name": "Brad ",
        "surname": "Pitt",
        "address": "address2",
        "email": "example@domain.com",
        "rents": [
            {
                "_id": 3,
                "address": "address3",
                "rentalDate": "2011-01-01",
                "customer_id": 2,
                "car_id": 1,
                "car": {
                    "_id": 1,
                    "carModel": "AUDI 3",
                    "VIN": "JT2BF12K6T0171246",
                    "manufactured": "German automaker",
                }
            }
        ]
    }
]