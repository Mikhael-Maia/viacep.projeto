const cors = require("cors"); // compartilhar recursos de diferentes origens.
const axios = require("axios"); // HTTP baseado em promises (objeto retornado para o qual você adiciona callbacks, em vez de passar callbacks para uma função) para fazer requisições.
const express = require("express"); // importa o express.
const app = express(); //instancia o express e associa a variável app.
app.use(cors({origin: false}));
app.use(express.json()); // body parser em json
app.use(express.static(".")); // acessar uma pasta via HTTP.
app.all('/*', function(req, res, next) { // servidor aceitar qualquer origem e tipo de requisição
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Acess-Control-Request-Method") // terminar aqui
    next();
  });
// Controllers

// Fazer a consulta na API:

// async e await: possibilita escrever código que funciona de forma assíncrona, porém é lido e estruturado de forma síncrona.

async function consultApi(rua, cidade, estado) {
  try {
    const apiResponse = await axios.get(
      `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`,
    ); console.log(apiResponse)
    return apiResponse.data && apiResponse.data[0] ? apiResponse.data[0] : {}
  } catch (err) {
    console.log(err); // Ver se deu erro no código
  }
}
// Routes
app.post("/usuario-rua", async (req, res) => {
  try {
    console.log("req body", req.body);
    const { rua, cidade, estado } = req.body;
    const apiResponse = await consultApi(rua, cidade, estado);
    console.log(apiResponse);
    return res.status(200).send(apiResponse);
  } catch (err) {
    res.status(500).send({ message: "An internal error has occured" });
  }
});
app.listen(3000, () => { // Ouvindo na porta 3000.
  console.log("App up and running on port 3000");
});