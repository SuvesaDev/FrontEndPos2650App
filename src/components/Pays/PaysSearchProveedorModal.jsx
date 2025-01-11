import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { PaysSearchProveedorTable } from './PaysSearchProveedorTable';
import { SetAllProveedoresFacturasDefaultPays, startGetAllBancosPays } from '../../actions/pays';
import { FaTruckFast } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';

export const PaysSearchProveedorModal = () => {

    const dispatch = useDispatch();

    const { proveedoresAllFacturas, proveedoresAllFacturasDefault } = useSelector(state => state.pays);


    useEffect(() => {
        if (proveedoresAllFacturas != null) {
            dispatch(SetAllProveedoresFacturasDefaultPays(proveedoresAllFacturas))
        }
    }, [proveedoresAllFacturas])

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
            <div className="modal fade" id="modalBuscarProveedoresD">
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
                                    <PaysSearchProveedorTable columns={columns}
                                        data={proveedoresAllFacturas.length ? proveedoresAllFacturas : proveedoresAllFacturasDefault} />
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