import React from "react";
import {
  FaMagnifyingGlass,
  FaTrashCan,
  FaKey,
  FaUserCheck,
  FaCalendar,
  FaQrcode,
}  from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export const QRBody = () => {
  const dispatch = useDispatch();
  const { inputDate } = useSelector((state) => state.stateInventoryQR);

  return (
    <>
      <div className="row mb-3 text-md-center">
        <div className="row">
          <div className="col-md-4">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FaMagnifyingGlass className="iconSize" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FaCalendar className="iconSize" />
              </span>
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <button className="btn btn-primary">
            Escanear Código <FaQrcode className="iconSizeBtn" />
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive-lg text-center">
            <table className="table mt-4 table-dark table-hover table-bordered text-md-center">
              <thead className="table-dark">
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Cantidad Sistema</th>
                  <th>Diferencia</th>
                  <th>Usuario</th>
                </tr>
              </thead>
              <tbody className="table-secondary">
                <tr>
                  <td>
                    <input type="checkbox" defaultChecked />{" "}
                  </td>
                  <td>Cater</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                  <td>1</td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />{" "}
                  </td>
                  <td>Pastillas</td>
                  <td>1</td>
                  <td>2</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group mb-2">
              <button className="btn btn-primary">
                <FaMagnifyingGlass className="iconSizeBtn" />
              </button>
            </div>
            <div className="btn-group mb-2">
              <button className="btn btn-danger espacio">
                <FaTrashCan className="iconSizeBtn" />
              </button>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaKey className="iconSize" />
                </span>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Clave Interna"
                />
                <button className="btn btn-dark">
                  Validar <FaUserCheck className="iconSizeBtn" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
