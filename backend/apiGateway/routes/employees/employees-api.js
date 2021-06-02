var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var employess_api=axios.create({
  baseURL: 'http://localhost:5000' 
})

//==========Employees==========
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employess_api.post(//req.path
    '/employee', req.body).then(resp => {
    res.send(resp.data).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  })
});
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employess_api.get(//req.path
    '/employee').then(resp => {
    res.send(resp.data).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  })
});

router.get('/:employeeId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employess_api.get(//req.path
    '/employee/'+req.params.employeeId, req.body).then(resp => {
    res.send(resp.data).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  })
});

router.put('/:employeeId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employess_api.put(//req.path
    '/employee/'+req.params.employeeId,req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

router.delete('/:employeeId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  employess_api.delete(//req.path
    '/employee/'+req.params.employeeId, req.body).then(resp => {
    res.send(resp.data).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  })
});

module.exports = router;
