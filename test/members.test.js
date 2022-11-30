const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de Miembro", ()=>{
    it("Debería de obtener una id de Miembro correcto", (done)=>{
        supertest(app).get("/members")
        .send({'id':'63846fb6ee1de78f887bea88'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de Miembro correcto", (done)=>{
        supertest(app).get("/members")
        .send({'id':'63846fb6ee1de78f887bea83'})
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