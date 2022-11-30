const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de bookings", ()=>{
    it("Debería de obtener una id de booking correcta", (done)=>{
        supertest(app).get("/bookings")
        .send({'id':'6384728a04558984aa88dae2'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de booking correcta", (done)=>{
        supertest(app).get("/bookings")
        .send({'id':'6384728a04558984aa88dae22'})
        .expect(403)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });

});