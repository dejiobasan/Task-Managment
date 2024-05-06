import { useState } from "react";



function SignIn() {


  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
   
  )
}

export default SignIn