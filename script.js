const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Adiciona eventos de input para validação ao digitar
username.addEventListener("input", () => checkInput(username));
email.addEventListener("input", () => checkInput(email));
message.addEventListener("input", () => checkInput(message));

// Inicialize o EmailJS com seu ID de usuário
emailjs.init("ylmD4wm2n5Us7OQBl");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    const formControls = form.querySelectorAll(".form-control");
    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
      emailjs.sendForm('service_cj2iqmr', 'template_nx7uqhb', form)
          .then((response) => {
              console.log('E-mail enviado com sucesso!', response);
              // Redireciona para a página de "Obrigado"
              window.location.href = 'obrigado.html'; // Substitua pelo caminho da sua página de "Obrigado"
          }, (error) => {
              console.log('Falha ao enviar e-mail', error);
              alert('Falha ao enviar e-mail. Tente novamente.');
          });
    }
});

function checkInputs() {
    checkInput(username);
    checkInput(email);
    checkInput(message);
}

function checkInput(input) {
    const value = input.value;
    switch (input.id) {
        case "username":
            if (value === "") {
                setErrorFor(input, "O nome de usuário é obrigatório.");
            } else {
                setSuccessFor(input);
            }
            break;
        case "email":
            if (value === "") {
                setErrorFor(input, "O email é obrigatório.");
            } else if (!checkEmail(value)) {
                setErrorFor(input, "Por favor, insira um email válido.");
            } else {
                setSuccessFor(input);
            }
            break;
        case "message":
            if (value === "") {
                setErrorFor(input, "Digite sua mensagem.");
            } else {
                setSuccessFor(input);
            }
            break;
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
