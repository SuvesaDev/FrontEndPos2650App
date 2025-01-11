import Modal from 'react-modal';

import { useEffect } from 'react';
import { customStyles } from '../../helpers/styleModal';
import { useSelector, useDispatch } from 'react-redux';

import { ProvidersSeachTable } from './ProvidersSeachTable';
import {
    SetActiveButtonNewProveedores,
    SetActiveButtonRemoveProveedores,
    SetActiveButtonSaveProveedores,
    SetActiveButtonSearchProveedores,
    SetDefaultStateSearchProveedores,
    SetDisableInputsProveedores,
    SetGetAllSearchProveedores,
    SetIsOpenModalSearchProveedores,
    SetIsProveedorDisableProveedores,
    SetIsProveedorEditProveedores,
    SetSearchProveedoresOriginalProveedores,
    SetValorFilterSearchProveedores
} from '../../actions/ProveedoresAction';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaTruckFast } from 'react-icons/fa6';


Modal.setAppElement('#root');

export const ProvidersSearchModal = () => {

    const dispatch = useDispatch();
    const {
        proveedoresSearch,
        isOpenModalSearchProveedor,
        valueFilterSearchProveedor
    } = useSelector(state => state.proveedores);

    useEffect(() => {

        if (valueFilterSearchProveedor === '' || valueFilterSearchProveedor === '*') {
            dispatch(SetDefaultStateSearchProveedores())
        } else {

            let regex = new RegExp(valueFilterSearchProveedor.toUpperCase());

            const newSearchProveedores = proveedoresSearch.filter(proveedor => regex.test(proveedor.descripcion.toUpperCase()));

            dispatch(SetGetAllSearchProveedores(newSearchProveedores));
        }

    }, [valueFilterSearchProveedor]);

    const columns = [
        {
            Header: "Código",
            accessor: "codigo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenModalSearchProveedores(false));

        // Se establece el listado original
        dispatch(SetSearchProveedoresOriginalProveedores());

        dispatch(SetIsProveedorEditProveedores(false));
        dispatch(SetIsProveedorDisableProveedores(false));

        dispatch(SetDisableInputsProveedores(true));

        dispatch(SetActiveButtonNewProveedores(true));
        dispatch(SetActiveButtonSearchProveedores(true));
        dispatch(SetActiveButtonSaveProveedores(false));
        dispatch(SetActiveButtonRemoveProveedores(false));


    }

    return (

        <>
            <div className="modal fade" id="modalBuscaProveedor">
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
                                    <ProvidersSeachTable columns={columns} data={proveedoresSearch} />
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

            <Modal
                isOpen={isOpenModalSearchProveedor}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className={'modal-searchProveedor'}
                overlayClassName={'modal-fondo'}
            >
                <form className='modal_searchProveedor-main'>

                    <div className='modal_searchProveedor-title'>
                        <p id='lblTitleSearchProveedor'>Buscar Proveedor</p>
                        <p id='lblCloseSearchProveedor' onClick={closeModal}>X</p>
                    </div>

                    <div className='modal_searchProveedor-inputs'>

                        <div className='modal_searchProveedor-inputs-title'>
                            <p id='lblDescripcionProveedorModal'>Descripción</p>
                        </div>

                        <div className='modal_searchProveedor-inputs-input'>

                            <div className='modal_searchProveedor-inputs-input-input'>
                                <input
                                    type='text'
                                    id='txtDescripcionModalSearchProveedorInventory'
                                    name="valueFilterSearchProveedor"
                                    value={valueFilterSearchProveedor}
                                    onChange={e => handleInputChangeWithDispatch(e, SetValorFilterSearchProveedores)}
                                />
                            </div>

                        </div>

                    </div>

                    <div className='modal_searchProveedor-table'>
                    <ProvidersSeachTable columns={columns} data={proveedoresSearch} />
                    </div>

                </form>
            </Modal>
        </>

    )
}
