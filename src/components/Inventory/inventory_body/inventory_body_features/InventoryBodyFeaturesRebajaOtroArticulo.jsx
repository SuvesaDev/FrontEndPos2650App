import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { TbNotes, TbNumber } from "react-icons/tb";
import { GoNumber } from "react-icons/go";
import {
  IsOpenSearchModalRebaja,
  OpenSearchModalInventory,
  SetCantidadDescargaInventory,
  SetCantidadPresentOtroInventory,
  SetCod_PresentOtroInventory,
  SetCodigoDescargaInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesRebajaOtroArticulo = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs, descripcionRebajaOtro } = useSelector(
    (state) => state.inventory
  );

  const {
    codigoDescarga,
    cod_PresentOtro,
    cantidadPresentOtro,
    cantidadDescarga,
  } = inventory;

  const handleSearchCodigoRebaja = (e) => {
    e.preventDefault();

    dispatch(IsOpenSearchModalRebaja(true));
    dispatch(OpenSearchModalInventory());
  };

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">

          <div className="col-md-6 mb-2">
            <h5>Código</h5>
            <div className="input-group">
              <span className="input-group-text">
                <GoNumber className="iconSize" />
              </span>
              <input
                type="text"
                name="CodigoProductoRebaja"
                className="form-control"
                placeholder="Código del Producto"
                disabled={disableInputs}
                value={codigoDescarga}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetCodigoDescargaInventory)
                }
              />
              <button
                type="button"
                className={
                  disableInputs ? "btn btn-primary disabled" : "btn btn-primary"
                }
                onClick={handleSearchCodigoRebaja}
                data-bs-toggle="modal"
                data-bs-target="#modalBuscarArticulo"
              >
                <FaSearch className="iconSize" />
              </button>
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <h5>Código Presentación</h5>
            <div className="input-group">
              <span className="input-group-text">
                <GoNumber className="iconSize" />
              </span>
              <input
                type="text"
                className="form-control"
                name="cod_PresentOtro"
                placeholder="Código de la Presentación"
                disabled={disableInputs}
                value={cod_PresentOtro}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetCod_PresentOtroInventory)
                }
              />
            </div>
          </div>

        </div>

        <div className="row mb-2">
          <div className="col-md-12 mb-3">
            <h5>Descripción</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNotes className="iconSize" />
              </span>
              <input
                type="text"
                name="DescripcionProductoRebaja"
                className="form-control"
                placeholder="Descripción del Producto"
                disabled={true}
                value={descripcionRebajaOtro}
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Cantidad Presentación</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber className="iconSize" />
              </span>
              <input
                type="text"
                name="cantidadPresentOtro"
                className="form-control"
                placeholder="Cantidad de la Presentación"
                disabled={disableInputs}
                value={cantidadPresentOtro}
                onChange={(e) =>
                  handleInputChangeWithDispatch(
                    e,
                    SetCantidadPresentOtroInventory
                  )
                }
              />
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <h5>Cantidad Descarga</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber className="iconSize" />
              </span>
              <input
                type="text"
                className="form-control"
                name="cantidadDescarga"
                placeholder="Cantidad de la Descarga"
                disabled={disableInputs}
                value={cantidadDescarga}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetCantidadDescargaInventory)
                }
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
