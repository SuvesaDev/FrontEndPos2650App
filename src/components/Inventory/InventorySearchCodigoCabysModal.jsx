import { useSelector } from "react-redux";
import { MdNumbers } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { InventorySearchCodigoCabysTable } from "./InventorySeachCodigoCabysTable";

export const InventorySearchCodigoCabysModal = () => {
  const { filterCodigoCabysInventory } = useSelector(
    (state) => state.inventory
  );

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
      <div className="modal fade" id="modalCabys">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Código Cabys <MdNumbers className="iconSizeBtn" />
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
                  <InventorySearchCodigoCabysTable
                    columns={columns}
                    data={filterCodigoCabysInventory}
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
