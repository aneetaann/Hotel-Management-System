var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var bookings_api=axios.create({
  baseURL: 'http://localhost:6000' 
})

//==========bookings==========
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  bookings_api.post(//req.path
    '/booking', req.body).then(resp => {
    res.send(resp.data)}).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  
});
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  bookings_api.get(//req.path
    '/booking').then(resp => {
    res.send(resp.data)}).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  
});

router.get('/:bookingId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  bookings_api.get(//req.path
    '/booking/'+req.params.bookingId, req.body).then(resp => {
    res.send(resp.data)}).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  
});

router.put('/:bookingId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  bookings_api.put(//req.path
    '/booking/'+req.params.bookingId,req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
     res.status(err.response.status).json(err.response.data);
  })
});

router.delete('/:bookingId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  bookings_api.delete('/booking/'+req.params.bookingId, req.body)
    .then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  
});

module.exports = router;
