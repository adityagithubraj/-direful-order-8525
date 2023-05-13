const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
let loader = document.querySelector(".spin-container")

sign_up_btn.addEventListener("click", (e) => {
  e.preventDefault()
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", (e) => {
  e.preventDefault()
  container.classList.remove("sign-up-mode");
});


const signupForm = document.querySelector(".sign-up-form")

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  SignUp()
})

const SignUp = () => {
  console.log("In Signup Function")

  const payload = {
    username: document.getElementById("name").value,
    email: document.getElementById("email2").value,
    password: document.getElementById("password2").value,
  }


  console.log(payload)
  loader.style.display = "block"
  fetch("https://red-filthy-dove.cyclic.app/user/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(async (res) => {
      loader.style.display = "none"
      return { status: res.status, res: await res.json() }
    })
    .then((data) => {
      console.log(data)
      alert(data.res.msg)
    })
    .catch((err) => {
      console.log(err)
      loader.style.display = "none"
    })
}


let signinForm = document.querySelector(".sign-in-form")

signinForm.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log("logging in")
  const payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
  loader.style.display = "block"
  fetch("https://red-filthy-dove.cyclic.app/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",

    },
    body: JSON.stringify(payload)

  })
    .then(async (res) => { return { status: res.status, res: await res.json() } })
    .then((data) => {
      if (data.status == 201) {
        loader.style.display = "none"
        localStorage.setItem("token", data.res.token)
        localStorage.setItem("refreshToken", data.res.refreshToken)
        localStorage.setItem("name", data.res.name)
        alert(data.res.msg)

        if (data.res.role == "admin") {
          window.location = "./admin.html"
        } else {
          loader.style.display = "none"
          window.location = ".././index.html"
        }
      }else{
        loader.style.display="none"
        window.location.reload()
      }
    })
    .catch((err )=> {
      loader.style.display="none"
      console.log(err)
    })

})

// const logIn = () => {
//   console.log("logging in")
//   const payload = {
//     email: document.getElementById("email").value,
//     password: document.getElementById("password").value
//   }

//   fetch("http://localhost:4500/user/login", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",

//     },
//     body: JSON.stringify(payload)

//   })
//   .then(async(res)=>{return{status:res.status,res:await res.json()}})
//   .then((data)=>{
//       if(data.status==201){
//           localStorage.setItem("token",data.res.token)
//           localStorage.setItem("refreshToken",data.res.refreshToken)
//           localStorage.setItem("name",data.res.name)
//           alert(data.res.msg)

//           if(data.res.role=="admin"){
//             window.location="./admin.html"
//         }else{
//             window.location="./index.html"
//         }
//       }
//   })
//     .catch(err => console.log(err))
// }


// ........................Google Login.....................................

// const google = document.getElementById("google")

// google.addEventListener("click", () => {
//   fetch("https://red-filthy-dove.cyclic.app/oauth/auth/google")
//     .then(async (res) => { return { status: res.status, res: await res.json() } })
//     .then((data) => {
//       if (data.status == 201) {
//         window.location = ".././index.html"
//       } else {
//         console.log(data)
//       }
//     })

// })


// require("../../Frontend/index.html")