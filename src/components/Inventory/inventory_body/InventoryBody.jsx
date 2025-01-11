import { InventoryBodyBodega } from "./inventory_body_bodega/InventoryBodyBodega";
import { InventoryBodyExistencias } from "./inventory_body_existencias/InventoryBodyExistencias";
import { InventoryBodyFeatures } from "./inventory_body_features/InventoryBodyFeatures";
import { InventoryBodyPrecioVenta } from "./inventory_body_precio/InventoryBodyPrecioVenta";

export const InventoryBody = () => {
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
          <div className="col-lg-6 mb-2">
            <InventoryBodyBodega />{" "}
          </div>
          <div className="col-lg-6 mb-2">
            <InventoryBodyExistencias />
          </div>
        </div>
      </div>
    </>
  );
};
