import useAxios from "../hooks/useAxios";
import { useState } from "react";
import style from "../css/popup.module.css";
import Button from "./Button";
import Input from "./Input";
import { calcularEdad, calcularTiempo } from "../utils/date";

const initialState = {
  id: 0,
  name: "",
  age: "",
  birth_date: "",
  register_date: "",
  cost: "",
};
const PopUp = ({ item, onClose, action }) => {
  const { data, error, loaded, execute } = useAxios();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState(item || initialState);

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validaciones = () => {
    let errors = {};
    if (!formState.name) {
      errors = { ...errors, name: "Nombre es obligatorio" };
    } else {
      let name_parts = formState.name.split(" ");
      if (name_parts.length < 2) {
        errors = {
          ...errors,
          name: "Nombre debe tener al menos Nombre y Apellido",
        };
      }
    }

    if (!formState.age) {
      errors = { ...errors, age: "Edad es obligatorio" };
    } else {
      if (Number(formState.age) <= 18) {
        errors = { ...errors, age: "Edad debe ser mayor a 18" };
      } else {
        let edadFecha = calcularEdad(formState.birth_date);
        if (formState.age != edadFecha) {
          errors = {
            ...errors,
            age: "Edad no coincide con fecha de nacimiento",
          };
        }
      }
    }

    if (!formState.cost) {
      errors = { ...errors, cost: "Costo es obligatorio" };
    } else {
      let anios = calcularTiempo(formState.register_date);
      if (formState.cost <= 100 * anios) {
        errors = {
          ...errors,
          cost:
            "Costo no es Porporcional deberia ser igual o mayor a " +
            anios * 100,
        };
      }
    }

    if (!formState.birth_date) {
      errors = { ...errors, birth_date: "Fecha de nacimiento es obligatorio" };
    }

    if (!formState.register_date) {
      errors = {
        ...errors,
        register_date: "Fecha de Inscripcion es obligatorio",
      };
    } else {
      if (new Date(formState.birth_date) > new Date(formState.register_date)) {
        errors = {
          ...errors,
          register_date:
            "Fecha de Inscripcion debe ser mayor a Fecha Nacimiento ",
        };
      }
    }

    return errors;
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validaciones();
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (action == "ADD") {
      execute("/persona", "POST", formState).then(({ data }) => {
        if (data.status === "ok") {
          onClose(true);
          return;
        } else {
          const err = data.error;
          setErrors({ ...errors, err });
          console.log("====================================");
          console.log("Error", data);
          console.log("====================================");
        }
      });
    }
    if (action == "EDIT") {
      execute("/persona/" + formState.id, "PUT", formState).then(({ data }) => {
        if (data.status === "ok") {
          onClose(true);
          return;
        } else {
          const err = data.error;
          setErrors({ ...errors, err });
          console.log("====================================");
          console.log("Error", data);
          console.log("====================================");
        }
      });
    }
    if (action == "DEL") {
      execute("/persona/" + formState.id, "DELETE", {}).then(({ data }) => {
        if (data.status === "ok") {
          onClose(true);
          return;
        } else {
          const err = data.error;
          setErrors({ ...errors, err });
          console.log("====================================");
          console.log("Error", data);
          console.log("====================================");
        }
      });
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={style.popover}></div>
      <div className={style.modalframe} onClick={(e) => onClose()}>
        <div className={style.modal} onClick={handleClick}>
          <h1>
            {action == "ADD"
              ? "Crear Persona Nueva"
              : action == "EDIT"
              ? "Editar Persona"
              : "Eliminar Persona"}
          </h1>
          <h2>Ingresa los siguientes datos</h2>
          <Input
            label="Nombre Completo"
            type="text"
            name="name"
            error={errors}
            value={formState.name}
            disabled={action == "DEL"}
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            label="Edad"
            type="text"
            name="age"
            error={errors}
            value={formState.age}
            disabled={action == "DEL"}
            onChange={(e) => handleChange(e)}
          ></Input>
          <div className={style.half}>
            <Input
              label="Fecha de Nacimiento"
              type="date"
              name="birth_date"
              error={errors}
              value={formState.birth_date}
              disabled={action == "DEL"}
              onChange={(e) => handleChange(e)}
            ></Input>
            <Input
              label="Fecha de Inscripción"
              type="date"
              name="register_date"
              error={errors}
              value={formState.register_date}
              disabled={action == "DEL"}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <Input
            label="Costo"
            type="text"
            name="cost"
            error={errors}
            value={formState.cost}
            disabled={action == "DEL"}
            onChange={(e) => handleChange(e)}
          ></Input>
          <div className={style.buttonDiv}>
            <Button onClick={(e) => handleSubmit(e)}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
