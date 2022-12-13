import style from "../css/input.module.css";

const Input = (props) => {
  const classDate = props.type == "date" ? style.date : "";
  return (
    <div className={style.div}>
      <label htmlFor={props.name} className={classDate}>
        {props.label}
      </label>
      <input
        className={classDate}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      <p
        className={
          props.error[props.name]
            ? style.error
            : props.message
            ? style.success
            : ""
        }
      >
        {props.error[props.name] || props.message || null} &nbsp;
      </p>
    </div>
  );
};

export default Input;
