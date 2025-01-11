
import { TbNotes } from 'react-icons/tb';
import { FaEdit, FaHashtag, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import { FaFloppyDisk, FaHouseChimney, FaMobileScreen } from 'react-icons/fa6';

export const LockUnlockCommercialHouseBody = () => {
    return (
        <>
            <div className="row mb-3 text-center">

                <div className="col-md-6 mb-3">
                    <h5>Buscar Casa Comercia</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHouseChimney className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Buscar Casa Comercial"
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <hr />
                    <button className="btn btn-danger espacio">Bloquear <FaLock className="iconSize" /></button>
                    <button className="btn btn-success espacio">Agregar <FaLockOpen className="iconSize" /></button>
                </div>
            </div>

            <div className="row mb-2 text-center" >
                <div className="col-md-12 mb-2">
                    <div className="table-responsive-md tablaP">
                        <table
                            className="table table-dark table-hover table-bordered text-md-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Casa Comercial</th>
                                    <th>Bloqueado</th>
                                </tr>
                            </thead>
                            <tbody className="table-secondary">
                                <tr>
                                    <td>Test</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
