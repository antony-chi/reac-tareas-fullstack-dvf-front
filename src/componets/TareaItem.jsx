import {useDispatch} from "react-redux"
import { deleteTarea} from "../features/tareas/tareaSlice"

const TareaItem = ({ tarea }) => {

    const dispatch = useDispatch()

  return (
    <div className="tarea">
        <div>
            {new Date(tarea.createdAt).toLocaleString("es-MX")}
        </div>
        <h3>{tarea.title}</h3>
        <h3>{tarea.description}</h3>
        <button onClick={() => dispatch(deleteTarea(tarea._id))} className="close">X</button>
    </div>
  )
}

export default TareaItem