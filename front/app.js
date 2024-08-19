fetchLocais();
async function fetchLocais(event) {
    event.preventDefault();

    let materialTipo = document.getElementById("material").value;
    let data = {materialTipo};

    const response = await fetch('http://localhost:3002/api/locais', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        console.log(results.data);
    }
}