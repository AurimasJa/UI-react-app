import React, { useState } from "react";
import AuthService from "./services/auth.service";
import { Navigate } from "react-router-dom";
import backend from "../Components/backend/backend.tsx";
import { useNavigate } from "react-router-dom";

function Sandeliai() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const removeContactHandler = async (id) => {
    await backend.delete(
      `${"https://myapiwarehouse.azurewebsites.net/api/warehouses/" + id}`
    );
    const newWarehouses = warehouses.filter((warehouse) => {
      return warehouse.id !== id;
    });

    setWarehouses(newWarehouses);
  };
  const navigateToCreate = () => {
    navigate("/createwarehouse");
  };
  const setData = (warehouse) => {
    // let { id, name, description, address } = warehouse;
    localStorage.setItem("Id", warehouse.id);
    localStorage.setItem("Nameas", warehouse.name);
    localStorage.setItem("Description", warehouse.description);
    localStorage.setItem("Addressas", warehouse.address);
    navigate("/updatewarehouse");
  };
  const toComponentB = (warehouse) => {
    navigate("/certainwarehouse", {
      state: {
        id: warehouse.id,
        name: warehouse.name,
        address: warehouse.address,
        description: warehouse.description,
      },
    });
  };
  function getWarehouses() {
    const url = "https://myapiwarehouse.azurewebsites.net/api/warehouses/";
    console.log(currentUser);
    backend.get(url).then((resp) => {
      //store data loaded
      setWarehouses(resp.data);
      console.log(resp.data);
    });
    setShow(!show);
  }
  return (
    <div className="sandeliai">
      <div className="container">
        {/* row min-vh-100 */}
        <div className="">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div>{show ? getWarehouses() : <p></p>}</div>

            {warehouses.length > 0 && renderWarehouseTable()}
          </div>
        </div>
      </div>
    </div>
  );

  function renderWarehouseTable() {
    return (
      <div className="table-resposive mt-5">
        {currentUser.roles.includes("Admin") ? (
          <button className="btn btn-dark" onClick={navigateToCreate}>
            Pridėti sandėlį
          </button>
        ) : (
          <p></p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pavadinimas</th>
              <th scope="col">Aprašymas</th>
              <th scope="col">Adresas</th>
              <th scope="col">Kūrimo data</th>
              <th scope="col">Komanda</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <th scope="row">{warehouse.id}</th>
                <td>{warehouse.name}</td>
                <td>{warehouse.description}</td>
                <td>{warehouse.address}</td>
                <td>{warehouse.creationDate}</td>
                <td>
                  <button
                    onClick={() => {
                      toComponentB(warehouse);
                    }}
                    className="btn btn-primary"
                  >
                    Zonos
                  </button>
                  {currentUser.roles.includes("Admin") ? (
                    <button
                      onClick={() => setData(warehouse)}
                      className="btn btn-warning"
                    >
                      Redaguoti
                    </button>
                  ) : (
                    <p></p>
                  )}
                  {currentUser.roles.includes("Admin") ? (
                    <button
                      onClick={() => removeContactHandler(warehouse.id)}
                      className="btn btn-danger"
                      style={{ marginTop: 10 }}
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
}
export default Sandeliai;
