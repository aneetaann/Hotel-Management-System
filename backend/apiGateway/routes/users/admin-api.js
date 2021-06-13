var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var users_api=axios.create({
  baseURL: `http://localhost:3000` 
})
//==========Users=Admins==========
router.post('/signup', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  users_api.post(//req.path
    '/admin/signup', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.post('/login', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  users_api.post(//req.path
    '/admin/login', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.delete('/:userId', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  users_api.delete(//req.path
    '/admin/:userId', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

module.exports = router;
