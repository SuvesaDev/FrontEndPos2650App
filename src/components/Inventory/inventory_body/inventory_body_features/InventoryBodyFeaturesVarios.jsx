import { useDispatch, useSelector } from "react-redux";
import {
  SetMax_DescuentoInventory,
  SetPromoCONInventory,
  SetPromoCREInventory,
  SetPromo_ActivaInventory,
  SetPromo_FinalizaInventory,
  SetPromo_InicioInventory,
  SetRecetaInventory,
  SetServicioInventory,
} from "../../../../actions/inventory";
import { FaPercent } from "react-icons/fa6";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
export const InventoryBodyFeaturesVarios = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);

  const {
    promo_Activa,
    promoCON,
    promoCRE,
    promo_Inicio,
    promo_Finaliza,
    max_Descuento,
    receta,
    servicio,
  } = inventory;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Máximo Descuento</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaPercent className="iconSize" />
              </span>
              <input
                type="text"
                name="max_Descuento"
                className="form-control"
                placeholder="Descuento Máximo"
                disabled={disableInputs}
                value={max_Descuento}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetMax_DescuentoInventory)
                }
              />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <h5>Precio</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaMoneyBillWave className="iconSize" />
              </span>
              <input
                type="number"
                name="precioInventory"
                className="form-control"
                placeholder="0"
                disabled={disableInputs}
              />
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <h5>Fecha Desde</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaCalendarAlt className="iconSize" />
              </span>
              <input
                type="date"
                name="promo_Inicio"
                className="form-control"
                disabled={disableInputs}
                value={promo_Inicio}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetPromo_InicioInventory)
                }
              />
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <h5>Fecha Hasta</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaCalendarAlt className="iconSize" />
              </span>
              <input
                type="date"
                name="promo_Finaliza"
                className="form-control"
                disabled={disableInputs}
                value={promo_Finaliza}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetPromo_FinalizaInventory)
                }
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-3 mb-2">
            <div className="form-check">
              <input
                id="checkPromo"
                type="checkbox"
                name="promo_Activa"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={promo_Activa}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(
                    e,
                    SetPromo_ActivaInventory
                  )
                }
              />
              <h5 className="form-check-label" for="checkPromo">
                Promo Activa
              </h5>
            </div>
            <hr />
          </div>

          <div className="col-md-3 mb-2">
            <div className="form-check">
              <input
                id="checkservicio"
                type="checkbox"
                name="servicio"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={servicio}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetServicioInventory)
                }
              />
              <h5 className="form-check-label" for="checkservicio">
                Servicio
              </h5>
            </div>
            <hr />
          </div>

          <div className="col-md-3 mb-2">
            <div className="form-check">
              <input
                id="checkcon"
                type="checkbox"
                name="promoCON"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={promoCON}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetPromoCONInventory)
                }
              />
              <h5 className="form-check-label" for="checkcon">
                CON
              </h5>
            </div>
            <hr />
          </div>

          <div className="col-md-3 mb-2">
            <div className="form-check">
              <input
                id="checkcre"
                type="checkbox"
                name="promoCRE"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={promoCRE}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetPromoCREInventory)
                }
              />
              <h5 className="form-check-label" for="checkcre">
                CRE
              </h5>
            </div>
            <hr />
          </div>

          <div className="col-md-12 mb-2">
            <div className="form-check">
              <input
                id="checkreceta"
                type="checkbox"
                name="receta"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={receta}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetRecetaInventory)
                }
              />
              <h5 className="form-check-label textRed" for="checkPromo">
                Solo con receta
              </h5>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
