import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import AuthService from "./services/auth.service";
import backend from "./backend/backend.tsx";
// import { useHistory } from "react-router";

export default function Update() {
  //   let history = useHistory();
  const [id, setID] = useState(null);
  //   const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    setID(localStorage.getItem("Id"));
    // setName(localStorage.getItem("Nameas"));
    setDescription(localStorage.getItem("Description"));
    setAddress(localStorage.getItem("Addressas"));
  }, []);

  const updateAPIData = () => {
    backend.put(
      `https://myapiwarehouse.azurewebsites.net/api/warehouses/${id}`,
      {
        //   name,
        description,
        address,
      }
    );
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label className="form-label">Aprašymas</label>
          <input
            className="form-control"
            placeholder="Aprašymas"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Adresas</label>
          <input
            className="form-control"
            placeholder="Adresas"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>
        <Button
          className="btn btn-success"
          type="submit"
          onClick={updateAPIData}
          style={{ marginTop: 10 }}
        >
          Redaguoti
        </Button>
      </Form>
    </div>
  );
}
