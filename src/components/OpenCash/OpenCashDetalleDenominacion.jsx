import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { OpenCashDetalleDenominacionTable } from "./OpenCashDetalleDenominacionTable";
import { FaColonSign } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io";
export const OpenCashDetalleDenominacion = () => {
  const { caja, totalColones, totalDolares } = useSelector(
    (state) => state.OpenCash
  );
  const { denominaciones } = caja;

  const columnasDenominaciones = [
    {
      Header: "Moneda",
      accessor: "Moneda",
    },
    {
      Header: "Tipo",
      accessor: "Tipo",
    },
    {
      Header: "Denominacion",
      accessor: "Monto",
      Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
    },
    {
      Header: "Cantidad",
      accessor: "Cantidad",
    },
    {
      Header: "Total",
      accessor: "Total",
      Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
    },
  ];

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-12 mb-2">
          <div className="card text-md-center">
            <div className="card-header bg-primary cartaHMod2">
              <h5>Detalle Denominación</h5>
            </div>
            <div className="card-body">
              <OpenCashDetalleDenominacionTable
                columns={columnasDenominaciones}
                data={denominaciones}
              />
            </div>
            <div className="card-footer inline-containerTotals">
              <div className="col-md-2">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaColonSign className="iconSize" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Total en Colones"
                    name="totalColones"
                    disabled={true}
                    type="text"
                    value={
                      new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(totalColones)
                    }
                  />
                </div>
              </div>

              <div className="col-md-2 espacio">
                <div className="input-group">
                  <span className="input-group-text">
                    <IoLogoUsd className="iconSize" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Total en Dolares"
                    name="totalDolares"
                    type="text"
                    disabled={true}
                    value={
                      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDolares)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
