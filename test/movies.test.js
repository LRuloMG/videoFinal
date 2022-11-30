const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de Película", ()=>{
    it("Debería de obtener una id de Película correcta", (done)=>{
        supertest(app).get("/movies")
        .send({'id':'63847199ee1de78f887bea91'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de Película correcta", (done)=>{
        supertest(app).get("/movies")
        .send({'id':'63847199ee1de78f887bea93'})
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