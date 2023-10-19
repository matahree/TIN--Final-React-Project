export const carList = [
    {
        "_id": 1,
        "carModel": "AUDI 3",
        "VIN": "JT2BF12K6T0171246",
        "manufactured": "German automaker",
    },
    {
        "_id": 2,
        "carModel": "Ford Fiesta",
        "VIN": "2G1FS1EP1C9846009",
        "manufactured": "Cologne",
    },
    {
        "_id": 3,
        "carModel": "Mercedes-Benz AG",
        "VIN": "5NPEB4AC8EH870668",
        "manufactured": "Daimler AG",
    }
]

export const carDetailsList = [
    {
        "_id": 1,
        "carModel": "AUDI 3",
        "VIN": "JT2BF12K6T0171246",
        "manufactured": "German automaker",
        "rents": [
            {
                "_id": 1,
                "address": "address1",
                "rentalDate": "2011-01-01",
                "customer_id": 1,
                "car_id": 1,
                "customer": {
                    "_id": 1,
                    "name": "Angelina",
                    "surname": "Jolie",
                    "address": "address1",
                    "email": "example2@domain.com",
                }
            },
            {
                "_id": 2,
                "address": "address2",
                "rentalDate": "2001-01-31T23:00:00.000Z",
                "customer_id": 2,
                "car_id": 1,
                "customer": {
                    "_id": 1,
                    "name": "Angelina",
                    "surname": "Jolie",
                    "address": "address1",
                    "email": "example2@domain.com",
                }
            }
        ]
    },
    {
        "_id": 2,
        "carModel": "Ford Fiesta",
        "VIN": "2G1FS1EP1C9846009",
        "manufactured": "Cologne",
        "rents": [
            {
                "_id": 3,
                "address": "address3",
                "rentalDate": "2009-01-01T23:00:00.000Z",
                "customer_id": 2,
                "car_id": 1,
                "customer": {
                    "_id": 2,
                    "name": "Brad ",
                    "surname": "Pitt",
                    "address": "address2",
                    "email": "example@domain.com",
                }
            }
        ]
    },
    {
        "_id": 3,
        "carModel": "Mercedes-Benz AG",
        "VIN": "5NPEB4AC8EH870668",
        "rents": []
    }
]