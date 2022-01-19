const registerForm = document.getElementById('register-form');

async function handleSubmit(e){
    e.preventDefault();
    let data = {};
    const elements = registerForm.elements; //retorna todos elementos do formulario

    for(let i = 0; i < elements.length;i++){
        let item = elements[i];
        if(item.name !== ""){
            data[item.name] = item.value;
        }
    }
    const response = await createUser(data);
};

registerForm.addEventListener("submit", handleSubmit);

const cep = registerForm.elements[4].value

async function fetchCep(cep){
    const requisit = await fetch('https://viacep.com.br/ws/`${cep}`/json/unicode/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(erro => console.log(erro))

}

async function createUser(data){
    data.address = await fetchCep(data.address);
    const response = await fetch("https://api-post-m2.herokuapp.com/auth/register",
    {
        method: "post", 
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    )
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error);
    return response;
}