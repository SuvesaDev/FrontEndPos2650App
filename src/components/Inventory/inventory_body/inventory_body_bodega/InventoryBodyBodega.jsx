import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { FaBoxesStacked } from "react-icons/fa6";
import {
  SetConsignacionInventory,
  SetId_BodegaInventory,
  SetOpenModalSearchBodegaInventory,
} from "../../../../actions/inventory";

export const InventoryBodyBodega = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);
  const { bodegasInventory } = useSelector((state) => state.bodegas);

  const { consignacion, id_Bodega, existenciaBodega } = inventory;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  const handleOpenSearchBodega = (e) => {
    e.preventDefault();

    dispatch(SetOpenModalSearchBodegaInventory(true));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card text-center">
          <div className="card-header bg-secondary text-white">
            <h5>Datos de la Bodega</h5>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <h5>Bodega</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaBoxesStacked className="iconSize" />
                  </span>
                  <select
                    name="id_Bodega"
                    className="form-select"
                    disabled={disableInputs}
                    value={id_Bodega}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(e, SetId_BodegaInventory)
                    }
                  >
                    <option value="" selected disabled hidden>
                      {" "}
                      Seleccione...{" "}
                    </option>
                    {bodegasInventory != null ? (
                      bodegasInventory.map((tipo) => {
                        return (
                          <option value={tipo.idBodega}>
                            {" "}
                            {tipo.nombreBodega}{" "}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">No se cargaron las bodegas</option>
                    )}
                  </select>
                  <button
                    className={
                      disableInputs
                        ? "btn btn-primary disabled"
                        : "btn btn-primary"
                    }
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalBodega"
                  >
                    <FaSearch className="iconSize" />
                  </button>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <h5>Existencia</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <GoNumber className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="existencia"
                    disabled={true}
                    value={existenciaBodega}
                    className="form-control"
                    placeholder="Existencia en Bodega"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12 mb-2">
                <div className="form-check">
                  <input
                    id="checkConsignacion"
                    type="checkbox"
                    name="consignacion"
                    disabled={disableInputs}
                    checked={consignacion}
                    class="form-check-input checkP"
                    onChange={(e) =>
                      handleInputChangeCheckBoxWithDispatch(
                        e,
                        SetConsignacionInventory
                      )
                    }
                  />
                  <h5 className="form-check-label" for="checkConsignacion">
                    Consignación
                  </h5>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
