import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import AuthService from "./services/auth.service";
import backend from "./backend/backend.tsx";

export default function Update() {
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");

  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    setID(localStorage.getItem("Id"));
    setName(localStorage.getItem("Nameas"));
    setWarehouseId(localStorage.getItem("WarehouseId"));
  }, []);

  const updateAPIData = () => {
    backend.put(
      `https://myapiwarehouse.azurewebsites.net/api/warehouses/${warehouseId}/zones/${id}`,
      {
        name,
      }
    );
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label className="form-label">Vardas</label>
          <input
            className="form-control"
            placeholder="Vardas"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>

        <Button
          className="btn btn-success"
          type="submit"
          onClick={updateAPIData}
        >
          Redaguoti
        </Button>
      </Form>
    </div>
  );
}
