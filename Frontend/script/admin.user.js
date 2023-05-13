const url = "https://red-filthy-dove.cyclic.app/admin"

displayUsers(`${url}/userlist`)

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
    const id = el.id
    window.confirm("The User will be permanently Deleted")
    await fetch(`${url}/deleteUser/${el.id}`, {
        method: "DELETE"
    })
    deleteAlert()
    displayUsers(`${url}/userlist`)

}



// ...........................................Delete Alert Functionality..................................................................
function deleteAlert() {
    var child = document.getElementById('clonemother');
    var clone = child.cloneNode(true);
    // console.log(clone);
    var node = document.getElementById("toasts").appendChild(clone);
    console.log(node.childNodes);
    setTimeout(function() {
      if(node) {
        node.childNodes[1].childNodes[5].childNodes[1].innerHTML = "User has been deleted from the Database"
      }
    },1000);
    setTimeout(function() {
      if(node) {
        node.style.animation = "toast .5s ease-out forwards";
        setTimeout(() => {node.remove();} ,500);
      }
    },2000);
  }



