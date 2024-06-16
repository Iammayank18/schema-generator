import React from "react";
import { Select } from "antd";

const options = [
  {
    value: "String",
    label: "String",
  },
  {
    value: "Number",
    label: "Number",
  },
  {
    value: "Date",
    label: "Date",
  },
  {
    value: "Buffer",
    label: "Buffer",
  },
  {
    value: "Boolean",
    label: "Boolean",
  },
  {
    value: "Mixed",
    label: "Mixed",
  },
  {
    value: "ObjectId",
    label: "ObjectId",
  },
  {
    value: "Array",
    label: "Array",
  },
  {
    value: "Decimal128",
    label: "Decimal128",
  },
  {
    value: "Map",
    label: "Map",
  },
  {
    value: "Schema",
    label: "Schema",
  },
];

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

type Props = {
  onSearch?: (e: string) => void;
  onChange: (e: string) => void;
};
const SelectComponent: React.FC<Props> = ({ onChange, onSearch }) => (
  <Select
    style={{ width: "100%" }}
    showSearch
    placeholder="Select data type"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
  />
);

export default SelectComponent;
