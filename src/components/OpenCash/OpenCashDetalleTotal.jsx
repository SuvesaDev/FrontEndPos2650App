import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { OpenCashDetalleTotalTable } from "./OpenCashDetalleTotalTable";

import { SetObservacionesOpenCash } from "../../actions/OpenCashAction";
import { TbNotes } from "react-icons/tb";

export const OpenCashDetalleTotal = () => {
  const dispatch = useDispatch();

  const { caja, isOpenCashEdit } = useSelector((state) => state.OpenCash);

  const { tope } = caja;
  const { Observaciones } = caja.encabezado;

  const columnasTope = [
    {
      Header: "Moneda",
      accessor: "MonedaNombre",
    },
    {
      Header: "Monto",
      accessor: "Monto_Tope",
    },
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-6 mb-2">
          <div className="card text-md-center">
            <div className="card-header bg-primary cartaHMod2">
              <h5>Detalle Total / Tope</h5>
            </div>
            <div className="card-body">
              <OpenCashDetalleTotalTable columns={columnasTope} data={tope} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-2">
          <div className="card text-md-center">
            <div className="card-header bg-primary cartaHMod2">
              <h5>Observaciones</h5>
            </div>
            <div className="card-body">
              <div className="input-group">
                <span className="input-group-text">
                  <TbNotes className="iconSize" />
                </span>
                <textarea
                  name="observacionesOpenCash"
                  rows="5"
                  cols="50"
                  class="form-control"
                  value={Observaciones}
                  disabled={isOpenCashEdit}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(e, SetObservacionesOpenCash)
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
