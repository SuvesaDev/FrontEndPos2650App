import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '../../helpers/styleModal';

import {
    SetCajeroArqueoCash,
    SetIdAperturaArqueoCash,
    openSearchUsuarioModalArqueoCash
} from '../../actions/arqueocashAction';

Modal.setAppElement('#root');

export const ArqueoCajaSeleccionarUsuario = () => {

    const dispatch = useDispatch();
    const { openSearchModal, searUsuarios, arqueo } = useSelector(state => state.ArqueCash);
    const { encabezado } = arqueo;
    const { IdApertura, Cajero } = encabezado;

    const closeModal = () => {

        if (IdApertura === 0 || Cajero === '') {
            console.log(searUsuarios);
            if (searUsuarios.length === 0) {
                dispatch(openSearchUsuarioModalArqueoCash(false));
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Informacion importante',
                    text: 'Debe seleccionar un usuario para arqueo de caja'
                });
            }

        } else {
            dispatch(openSearchUsuarioModalArqueoCash(false));
        }
    }

    const handleChangeSelectUser = ({ target }) => {
        const idApertura = searUsuarios.find(usuario => usuario.id === parseInt(target.value)).idApertura;
        const nombre = searUsuarios.find(usuario => usuario.id === parseInt(target.value)).nombre;
        const numCaja = searUsuarios.find(usuario => usuario.id === parseInt(target.value)).numCaja;


        dispatch(SetIdAperturaArqueoCash(idApertura));
        dispatch(SetCajeroArqueoCash(nombre));
        dispatch(openSearchUsuarioModalArqueoCash(false));
    };
    return (
        <Modal
            isOpen={openSearchModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className={'modal-selectedUserArqueoCash'}
            overlayClassName={'modal-fondo'}
        >
            <div className='modal_selectedUserArqueoCash-main'>

                <div className='modal_selectedUserArqueoCash-title'>
                    <p id='lblTitleSelectedUserArqueoCashModal'>Seleccione un Usuario</p>
                </div>

                <div className='modal_selectedUserArqueoCash-input'>

                    <div className='modal_selectedUserArqueoCash-input-label'>
                        <p id='lblUsuarioSelectedUserModalArqueoCash'>Usuario</p>
                    </div>

                    <div className='modal_selectedUserArqueoCash-input-select'>

                        <select
                            id='cboUserSelectedUserModalArqueoCash'
                            onChange={e => handleChangeSelectUser(e)}
                        >
                            <option value='' selected disabled hidden> Seleccione... </option>
                            {
                                (searUsuarios != null)
                                    ? searUsuarios.map(tipo => {
                                        return <option value={tipo.id}> {tipo.nombre} </option>
                                    })
                                    : <option value=''>No se cargaron los usuarios</option>
                            }
                        </select>

                    </div>

                </div>

            </div>

        </Modal>
    )
}