import React, { useState } from "react";
import { Range as ReactRange, getTrackBackground } from "react-range";

interface RangeProps {
  values: number[];
  onChange: (values: any) => void;
  two?: boolean;
  step: number;
  min: number;
  max: number;
  prefix?: string;
}

const Range = (props: RangeProps) => {
  const { values, onChange, two, step, min, max, prefix } = props;

  return (
    <ReactRange
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(_value) => {
        onChange(_value);
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#f6f6f6",
            background: getTrackBackground({
              values,
              colors: two
                ? ["#f6f6f6", "#003865", "#f6f6f6"]
                : ["#003865", "#f6f6f6"],
              min: min,
              max: max,
            }),
            borderBottom: "1px solid rgba(41, 52, 98, 0.2)",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={(args) => {
        return (
          <div
            {...args.props}
            style={{
              ...args.props.style,
              height: "24px",
              width: "24px",
              borderRadius: "6px",
              backgroundColor: "#003865",
              outline: "unset",
            }}
          >
            <output style={{ marginTop: "30px", width: "100px" }} id="output">
              {values[args.index]} {prefix && prefix}
            </output>
          </div>
        );
      }}
    />
  );
};

export default Range;
