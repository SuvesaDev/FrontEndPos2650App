import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SetMaximaInventory,
  SetMinimaInventory,
  SetPuntoMedioInventory,
  SetStockInventory,
  startSetStockInventory,
} from "../../../../actions/inventory";
import { TbSortDescendingNumbers } from "react-icons/tb";

export const InventoryBodyExistencias = () => {

  const dispatch = useDispatch();
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { inventory, disableInputs, isDisableInputStock, lastStockUpdated } = useSelector((state) => state.inventory);
  const { minima, puntoMedio, maxima, existencia, stock} = inventory;

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedQuery(stock);
    }, 1000); // Espera 500ms después del último cambio

    return () => clearTimeout(handler); // Limpia el timeout si el usuario sigue escribiendo

  }, [stock]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchData(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchData = async (cantidad) => {
    
    if( cantidad == lastStockUpdated ) {
      return;
    }

    dispatch( startSetStockInventory( cantidad, inventory.codigo, 0 ) );

  };

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

            <div className={( costaPets ) ? 'row mb-2 d-none' : 'row mb-2'}>
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

              <div className={(costaPets) ? 'col-md-6 mb-2 d-none' : 'col-md-6 mb-2'}>
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
                    type="number"
                    className="form-control"
                    placeholder="Existencia Actual"
                    disabled={( costaPets ) ? isDisableInputStock : true}
                    onChange={(e) => {
                      if(costaPets) {
                        handleInputChangeWithDispatch(e, SetStockInventory)
                      }
                    }}
                    value={ (costaPets) ? stock : existencia}
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
