document.addEventListener("DOMContentLoaded", function() {
    const animalForm = document.getElementById("animal-form");
    const animalTable = document.getElementById("animal-table");
    const animalList = document.getElementById("animal-list");
  
    function cadastrarNovoAnimal(event) {
      event.preventDefault();
  
      const nome = document.getElementById("nome").value;
      const idade = document.getElementById("idade").value;
      const raca = document.getElementById("raca").value;
  
      const novoAnimal = {
        Nome: nome,
        Idade: idade,
        Raca: raca
      };
  
      fetch('https://663c17b117145c4d8c35230b.mockapi.io/animais/Animal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoAnimal)
      })
      .then(response => {
        if (response.ok) {
          console.log('Animal cadastrado com sucesso!');
          limparFormulario(); 
          listarAnimais();
        } else {
          console.error('Erro ao cadastrar animal:', response.statusText);
        }
      })
      .catch(error => console.error('Erro ao cadastrar animal:', error));
    }
  
    function listarAnimais() {
      fetch('https://663c17b117145c4d8c35230b.mockapi.io/animais/Animal')
        .then(response => response.json())
        .then(data => {
          animalList.innerHTML = '';
          data.forEach(animal => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${animal.Nome}</td>
              <td>${animal.Idade}</td>
              <td>${animal.Raca}</td>
            `;
            animalList.appendChild(row);
          });
        })
        .catch(error => console.error('Erro ao obter dados do backend:', error));
    }
  
    function limparFormulario() {
      animalForm.reset();
    }
  
    animalForm.addEventListener("submit", cadastrarNovoAnimal);
  
    listarAnimais();
  });
  