const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de actores", ()=>{
    it("Debería tener una id de actor correcto", (done)=>{
        supertest(app).get("/actors")
        .send({'id':'63846eb2c99a80669b925c87'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería tener una id de actor correcto", (done)=>{
        supertest(app).get("/actors")
        .send({'id':'63846eb2c99a80669b925c83'})
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