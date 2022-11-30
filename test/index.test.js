const  supertest = require('supertest');

const app = require('../app');

// Sentencia   

describe("Probar el sistema de autenticación", ()=>{
    it("debería de obtener un login con usuario y contraseña correctos", (done)=>{
        supertest(app).post("/login")
        .send({'email': 'a307737@uach.mx', 'password': 'abcd1234'})
        .expect(200)
        .end(function(err, res){
            if(err) {
                done(err);
            }else{
                done();
            }
        });
    });


    it("No debería de obtener un login con usuario y contraseña incorrectos", (done)=>{
        supertest(app).post("/login")
        .send({'email': 'a307737@uach.mx', 'password': 'abcd1234'})
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