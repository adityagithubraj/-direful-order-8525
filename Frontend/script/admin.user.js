const url = "https://localhost8080/usersList"

// displayUsers(`${url}/users`)

function displayUsers(url) {
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            data = data.users
            data = data.map(el => {
                return userCard(el)
            })
            document.getElementById("userData").innerHTML = data.join(" ")
        })
        .catch(err => console.log(err))
}

function userCard(el) {
    return `<tr>
            <td>${el.name}</td>
            <td>${el.email}</td>
            <td><span class="status active">Active</span></td>
            <td ><span id="${el["_id"]}" class="status delete" onclick="deleteUser(this)" >Delete</span ></td>
        </tr>`
}

async function deleteUser(el) {
    const id=el.id
    console.log(id)
    await fetch(`${url}/users/${el.id}`,{
        method:"DELETE"
    })
        displayUsers(`${url}/users`)
    
}



