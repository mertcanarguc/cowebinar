const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Conference' });
});

router.get('/student', function (req, res, next) {
  res.render('student', { title: "Öğrenci"})
})

router.get('/teacher', function (req, res, next) {
  res.render('teacher', { title: "Öğretmen"})
})

module.exports = router;
