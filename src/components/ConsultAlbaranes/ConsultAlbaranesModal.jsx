import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { customStyles } from '../../helpers/styleModal';
import { ConsultAlbaranesBodyTable } from './ConsultAlbaranesModalTable';

import { OpenSearchModalInventory } from '../../actions/inventory';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';

import { 
    CleanAlbaranActualConsultAlbaranes, 
    CleanInventarioActualConsultAlbaranes, 
    openModalConsultAlbaranes, 
    setCantidadInventoryActualConsultAlbaranes, 
    setDescuentoInventoryActualConsultAlbaranes, 
    setOpenModalSearchInventoryConsultAlbaranes,
    setTotalInventoryActualConsultAlbaranes,
    setautoFocusCantidadConsultAlbaranes,
    setautoFocusDescConsultAlbaranes,
    startAddLineAlbaranConsultAlbaranes
} from '../../actions/consultAlbaranesAction';

Modal.setAppElement('#root');

export const ConsultAlbaranesModal = (props) => {

    const dispatch = useDispatch();
    const { 
        openModalAgregarLinea, 
        albaranActual, 
        inventoryActual 
    } = useSelector( state => state.consultAlbaranes );

    const {
        id,
        idQvet,
        cliente,
        mascota,
        fecha,
        listaLineas
    } = albaranActual;

    const {
        codigo,
        descripcion,
        cantidad,
        precioUnit,
        precioSinIVA,
        iva,
        descuento,
        total
    } = inventoryActual;

    const columns = [
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
        {
            Header: "Precio Unit",
            accessor: "precioVenta",
        },
        {
            Header: "IVA",
            accessor: "iva",
        },
        {
            Header: "Desc",
            accessor: "descuento",
        },
        {
            Header: "Total",
            accessor: "total",
        },
        {
            Header: "",
            accessor: "icon",
            Cell: () => (
                <MdDeleteForever />
            ),

        },
    ];

    const handleChangeCantidadConsultAlbaranes = ({ target }) => {
        // Se cambia la cantidad
        dispatch( setCantidadInventoryActualConsultAlbaranes(target.value) );
        
        //Se cambia el total
        let precio = parseFloat(precioSinIVA) * parseFloat(target.value);
        let montoImpuesto = precio * (parseFloat(iva) / 100);
        const total = precio + montoImpuesto;

        dispatch( setTotalInventoryActualConsultAlbaranes(total) );
    };

    const handleChangeDescuentoConsultAlbaranes = ({ target }) => {
        // Se cambia la cantidad
        dispatch( setDescuentoInventoryActualConsultAlbaranes(target.value) );

        //Se cambia el total
        let precio = parseFloat(precioUnit) * parseFloat(cantidad);
        let resulDescuento = precio * (parseFloat(target.value) / 100);
        let precioDescuento = precio - resulDescuento;
        let montoImpuesto = precioDescuento * (parseFloat(iva) / 100);
        const total = precioDescuento + montoImpuesto;

        dispatch( setTotalInventoryActualConsultAlbaranes(total) );
    };

    const handleSearchProductConsultAlbaran = (e) => {
        dispatch( OpenSearchModalInventory() );
        dispatch( setOpenModalSearchInventoryConsultAlbaranes( true ) );
    }

    const handleClickDownCantidad = (e) => {
        if (e.key === 'Enter') {
            // Cambiar el foco del input
            dispatch( setautoFocusCantidadConsultAlbaranes( false ) );
            dispatch( setautoFocusDescConsultAlbaranes( true ) );
        }
    }

    const handleAddline = (e) => {

        e.preventDefault();

        if( codigo === '' && descripcion === '' && precioUnit === '' && iva === '' && total === '' ) return;

        const newLine = {
            descripcion,
            cantidad,
            iva,
            descuento,
            precioVenta: precioUnit,
            total
        }
        
        const existAlbaran = listaLineas.find( line => 
            line.descripcion === descripcion 
            && line.cantidad === cantidad
            && line.iva === iva
            && line.descuento === descuento
            && line.precioVenta === precioUnit
            && line.total === total
        );
        
        if(existAlbaran === undefined) {
            dispatch( startAddLineAlbaranConsultAlbaranes( id, idQvet, newLine ) );
        } else {
            
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `El producto ${descripcion} ya esta agregado con la misma cantidad y descuento.`
            });

            dispatch( CleanInventarioActualConsultAlbaranes() );

        }

    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(openModalConsultAlbaranes( false ));
    
        //Clean el state de albaran actual
        dispatch( CleanAlbaranActualConsultAlbaranes() );

    }

    return (
        <Modal
                isOpen={ openModalAgregarLinea }
                onRequestClose={ closeModal }
                style={ customStyles }
                closeTimeoutMS={ 200 }
                className={'modal_getAlbaran'}
                overlayClassName={'modal-fondo'}
        >
            <div className='modal_consultAlbaranes-main'>

                <div className='modal_consultAlbaranes-title'>
                    <p id='lblTitleConsultAlbaranesModal'>Albaran</p>
                    <p id='lblCloseConsultAlbaranesModal' onClick={ closeModal }>X</p>
                </div>

                <div className='modal_consultAlbaranes-inputs'>

                    <div className='modal_consultAlbaranes-inputs-firstLine'>
                        
                        <div className='modal_consultAlbaranes-inputs-firstLine-cliente'>
                            
                            <div className='modal_consultAlbaranes-inputs-firstLine-cliente-title'>
                                <p id='lblClienteConsultaAlbaranesModal'>Cliente</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-firstLine-cliente-input'>
                                <input 
                                    id='txtClienteConsultaAlbaranesModal'
                                    type="text"
                                    name='cliente' 
                                    disabled={ true }
                                    value={ cliente }
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-firstLine-mascota'>
                            
                            <div className='modal_consultAlbaranes-inputs-firstLine-mascota-title'>
                                <p id='lblMascotaConsultaAlbaranesModal'>Mascota</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-firstLine-mascota-input'>
                                <input 
                                    id='txtMascotaConsultaAlbaranesModal'
                                    type="text"
                                    name='mascota' 
                                    disabled={ true }
                                    value={ mascota }
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-firstLine-fecha'>

                            <div className='modal_consultAlbaranes-inputs-firstLine-fecha-title'>
                                <p id='lblFechaConsultaAlbaranesModal'>Fecha</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-firstLine-fecha-input'>
                                <input 
                                    id='txtFechaConsultaAlbaranesModal'
                                    type="text"
                                    name='fecha' 
                                    disabled={ true }
                                    value={ fecha }
                                />
                            </div>

                        </div>

                    </div>

                    <div className='modal_consultAlbaranes-inputs-secondLine'>
                        
                        <div className='modal_consultAlbaranes-inputs-secondLine-codigo'>

                            <div className='modal_consultAlbaranes-inputs-secondLine-codigo-textbox'>

                                <div className='modal_consultAlbaranes-inputs-secondLine-codigo-title'>
                                    <p id='lblCodigoConsultaAlbaranesModal'>Codigo</p>
                                </div>

                                <div className='modal_consultAlbaranes-inputs-secondLine-codigo-input'>
                                    <input 
                                        id='txtCodigoConsultaAlbaranesModal'
                                        type="text"
                                        name='codigo' 
                                        ref={props.inputRefCodigo}
                                        disabled={ true }
                                        value={ codigo }
                                    />
                                </div>

                            </div>
                            
                            <div className='modal_consultAlbaranes-inputs-secondLine-codigo-icon'>
                                <FaSearch id='btnSearchProductConsultAlbaranes' onClick={ handleSearchProductConsultAlbaran }/>
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-secondLine-cantidad'>
                            
                            <div className='modal_consultAlbaranes-inputs-secondLine-cantidad-title'>
                                <p id='lblCantidadConsultaAlbaranesModal'>Cantidad</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-secondLine-cantidad-input'>
                                <input 
                                    id='txtCantidadConsultaAlbaranesModal'
                                    type="text"
                                    name='cantidad' 
                                    ref={props.inputRefCantidad}
                                    value={ cantidad }
                                    onChange={e => handleChangeCantidadConsultAlbaranes(e)}
                                    onKeyDown={e => handleClickDownCantidad(e)}
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-secondLine-precio'>
                            
                            <div className='modal_consultAlbaranes-inputs-secondLine-precio-title'>
                                <p id='lblPrecioConsultaAlbaranesModal'>Precio</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-secondLine-precio-input'>
                                <input 
                                    id='txtPrecioConsultaAlbaranesModal'
                                    type="text"
                                    name='precioUnit' 
                                    disabled={ true }
                                    value={ precioUnit }
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-secondLine-descuento'>
                            
                            <div className='modal_consultAlbaranes-inputs-secondLine-descuento-title'>
                                <p id='lblDescuentoConsultaAlbaranesModal'>Descuento</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-secondLine-descuento-input'>
                                <input 
                                    id='txtDescuentoConsultaAlbaranesModal'
                                    type="text"
                                    name='descuento' 
                                    ref={props.inputRefDescuento}
                                    value={ descuento }
                                    onChange={e => handleChangeDescuentoConsultAlbaranes(e)}
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-secondLine-IVA'>
                            
                            <div className='modal_consultAlbaranes-inputs-secondLine-IVA-title'>
                                <p id='lblIVAConsultaAlbaranesModal'>IVA</p>
                            </div>

                            <div className='modal_consultAlbaranes-inputs-secondLine-IVA-input'>
                                <input 
                                    id='txtIVAConsultaAlbaranesModal'
                                    type="text"
                                    name='iva' 
                                    disabled={ true }
                                    value={ iva }
                                />
                            </div>

                        </div>

                        <div className='modal_consultAlbaranes-inputs-secondLine-btn'>
                            <button id='btnAgregarLineaConsultAlbaranesModal' onClick={handleAddline}> Agregar Linea </button>
                        </div>

                    </div>

                </div>

                <div className='modal_consultAlbaranes-table'>
                    <ConsultAlbaranesBodyTable columns={ columns } data={ listaLineas }/>
                </div>

                <div className='modal_consultAlbaranes-footer'>
                    
                    <div className='modal_consultAlbaranes-footer-input'>
                        
                        <div className='modal_consultAlbaranes-footer-input-label'>
                            <p id='lblTotalAlbaranConsultaAlbaranesModal'>Total Albaran</p>
                        </div>

                        <div className='modal_consultAlbaranes-footer-input-campo'>
                            <input 
                                id='txtTotalAlbaranConsultaAlbaranesModal'
                                disabled={ true } 
                                value={ albaranActual.total }
                            />
                        </div>

                    </div>

                    <div className='modal_consultAlbaranes-footer-btn'>
                        
                        <div className='modal_consultAlbaranes-footer-btn-aceptar'>
                            <button id='btnAceptarModal' onClick={ closeModal }>Aceptar</button>
                        </div>

                        {/* <div className='modal_consultAlbaranes-footer-btn-cancelar'>
                            <button id='btnCancelarModal' onClick={ closeModal }>Cancelar</button>
                        </div> */}

                    </div>

                </div>

            </div>

            <InventorySearchModal />
        </Modal>
    )
}
