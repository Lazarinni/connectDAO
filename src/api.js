//Preencher automático
function criaLinha(usuario) {
    document.getElementById("id").value = usuario.id || "";
    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("email").value = usuario.email || "";
  }

  async function clienteDados(metodo) {

    let url = `http://localhost:3000/student`;
  
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
  
    const object = { id, nome, email};
  
    const options = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (metodo === 'GET' && id) {
      url += `/${id}`;
    } else if (metodo === 'POST' || metodo === 'PUT') {
      const bodyData = metodo === 'POST' ? { nome, email } : object;
      options.body = JSON.stringify(bodyData);
      if (metodo === 'PUT' && id) url += `/${id}`;
    } else if (metodo === 'DELETE') {
      if (!id) return alert("ID obrigatório para DELETE");
      url += `/${id}`;
    }
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      
      const data = await response.json();
      
      // Tratamento diferenciado para GET
      if (metodo === 'GET') {
          Array.isArray(data) 
              ? console.table(data) // Lista completa
              : criaLinha(data);    // Item único
      } else {
          console.log("Sucesso:", data);
          if (metodo === 'DELETE') criaLinha({}); // Limpa campos
      }
    } catch (error) {
        console.error("Falha na requisição:", error);
    }
}
  