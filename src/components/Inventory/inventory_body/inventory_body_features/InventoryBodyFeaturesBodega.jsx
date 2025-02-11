import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetAddDetalleArticuloBodega } from "../../../../actions/inventory";
import { InventoryBodyFeaturesBodegaTabla } from "./InventoryBodyFeaturesBodegaTabla";
import { FaBoxesStacked } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
export const InventoryBodyFeaturesBodega = () => {
  const dispatch = useDispatch();

  const { inventory, detalleArticuloBodega, detalle } = useSelector(
    (state) => state.inventory
  );

  const { bodegasInventory } = useSelector((state) => state.bodegas);

  const { consignacion, id_Bodega, existenciaBodega } = inventory;

  const columns = [
    {
      Header: "Bodega",
      accessor: "descripcion",
    },
    {
      Header: "Existencias",
      accessor: "existencia",
    },
  ];

  const handleClickDownCantidad = () => {
    dispatch(SetAddDetalleArticuloBodega(detalleArticuloBodega));
  };

  return (
    <>
      <div className="container-fluid mt-2">

        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <h5>Bodega</h5>
            <div className="input-group">
              <span className="input-group-text">
                <FaBoxesStacked className="iconSize" />
              </span>
              <select
                name="id_Bodega"
                className="form-select"
                value={id_Bodega}
                onChange={(e) =>
                  handleInputChangeWithDispatch(e, SetId_BodegaInventory)
                }
              >
                <option value="" selected disabled hidden>
                  {" "}
                  Seleccione...{" "}
                </option>
                {bodegasInventory != null ? (
                  bodegasInventory.map((tipo) => {
                    return (
                      <option value={tipo.idBodega}>
                        {" "}
                        {tipo.nombreBodega}{" "}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No se cargaron las bodegas</option>
                )}
              </select>
              <button
                className="btn btn-success"
                onClick={handleClickDownCantidad}
              >
                Agregar <IoAddCircle className="iconSize" />
              </button>
            </div>
          </div>
        </div>
        
        <hr />
        <div className="row mb-2">
          <div className="col-md-12 mb-2">
            <InventoryBodyFeaturesBodegaTabla
              columns={columns}
              data={detalle}
            />
          </div>
        </div>

      </div>
    </>
  );
};
