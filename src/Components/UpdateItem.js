import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import AuthService from "./services/auth.service";
import backend from "./backend/backend.tsx";
// import { useHistory } from "react-router";

export default function Update() {
  //   let history = useHistory();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [zoneIdAsked, setZoneIdAsked] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [zoneId, setZoneId] = useState("");

  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    setID(localStorage.getItem("Id"));
    setName(localStorage.getItem("Nameas"));
    setDescription(localStorage.getItem("Description"));
    setZoneIdAsked(localStorage.getItem("ZoneUpd"));
    setZoneId(localStorage.getItem("ZoneId"));
    setWarehouseId(localStorage.getItem("WarehouseId"));
  }, []);
  console.log(id);
  const updateAPIData = () => {
    backend.put(
      `http://localhost:5004/api/warehouses/${warehouseId}/zones/${zoneId}/items/${id}`,
      {
        name,
        description,
        zoneIdAsked,
      }
    );
    //   .then(() => {
    //     // history.push("/read");
    //   });
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
          <label className="form-label">Naujos zonos id</label>
          <input
            className="form-control"
            placeholder="Zona"
            value={zoneIdAsked}
            onChange={(e) => setZoneIdAsked(e.target.value)}
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
