const form = document.getElementById("queryForm");
const submitHandler = (e) => {
  debugger
  e.preventDefault();
  const rua = document.getElementById("rua").value; // Pegar o valor da váriavel digitada e colocar nessa outra.
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("UF").value;
  // console.log(rua, cidade, estado);
  const formData = new FormData();
  formData.append("rua", rua); // Append adiciona um novo valor dentro de uma chave existente dentro do objeto FormData.
  formData.append("cidade", cidade);
  formData.append("estado", estado);

  const xhr = new XMLHttpRequest() // Usar isso facilita o processo. É só criar uma instância do objeto, abrir uma url e enviar uma requisição.
        xhr.open('POST', 'http://localhost:3000/usuario-rua') // Vai retornar pro meu servidor.
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ rua, cidade, estado })) // Converte valores em javascript para uma String JSON.

        xhr.onload = function() { // Dispara se a requisição tiver dado certo.
            try {
                if (this.status == 200) { // 200 mostra que o código deu certo.
                    debugger
                    const response = JSON.parse(this.response) // Json parse: vai analisar uma string JSON, construindo o valor ou um objeto JavaScript descrito pela string.
                    console.log(response)
                    document.getElementById('ruaResponse').innerText = 'Rua:' + response.logradouro // Pega o valor da variável pra passar pra tela.
                    document.getElementById('bairroResponse').innerText = 'Bairro:' + response.bairro
                    document.getElementById('cepResponse').innerText = 'CEP:' + response.cep
                    document.getElementById('dddResponse').innerText = 'DDD:' + response.ddd
                    document.getElementById('cidadeResponse').innerText = 'Cidade:' + response.localidade
                    document.getElementById('estadoResponse').innerText = 'Estado:' + response.uf
                }
            } catch (error) {
                console.error(error) // Ver se deu erro
            }
        }
};

form.addEventListener("submit", submitHandler); // Registrar uma espera do evento, depois envia os valores das variáveis.