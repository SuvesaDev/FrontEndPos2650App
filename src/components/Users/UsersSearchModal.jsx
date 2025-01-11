import { useSelector, useDispatch } from 'react-redux';
import { UsersSearchTable } from './UsersSearchTable';

import {
    CleanSearchOptionsUsers,
    SetIdUsuarioSearchUsers,
    SetIsOpenModalSearchUsers,
    SetNombreSearchUsers,
    SetValorFiltroSearchUsers,
    startSearchUsers
} from '../../actions/UsersAction';
import { FaFilter, FaSearch, FaUser } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbCircleX } from 'react-icons/tb';

export const UsersSearchModal = () => {

    const dispatch = useDispatch();
    const {
        isOpenModalSearch,
        optionsSearchUsers,
        searchUsers
    } = useSelector(state => state.users);

    const {
        valorFiltro,
        idUsuario,
        nombre
    } = optionsSearchUsers;

    const columns = [
        {
            Header: "Id Usuario",
            accessor: "idUsuario",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleIdUsuario = ({ target }) => {

        if (!idUsuario) {
            dispatch(SetIdUsuarioSearchUsers(target.checked));
            dispatch(SetNombreSearchUsers(false));
        }

    };

    const handleNombre = ({ target }) => {

        if (!nombre) {
            dispatch(SetIdUsuarioSearchUsers(false));
            dispatch(SetNombreSearchUsers(target.checked));
        }

    };

    const handleSearch = async (e) => {

        e.preventDefault();

        const searchUser = {
            idUsuario: (idUsuario) ? valorFiltro : null,
            nombre: (nombre) ? valorFiltro : null
        }

        if (valorFiltro !== '') {
            dispatch(startSearchUsers(searchUser));
        }
    }


    return (

        <>
            <div className="modal fade" id="modalBuscarUsuario">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Buscar Usuarios <FaUser className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <form onSubmit={handleSearch}>
                                    <div className="col-md-12 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaMagnifyingGlass className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Buscar...'
                                                name="valorfiltroPresentacion"
                                                value={valorFiltro}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchUsers)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type='submit'
                                            >
                                                <FaSearch className="iconSize" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row mb-2 text-center">
                                <div className='col-md-4 mb-2'>
                                    <h5>Criterios de busqueda <FaFilter className='iconSize' /></h5>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkIdUsuarioSearchUsersModal'
                                            name='idUsuario'
                                            checked={idUsuario}
                                            onChange={e => handleIdUsuario(e)}
                                        />
                                        <h5 className="form-check-label" for="checkIdUsuarioSearchUsersModal">Id Usuario</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            type='checkbox'
                                            id='checkNombreSearchUsersModal'
                                            name='nombre'
                                            checked={nombre}
                                            onChange={e => handleNombre(e)}
                                        />
                                        <h5 className="form-check-label" for="checkNombreSearchUsersModal">Nombre</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="row mb-2 text-center">
                                <UsersSearchTable columns={columns} data={searchUsers} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
