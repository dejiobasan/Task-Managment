import { useState  } from "react";


function CreateTask() {

  const [task, setTask] = useState({
    username: "",
    title: "",
    description: "",
    category: "",
    duration: "",
    startdate: "",
    duedate: "",
    status: ""
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setTask((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(task);
    //axios post request then redirect to createTask page
  }
 
  return (
    <div>
      
    </div>
  )
}

export default CreateTask