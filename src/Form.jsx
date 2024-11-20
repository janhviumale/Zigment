import React, { useState } from "react";
import './index.css';

const App = () => {
  const [jsonSchema, setJsonSchema] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [error, setError] = useState("");

  const handleJsonInput = (e) => {
    setError("");
    try {
      const schema = JSON.parse(e.target.value);
      setFormFields(schema.fields || []);
    } catch (err) {
      setError("Invalid JSON format");
      setFormFields([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form Submitted:", formValues);
    alert("Form submitted successfully!");
  };

  const renderFormElement = (field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            key={field.id}
            type={field.type}
            name={field.id}
            placeholder={field.placeholder || ""}
            required={field.required}
          />
        );
      case "textarea":
        return (
          <textarea
            key={field.id}
            name={field.id}
            placeholder={field.placeholder || ""}
            required={field.required}
          />
        );
      case "select":
        return (
          <select
            key={field.id}
            name={field.id}
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return field.options.map((option) => (
          <label key={option.value} className="radio-group">
            <input
              name={field.id}
              value={option.value}
              required={field.required}
              type="radio"
            />
            <span>{option.label}</span>
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        {/* JSON Editor Section */}
        <div className="json-editor">
          <h2>JSON Editor</h2>
          <textarea
            value={jsonSchema}
            onChange={(e) => {
              setJsonSchema(e.target.value);
              handleJsonInput(e);
            }}
            placeholder="Paste your JSON schema here..."
          ></textarea>
          {error && <p className="error">{error}</p>}
        </div>

        {/* Generated Form Section */}
        <div className="generated-form">
          <h2>Generated Form</h2>
          <form onSubmit={handleFormSubmit}>
            {formFields.map((field) => (
              <div key={field.id} className="form-group">
                <label className="label">{field.label}</label>
                {renderFormElement(field)}
              </div>
            ))}
            {formFields.length > 0 && (
              <button type="submit">Submit</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
