const request = require("supertest");
const { database, Servico } = require("../models");
const app = require("../src/app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("servicos", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/servicos")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/servicos')
                .send({
                    name: "servicos Teste",
                    tipo: "pintura",
                    valor: "200",
                    disponibilidade: "segunda à sexta"
                })
                .expect(201);

            await request(app)
                .post('/servicos')
                .send({})
                .expect(500);                
        })
        test("GET /:id", async () => {
            const cat = await Servico.create({
                name: "servicos teste",
                tipo: "baba",
                disponibilidade: "segunda à sexta"
            });

            const response = await request(app)
                .get(`/servicos/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/servicos/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Servico.create({
                name: "servicos teste 2",
                tipo: "manutenção",
                valor: "150",
                disponibilidade: "segunda e quarta"
            });

            const response = await request(app)
                .post(`/servicos/${cat.id}`)
                .send({
                    name: "servicos teste 3"
                    
                })
                .expect(200);
         })
        test("DELETE /:id", async () => { 
            const cat = await Servico.create({
                name: "servicos teste 3",
                tipo: "baba",
                disponibilidade: "segunda à sexta"
            });
            const response = await request(app)
                .delete(`/servicos/${cat.id}`)
                .expect(204);
        })

    });

});