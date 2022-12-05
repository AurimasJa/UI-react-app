import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

import backend from "./backend/backend.tsx";

import AuthService from "./services/auth.service";
export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [zoneId, setZoneId] = useState("");
  useEffect(() => {
    setZoneId(localStorage.getItem("Id"));
    setWarehouseId(localStorage.getItem("WarehouseId"));
  }, []);
  const postData = () => {
    backend.post(
      `http://localhost:5004/api/warehouses/${warehouseId}/zones/${zoneId}/items`,
      {
        name,
        description,
      }
    );
  };
  return (
    <div>
      <h1>Nauja zona</h1>
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
