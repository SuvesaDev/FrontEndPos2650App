
import { TbNotes } from 'react-icons/tb';
import { FaEdit, FaHashtag } from 'react-icons/fa';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import { FaFloppyDisk, FaMobileScreen } from 'react-icons/fa6';

export const FarmacyBody = () => {
    return (
        <>
            <div className="row mb-0 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Listado de Peticiones</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    <div className="table-responsive-md tablaP">
                                        <table
                                            className="table table-dark table-hover table-bordered text-md-center">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Servicio</th>
                                                    <th>Encargado</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-secondary">
                                                <tr>
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
                    </div>
                </div>
            </div>
        </>
    )
}
