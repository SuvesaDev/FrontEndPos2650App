import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import { IoIosCloseCircle } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";
import { FaSearch, FaArrowRight} from "react-icons/fa";

import { PurchaseOrderBodySearchModalTable } from "./PurchaseOrderBodySearchModalTable";
import { 
  SetCheckSearchByOrdenCompra, 
  SetCheckSearchByProveedorOrdenCompra, 
  SetIdProveedorSearchOrdenCompra, 
  SetTextSearchOrdenCompra
} from "../../actions/ordenCompraAction";

Modal.setAppElement("#root");

export const PurchaseOrderBodySearchModal = () => {

  const dispatch = useDispatch();

  const { proveedoresInventory } = useSelector((state) => state.proveedores);
  const { 
    checkSearchByProveedor, 
    checkSearchByOrdenCompra,
    searchOrdenCompra,
    idProveedorSearch
  } = useSelector((state) => state.ordenCompra);
  
  const columns = [
    {
      Header: "Numero Orden",
      accessor: "orden",
    },
    {
      Header: "Proveedor",
      accessor: "proveedor",
    },
    {
      Header: "Fecha",
      accessor: "fecha",
    },
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
      dispatch(action(target.value));
  };

  const handleInputChangeCheckProveedor = ( {target} ) => {
    dispatch( SetCheckSearchByProveedorOrdenCompra(target.checked) );
    dispatch( SetCheckSearchByOrdenCompra(false) );
  }

  const handleInputChangeCheckOrdenCompra = ( {target} ) => {
    dispatch( SetCheckSearchByOrdenCompra(target.checked) );
    dispatch( SetCheckSearchByProveedorOrdenCompra(false) );
  }

  const handleEnterSearchOrdenCompra = ( {target} ) => {
    dispatch( SetCheckSearchByOrdenCompra(target.checked) );
    dispatch( SetCheckSearchByProveedorOrdenCompra(false) );
  }

  return (
    <>
      <div className="modal fade" id="modalSearchOrdenCompra">

        <div className="modal-dialog modal-lg modal-dialog">

          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Orden Compra <FaTruckFast className="iconSizeBtn" />
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                
                <div className={ (checkSearchByOrdenCompra) ? 'col-md-12 mb-3' : 'col-md-12 mb-3 d-none' }>
                  <div className="input-group">

                    <span className="input-group-text">
                      <FaSearch className="iconSize" />
                    </span>

                    <input
                      type="text"
                      id="BuscaV"
                      value={searchOrdenCompra}
                      className="form-control"
                      placeholder="Buscar...."
                      onChange={(e) =>
                        handleInputChangeWithDispatch(e, SetTextSearchOrdenCompra)
                      }
                    />

                  </div>
                </div>

                <div className={ (checkSearchByProveedor) ? 'col-md-12 mb-3' : 'col-md-12 mb-3 d-none' }>
                  <div className="input-group">

                    <span className="input-group-text">
                      <FaSearch className="iconSize" />
                    </span>

                    <select
                      name="idProveedorSearch"
                      value={idProveedorSearch}
                      className="form-select"
                      onChange={(e) =>
                        handleInputChangeWithDispatch(e, SetIdProveedorSearchOrdenCompra)
                      }
                    >
                      <option value="" selected disabled hidden>
                        {" "}
                        Seleccione...{" "}
                      </option>
                      {proveedoresInventory != null ? (
                        proveedoresInventory.map((tipo) => {
                          return (
                            <option value={tipo.codigo}> {tipo.descripcion} </option>
                          );
                        })
                      ) : (
                        <option value="">No se cargaron los proveedores</option>
                      )}
                    </select>

                  </div>
                </div>

                <div className="row mb-2 text-center">

                    <div className='col-md-3 mb-2'>
                        <h5>Búsqueda en <FaArrowRight className='iconSize' /></h5>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="form-check">
                            <input
                                class="form-check-input checkP"
                                id="checkProveedorSearchInventory"
                                type="checkbox"
                                name="checkSearchByProveedor"
                                checked={checkSearchByProveedor}
                                onChange={e => handleInputChangeCheckProveedor(e)}
                            />
                            <h5 className="form-check-label" for="checkProveedorSearchInventory">Proveedor</h5>
                        </div>
                        <hr />
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="form-check">
                            <input
                                class="form-check-input checkP"
                                id="checkOrdenCompraSearchInventory"
                                type="checkbox"
                                name="checkSearchByOrdenCompra"
                                checked={checkSearchByOrdenCompra}
                                onChange={e => handleInputChangeCheckOrdenCompra(e)}
                            />
                            <h5 className="form-check-label" for="checkOrdenCompraSearchInventory">Orden de compra</h5>
                        </div>
                        <hr />
                    </div>

                </div>

                <div className="col-md-12">
                  <PurchaseOrderBodySearchModalTable
                    columns={columns}
                    data={[]}
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
