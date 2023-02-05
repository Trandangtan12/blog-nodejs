const Course = require('../models/Couses');
const { muptipleMongooseToObject } = require('../../utils/mongoose');
class Site {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: muptipleMongooseToObject(courses),
                });
            })
            .catch(next);
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new Site();
