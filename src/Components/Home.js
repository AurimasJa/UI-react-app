import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 style={{ marginTop: "15px", textAlign: "center" }}>Apie mus</h2>
            <hr />
            <p>
              Pagrindinis projekto tikslas - leisti naudotojam užsiregistruoti,
              gavus leidimą laikyti savo sandėlį, jį kontroliuoti. Pridėti
              prekes, pridėti zonas, kategorijas, suskirstyti prekes, ištrinti
              ir pnš.
            </p>
            <br />
            <p>
              Kiekvienas užsiregistravęs naudotojas bus darbuotojas, kuris galės
              kontroliuoti savo sandėlio prekes. Sandėlį prideda{" "}
              <u>administratorius</u>. Vadovą registruoją{" "}
              <u>administratorius</u>.
            </p>
            <br />

            <p>
              Administratorius galės registruoti sandėlius bei vadovų paskyras.
              Vadovam leis pridėti prekes į jų valdomą sandėlį. Vadovas galės
              pridėti sandėlyje zonas, kuriose bus laikomos prekės. Darbuotojai
              gali peržiūrėti zonoje esančių prekių sąrašą, perkelti prekes į
              kitą zoną esančia sandėlyje.
            </p>
          </div>
          <div
            className="d-flex"
            style={{ margin: "auto", height: "400px", width: "25px" }}
          >
            <div className="vr"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
