


let express = require('express');
const app = express();
app.set("view engine", "pug");
const path = require('path');
//Body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// let router = express.Router();
// const createError = require('http-errors');
const logger = require('morgan');
const helmet = require('helmet');
app.use(helmet());
// app.use(createError);
app.use(logger('dev'));

const iosTeacherURL = "https://apps.apple.com/us/app/studioso-teacher/id1313552512";
const iosStudentURL = "https://apps.apple.com/us/app/studioso-student/id1317821640";
const androidStudentURL = "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.studiosoapps.studioso";
const androidTeacherURL = "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.studiosoapps.studioso";
const elseURL = "https://studiosoapp.com/download";
// viewed at http://localhost:8080
app.get('/download-teacher-app', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    const MobileDetect = require('mobile-detect'),
    md = new MobileDetect(req.headers['user-agent']);
    console.log("md.os(), md.os()", md.os());
    if (md.os() === "iOS") {
        res.redirect(iosTeacherURL);
    } else if (md.os() === "AndroidOS") {
        res.redirect(androidTeacherURL);
    } else {
        res.redirect(elseURL)
    }
});
app.get('/download-student-app', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    const MobileDetect = require('mobile-detect'),
        md = new MobileDetect(req.headers['user-agent']);
    console.log("md.os(), md.os()", md.os());
    if (md.os() === "iOS") {
        res.redirect(iosStudentURL);
    } else if (md.os() === "AndroidOS") {
        res.redirect(androidStudentURL);
    } else {
        res.redirect(elseURL)
    }
});
const port = process.env.PORT || 3000;

app.listen(port);
// const server = app.listen(port, function () {
//     const port = server.address().port;
//     console.log(server + ' App listening at port %s', port);
// });
// module.exports.server = server;
// module.exports.app = app;
// module.exports.port = port;
console.log(' App listening at port %s', port);