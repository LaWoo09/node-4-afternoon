const swag = require('../../server/models/swag')


module.exports = {
    read: (req, res, next) => {
        res.status(200).send(swag);
    }
}