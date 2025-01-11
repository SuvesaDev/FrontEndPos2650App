import Swal from 'sweetalert2';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/styleModal';
import { useSelector, useDispatch } from 'react-redux';

import { BuysSearchInventarioModalTable } from './BuysSearchInventarioModalTable';
import { 
    CleanStateSearchInventarioCompras,
    SetDefaultSearchInventarioCompras,
    SetIsOpenModalSearchInventarioModalCompras, 
    SetSearchInventarioCompras, 
    SetValorBusquedaInventariosCompras 
} from '../../actions/ComprasAction';

Modal.setAppElement('#root');

export const BuysSearchInventarioModal = () => {

    const dispatch = useDispatch();
    const { 
        getAllInventariosFilter, 
        isOpenModalSearchInventario,
        valorBusquedaInventario
    } = useSelector( state => state.compras );   

    const columns = [
        {
            Header: "Código",
            accessor: "cod_Articulo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Código Cabys",
            accessor: "codcabys",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if( valorBusquedaInventario === '' ) {
            dispatch( SetDefaultSearchInventarioCompras() )
        } else {
            dispatch( SetSearchInventarioCompras( valorBusquedaInventario ) );
        }
    }

    const closeModal = () => {

        //Cerrar el modal
        dispatch( SetIsOpenModalSearchInventarioModalCompras( false ) );
    
        //Clean el state de busqueda de inventarios
        dispatch( CleanStateSearchInventarioCompras() );

    }

    return (
        <Modal
                isOpen={ isOpenModalSearchInventario }
                onRequestClose={ closeModal }
                style={ customStyles }
                closeTimeoutMS={ 200 }
                className={'modal-searchInventarioBuys'}
                overlayClassName={'modal-fondo'}
        >
            <form className='modal-searchInventarioBuys-main' onSubmit={ handleSearch }>

                <div className='modal-searchInventarioBuys-title'>
                    <p id='lblTitleSearchPresentacion'>Buscar Producto</p>
                    <p id='lblCloseSearchPresentacion' onClick={ closeModal }>X</p>
                </div>

                <div className='modal-searchInventarioBuys-inputs'>

                    <div className='modal-searchInventarioBuys-inputs-title'>
                        <p id='lblDescripcionPresentacionModal'>Descripción</p>
                    </div>

                    <div className='modal-searchInventarioBuys-inputs-input'>

                        <div className='modal-searchInventarioBuys-inputs-input-input'>
                            <input 
                                type='text' 
                                id='txtDescripcionModalSearchPresentacionInventory' 
                                name="valorBusquedaInventario"
                                value = { valorBusquedaInventario } 
                                onChange={ e => handleInputChangeWithDispatch(e, SetValorBusquedaInventariosCompras) }
                            />
                        </div>

                        <div className='modal-searchInventarioBuys-inputs-input-btn'>
                            <button type='submit' id='btnSearchPresentacionInventory'>Buscar</button>
                        </div>

                    </div>

                </div>

                <div className='modal-searchInventarioBuys-table'>
                    <BuysSearchInventarioModalTable columns={ columns } data={ getAllInventariosFilter }/>
                </div>

            </form>
        </Modal>
    )
}
