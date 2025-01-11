
import { useSelector, useDispatch } from 'react-redux';
import { BuysSearchCodigoCabysTable } from './BuysSeachCodigoCabysTable';
import {
    CleanSearchCodigoCabysCompras,
    SetIsOpenModalSearchCodigoCabysCompras,
    SetValueSearchCodigoCabysCompras,
    startSearchCodigoCabysCompras
} from '../../actions/ComprasAction';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaFilter, FaSearch, FaSortNumericDownAlt } from 'react-icons/fa';


export const BuysSearchCodigoCabysModal = () => {

    const dispatch = useDispatch();

    const {
        isOpenModalSearchCodigoCabys,
        valueSearchCodigoCabys,
        searchCodigoCabys
    } = useSelector(state => state.compras);

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

    const handleSearch = async (e) => {

        e.preventDefault();

        if (valueSearchCodigoCabys !== '') {
            dispatch(startSearchCodigoCabysCompras(valueSearchCodigoCabys))
        }
    }

    const closeModal = () => {

        // Clean state de search codigo cabys
        dispatch(CleanSearchCodigoCabysCompras());
        // Cerrar el modal
        dispatch(SetIsOpenModalSearchCodigoCabysCompras(false));

    }

    return (
        <>
            <div className="modal fade" id="modalBuscarCodigoCabys">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Código Cabys <FaSortNumericDownAlt className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSearch}>
                                <div className="row mb-2">
                                    <div className='col-md-12 mb-2'>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaFilter className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Buscar por Descripción....'
                                                name="valueSearchCodigoCabys"
                                                value={valueSearchCodigoCabys}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValueSearchCodigoCabysCompras)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type='submit'
                                            >
                                                Buscar <FaSearch className="iconSize" />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-12 mb-2">
                                        <BuysSearchCodigoCabysTable columns={columns} data={searchCodigoCabys} />
                                    </div>
                                </div>
                            </form>
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
        </>

    )
}
