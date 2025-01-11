import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTruckFast } from "react-icons/fa6";
import { MdNumbers } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import {
  SetCodigoIntQVETInventory,
  SetCodigoProInventory,
  SetDescripcionProInventory,
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesInformacionPost = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);

  const { idCodigoInternoQvet, codigoProveedor, descripcionProveedor } =
    inventory;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Código QVET</h5>
            <div className="input-group">
              <span className="input-group-text">
                <MdNumbers className="iconSize" />
              </span>
              <input
                type="number"
                name="idCodigoInternoQvet"
                className="form-control"
                placeholder="Código Interno QVET"
                disabled={disableInputs}
                value={idCodigoInternoQvet}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetCodigoIntQVETInventory)
                }
              />
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <h5>Código Proveedor</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaTruckFast className="iconSize" />
              </span>
              <input
                type="number"
                name="codigoProveedor"
                className="form-control"
                placeholder="Código del Proveedor"
                disabled={disableInputs}
                value={codigoProveedor}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetCodigoProInventory)
                }
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-12 mb-2">
            <h5>Descripción Proveedor</h5>
            <div className="input-group">
              <span className="input-group-text">
                <TbNotes className="iconSize" />
              </span>
              <input
                type="text"
                name="descripcionProveedor"
                className="form-control"
                placeholder="Descripción del Proveedor"
                disabled={disableInputs}
                value={descripcionProveedor}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetDescripcionProInventory)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
