import Modal from "react-modal";

import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";

import { InventorySearchCodPadreTable } from "./InventorySeachCodPadreTable";

Modal.setAppElement("#root");

export const InventorySearchCodPadreModal = () => {

  const {
    allProductsPadres
  } = useSelector((state) => state.inventory);


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
      <div className="modal fade" id="modalCodPadre">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Codigo Padre <FaTruckFast className="iconSizeBtn" />
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
                  <InventorySearchCodPadreTable
                    columns={columns}
                    data={allProductsPadres}
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
