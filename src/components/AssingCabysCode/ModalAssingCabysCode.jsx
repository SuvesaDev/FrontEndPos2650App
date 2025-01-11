import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { CloseModalAssingCabysCode } from '../../actions/assingCabysCode';

import { customStyles } from '../../helpers/styleModal';
import { AssingCabysCodeTree } from './AssingCabysCodeTree';

export const ModalAssingCabysCode = () => {

    const dispatch = useDispatch();
    const { modalAssingCabysCodeOpen } = useSelector(state => state.assingCabysCode);

    const closeModal = (e) => {
        e.preventDefault();
        dispatch( CloseModalAssingCabysCode() );
    }

    return (
        <Modal
            isOpen={ modalAssingCabysCodeOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className={'modal-assingCabysCode'}
            overlayClassName={'modal-fondo'}
        >
            <form className='modal_assingCabysCode-main'>

                <div className='modal_assingCabysCode-title'>
                    <p id='lblTitleAssingCabysCodeModal'>Catalogo de Bienes y Servicios (CABYS)</p>
                    <p id='lblCloseAssingCabysCodeModal' onClick={ closeModal } >X</p>
                </div>

                <div className='modal_assingCabysCode-body'>
                    
                    <div className='modal_assingCabysCode-body-firstLine'>
                        {/* <button id='btnBuscarACCModal'>Buscar</button> */}
                        {/* <input id='txtBuscarACCModal' name='buscarACCModal' /> */}
                        <AssingCabysCodeTree className='txtBuscarACCModal'/>
                        <button id='btnLimpiarACCModal'>Limpiar</button>
                    </div>

                    <div className='modal_assingCabysCode-body-secondLine'>
                        {/* <AssingCabysCodeTree /> */}
                    </div>

                    <div className='modal_assingCabysCode-body-thirdLine'>
                        
                        <div className='modal_assingCabysCode-body-thirdLine-inputs'>
                            <div className='modal_assingCabysCode-body-thirdLine-inputs-codigo'>
                                <p id='lblCodigoACCModal'>Código</p>
                                <input id='txtCodigoACCModal' name='codigoACCModal' />
                            </div>

                            <div className='modal_assingCabysCode-body-thirdLine-inputs-bien'>
                                <p id='lblBienACCModal'>Bien o Servicio</p>
                                <input id='txtBienACCModal' name='bienACCModal' />
                            </div>

                            <div className='modal_assingCabysCode-body-thirdLine-inputs-impuesto'>
                                <p id='lblImpuestoACCModal'>Impuesto</p>
                                <input id='txtImpuestoACCModal' name='impuestoACCModal' />
                            </div>
                        </div>

                        <div className='modal_assingCabysCode-body-thirdLine-btns'>
                            <button id='btnCancelarACCModal'>Cancelar</button>
                            <button id='btnAceptarACCModal'>Aceptar</button>
                        </div>

                    </div>

                </div>
            </form>
        </Modal>
    )
}
