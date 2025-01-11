import { useSelector, useDispatch } from 'react-redux';
import { CloseModalSearchProviders } from '../../actions/assingCabysCode';
import { FaBuildingUn } from 'react-icons/fa6';
import { TbCircleX, TbCircleCheck } from 'react-icons/tb';

export const ModalSearchProviders = () => {

    const dispatch = useDispatch();
    const { modalSearchProvidersOpen } = useSelector(state => state.assingCabysCode);

    const closeModal = (e) => {
        e.preventDefault();
        dispatch(CloseModalSearchProviders());
    }

    return (

        <>
            <div className="modal fade" id="modalBuscaProveedor">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Buscar Cabys del Proveedor <FaBuildingUn className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    <div className="table-responsive-md tablaP">
                                        <table
                                            className="table table-dark table-hover table-bordered text-md-center">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Proveedor</th>
                                                    <th>Descripción</th>
                                                    <th>Cabys</th>
                                                    <th>Descripción Cabys</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-secondary">
                                                <tr>
                                                    <td>Test</td>
                                                    <td>Test</td>
                                                    <td>Test</td>
                                                    <td>Test</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Aceptar <TbCircleCheck className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
