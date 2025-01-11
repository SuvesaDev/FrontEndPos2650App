import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import { customStyles } from '../../helpers/styleModal';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import { BuysPrecioImportarFacturaModalTable } from './BuysPrecioImportarFacturaModalTable';

import { 
    CleanPreciosImportarFacturaCompras, 
    CleanStatePricesSellPreciosImportarFacturaCompras, 
    SetChangePrecioIVPreciosImportarFacturaCompras, 
    SetChangePrecioPreciosImportarFacturaCompras, 
    SetChangeUtilidadPreciosImportarFacturaCompras, 
    SetEditPricesSellPreciosImportarFacturaCompras, 
    SetIsEditPriceSellPreciosImportarFacturaCompras, 
    SetIsOpenModalPrecioImportarFacturaCompras, 
    SetNuevosCostosArticuloImportarFacturaCompras, 
    SetOnePrecioPreciosImportarFacturaCompras, 
    SetPrecioIVPreciosImportarFacturaCompras, 
    SetPrecioPreciosImportarFacturaCompras, 
    SetRemovePricesSellPreciosImportarFacturaCompras, 
    SetTipoPreciosImportarFacturaCompras, 
    SetUtilidadPreciosImportarFacturaCompras
} from '../../actions/ComprasAction';

Modal.setAppElement('#root');

export const BuysPrecioImportarFacturaModal = () => {

    const dispatch = useDispatch();
    const { 
        isOpenModalPrecioImportarFactura,
        preciosImportarFactura
    } = useSelector(state => state.compras);

    const { 
        nuevoCosto,
        impuestoNeto,
        priceSell,
        selectedpriceSell,
        pricesSellBuys,
        hasChangeUtilidadPriceSell,
        hasChangePrecioPriceSell,
        hasChangePrecioIVPriceSell,
        isEditPriceSell,
        codigoProSeleted
    } = preciosImportarFactura;

    const { 
        tipo, 
        utilidad, 
        precio, 
        precioIV
    } = priceSell;

    const columns = [
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Utilidad",
            accessor: "utilidad",
        },
        {
            Header: "Precio",
            accessor: "precio",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
            
        },
        {
            Header: "Precio IV.%",
            accessor: "precioIV",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

     // UseEffect Utilidad, Precio y PrecioIV
     useEffect(() => {
        
        if(hasChangeUtilidadPriceSell && !hasChangePrecioPriceSell && !hasChangePrecioIVPriceSell){
            //Utilidad
            let base = parseFloat(nuevoCosto);
            let impuesto = parseFloat(impuestoNeto);
            let util = parseFloat(utilidad);

            if(!isNaN(base) && !isNaN(impuesto) && !isNaN(util)){

                const precio = base * (util / 100) + base;
                const precioIV = impuesto + precio;

                dispatch( SetPrecioPreciosImportarFacturaCompras(precio) );
                dispatch( SetPrecioIVPreciosImportarFacturaCompras(precioIV) );

            }
        } else if (hasChangePrecioPriceSell && !hasChangeUtilidadPriceSell && !hasChangePrecioIVPriceSell) {
            //Precio
            let base = parseFloat(nuevoCosto);
            let impuesto = parseFloat(impuestoNeto);
            let pre = parseFloat(precio);

            if(!isNaN(base) && !isNaN(impuesto) && !isNaN(pre)){

                const utilidad = ((pre / base) -1) * 100;
                const precioIV = pre + impuesto;

                dispatch( SetUtilidadPreciosImportarFacturaCompras(parseInt(utilidad)) );
                dispatch( SetPrecioIVPreciosImportarFacturaCompras(precioIV) );

            }
        } else if (hasChangePrecioIVPriceSell && !hasChangeUtilidadPriceSell && !hasChangePrecioPriceSell) {
            //Precio IV
            let base = parseFloat(precioBase);
            let impuesto = parseFloat(impuestoNeto);
            let preIV = parseFloat(precioIV);

            if(!isNaN(base) && !isNaN(impuesto) && !isNaN(preIV)){

                const precio = preIV / impuesto;
                const utilidad = ((precio / base) -1) * 100;

                dispatch( SetUtilidadPreciosImportarFacturaCompras(parseInt(utilidad)) );
                dispatch( SetPrecioPreciosImportarFacturaCompras(precio) );

            }
        }

        
    }, [ utilidad, precio, precioIV]);
    
    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleSavePrecio = (e) => {

        e.preventDefault();

        if(utilidad === '' || precio === '' || precioIV === '') return;
        
        const existPrice = pricesSellBuys.find(value => value.tipo === tipo);

        if( existPrice === undefined){
            dispatch( SetOnePrecioPreciosImportarFacturaCompras( { tipo, utilidad, precio, precioIV }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: `No se puede ingresar un precio del mismo tipo ${tipo}`
            });
        }

        dispatch( CleanStatePricesSellPreciosImportarFacturaCompras() );

    }

    const handleEditPrecio = (e) => {

        e.preventDefault();

        if(utilidad === '' || precio === '' || precioIV === '') return;
        
        const existPrice = pricesSellBuys.find(value => value.tipo === selectedpriceSell.tipo);
        
        if( existPrice != undefined){

            const index = pricesSellBuys.findIndex(value => value.tipo === selectedpriceSell.tipo);

            dispatch( SetEditPricesSellPreciosImportarFacturaCompras( { index, tipo, utilidad, precio, precioIV }));
            
            dispatch( SetIsEditPriceSellPreciosImportarFacturaCompras( false ) );
            dispatch( CleanStatePricesSellPreciosImportarFacturaCompras() );
        }

    }

    const handleRemovePrecio = (e) => {
        
        e.preventDefault();
        
        if(isEditPriceSell) {

            dispatch( SetRemovePricesSellPreciosImportarFacturaCompras( selectedpriceSell.tipo ) );
            
            dispatch( SetIsEditPriceSellPreciosImportarFacturaCompras( false ) );
            dispatch( CleanStatePricesSellPreciosImportarFacturaCompras() );
        } 

    }

    const handleInputChangeUtilidadWithDispatch = ({ target }) => {

        dispatch( SetChangeUtilidadPreciosImportarFacturaCompras(true) );
        dispatch( SetChangePrecioPreciosImportarFacturaCompras(false) );
        dispatch( SetChangePrecioIVPreciosImportarFacturaCompras(false) );

        dispatch( SetUtilidadPreciosImportarFacturaCompras(target.value));

    };

    const handleInputChangePrecioWithDispatch = ({ target }) => {

        dispatch( SetChangeUtilidadPreciosImportarFacturaCompras(false) );
        dispatch( SetChangePrecioPreciosImportarFacturaCompras(true) );
        dispatch( SetChangePrecioIVPreciosImportarFacturaCompras(false) );

        dispatch( SetPrecioPreciosImportarFacturaCompras(target.value));

    };

    const handleInputChangePrecioIVWithDispatch = ({ target }) => {

        dispatch( SetChangeUtilidadPreciosImportarFacturaCompras(false) );
        dispatch( SetChangePrecioPreciosImportarFacturaCompras(false) );
        dispatch( SetChangePrecioIVPreciosImportarFacturaCompras(true) );

        dispatch( SetPrecioIVPreciosImportarFacturaCompras(target.value));

    };

    const handleSaveCostos = (e) => {

        e.preventDefault();

        if( pricesSellBuys.length > 0 ) {

            dispatch( SetNuevosCostosArticuloImportarFacturaCompras( {
                codigoPro: codigoProSeleted,
                costos: pricesSellBuys,
            }) );
            
            dispatch( CleanPreciosImportarFacturaCompras() );
            dispatch( SetIsOpenModalPrecioImportarFacturaCompras( false ) );
        }

    }

    const closeModal = () => {

        dispatch( SetIsOpenModalPrecioImportarFacturaCompras( false ) );
        dispatch( CleanPreciosImportarFacturaCompras() );
    }

    return (
        <Modal
            isOpen={ isOpenModalPrecioImportarFactura }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className={'modal-importarFacturaPrecio'}
            overlayClassName={'modal-fondo'}
        >           
            <div className='modal_precioImportarFactura-main'>

                <div className='modal_precioImportarFactura-title'>
                    <p id='lblTitlePrecioImportarFModal'>Precio de Venta Articulo</p>
                    <p id='lblClosePrecioImportarFModal' onClick={ closeModal }>X</p>
                </div>

                <div className='modal_precioImportarFactura-body'>
                    
                    <div className='modal_precioImportarFactura-body-title'>
                        
                        <div className='modal_precioImportarFactura-body-title-label'>
                            <p id='lblNuevoCostoModalPrecioImportarFactura'>Nuevo Costo: </p>
                        </div>

                        <div className='modal_precioImportarFactura-body-title-input'>
                            <input 
                                id="txtNuevoCostoModalPrecioImportarFactura" 
                                name="nuevoCosto"
                                disabled= { true }
                                value={ nuevoCosto }
                            />
                        </div>

                    </div>

                    <div className='modal_precioImportarFactura-body-inputs'>
                        
                        <div className='modal_precioImportarFactura-body-inputs-tipo'>
                            
                            <div className='modal_precioImportarFactura-body-inputs-tipo-label'>
                                <p id='lblTipoModalPrecioImportarFactura'>Tipo</p>
                            </div>

                            <div className='modal_precioImportarFactura-body-inputs-tipo-input'>
                                <select 
                                    id="cboTipoModalPrecioImportarFactura"
                                    name="tipo" 
                                    // disabled={ disableInputsP }
                                    value={ tipo }
                                    onChange={ e => handleInputChangeWithDispatch(e, SetTipoPreciosImportarFacturaCompras ) }
                                >
                                    <option value='A'>Tipo A</option>
                                    <option value='B'>Tipo B</option>
                                    <option value='C'>Tipo C</option>
                                    <option value='D'>Tipo D</option>
                                    <option value='P'>Tipo P</option>
                                </select>
                            </div>

                        </div>

                        <div className='modal_precioImportarFactura-body-inputs-utilidad'>
                            
                            <div className='modal_precioImportarFactura-body-inputs-utilidad-label'>
                                <p id='lblUtilidadModalPrecioImportarFactura'>Utilidad</p>
                            </div>

                            <div className='modal_precioImportarFactura-body-inputs-utilidad-input'>
                                <input 
                                    id="txtUtilidadModalPrecioImportarFactura" 
                                    name="utilidad"
                                    // disabled= { disableInputsP }
                                    value={ utilidad }
                                    onChange={ e => handleInputChangeUtilidadWithDispatch(e) }
                                />
                            </div>

                        </div>

                        <div className='modal_precioImportarFactura-body-inputs-precio'>
                            
                            <div className='modal_precioImportarFactura-body-inputs-precio-label'>
                                <p id='lblPrecioModalPrecioImportarFactura'>Precio</p>
                            </div>

                            <div className='modal_precioImportarFactura-body-inputs-precio-input'>
                                <input 
                                    id="txtPrecioModalPrecioImportarFactura" 
                                    name="precio"
                                    // disabled= { disableInputsP }
                                    value={ precio }
                                    onChange={ e => handleInputChangePrecioWithDispatch(e) }
                                />
                            </div>

                        </div>

                        <div className='modal_precioImportarFactura-body-inputs-precioIV'>
                            
                            <div className='modal_precioImportarFactura-body-inputs-precioIV-label'>
                                <p id='lblPrecioIVModalPrecioImportarFactura'>Precio IV</p>
                            </div>

                            <div className='modal_precioImportarFactura-body-inputs-precioIV-input'>
                                <input 
                                    id="txtPrecioIVModalPrecioImportarFactura" 
                                    name="precio"
                                    // disabled= { disableInputsP }
                                    value={ precioIV }
                                    onChange={ e => handleInputChangePrecioIVWithDispatch(e) }
                                />
                            </div>

                        </div>

                        <div className='modal_precioImportarFactura-body-inputs-btn'>
                            
                            <div className="modal_precioImportarFactura-body-inputs-btn-add">
                                <button 
                                    className='btnAddModalPrecioImportarFactura'
                                    onClick={ ( isEditPriceSell ) ? handleEditPrecio : handleSavePrecio }
                                >
                                    { ( isEditPriceSell ) ? 'Editar' : 'Agregar' }
                                </button>
                            </div>

                            <div className="modal_precioImportarFactura-body-inputs-btn-delete">
                                <RiDeleteBin2Fill 
                                    className={ (isEditPriceSell) 
                                        ? 'iconDeleteModalPrecioImportarFactura' 
                                        : 'iconDeleteModalPrecioImportarFactura-Disable'
                                    } 
                                    onClick={ handleRemovePrecio }
                                />
                            </div>

                        </div>

                    </div>

                    <div className='modal_precioImportarFactura-body-table'>
                        <BuysPrecioImportarFacturaModalTable columns={ columns } data={ pricesSellBuys }/>
                    </div>

                </div>

                <div className='modal_precioImportarFactura-footer'>
                    
                    <div className='modal_precioImportarFactura-footer-aceptar'>
                        <button id='btnAceptarModalPrecioImportarFactura'  onClick={ handleSaveCostos }>
                            Aceptar
                        </button>
                    </div>

                    <div className='modal_precioImportarFactura-footer-Cancelar'>
                        <button id='btnCancelarModalPrecioImportarFactura' onClick={ closeModal }>
                            Cancelar
                        </button>
                    </div>

                </div>

            </div>

        </Modal>
    )
}