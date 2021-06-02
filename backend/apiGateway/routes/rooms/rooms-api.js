var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var rooms_api=axios.create({
  baseURL: 'http://localhost:4000' 
})

//==========rooms==========
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  rooms_api.post(//req.path
    '/room', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  rooms_api.get(//req.path
    '/room').then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

router.get('/:roomId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  rooms_api.get(//req.path
    '/room/'+req.params.roomId).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

router.put('/:roomId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  rooms_api.put(//req.path
    '/room/'+req.params.roomId,req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

router.delete('/:roomId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  rooms_api.delete(//req.path
    '/room/'+req.params.roomId).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

module.exports = router;
