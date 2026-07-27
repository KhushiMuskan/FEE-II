function login() {
    let mail = document.getElementById("login").value;
    let password = document.getElementById("pass").value;
    let result = document.getElementById("result");

    if(mail == "khushimuskan" && password == "muskan")
        {
        result.innerHTML = "Successfull";
    }
    else if(mail == "" || password == "")
         {
        result.innerHTML= "Please enter mail and password";
    }
    else 
        { 
            result.innerHTML = "Mail or password do not match";
      }

    }
