import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
   let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" , cpassword:""});

    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e)=>{
      const{name,email,password} = credentials;
            console.log('submit');
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({name, email,password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate("/");
        }else {
            alert('invalid data')
        }
    }
  return (
    <div>
      <h1>sign up</h1><div className="container my-3">
            <h1 className='text-center'>LogIn to iDiary</h1>
            <form onSubmit={handleSubmit}>
            <div className=" mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className=" mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="current-password" className="form-control" name='password' value={credentials.password} onChange={handleChange} id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="current-password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={handleChange} id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp
