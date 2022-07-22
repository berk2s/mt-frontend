import "./select.scss";
import Form from "react-bootstrap/Form";

function Select() {
  return (
    <>
      <Form.Select className="custom-select">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </>
  );
}

export default Select;
