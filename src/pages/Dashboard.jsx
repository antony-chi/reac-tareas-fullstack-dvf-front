import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TareaForm from "../componets/TareaForm";
import Spinner from "../componets/Spinner";
import { getTareas, reset } from "../features/tareas/tareaSlice";
import { toast } from "react-toastify";
import TareaItem from "../componets/TareaItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tareas, isLoading, isError, message } = useSelector(
    (state) => state.tarea
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTareas());
    }

    return () => {
      dispatch(reset());
    };
  }, [ user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h2>Bienvenido {user && user.name}</h2>
        <p>Mis Tareas</p>
      </section>

      <TareaForm />

      <section className="content">
        {tareas.length > 0 ? (
          <div className="tareas">
            {tareas.map((element) => (
              <TareaItem key={element._id} tarea={element} />
            ))}
          </div>
        ) : (
          <h3> El usuario no tiene tareas </h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
