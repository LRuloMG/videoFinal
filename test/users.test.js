const  supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de id de Usuario", ()=>{
    it("Debería de obtener una id de Usuario correcto", (done)=>{
        supertest(app).get("/users")
        .send({'id':'63846d55563c77f9ecfdf504'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener una id de Usuario correcto", (done)=>{
        supertest(app).get("/users")
        .send({'id':'63846d55563c77f9ecfdf5042'})
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