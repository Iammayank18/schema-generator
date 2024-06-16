/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Input,
  Button,
  Modal,
  Checkbox,
  Select,
  DatePicker,
  Collapse,
} from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";
import SelectComponent from "./component/Select";
import { CopyOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import databaseImg from "./assets/database.png";
interface Props {
  name: string;
  type: string;
  required: boolean;
  default?: string | boolean | null;
  unique?: boolean;
  sparse?: boolean;
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  minlength?: number;
  maxlength?: number;
  enumValues?: any[];
  match: string | RegExp;
  index: boolean;
  text: boolean;
  expires: string | number;
  auto: boolean;
  select: boolean;
  immutable: boolean;
  min: number | Date;
  max: number | Date;
  validate?: RegExp | { validator: (value: any) => boolean; message: string };
  get?: (value: any) => any;
  set?: (value: any) => any;
  alias?: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [copied, setCopied] = useState(false);

  const [fieldsData, setFieldsData] = useState([]);
  const [fields, setFields]: any = useState([
    {
      name: "",
      type: "",
      required: undefined,
      default: undefined,
      unique: undefined,
      sparse: undefined,
      trim: undefined,
      lowercase: undefined,
      uppercase: undefined,
      minlength: undefined,
      maxlength: undefined,
      enumValues: undefined,
      match: undefined,
      index: undefined,
      text: undefined,
      expires: undefined,
      auto: undefined,
      select: undefined,
      immutable: undefined,
      min: undefined,
      max: undefined,
      validate: undefined,
      get: undefined,
      set: undefined,
      alias: undefined,
    },
  ]);
  const onChange = (value: string, i: number) => {
    const updated = fields.map((item: Props, index: number) =>
      index === i ? { ...item, type: value } : item
    );
    setFields(updated);
  };

  const onChangeType = (e: string, i: number) => {
    const updated = fields.map((item: object, index: number) =>
      index === i ? { ...item, name: e } : item
    );
    setFields(updated);
  };

  const checkRequired = (i: number) => {
    const updated: any = fields.map((item: Props, index: number) =>
      index === i ? { ...item, required: !item.required } : item
    );
    setFields(updated);
  };

  const generate = () => {
    setFieldsData(fields);
    setLoader(true);
    generateSchema();
    document.title = "Generating...";
    setTimeout(() => {
      setIsModalOpen(!isModalOpen);
      setLoader(false);
      document.title = "Schema generator";
    }, 1000);
  };

  const generateSchema = (): Record<string, { type: string }> => {
    const schema: Record<string, any> = {};

    fieldsData.forEach((field: Props) => {
      let matchPattern: RegExp | undefined;
      if (field.match) {
        try {
          matchPattern = new RegExp(field.match);
        } catch (error) {
          console.error("Invalid regex pattern:", error);
        }
      }

      schema[field.name] = {
        type: field.type,
        required: field.required,
        default: field.default,
        unique: field.unique,
        sparse: field.sparse,
        trim: field.trim,
        lowercase: field.lowercase,
        uppercase: field.uppercase,
        minlength: field.minlength,
        maxlength: field.maxlength,
        enumValues: field.enumValues,
        match: matchPattern,
        index: field.index,
        text: field.text,
        expires: field.expires,
        auto: field.auto,
        select: field.select,
        immutable: field.immutable,
        min: field.min,
        max: field.max,
        validate: field.validate,
        get: field.get,
        set: field.set,
        alias: field.alias,
      };
    });
    return schema;
  };

  const addFields = () => {
    setFields((prevFields: any) => [
      ...prevFields,
      {
        name: "",
        type: "",
        required: undefined,
        default: undefined,
        unique: undefined,
        sparse: undefined,
        trim: undefined,
        lowercase: undefined,
        uppercase: undefined,
        minlength: undefined,
        maxlength: undefined,
        enumValues: undefined,
        match: undefined,
        index: undefined,
        text: undefined,
        expires: undefined,
        auto: undefined,
        select: undefined,
        immutable: undefined,
        min: undefined,
        max: undefined,
        validate: undefined,
        get: undefined,
        set: undefined,
        alias: undefined,
      },
    ]);
  };
  const resetFields = () => {
    setFields([
      {
        name: "",
        type: "",
        required: false,
        default: null,
        unique: false,
        sparse: false,
        trim: false,
        lowercase: false,
        uppercase: false,
        minlength: undefined,
        maxlength: undefined,
        enumValues: [],
        match: undefined,
        index: false,
        text: false,
        expires: undefined,
        auto: false,
        select: false,
        immutable: false,
        min: undefined,
        max: undefined,
        validate: undefined,
        get: undefined,
        set: undefined,
        alias: undefined,
      },
    ]);
  };

  return (
    <div className="mx-5 self-center">
      <div className="flex flex-row items-center justify-center p-5">
        <img src={databaseImg} className="w-10 h-10" alt="" />
        <h1 className="text-2xl font-bold">Schema Generator</h1>
      </div>

      <div className="space-x-2 mb-3">
        <Button onClick={addFields}>Add</Button>
        <Button type="primary" danger onClick={resetFields}>
          Reset
        </Button>
        <Button
          type="primary"
          onClick={generate}
          loading={loader}
          disabled={!fields[0].name || !fields[0].type}
        >
          Generate
        </Button>
      </div>
      <div className="space-y-3">
        {fields &&
          fields.map((field: Props, index: number) => {
            return (
              <div className="space-y-2 border rounded-lg p-5" key={index}>
                <div className="space-y-2">
                  <Input
                    placeholder="Key name"
                    onChange={(e) => onChangeType(e.target.value, index)}
                  />
                  <SelectComponent onChange={(e) => onChange(e, index)} />

                  <Checkbox
                    checked={field.required}
                    onChange={() => checkRequired(index)}
                  >
                    Required
                  </Checkbox>
                  <Checkbox
                    checked={field.unique}
                    onChange={() => {
                      const updated = fields.map((item: Props, i: number) =>
                        index === i ? { ...item, unique: !field.unique } : item
                      );
                      setFields(updated);
                    }}
                  >
                    Unique
                  </Checkbox>
                  <Checkbox
                    checked={field.sparse}
                    onChange={() => {
                      const updated = fields.map((item: Props, i: number) =>
                        index === i ? { ...item, sparse: !field.sparse } : item
                      );
                      setFields(updated);
                    }}
                  >
                    Sparse
                  </Checkbox>
                  <Checkbox
                    checked={field.trim}
                    onChange={() => {
                      const updated = fields.map((item: Props, i: number) =>
                        index === i ? { ...item, trim: !field.trim } : item
                      );
                      setFields(updated);
                    }}
                  >
                    Trim
                  </Checkbox>
                  <Checkbox
                    checked={field.lowercase}
                    onChange={() => {
                      const updated = fields.map((item: Props, i: number) =>
                        index === i
                          ? { ...item, lowercase: !field.lowercase }
                          : item
                      );
                      setFields(updated);
                    }}
                  >
                    Lowercase
                  </Checkbox>
                  <Checkbox
                    checked={field.uppercase}
                    onChange={() => {
                      const updated = fields.map((item: Props, i: number) =>
                        index === i
                          ? { ...item, uppercase: !field.uppercase }
                          : item
                      );
                      setFields(updated);
                    }}
                  >
                    Uppercase
                  </Checkbox>

                  <Collapse
                    items={[
                      {
                        label: "Show advance",
                        children: (
                          <div className="space-y-4">
                            <Input
                              disabled={field.default === null}
                              placeholder="Default Value"
                              value={(field.default as string) || ""}
                              onChange={(e) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? { ...item, default: e.target.value }
                                      : item
                                );
                                setFields(updated);
                              }}
                              suffix={
                                <div>
                                  <Checkbox
                                    disabled={!field.default === null}
                                    checked={field.default === null}
                                    onChange={() => {
                                      const updated = fields.map(
                                        (item: Props, i: number) =>
                                          index === i
                                            ? {
                                                ...item,
                                                default: null,
                                              }
                                            : item
                                      );
                                      setFields(updated);
                                    }}
                                  >
                                    Null
                                  </Checkbox>
                                </div>
                              }
                            />
                            <Input
                              placeholder="Min Length"
                              type="number"
                              value={field.minlength}
                              onChange={(e) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          minlength: parseInt(
                                            e.target.value,
                                            10
                                          ),
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            />
                            <Input
                              placeholder="Max Length"
                              type="number"
                              value={field.maxlength}
                              onChange={(e) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          maxlength: parseInt(
                                            e.target.value,
                                            10
                                          ),
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            />
                            <Select
                              placeholder="Enum Values"
                              mode="tags"
                              value={field.enumValues}
                              onChange={(values: any) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          enumValues:
                                            values.length > 0
                                              ? values
                                              : undefined,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                              style={{ width: "100%" }}
                            />
                            {/* <Input
                              placeholder="Regex Pattern (Match)"
                              value={field.match || ""}
                              onChange={(e) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          match: e.target.value,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            /> */}
                            <Checkbox
                              checked={field.index}
                              onChange={() => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          index: !field.index,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            >
                              Index
                            </Checkbox>
                            <Checkbox
                              checked={field.auto}
                              onChange={() => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          auto: !field.auto,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            >
                              Auto
                            </Checkbox>
                            <Checkbox
                              checked={field.select}
                              onChange={() => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          select: !field.select,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            >
                              Select
                            </Checkbox>
                            <Checkbox
                              checked={field.immutable}
                              onChange={() => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          immutable: !field.immutable,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            >
                              Immutable
                            </Checkbox>

                            {field.type === "Date" ? (
                              <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Minimum Value"
                                onChange={(_, dateString) => {
                                  const updated = fields.map(
                                    (item: Props, i: number) =>
                                      index === i
                                        ? {
                                            ...item,
                                            min: new Date(dateString as string),
                                          }
                                        : item
                                  );
                                  setFields(updated);
                                }}
                              />
                            ) : (
                              <Input
                                placeholder="Minimum Value"
                                onChange={(e) => {
                                  const updated = fields.map(
                                    (item: Props, i: number) =>
                                      index === i
                                        ? {
                                            ...item,
                                            min: e.target.value,
                                          }
                                        : item
                                  );
                                  setFields(updated);
                                }}
                              />
                            )}

                            {field.type === "Date" ? (
                              <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Maximum Value"
                                onChange={(_, dateString) => {
                                  const updated = fields.map(
                                    (item: Props, i: number) =>
                                      index === i
                                        ? {
                                            ...item,
                                            max: new Date(dateString as string),
                                          }
                                        : item
                                  );
                                  setFields(updated);
                                }}
                              />
                            ) : (
                              <Input
                                placeholder="Maximum Value"
                                onChange={(e) => {
                                  const updated = fields.map(
                                    (item: Props, i: number) =>
                                      index === i
                                        ? {
                                            ...item,
                                            max: e.target.value,
                                          }
                                        : item
                                  );
                                  setFields(updated);
                                }}
                              />
                            )}

                            <Input
                              placeholder="Alias"
                              value={field.alias || ""}
                              onChange={(e) => {
                                const updated = fields.map(
                                  (item: Props, i: number) =>
                                    index === i
                                      ? {
                                          ...item,
                                          alias: e.target.value,
                                        }
                                      : item
                                );
                                setFields(updated);
                              }}
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        title="Generated schema"
        open={isModalOpen}
        onOk={() => setIsModalOpen(!isModalOpen)}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          <CopyToClipboard
            text={JSON.stringify(generateSchema(), null, 2)}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            <Button key="copy" type="primary" icon={<CopyOutlined />}>
              {copied ? "Copied" : "Copy"}
            </Button>
          </CopyToClipboard>,
        ]}
      >
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {JSON.stringify(generateSchema(), null, 2)}
        </SyntaxHighlighter>
      </Modal>
    </div>
  );
}

export default App;
