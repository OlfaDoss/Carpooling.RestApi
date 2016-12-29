var carpoolModel = require('../models/carpoolModel.js');

/**
 * carpoolController.js
 *
 * @description :: Server-side logic for managing carpools.
 */
module.exports = {

    /**
     * carpoolController.list()
     */
    list: function (req, res) {
        carpoolModel.find(function (err, carpools) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting carpool.',
                    error: err
                });
            }
            return res.json(carpools);
        });
    },

    /**
     * carpoolController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        carpoolModel.findOne({id: id}, function (err, carpool) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting carpool.',
                    error: err
                });
            }
            if (!carpool) {
                return res.status(404).json({
                    message: 'No such carpool'
                });
            }
            return res.json(carpool);
        });
    },

    /**
     * carpoolController.create()
     */
    create: function (req, res) {
        carpoolModel.count({}, function(err, count){
                var _ = require('underscore');
                var carpool = new carpoolModel(_.extend(req.body, {'id':count+1}));

        carpool.save(function (err, carpool) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating carpool',
                    error: err
                });
            }
            return res.status(201).json(carpool);
        });
        });
    },

    /**
     * carpoolController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        carpoolModel.findOne({id: id}, function (err, carpool) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting carpool',
                    error: err
                });
            }
            if (!carpool) {
                return res.status(404).json({
                    message: 'No such carpool'
                });
            }

            carpool.id = req.body.id ? req.body.id : carpool.id;
			carpool.title = req.body.title ? req.body.title : carpool.title;
			carpool.start = req.body.start ? req.body.start : carpool.start;
			carpool.end = req.body.end ? req.body.end : carpool.end;
			carpool.frequence = req.body.frequence ? req.body.frequence : carpool.frequence;
			carpool.time = req.body.time ? req.body.time : carpool.time;
			carpool.car = req.body.car ? req.body.car : carpool.car;
			carpool.available_seats = req.body.available_seats ? req.body.available_seats : carpool.available_seats;
			carpool.price = req.body.price ? req.body.price : carpool.price;
			carpool.smoke_authorise = req.body.smoke_authorise ? req.body.smoke_authorise : carpool.smoke_authorise;

            carpool.driver.firstname = req.body.driver_firstname ? req.body.driver_firstname : carpool.driver.firstname;
            carpool.driver.lastname = req.body.driver_lastname ? req.body.driver_lastname : carpool.driver.lastname;
            carpool.driver.phone = req.body.driver_phone ? req.body.driver_phone : carpool.driver.phone;
            carpool.driver.sexe = req.body.driver_sexe ? req.body.driver_sexe : carpool.driver.sexe;
            carpool.driver.birthday = req.body.driver_birthday ? req.body.driver_birthday : carpool.driver.birthday;
			
            carpool.save(function (err, carpool) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating carpool.',
                        error: err
                    });
                }

                return res.json(carpool);
            });
        });
    },

    /**
     * carpoolController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        carpoolModel.findOneAndRemove({id: id}, function (err, carpool) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the carpool.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * jobController.search()
     */
    search: function (req, res) {

        var start = req.body.start;
        var end = req.body.end;
        var date = req.body.date;

        var bStart = (start !== 'null');
        var bEnd = (end !== 'null');
        var bDate = (date !== 'null');


        if (!bStart && !bEnd && !bDate)
        {
            return res.json({});
        }
        else if (bStart && !bEnd  && !bDate )
        {
            console.log("search service");

            var options = {$text: {$search: start}};
        }
        else if (!bStart && bEnd && !bDate)
        {
            var options = {$text: {$search: end}};
        }
        else if (! bStart && !bEnd && bDate)
        {
            var options = {time: date};
        }
        else if (bStart && bEnd && !bDate)
        {
            var options = {$text: {$search: start} ,$text: {$search: end}};
        }
        else if (bStart && !bEnd && bDate)
        {
            var options = {$text: {$search: start}, time: date};
        }
        else if (!bStart && bEnd && bDate)
        {
            var options = {$text: {$search: end}, time: date};
        }
        else if (bStart && bEnd && bDate)
        {
            var options = {$text: {$search: start}, $text: {$search: end}, time: date};
        }

        carpoolModel.find(options, function (err, carpools) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting job',
                    error: err
                });
            }
            return res.json(carpools);
        });
    },
};
