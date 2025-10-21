import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { FaIdCard, FaMagnifyingGlass, FaUser } from 'react-icons/fa6';
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

import { ConsignmentSearchTable } from './ConsignmentSearchTable';

import { 
    SetCedulaBuscarConsignment, 
    SetNombreBuscarConsignment, 
    SetNumeroBuscarConsignment,
    startSearchConsignment
} from '../../actions/ConsignmentAction';

Modal.setAppElement('#root');

export const ConsignmentSearchModal = () => {

    const dispatch = useDispatch();

    const { buscarConsignacion, listaConsignaciones } = useSelector(state => state.consignment);
    const { 
        cedula,
        nombre,
        numero
     } = buscarConsignacion;

    const columns = [
        {
            Header: "Cédula",
            accessor: "cedulaCliente",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Número",
            accessor: "numero",
        },
        {
            Header: "Plazo",
            accessor: "plazo",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if ( cedula == '' && nombre == '' && numero == '' ) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se debe ingresar un valor para realizar la busqueda.',
            });
        } else {

            const busqueda = {
                cedulaCliente : (cedula == '') ? null : cedula,
                nombreCliente: (nombre == '') ? null : nombre,
                numero : (numero == '') ? null : numero
            }
            dispatch( startSearchConsignment( busqueda ) );
        }
    }

    return (
        <>
            <div className="modal fade" id="modalBuscarConsignacion" tabindex="-1">

                <div className="modal-dialog modal-lg modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Consignacion <FaCartPlus className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSearch}>

                                <div className="row mb-2 text-center">

                                    <div className="col-md-3 mb-3">
                                        <h5>Cédula</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaIdCard className="iconSize" />
                                            </span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Cédula del Cliente"
                                                name="cedula"
                                                value={cedula}
                                                onChange={(e) => handleInputChangeWithDispatch(e, SetCedulaBuscarConsignment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <h5>Nombre</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaUser className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                placeholder="Nombre del Cliente"
                                                name="nombre"
                                                autoFocus
                                                type='text'
                                                value={nombre}
                                                onChange={(e) => handleInputChangeWithDispatch(e, SetNombreBuscarConsignment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <h5>Número Consignacion</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <MdOutlineNumbers className="iconSize" />
                                            </span>
                                            <input
                                                className="form-control"
                                                name="numero"
                                                type='number'
                                                autoFocus
                                                value={numero}
                                                onChange={(e) => handleInputChangeWithDispatch(e, SetNumeroBuscarConsignment)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <hr />
                                        <button type='submit' className='btn btn-primary'
                                        >
                                            Buscar <FaMagnifyingGlass className='iconSize' />
                                        </button>
                                    </div>

                                </div>

                                <div className='row mb-3'>
                                    <hr />
                                    <div className="col-md-12 mb-3">
                                        <ConsignmentSearchTable columns={columns} data={listaConsignaciones} />
                                    </div>

                                </div>
                            </form>

                        </div>

                    </div>

                </div>
            </div>


        </>

    )
}
