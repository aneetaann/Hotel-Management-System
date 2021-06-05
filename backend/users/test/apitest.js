let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../routes');

describe('users', ()=> {
    describe('/POST signup', ()=>{
        it('it should POST admin signup', (done)=>{
            chai.request(server)
            .post('/signup')
            .end((err, res)=>{
                (res).should.have.status(201);
                (res.body).should.be.a('object');
                done();
            });
        });
    });
});
describe('/POST login', ()=>{
    it('it should POST login', (done)=>{
        chai.request(server)
        .post('/login')
        .end((err, res)=> {
            (res).should.have.status(200);
            (res.body).should.be.a('object');
            done();
        });
    });
});