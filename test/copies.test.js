const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de copias", ()=>{
    it("Debería de obtener una id de copia correcta", (done)=>{
        supertest(app).get("/copies")
        .send({'id':'6384725504558984aa88dade'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de copia correcta", (done)=>{
        supertest(app).get("/copies")
        .send({'id':'6384725504558984aa88dade2'})
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