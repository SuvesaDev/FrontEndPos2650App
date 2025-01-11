import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetDefaultBodegaFilterInventory } from "../../actions/inventory";
import { InventorySearchBodegaTable } from "./InventorySeachBodegaTable";
import { IoIosCloseCircle } from "react-icons/io";
import { FaBoxesStacked } from "react-icons/fa6";

export const InventorySearchBodegaModal = () => {
  const dispatch = useDispatch();
  const { bodegasInventory } = useSelector((state) => state.bodegas);
  const { filterBodegaInventory, valorfiltroBodega, isOpenModalSearchBodega } =
    useSelector((state) => state.inventory);

  useEffect(() => {
    if (bodegasInventory != null) {
      dispatch(SetDefaultBodegaFilterInventory(bodegasInventory));
    }
  }, [bodegasInventory]);

  const columns = [
    {
      Header: "Código",
      accessor: "idBodega",
    },
    {
      Header: "Descripcion",
      accessor: "nombreBodega",
    },
  ];

  return (
    <>
      <div className="modal fade" id="modalBodega">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Bodega <FaBoxesStacked className="iconSizeBtn" />
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <InventorySearchBodegaTable
                    columns={columns}
                    data={filterBodegaInventory}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cerrar <IoIosCloseCircle className="iconSize" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
