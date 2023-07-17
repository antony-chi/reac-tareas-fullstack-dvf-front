import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTarea, reset } from "../features/tareas/tareaSlice";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const TareaForm = () => {
  const [formTarea, setFormTarea] = useState({
    title: "",
    description: ""
  });

  const { title, description } = formTarea;
  const { user} = useSelector((state) => state.auth)
  
  const {tareas, isError, isSucces, isLoading, message} = useSelector((state) => state.tarea)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  
  useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(!user){
      navigate("/login")
    }
    

  }, [tareas, isError, isSucces, message, dispatch])
  

  const onChange = (e) => {
    setFormTarea((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };


  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      title: title,
      description: description
    };
    dispatch(createTarea(userData));
    dispatch(reset)
    setFormTarea({title: "", description: ""});
  };



  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="texto">Titulo de Tarea</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="texto">Descripción de Tarea</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Agregar Tarea
          </button>
        </div>
      </form>
    </section>
  );
};

export default TareaForm;
