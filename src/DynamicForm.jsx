import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./validation";
import { ErrorMessage } from "@hookform/error-message";
import { Navigate } from "react-router-dom";

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [show, setshow] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setshow(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  const renderFormControl = (key, field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <div key={key}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={key}
              onChange={handleInputChange}
              {...register(key, field.validation)}
            />
            <ErrorMessage
              errors={errors}
              name={key}
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            />
          </div>
        );
      case "select":
        return (
          <div key={key} style={{ margin: "10px 0" }}>
            <label>{field.label}</label>
            <select
              name={key}
              defaultValue={{
                label: "Choose an option",
              }}
              onChange={handleInputChange}
              {...register(key, field.validation)}
            >
              {field.options.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.value}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name={key}
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            />
          </div>
        );
      case "radio":
        return (
          <div key={key} style={{ display: "flex", gap: "9px" }}>
            <label>{field.label}: </label>
            {field.options.map((val) => (
              <div key={val.value}>
                <label>{val.label}</label>
                <input
                  type="radio"
                  name={key}
                  checked={val.val}
                  value={val.value}
                  onChange={handleInputChange}
                  {...register(key, field.validation)}
                />
              </div>
            ))}
            <ErrorMessage
              errors={errors}
              name={key}
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };
  if (show) {
    return <Navigate to={"/submit"} />;
  }

  return (
    <form className="form-outer-wrapper" onSubmit={handleSubmit(onSubmit)}>
      {/* Render form controls dynamically */}
      {Object.entries(schema).map(([key, field]) =>
        renderFormControl(key, field)
      )}
      <button
        style={{ color: "white", backgroundColor: "#040720" }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
