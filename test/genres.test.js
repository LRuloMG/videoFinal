const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de Género", ()=>{
    it("Debería de obtener una id de Género correcta", (done)=>{
        supertest(app).get("/genres")
        .send({'id':'63847169ee1de78f887bea8c'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de Género correcta", (done)=>{
        supertest(app).get("/genres")
        .send({'id':'63847169ee1de78f887bea8c2'})
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