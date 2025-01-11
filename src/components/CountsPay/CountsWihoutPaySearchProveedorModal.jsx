import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTruckFast } from 'react-icons/fa6';
import { IoIosCloseCircle } from "react-icons/io";
import { CountsWihoutPaySearchProveedorModalTable } from './CountsWihoutPaySearchProveedorModalTable';
import { SetProveedoresDefaultWihoutPay } from '../../actions/countswihoutpay';


export const CountsWihoutPaySearchProveedorModal = () => {

    const dispatch = useDispatch();
    const {
        proveedores,
        proveedoresDefault
    } = useSelector(state => state.wihoutpay);

    useEffect(() => {
        if (proveedores != null) {
            dispatch(SetProveedoresDefaultWihoutPay(proveedores))
        }
    }, [proveedores])

    const columns = [
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        }
    ];

    return (
        <>
            <div className="modal fade" id="modalBuscarProveedoresCW">
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
                                    <CountsWihoutPaySearchProveedorModalTable
                                        columns={columns}
                                        data={proveedores.length ? proveedores : proveedoresDefault}
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

    )
}
