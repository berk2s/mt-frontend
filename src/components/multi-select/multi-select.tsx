import "./multi-select.scss";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

interface MultiSelectProps {
  options: any[];
  onChange: (selected: any) => void;
}

function MultiSelect(props: MultiSelectProps) {
  const { options, onChange } = props;
  return (
    <>
      <DropdownMultiselect
        selectDeselectLabel={""}
        buttonClass="custom-select"
        options={options}
        handleOnChange={onChange}
      />
    </>
  );
}

export default MultiSelect;
