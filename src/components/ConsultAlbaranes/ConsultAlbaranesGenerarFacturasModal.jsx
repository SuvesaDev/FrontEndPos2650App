import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';
import { ConsultAlbaranesGenerarFacturasModalTable } from './ConsultAlbaranesGenerarFacturasModalTable';

import {
    SetCedulaCustomerConsultAlbaranes,
    SetNombreCustomerConsultAlbaranes,
    SetOpenModalAddCustomerConsultAlbaranes,
    SetOpenModalGenerarFacturasConsultAlbaranes,
    startSaveAlbaranes,
} from '../../actions/consultAlbaranesAction';
import { FaMoneyBill, FaReceipt, FaSquareCheck, FaUser } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';

Modal.setAppElement('#root');

export const ConsultAlbaranesGenerarFacturasModal = () => {

    const dispatch = useDispatch();

    const {
        openModalGenerarFacturas,
        albaranesFacturar,
        facturasPendiente,
    } = useSelector(state => state.consultAlbaranes);

    const columns = [
        {
            Header: "Cliente",
            accessor: "cliente",
        },
        {
            Header: "Caja",
            accessor: "caja"
        },
        {
            Header: "Tipo",
            accessor: "tipo"
        },
        {
            Header: "Empresa",
            accessor: "empresa"
        },
        {
            Header: "Bodega",
            accessor: "bodega"
        },
        {
            Header: "Total",
            accessor: "total",
        }
    ];

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetOpenModalGenerarFacturasConsultAlbaranes(false));

        //Clean el state de albaran actual
        // dispatch( CleanAlbaranActualConsultAlbaranes() );

    }

    const handleClickAddCustomer = (e) => {

        const existCliente = albaranesFacturar[0].existeUsuario;
        const nombreCliente = albaranesFacturar[0].cliente;
        const cedulaCliente = albaranesFacturar[0].cedula;

        if (!existCliente) {

            dispatch(SetNombreCustomerConsultAlbaranes(nombreCliente));
            dispatch(SetCedulaCustomerConsultAlbaranes(cedulaCliente));

        } else {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `El cliente ${nombreCliente} ya existe.`
            });
        }
    }

    const handleClickGenerarFacturas = (e) => {

        const nombreCliente = albaranesFacturar[0].cliente;
        const cedulaCliente = albaranesFacturar[0].cedula;
        const existCliente = albaranesFacturar[0].existeUsuario;

        if (existCliente) {

            const albaranes = albaranesFacturar.map(albaran => {
                return {
                    id: parseInt(albaran.id),
                    tipo: parseInt(albaran.tipo),
                    bodega: parseInt(albaran.bodega),
                    idEmpresa: parseInt(albaran.idEmpresa),
                    idSucursal: parseInt(albaran.idSucursal),
                    codCliente: parseInt(albaran.codCliente),
                    codMoneda: parseInt(albaran.codMoneda),
                    numCaja: parseInt(albaran.numCaja)
                }
            });

            dispatch(startSaveAlbaranes(albaranes));

        } else {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `El cliente ${nombreCliente} no esta registrado. Por favor registrarlo.`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Registrar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {
                    dispatch(SetOpenModalAddCustomerConsultAlbaranes(true));
                    dispatch(SetNombreCustomerConsultAlbaranes(nombreCliente));
                    dispatch(SetCedulaCustomerConsultAlbaranes(cedulaCliente));
                }

            });
        }

    }

    return (

        <>
            <div className="modal fade" id="modalGenerarFacturasGN">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                A continuación, se generarán las siguientes Facturas <FaReceipt  className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-12">
                                <ConsultAlbaranesGenerarFacturasModalTable columns={columns} data={facturasPendiente} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleClickAddCustomer}
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#modalCrearClienteGN"
                                style={{ zIndex: "1051" }} 
                            >
                                Crear Cliente <FaUser className='iconSize' />
                            </button>

                            <button
                                  className="btn btn-success"
                                onClick={handleClickGenerarFacturas}
                            >
                                Generar Facturas <FaSquareCheck className='iconSize' />
                            </button>

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
