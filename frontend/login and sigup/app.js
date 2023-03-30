const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const SignUp=()=>{
  const payload={
      username:document.getElementById("name").value,
      email:document.getElementById("email").value,
      password:document.getElementById("password").value,
  }
  fetch("http://localhost:4500/user/signup",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify(payload)
  })
  .then(res=>res.json())
  .then(res=>console.log(res))
  .catch(err=>console.log(err))
}

const logIn=()=>{
   
  const payload={
      email:document.getElementById("email").value,
      password:document.getElementById("password").value
  }

  fetch("http://localhost:4500/user/login",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify(payload)
      
  })
  .then(res=>res.json())
  .then(res=>{
      console.log(res)
      localStorage.setItem("token",res.token)
  })
  .catch(err=>console.log(err))
}
