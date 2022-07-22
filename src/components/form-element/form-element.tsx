import React from "react";
import Form from "react-bootstrap/Form";

interface FormElementProps {
  label: string;
  className: string;
  children: any;
  showHelp?: boolean;
  showHelpClassName?: string;
  helpText?: string | string[] | any;
}

const FormElement = (props: FormElementProps) => {
  const { label, className, children, showHelp, showHelpClassName, helpText } =
    props;
  return (
    <>
      <Form.Group className={className}>
        <Form.Label>{label}</Form.Label>
        {children}
        {showHelp && (
          <Form.Text className={`${showHelpClassName} d-block`}>
            {Array.isArray(helpText)
              ? helpText.map((i) => {
                  return i + "<br />";
                })
              : helpText}
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
};

export default FormElement;
