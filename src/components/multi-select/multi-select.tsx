import "./multi-select.scss";
import Multiselect from "multiselect-react-dropdown";

interface MultiSelectProps {
  options: any[];
  onChange: (selected: any) => void;
  selectedValues?: any;
}

function MultiSelect(props: MultiSelectProps) {
  const { options, onChange, selectedValues } = props;
  return (
    <>
      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={selectedValues}
        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        onSelect={onChange} // Function will trigger on select event
        onRemove={onChange} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        style={{
          chips: {
            background: "#003865",
            marginBottom: 0,
          },
          option: {
            color: "#003865",
            fontSize: 14,
            backgroundColor: "#fff",
          },
          highlightOption: {
            color: "white",
            backgroundColor: "#003865",
          },
          searchBox: {
            backgroundColor: "#f6f6f6",
            border: "none",
            borderBottom: "1px solid rgba(41, 52, 98, 0.2)",
            borderRadius: "0.375rem",
            height: 55,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
          },
        }}
      />
    </>
  );
}

export default MultiSelect;
