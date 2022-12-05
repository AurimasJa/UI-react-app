import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import backend from "./backend/backend.tsx";

import AuthService from "./services/auth.service";
import { useNavigate, Navigate } from "react-router-dom";

function CertainZone() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);
  const url = "https://myapiwarehouse.azurewebsites.net/api/warehouses/";
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const removeZoneHandler = async (id) => {
    console.log(location.state);
    await backend.delete(
      `${
        "https://myapiwarehouse.azurewebsites.net/api/warehouses/" +
        location.state.warehouseId +
        `/zones/` +
        location.state.id +
        `/items/` +
        id
      }`
    );
    const newItems = items.filter((item) => {
      return item.id !== id;
    });

    setItems(newItems);
  };
  const navigateToCreate = () => {
    navigate("/createitem");
  };
  const setData = (item) => {
    localStorage.setItem("Id", item.id);
    localStorage.setItem("Nameas", item.name);
    localStorage.setItem("Description", item.description);
    localStorage.setItem("ZoneUpd", location.state.id);
    localStorage.setItem("ZoneId", location.state.id);
    navigate("/updateitem");
  };
  // const ToEditItem = (warehouse) => {
  //   navigate("/", {
  //     state: {
  //       id: warehouse.id,
  //       name: warehouse.name,
  //       address: warehouse.address,
  //       description: warehouse.description,
  //     },
  //   });
  // };
  function getItems(id, warehouseId) {
    backend.get(url + warehouseId + `/zones/` + id + `/items`).then((resp) => {
      //store data loaded
      setItems(resp.data);
      console.log(resp.data);
    });
    setShow(!show);
  }
  function renderItemsTable() {
    return (
      <div className="table-resposive mt-5">
        <button className="btn btn-dark" onClick={navigateToCreate}>
          Pridėti daiktą
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pavadinimas</th>
              <th scope="col">Komanda</th>
            </tr>
          </thead>
          <tbody>
            {items.map((zone) => (
              <tr key={zone.id}>
                <th scope="row">{zone.id}</th>
                <td>{zone.name}</td>
                <td>
                  {/* <button
                    onClick={() => {
                      ToEditItem(zone);
                    }}
                    className="btn btn-primary"
                  >
                    I pagrd
                  </button> */}

                  <button
                    onClick={() => setData(zone)}
                    className="btn btn-warning"
                  >
                    Redaguoti
                  </button>

                  <button
                    onClick={() => removeZoneHandler(zone.id)}
                    className="btn btn-danger"
                  >
                    Trinti
                  </button>
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
      <div>Pavadinimas: {location.state.warehouseId}</div>
      {show ? (
        <button
          onClick={getItems(location.state.id, location.state.warehouseId)}
          className="btn btn-dark btn-lg w-100"
        >
          Užkrauti sandėlio zonas
        </button>
      ) : (
        <p></p>
      )}
      <div>{items.length > 0 && renderItemsTable()}</div>
      <div>
        {(() => {
          if (items.length == 0) {
            return (
              <div>
                Zonoje daiktų nėra{" "}
                <button className="btn btn-dark" onClick={navigateToCreate}>
                  Pridėti daiktą
                </button>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}

export default CertainZone;
