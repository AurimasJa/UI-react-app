import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

import backend from "./backend/backend.tsx";

import AuthService from "./services/auth.service";
export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const postData = () => {
    backend.post(`http://localhost:5004/api/warehouses/`, {
      name,
      description,
      address,
    });
  };
  return (
    <div>
      <h1>Nauja sandėlys</h1>
      <Form className="create-form">
        <Form.Field>
          <label className="form-label">Pavadinimas</label>
          <input
            className="form-control"
            placeholder="Pavadinimas"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Aprašymas</label>
          <input
            className="form-control"
            placeholder="Aprašymas"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Adresas</label>
          <input
            className="form-control"
            placeholder="Adresas"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>
        <Button
          onClick={postData}
          className="btn btn-success"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Vykdyti
        </Button>
      </Form>
    </div>
  );
}
