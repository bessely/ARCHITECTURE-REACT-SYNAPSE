import React from 'react';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";

/**
 * LE DASHBOARD
 * @returns JSX
 */
function Dashboard() {
  return (
    <>
      <NavBar title="Dashboard"/>
      <Container >
        <div className="card d-flex flex-row justify-content-start m-3 py-4" style={{ backgroundColor: "rgb(224, 230, 237)" }} >

        </div>
        <div className="d-flex flex-wrap justify-content-between">
        </div>
      </Container>
    </>
  )
}

export default Dashboard