import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import backend from "./backend/backend.tsx";

import AuthService from "./services/auth.service";

function CertainWarehouse() {
  const navigate = useNavigate();
  const location = useLocation();
  const [zones, setZones] = useState([]);
  const [show, setShow] = useState(true);
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const url = "http://localhost:5004/api/warehouses/";
  const navigateToCreate = () => {
    localStorage.setItem("WarehouseId", location.state.id);
    navigate("/createzone");
  };
  const setData = (zone) => {
    localStorage.setItem("Id", zone.id);
    localStorage.setItem("Nameas", zone.name);
    localStorage.setItem("WarehouseId", location.state.id);
    navigate("/updatezone");
  };
  const removeZoneHandler = async (id) => {
    await backend.delete(
      `${
        "http://localhost:5004/api/warehouses/" +
        location.state.id +
        `/zones/` +
        id
      }`
    );
    const newZones = zones.filter((zone) => {
      return zone.id !== id;
    });

    setZones(newZones);
  };
  const toCertainZone = (zone, warehouseIdas) => {
    navigate("/certainzone", {
      state: {
        id: zone.id,
        name: zone.name,
        warehouseId: location.state.id,
      },
    });
  };
  function getZones(id) {
    backend.get(url + id + `/zones`).then((resp) => {
      //store data loaded
      setZones(resp.data);
      console.log("asdasd");
      console.log(resp.data);
    });
    setShow(!show);
  }
  function renderZonesTable() {
    return (
      <div className="table-resposive mt-5">
        {currentUser.roles.includes("Admin") ||
        currentUser.roles.includes("Manager") ? (
          <button className="btn btn-dark" onClick={navigateToCreate}>
            Pridėti zoną
          </button>
        ) : (
          <p></p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pavadinimas</th>
              <th scope="col">Komanda</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.id}>
                <th scope="row">{zone.id}</th>
                <td>{zone.name}</td>
                <td>
                  <button
                    onClick={() => {
                      toCertainZone(zone, location.state.id);
                    }}
                    className="btn btn-primary"
                  >
                    Daiktai {console.log(location.state.id)}
                  </button>

                  {currentUser.roles.includes("Admin") ? (
                    <button
                      onClick={() => setData(zone)}
                      className="btn btn-warning"
                    >
                      Redaguoti
                    </button>
                  ) : (
                    <p></p>
                  )}
                  {currentUser.roles.includes("Admin") ||
                  currentUser.roles.includes("Manager") ? (
                    <button
                      onClick={() => removeZoneHandler(zone.id)}
                      className="btn btn-danger"
                    >
                      Trinti
                    </button>
                  ) : (
                    <p></p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <>
      <div>Pavadinimas: {location.state.name}</div>
      <div>Adresas: {location.state.address}</div>
      <div>Aprašymas: {location.state.description}</div>
      <div>Aprašymas: {location.state.id}</div>
      {show ? (
        <button
          onClick={getZones(location.state.id)}
          className="btn btn-dark btn-lg w-100"
        >
          Užkrauti sandėlio zonas
        </button>
      ) : (
        <p></p>
      )}
      <div>{zones.length > 0 && renderZonesTable()}</div>
      <div>
        {(() => {
          if (zones.length == 0) {
            return (
              <div>
                Sandėlyje zonų nėra{" "}
                {currentUser.roles.includes("Admin") ||
                currentUser.roles.includes("Manager") ? (
                  <button className="btn btn-dark" onClick={navigateToCreate}>
                    Pridėti zoną
                  </button>
                ) : (
                  <p></p>
                )}
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}

export default CertainWarehouse;
