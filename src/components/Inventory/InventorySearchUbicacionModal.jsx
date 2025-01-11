import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetDefaultUbicacionFilterInventory } from "../../actions/inventory";
import { InventorySearchUbicacionTable } from "./InventorySeachUbicacionTable";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";

export const InventorySearchUbicacionModal = () => {
  const dispatch = useDispatch();
  const { subUbicacionesInventory } = useSelector(
    (state) => state.subUbicaciones
  );
  const { filterUbicacionInventory } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (subUbicacionesInventory != null) {
      dispatch(SetDefaultUbicacionFilterInventory(subUbicacionesInventory));
    }
  }, [subUbicacionesInventory]);

  const columns = [
    {
      Header: "Código",
      accessor: "codigo",
    },
    {
      Header: "Descripcion",
      accessor: "descripcion",
    },
  ];

  return (
    <>
      <div className="modal fade" id="modalUbicacion">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Ubicación <FaMapLocationDot className="iconSizeBtn" />
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
                  <InventorySearchUbicacionTable
                    columns={columns}
                    data={filterUbicacionInventory}
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
