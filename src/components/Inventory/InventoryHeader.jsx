import { useDispatch, useSelector } from "react-redux";
import {
  SetInhabilitadoInventory,
  SetSoloConExistenciaInventory,
} from "../../actions/inventory";
import { ImSortNumbericDesc } from "react-icons/im";
export const InventoryHeader = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);

  const { codigo, soloConExistencia, inhabilitado } = inventory;

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  return (
    <> 
        <div className="row mb-0">
            <div className="col-md-4 mb-1">
                <div className="input-group">
                    <span className="input-group-text">
                        <ImSortNumbericDesc className="iconSize" />
                    </span>
                        <input
                        name="codigo"
                        value={codigo}
                        disabled={true}
                        readOnly
                        className="form-control"
                        placeholder="Código Inventario"
                    />
                </div>
            </div>
            <div className="col-md-4 mb-1">
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="checkExistencia"
                        name="existencia"
                        class="form-check-input checkP"
                        checked={soloConExistencia}
                        disabled={disableInputs}
                        onChange={(e) =>
                            handleInputChangeCheckBoxWithDispatch(
                            e,
                            SetSoloConExistenciaInventory
                            )
                        }
                    />
                    <h5 className="form-check-label inputTextP" for="checkExistencia">Validar Existencia</h5>
                </div>
                <hr />
            </div>
            <div className="col-md-4 mb-1">
                <div className="form-check">
                    <input

                        type="checkbox"
                        id="checkinhabilitadoInv"
                        name="inhabilitadoInventory"
                        class="form-check-input checkP"
                        checked={inhabilitado}
                        disabled={disableInputs}
                        onChange={(e) =>
                        handleInputChangeCheckBoxWithDispatch(
                            e,
                            SetInhabilitadoInventory
                        )
                        }
                    />
                    <h5 className="form-check-label inputTextP" for="checkinhabilitadoInv">Inhabilitado</h5>
                </div>
                <hr />
            </div>
        </div>

    </>
  );
};
