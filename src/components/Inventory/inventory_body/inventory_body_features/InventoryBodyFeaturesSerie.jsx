import { useDispatch, useSelector } from "react-redux";
import { SetSerieInventory } from "../../../../actions/inventory";

export const InventoryBodyFeaturesSerie = () => {
  const dispatch = useDispatch();

  const { inventory, disableInputs } = useSelector((state) => state.inventory);

  const { serie } = inventory;

  const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
    dispatch(action(target.checked));
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">
          <div className="col-md-12 mb-3">
            <div className="form-check">
              <input
                id="checkNSerie"
                type="checkbox"
                name="serie"
                class="form-check-input checkP"
                disabled={disableInputs}
                checked={serie}
                onChange={(e) =>
                  handleInputChangeCheckBoxWithDispatch(e, SetSerieInventory)
                }
              />
              <h5 className="form-check-label" for="checkNSerie">
                Tiene Nº de serie
              </h5>
            </div>
            <hr />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-12 mb-3">
            <div className="table-responsive-lg tablaP">
              <table className="table table-hover text-lg-center">
                <thead className="table-dark">
                  <tr>
                    <th>Serie</th>
                    <th>Año</th>
                  </tr>
                </thead>
                <tbody className="table-white">
                  <tr>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
