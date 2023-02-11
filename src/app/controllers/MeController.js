const Course = require('../models/Couses');
const { muptipleMongooseToObject } = require('../../utils/mongoose');

class MeController {
    // [GET] /me/stored-courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    courses: muptipleMongooseToObject(courses),
                    deleteCount,
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash-courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: muptipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
