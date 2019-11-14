// Imports
var models = require('../models');

// Routes
module.exports = {
   
    getUserProfile: function (req, res) {

        var param = req.params.param;

            if (param == null) {
                return res.status(400).json({ 'error': 'invalid parameters' });
            }
            models.user_event.findAll({
                where: {
                    userId: param
                },
                include: [{
                    model: models.user,
                    attributes: ['id', 'first_name', 'last_name', 'genre', 'email']
                },
                {
                    model: models.event,
                    attributes: ['id', 'name', 'description', 'price', 'localization']
                }
                ],
                attributes: ['user_id', 'event_id'],
                
            }).then(function (user) {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            }).catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch user' });
            });
    },
    getUser: function (req, res) {
        models.user_event.findAll({
            include: [{
                model: models.event,
                attributes: ['id', 'name', 'description', 'price', 'localization']
            },             
            {
                model: models.user,
                attributes: ['id', 'first_name', 'last_name', 'genre', 'email']
            }      
        ],
            underscored: true,
            attributes: ['event_id','user_id']
        }).then(function (user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    }
}