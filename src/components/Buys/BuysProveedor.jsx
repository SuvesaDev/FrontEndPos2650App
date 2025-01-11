import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";
import { FaIdCard, FaSearch, FaUserPlus } from 'react-icons/fa';

import {
    SetCedulaProveedorCompras,
    SetOpenModalSearchProveedorCompras,
    SetProveedorCompras,
    SetcedulaProveedorAddCompras,
    isOpenModalAddProveedorCompras
} from "../../actions/ComprasAction";
import { FaBuildingUn } from 'react-icons/fa6';

export const BuysProveedor = () => {

    const dispatch = useDispatch();
    const {
        compras,
        disableInputs,
        filterProveedorInventory
    } = useSelector(state => state.compras);

    const { Proveedor, CedulaProveedor } = compras.encabezado;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownProveedor = async (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (CedulaProveedor == '') {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Escriba una cedula de un proveedor para buscar.'
                });

                return;
            }

            const proveedor = filterProveedorInventory.find(pro => pro.cedula === CedulaProveedor);

            if (proveedor !== undefined) {

                // Se estable el nombre del proveedor
                dispatch(SetProveedorCompras(proveedor.descripcion));

            } else {

                // Se resetea el nombre del proveedor
                dispatch(SetProveedorCompras(""));

                //Mostrar un mensaje de confirmacion
                Swal.fire({
                    title: `¿El proveedor con la Cédula ${CedulaProveedor} NO EXISTE desea agregarlo?`,
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Guardar',
                    denyButtonText: `Cancelar`,
                }).then(async (result) => {

                    if (result.isConfirmed) {

                        // Se establece la cedula del proveedor
                        dispatch(SetcedulaProveedorAddCompras(CedulaProveedor));

                        // Se levanta el modal
                        dispatch(isOpenModalAddProveedorCompras(true));
                    }

                });
            }

        }

    }

    const handleOpenBuscarProveedor = () => {
        if (!disableInputs) {
            dispatch(SetOpenModalSearchProveedorCompras(true));
        }
    }

    const handleOpenAddProveedor = () => {
        if (!disableInputs) {
            dispatch(isOpenModalAddProveedorCompras(true));
        }
    }

    return (
        <>
            <div className="row mb-2 text-center" >
                <div className="col-md-6 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type='text'
                            disabled={disableInputs}
                            value={CedulaProveedor}
                            className='form-control'
                            placeholder='Cédula del Proveedor'
                            onKeyDown={handleOnKeyDownProveedor}
                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaProveedorCompras)}
                        />
                        <button
                            className={(disableInputs) ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalProveedorCompra"
                            onClick={handleOpenBuscarProveedor} 
                        >
                            <FaSearch className="iconSize" />
                        </button>

                        <button
                            className={(disableInputs) ? 'btn btn-dark disabled' : 'btn btn-dark'}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCrearProveedor"
                        >
                            <FaUserPlus className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuildingUn className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Nombre del Proveedor'
                            value={Proveedor}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}
