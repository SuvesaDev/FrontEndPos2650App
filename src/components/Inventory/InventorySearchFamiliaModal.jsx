import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetDefaultFamiliasFilterInventory } from "../../actions/inventory";
import { InventorySearchFamiliaTable } from "./InventorySeachFamiliaTable";
import { IoIosCloseCircle } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";

export const InventorySearchFamiliaModal = () => {
  const dispatch = useDispatch();
  const { subFamiliasInventory } = useSelector((state) => state.subFamilias);
  const { filterFamiliasInventory } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (subFamiliasInventory != null) {
      dispatch(SetDefaultFamiliasFilterInventory(subFamiliasInventory));
    }
  }, [subFamiliasInventory]);

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
      <div className="modal fade" id="modalFamilia">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Familia <MdFamilyRestroom className="iconSizeBtn" />
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
                  <InventorySearchFamiliaTable
                    columns={columns}
                    data={filterFamiliasInventory}
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
