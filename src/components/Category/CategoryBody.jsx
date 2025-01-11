
import { TbNotes } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle, MdCancel } from 'react-icons/md';

export const CategoryBody = () => {
    return (
        <>
            <div className="row mb-2 text-center">
                <div className="col-md-8 mb-3">
                    <h5>Descripción</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <textarea
                            class="form-control"
                            rows="1"
                            name='descripcion'
                        ></textarea>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <hr />

                    <button
                        className='btn btn-success'
                    >
                        Agregar <MdAddCircle className='iconSize' />
                    </button>
                </div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Descripción</th>
                                    <th>Punto de Venta 2</th>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

    )
}
