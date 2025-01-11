import Modal from "react-modal";

import { useEffect } from "react";
import { customStyles } from "../../helpers/styleModal";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import {
  CleanValorFiltroProveedorInventory,
  SetDefaultProveedorFilterInventory,
  SetDefaultUbicacionFilterInventory,
  SetOpenModalSearchProveedorInventory,
  SetSearchProveedorFilterInventory,
  SetValorFiltroProveedorInventory,
} from "../../actions/inventory";

import { InventorySearchProveedorTable } from "./InventorySeachProveedorTable";
import {
  OpenSearchModalProveedores,
  SetActiveButtonNewProveedores,
  SetActiveButtonRemoveProveedores,
  SetActiveButtonSaveProveedores,
  SetActiveButtonSearchProveedores,
  SetDisableInputsProveedores,
  SetIsProveedorDisableProveedores,
  SetIsProveedorEditProveedores,
} from "../../actions/ProveedoresAction";

Modal.setAppElement("#root");

export const InventorySearchProveedorModal = () => {
  const dispatch = useDispatch();
  const { proveedoresInventory, proveedoresSearch, openSearchInventory } =
    useSelector((state) => state.proveedores);
  const {
    filterProveedorInventory,
    valorfiltroProveedor,
    isOpenModalSearchProveedor,
  } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (proveedoresInventory != null && !openSearchInventory) {
      dispatch(SetDefaultProveedorFilterInventory(proveedoresInventory));
    } else if (proveedoresSearch.length !== 0 && openSearchInventory) {
      dispatch(SetDefaultProveedorFilterInventory(proveedoresSearch));
    }
  }, [proveedoresInventory, proveedoresSearch, openSearchInventory]);

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
      <div className="modal fade" id="modalProveedor">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Proveedor <FaTruckFast className="iconSizeBtn" />
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
                  <InventorySearchProveedorTable
                    columns={columns}
                    data={filterProveedorInventory}
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
