
import React from "react";
import { QRBody } from "./QRBody";
import { FaTools } from "react-icons/fa";

export const QRPage = () => {
  return (
    <>
      <div className="container">
        <br />
        <div className="card">
          <div className="card-body">
            <center>
              <h2>Próximamente... <FaTools className="iconSize" /></h2>
            </center>
          </div>
        </div>
        {/* <QRBody /> */}
      </div>
    </>
  );
}

