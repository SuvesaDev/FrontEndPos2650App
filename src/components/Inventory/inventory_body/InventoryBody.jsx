import { useSelector } from "react-redux";

import { InventoryBodyBodega } from "./inventory_body_bodega/InventoryBodyBodega";
import { InventoryBodyExistencias } from "./inventory_body_existencias/InventoryBodyExistencias";
import { InventoryBodyFeatures } from "./inventory_body_features/InventoryBodyFeatures";
import { InventoryBodyPrecioVenta } from "./inventory_body_precio/InventoryBodyPrecioVenta";
import { InventoryBodyFormulaLotes } from "./inventory_body_formulaLotes/InventoryBodyFormulaLotes";

export const InventoryBody = () => {

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  const { idTipoArticuloSelected } = useSelector((state) => state.inventory);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 mb-2">
            <InventoryBodyFeatures />
          </div>
          <div className="col-lg-6 mb-2">
            <InventoryBodyPrecioVenta />
          </div>
        </div>

        <div className="row">

          <div className={ (!costaPets) ? 'col-lg-6 mb-2' : 'col-lg-6 mb-2 d-none'}>
            <InventoryBodyBodega />{" "}
          </div>

          <div className={ (costaPets && idTipoArticuloSelected == 3 ) ? 'col-lg-6 mb-2' : 'col-lg-6 mb-2 d-none'}>
            <InventoryBodyFormulaLotes />
          </div>

          <div className="col-lg-6 mb-2">
            <InventoryBodyExistencias />
          </div>

        </div>
      </div>
    </>
  );
};
