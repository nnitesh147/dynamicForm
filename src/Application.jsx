import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { data } from "./validation";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SubmitPage from "./SubmitPage";

const Application = () => {
  const [val, setVal] = useState({
    name: "",
    email: "",
    age: 0,
    phone: 0,
    address: "",
    country: "",
    loans: [],
    documents: [],
  });
  const [selectCountry, setCountry] = useState("");
  const [selectCountryerror, setCountryerror] = useState(false);
  const [selectHobby, setHobby] = useState([]);
  const [selectHobbyerror, setHobbyerror] = useState(false);
  const [like, setLike] = useState([]);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [emailerror, setemailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [show, setShow] = useState(false);

  const onHandleChange = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (regex.test(e.target.value)) {
        setEmailHelperText("");
        setemailError(false);
      } else {
        setEmailHelperText("Not Valid Email");
        setemailError(true);
      }
    }
  };
  const likeEvent = (e) => {
    setLike([...like, e.target.defaultValue]);
  };
  const onSelectCountry = (e) => {
    setCountry(e.target.innerText);
    if (selectCountry === "") {
      setCountryerror(true);
      setHelperText("required");
    } else {
      setCountryerror(false);
      setHelperText("");
      setCountry(e.target.innerText);
    }
  };
  const onSelectHobby = (e) => {
    if (e.target.innerText === "") {
      setHobbyerror(true);
      setHelperText("required");
    } else {
      setHobbyerror(false);
      setHelperText("");
      setHobby([...selectHobby, e.target.innerText]);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();

    if (val.name === "" || val.age === 0 || val.phone === 0) {
      setError(true);
      setHelperText("required");
    } else if (val.email === "") {
      setemailError(true);
      setEmailHelperText("Required");
    } else if (val.age === "") {
      setemailError(true);
      setEmailHelperText("Required");
    } else if (selectCountry === "") {
      setCountryerror(true);
      setHelperText("required");
    } else if (selectHobby.length === 0) {
      setHobbyerror(true);
      setHelperText("required");
    } else {
      var arr = val.loans;
      arr.push(...like);
      var arr1 = val.documents;
      arr1.push(...selectHobby);
      val.country = selectCountry;
      console.log(val);
      setShow(true);
    }
  };

  if (show) {
    return <Navigate to={"/submit"} />;
  }

  return (
    <form className="form-outer-wrapper" onSubmit={submitForm}>
      {data.form.sections.map((item, i) => {
        return (
          <div key={i}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {" "}
                <h2>{item.section_title}</h2>
              </Grid>
              {item.fields.map((data, i) => {
                return (
                  <Grid item xs={12} sm={6} key={i}>
                    {data.data_type === "String" ? (
                      <TextField
                        fullWidth={true}
                        error={error}
                        variant={data.variant}
                        label={data.label}
                        name={data.name}
                        type={data.data_type}
                        onChange={onHandleChange}
                        helperText={helperText}
                      />
                    ) : data.data_type === "email" ? (
                      <TextField
                        fullWidth={true}
                        error={emailerror}
                        variant={data.variant}
                        label={data.label}
                        name={data.name}
                        type={data.data_type}
                        onChange={onHandleChange}
                        helperText={emailHelperText}
                      />
                    ) : data.data_type === "Integer" ? (
                      <TextField
                        fullWidth={true}
                        error={error}
                        InputProps={{
                          inputProps: {
                            min: data.name === "phone" ? "" : 10,
                            max: data.name === "phone" ? "" : 40,
                          },
                        }}
                        min={18}
                        max={40}
                        variant={data.variant}
                        label={data.label}
                        name={data.name}
                        type={
                          data.data_type === "Integer" ? "number" : "String"
                        }
                        onChange={onHandleChange}
                        helperText={helperText}
                      />
                    ) : data.html_element === "TextArea" ? (
                      <div>
                        <TextareaAutosize
                          className="textArea"
                          name={data.name}
                          label={data.label}
                          variant={data.variant}
                          minRows={data.minRows}
                          placeholder={data.placeholder}
                          onChange={onHandleChange}
                        />
                      </div>
                    ) : data.html_element === "Select" ? (
                      <Autocomplete
                        id="combo-box-demo"
                        options={data.options}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 300 }}
                        onChange={onSelectCountry}
                        renderInput={(params) => (
                          <TextField
                            name={data.name}
                            helperText={helperText}
                            error={selectCountryerror}
                            {...params}
                            label={data.label}
                            variant={data.variant}
                          />
                        )}
                      />
                    ) : data.html_element === "multiple" ? (
                      <Autocomplete
                        id="combo-box-demo"
                        multiple
                        options={data.options}
                        onChange={onSelectHobby}
                        getOptionLabel={(option) => option.label}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={helperText}
                            error={selectHobbyerror}
                            label={data.label}
                            variant={data.variant}
                          />
                        )}
                      />
                    ) : (
                      ""
                    )}
                  </Grid>
                );
              })}
              {item.feilds2.map((data1, i) => {
                return (
                  <Grid item xs={12} sm={6} key={i}>
                    {
                      <Grid item xs={12} sm={12}>
                        {
                          <div>
                            <Grid item xs={12} sm={12}>
                              <strong>{data1.section_title3}</strong>
                            </Grid>
                            <Grid item xs={12} sm={12} className="flex">
                              {data1.checkFeilds
                                ? data1.checkFeilds.map((checkdata, i) => {
                                    return (
                                      <Grid item xs={12} sm={12} key={i}>
                                        <label>{checkdata.label}</label>
                                        <Checkbox
                                          onChange={likeEvent}
                                          value={checkdata.value}
                                          checked={checkdata.checked}
                                          defaultChecked={
                                            checkdata.defaultChecked
                                          }
                                          inputProps={{
                                            "aria-label": "primary checkbox",
                                          }}
                                        />
                                      </Grid>
                                    );
                                  })
                                : ""}
                            </Grid>
                          </div>
                        }
                      </Grid>
                    }
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Application;
