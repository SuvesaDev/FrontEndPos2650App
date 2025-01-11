import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCostoInventory,
  SetFletesInventory,
  SetId_ImpuestoInventory,
  SetIVentaInventory,
  SetMagInventory,
  SetMonedaCostoInventory,
  SetOtrosCargosInventory,
  SetPrecioBaseInventory,
} from "../../../../actions/inventory";
import { FaCoins } from "react-icons/fa6";
import { IoCashOutline } from "react-icons/io5";
import { FaTruckLoading } from "react-icons/fa";
import { BsCashCoin, BsCash, BsCashStack } from "react-icons/bs";
import { LuPackagePlus } from "react-icons/lu";

export const InventoryBodyFeaturesUltimoCosto = () => {
  const msgNoHayCompras = "No hay compras ingresadas.";
  const msgCompras = "Ya pasaron más de 30 días de la última compra.";

  const dispatch = useDispatch();

  const { inventory, disableInputs, isNewInventory } = useSelector(
    (state) => state.inventory
  );
  const { monedasInventory } = useSelector((state) => state.monedas);
  const { impuestosInventory } = useSelector((state) => state.impuestos);

  const {
    monedaCosto,
    iVenta,
    id_Impuesto,
    precioBase,
    fletes,
    otrosCargos,
    costo,
    costoReal,
    mag,
  } = inventory;

  useEffect(() => {
    var ResulCosto = null;

    if (precioBase != null && !isNaN(precioBase)) {
      ResulCosto = precioBase;
    }

    if (fletes != null && !isNaN(fletes)) {
      ResulCosto = +ResulCosto + +fletes;
    }

    if (otrosCargos != null && !isNaN(otrosCargos)) {
      ResulCosto = +ResulCosto + +otrosCargos;
    }

    dispatch(SetCostoInventory(ResulCosto));
  }, [dispatch, precioBase, fletes, otrosCargos]);

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeWithDispatchCostos = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeWithDispatchImpuestos = ({ target }) => {
    dispatch(SetId_ImpuestoInventory(target.value));

    switch (target.value) {
      case "1":
        dispatch(SetIVentaInventory(13));
        break;

      case "2":
        dispatch(SetIVentaInventory(1));
        break;

      case "3":
        dispatch(SetIVentaInventory(2));
        break;

      case "4":
        dispatch(SetIVentaInventory(4));
        break;

      case "5":
        dispatch(SetIVentaInventory(0));
        break;

      case "6":
        dispatch(SetIVentaInventory(4));
        break;

      case "7":
        dispatch(SetIVentaInventory(8));
        break;

      case "8":
        dispatch(SetIVentaInventory(13));
        break;

      default:
        break;
    }
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Moneda</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaCoins className="iconSize" />
              </span>
              <select
                name="monedaCosto"
                className="form-select"
                disabled={disableInputs}
                value={monedaCosto}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetMonedaCostoInventory)
                }
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {monedasInventory != null ? (
                  monedasInventory.map((tipo) => {
                    return (
                      <option value={tipo.codMoneda}>
                        {" "}
                        {tipo.monedaNombre}{" "}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron las monedas</option>
                )}
              </select>
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <h5>Impuesto</h5>
            <div className="input-group">
              <span className="input-group-text">
                <IoCashOutline className="iconSize" />
              </span>
              <select
                name="tipoImpuesto"
                className="form-select"
                disabled={disableInputs}
                value={id_Impuesto}
                onChange={(e) => handleInputChangeWithDispatchImpuestos(e)}
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {impuestosInventory != null ? (
                  impuestosInventory.map((tipo) => {
                    return (
                      <option value={tipo.idImpuesto}>
                        {" "}
                        {tipo.impuesto1}{" "}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron los impuestos</option>
                )}
              </select>
              <input
                className="form-control"
                name="iVenta"
                disabled={true}
                value={iVenta}
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 mb-2">
            <h5>Base</h5>
            <div className="input-group">
              <span className="input-group-text">
                <BsCashStack className="iconSize" />
              </span>
              <input
                type="text"
                name="precioBase"
                className="form-control"
                placeholder="Precio Base"
                disabled={disableInputs}
                value={precioBase}
                onChange={(e) =>
                  handleInputChangeWithDispatchCostos(e, SetPrecioBaseInventory)
                }
              />
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <h5>Fletes</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaTruckLoading className="iconSize" />
              </span>
              <input
                type="text"
                name="fletes"
                className="form-control"
                placeholder="Fletes"
                disabled={disableInputs}
                value={fletes}
                onChange={(e) =>
                  handleInputChangeWithDispatchCostos(e, SetFletesInventory)
                }
              />
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <h5>Otro Cargo</h5>
            <div className="input-group">
              <span className="input-group-text">
                <LuPackagePlus className="iconSize" />
              </span>
              <input
                type="text"
                name="otrosCargos"
                className="form-control"
                placeholder="Otro Cargo"
                disabled={disableInputs}
                value={otrosCargos}
                onChange={(e) =>
                  handleInputChangeWithDispatchCostos(
                    e,
                    SetOtrosCargosInventory
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Costo</h5>
            <div className="input-group">
              <span className="input-group-text">
                <BsCashCoin className="iconSize" />
              </span>
              <input
                type="text"
                name="costo"
                className="form-control"
                placeholder="0"
                disabled={true}
                value={costo}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <h5>Costo Real</h5>
            <div className="input-group">
              <span className="input-group-text">
                <BsCash className="iconSize" />
              </span>
              <input
                name="costoReal"
                className="form-control"
                placeholder="Costo Real"
                disabled={true}
                value={costoReal}
              />
            </div>
          </div>
        </div>

        <br />
        <div className="row mb-0">
          <div className="col-md-12 mb-2">
            <div className="form-check">
              <input
                id="checkRegistrado"
                type="checkbox"
                name="mag"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={mag}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetMagInventory)
                }
              />
              <h5 className="form-check-label" for="checkRegistrado">
                ¿Registrado en el MAG?
              </h5>
            </div>
            <hr />
          </div>

          <div className="col-md-6 mb-2">
            {!disableInputs && (
              <label id="labelDiasMensajeInventory_Body-featuresUC">
                {isNewInventory ? msgNoHayCompras : msgCompras}
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
