import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa";
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../componets/Spinner"


const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  //funcion despachadora del reducer auth
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate("/login")
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if(password != password2){
      toast.error("los passwords no coinciden")
    } else {
      const userData = {
        name: name,
        email: email,
        password: password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h4>
          <FaUser /> Registrar
        </h4>
        <p>Por favor crea un nuevo usuario</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="text form-container"
              id="name"
              name="name"
              value={name}
              placeholder="Por favor inserta tu nombre"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="text form-container"
              id="email"
              name="email"
              value={email}
              placeholder="Por favor inserta tu email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="text form-container"
              id="password"
              name="password"
              value={password}
              placeholder="Por favor inserta tu password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="text form-container"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Por favor confirma tu password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
