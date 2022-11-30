const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de Director", ()=>{
    it("Debería de obtener una id de Director correcto", (done)=>{
        supertest(app).get("/directors")
        .send({'id':'63847092ee1de78f887bea8a'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de Director correcto", (done)=>{
        supertest(app).get("/directors")
        .send({'id':'63847092ee1de78f887bea83'})
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