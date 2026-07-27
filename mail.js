function login() {
    let mail = document.getElementById("login").value;
    let password = document.getElementById("pass").value;
    let newpass = document.getElementById("password").value;
    let result = document.getElementById("result");

     if(mail == "" || password == "")
         {
        result.innerHTML= "Please enter mail and password";
    }
    else if (password.length<=8){
        result.innerHTML="Min length should be 8 characters "
    }

    else if (!mail.includes("@") || !mail.includes(".com")){
        result.innerHTML="Mail must contain @ and .com"
    }

    else if(password == newpass)
        {
        result.innerHTML = "Password Saved";
    }
    else 
        { 
            result.innerHTML = "Passwords do not match";
      }

    }
