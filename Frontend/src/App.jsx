import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar"
import Home from "../src/components/Home"
import SignIn from '../src/components/SignIn'
import CreateTask from "../src/components/CreateTask"
import DeleteTask from '../src/components/DeleteTask'
import UpdateTask from '../src/components/UpdateTask'
import UserPage from '../src/components/UserPage'
import ViewTask from '../src/components/UserPage'

function App() {
  return (
    <Router> 
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/deleteTask/:title" element={<DeleteTask />} />
          <Route path="/updateTask/:username" element={<UpdateTask />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/myTasks/:username" element={<ViewTask />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
