import { useDispatch, useSelector } from "react-redux";
import {
  SetMaximaInventory,
  SetMinimaInventory,
  SetPuntoMedioInventory,
} from "../../../../actions/inventory";
import { TbSortDescendingNumbers } from "react-icons/tb";

export const InventoryBodyExistencias = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);

  const { minima, puntoMedio, maxima, existencia } = inventory;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card text-center">

          <div className="card-header bg-secondary text-white">
            <h5>Datos de Existencias</h5>
          </div>

          <div className="card-body">

            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <h5>Mínima</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbSortDescendingNumbers className="iconSize" />
                  </span>
                  <input
                    type="text"
                    name="minima"
                    className="form-control"
                    placeholder="Existencia Mínima"
                    disabled={disableInputs}
                    value={minima}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(e, SetMinimaInventory)
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <h5>Media</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbSortDescendingNumbers className="iconSize" />
                  </span>
                  <input
                    name="puntoMedio"
                    type="text"
                    className="form-control"
                    placeholder="Existencia Media"
                    disabled={disableInputs}
                    value={puntoMedio}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(e, SetPuntoMedioInventory)
                    }
                  />
                </div>
              </div>
            </div>
            
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <h5>Máxima</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbSortDescendingNumbers className="iconSize" />
                  </span>
                  <input
                    name="maxima"
                    type="text"
                    className="form-control"
                    placeholder="Existencia Máxima"
                    disabled={disableInputs}
                    value={maxima}
                    onChange={(e) =>
                      handleInputChangeWithDispatch(e, SetMaximaInventory)
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 mb-2">
                <h5>Actual</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <TbSortDescendingNumbers className="iconSize" />
                  </span>
                  <input
                    name="actual"
                    type="text"
                    className="form-control"
                    placeholder="Existencia Actual"
                    disabled={true}
                    value={existencia}
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
