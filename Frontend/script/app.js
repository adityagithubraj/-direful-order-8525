const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", (e) => {
  e.preventDefault()
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", (e) => {
  e.preventDefault()
  container.classList.remove("sign-up-mode");
});


const signupForm = document.querySelector("sign-up-form")

const SignUp = () => {
  console.log("In Signup Function")

  const payload = {
    username: document.getElementById("name").value,
    email: document.getElementById("email2").value,
    password: document.getElementById("password2").value,
  }

  
  console.log(payload)
  fetch("https://backend-deploy-km65.onrender.com/user/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const logIn = () => {
  const payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  fetch("https://backend-deploy-km65.onrender.com/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",

    },
    body: JSON.stringify(payload)

  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      alert(res.msg)

      // localStorage.setItem("token",res.token)
      if (res.role == "admin") {
        window.location = "./admin.html"

      } else {
        window.location = "./loggedin.html"

      }
    })
    .catch(err => console.log(err))
}


// ........................Google Login.....................................

const google = document.getElementById("google")

google.addEventListener("click", () => {
  fetch("https://backend-deploy-km65.onrender.com/oauth/auth/google")
    .then(async (res) => { return { status: res.status, res: await res.json() } })
    .then((data) => {
      if (data.status == 201) {
        window.location = "./index.html"
      } else {
        console.log(data)
      }
    })

})


// require("../../Frontend/index.html")