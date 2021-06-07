const expect = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
let app = require('../users/routes/admin-api');
let app2 = require('../users/routes/manager-api');
let app3 = require('../users/routes/receptionist-api');
const conn=require("../test/DBconnect");
const request = require("supertest");
const assert = require("chai").assert;

//ADMIN TEST CASES
describe('/POST Admin signup', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("error status code",()=>{
        it("existing user should give 409 status code",(done)=>{
            const response =request(app).post("/admin/signup")
            .send({
                email:"admin7@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
    describe("new user should give 201 status code",()=>{
        it("create new user should give 201 status code",(done)=>{
            request(app).post("/admin/signup")
            .send({
                email:"admin22@gmail.com",
                password:"12345678"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.admin).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            }) 
        })
    })
})

describe('/POST Admin login', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("login status code",()=>{
        it("existing user should give 200 status code",(done)=>{
            const response =request(app).post("/admin/login")
            .send({
                email:"admin7@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
})

//MANAGER TEST CASES
describe('/POST Manager signup', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("error status code",()=>{
        it("existing user should give 409 status code",(done)=>{
            const response =request(app2).post("/manager/signup")
            .send({
                email:"manager1@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
    describe("new user should give 201 status code",()=>{
        it("create new user should give 201 status code",(done)=>{
            request(app2).post("/manager/signup")
            .send({
                email:"manager2@gmail.com",
                password:"12345678"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.manager).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            }) 
        })
    })
})

describe('/POST Manager login', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("login status code",()=>{
        it("existing user should give 200 status code",(done)=>{
            const response =request(app2).post("/manager/login")
            .send({
                email:"manager5@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
})

//RECEPTIONIST TEST CASES
describe('/POST Receptionist signup', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("error status code",()=>{
        it("existing user should give 409 status code",(done)=>{
            const response =request(app3).post("/receptionist/signup")
            .send({
                email:"receptionist5@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
    describe("new user should give 201 status code",()=>{
        it("create new user should give 201 status code",(done)=>{
            request(app3).post("/receptionist/signup")
            .send({
                email:"receptionist6@gmail.com",
                password:"12345678"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.receptionist).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            }) 
        })
    })
})

describe('/POST receptionist login', ()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })

    describe("login status code",()=>{
        it("existing user should give 200 status code",(done)=>{
            const response =request(app3).post("/receptionist/login")
            .send({
                email:"receptionist5@gmail.com",
                password:"1234567",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
    })
})