import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { FaBoxesPacking } from "react-icons/fa6";
import { InventorySearchPresentacionTable } from "./InventorySeachPresentacionesTable";
import { SetDefaultPresentacionFilterInventory } from "../../actions/inventory";
import { useEffect } from "react";

export const InventorySearchPresentacionModal = () => {
  const dispatch = useDispatch();
  const { presentacionesInventory } = useSelector(
    (state) => state.presentaciones
  );
  const { filterPresentacionInventory } = useSelector(
    (state) => state.inventory
  );

  useEffect(() => {
    if (presentacionesInventory != null) {
      dispatch(SetDefaultPresentacionFilterInventory(presentacionesInventory));
    }
  }, [presentacionesInventory]);

  const columns = [
    {
      Header: "Código",
      accessor: "codPres",
    },
    {
      Header: "Descripcion",
      accessor: "presentaciones",
    },
  ];

  return (
    <>
      <div className="modal fade" id="modalPresentacion">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Presentación <FaBoxesPacking className="iconSizeBtn" />
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
                  <InventorySearchPresentacionTable
                    columns={columns}
                    data={filterPresentacionInventory}
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
