import "./input.scss";
import Form from "react-bootstrap/Form";

interface InputProps {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChangeHandler?: (text: any) => void;
}

function Input(props: InputProps) {
  const { type, placeholder, value, onChangeHandler, name } = props;
  return (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChangeHandler}
        className="custom-input"
      />
    </>
  );
}

export default Input;
