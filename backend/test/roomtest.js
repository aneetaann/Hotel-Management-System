const expect = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
let app = require('../rooms/rooms');
const conn=require("../test/DBconnect");
const request = require("supertest");
const assert = require("chai").assert;

describe("GET rooms", () => {
    it("it should GET all rooms", (done)=>{
        chai
        .request(app)
        .get("/room")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a("array");
            done();
        });
    });
})