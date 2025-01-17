import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCitas } from "../../../redux/slices/agendaSlice"; // Acción para obtener citas
import { fetchClientes } from "../../../redux/slices/clienteSlice"; // Acción para obtener clientes
import axiosInstance from "../../../api/axioInstance";
import { openModal } from "../../../redux/slices/modalSlice";

const Agenda = () => {
  const dispatch = useDispatch();
  const { citas, loading, error } = useSelector((state) => state.agenda);
  const { id, role } = useSelector((state) => state.user);

  console.log("IDDDD", id);

  // Cargar las citas según el rol del usuario
  useEffect(() => {
    if (role === "veterinario") {
      dispatch(fetchCitas(id));
    } else if (role === "cliente") {
      dispatch(fetchClientes(id));
    }
  }, [dispatch, id, role]);

  const handleEditCita = (cita) => {
    dispatch(
      openModal({
        modalContent: "EDIT_CITA_FORM",
        modalProps: { cita },
      }),
    );
  };

  const handleCancelCita = async (citaId) => {
    try {
      await axiosInstance.delete(`/api/citas/${citaId}`);
      dispatch(fetchCitas(id)); // Actualizamos la lista de citas después de cancelar
      alert("Cita cancelada exitosamente.");
    } catch (err) {
      console.error("Error al cancelar la cita: ", err);
      alert("No se pudo cancelar la cita.");
    }
  };

  const handleIniciarCita = (cita) => {
    dispatch(
      openModal({
        modalContent: "HISTORIAL_FORM",
        modalProps: { cita },
      }),
    );
  };

  if (loading) {
    return <p>Cargando citas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Mi Agenda</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {citas.length > 0 ? (
          citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "300px",
              }}
            >
              <h5>
                Fecha: {cita.fecha} | Hora: {cita.horaInicio} - {cita.horaFin}
              </h5>
              <p>
                <strong>Mascota:</strong> {cita.mascota.namePet}
              </p>
              <p>
                <strong>Propietario:</strong> {cita.usuario.nameUser}{" "}
                {cita.usuario.lastNameUser}
              </p>
              <p>
                <strong>Estado:</strong> {cita.estadoAgenda}
              </p>
              <div>
                {role === "veterinario" && (
                  <>
                    <button onClick={() => handleEditCita(cita)}>Editar</button>
                    <button onClick={() => handleCancelCita(cita.id)}>
                      Cancelar
                    </button>
                    <button onClick={() => handleIniciarCita(cita)}>
                      Iniciar
                    </button>
                  </>
                )}
                {role === "cliente" && cita.usuario.id === id && (
                  <button onClick={() => handleCancelCita(cita.id)}>
                    Cancelar cita
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No hay citas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Agenda;
