import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";

import backend from "./backend/backend.tsx";

export default function Create() {
  const [name, setName] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  useEffect(() => {
    setWarehouseId(localStorage.getItem("WarehouseId"));
  }, []);
  const postData = () => {
    backend.post(
      `https://myapiwarehouse.azurewebsites.net/api/warehouses/${warehouseId}/zones/`,
      {
        name,
      }
    );
    // this.props.router.navigate("/profile");
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
