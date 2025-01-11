
import { FaEye, FaHashtag, FaPercentage, FaSalesforce } from 'react-icons/fa';
import { FaCirclePlus, FaColonSign, FaFloppyDisk } from 'react-icons/fa6';
import { MdAdd, MdNoteAdd } from 'react-icons/md';
import { TbNotes } from 'react-icons/tb';

export const FamilySubFamilia = () => {
    return (
        <>
            <div className="row mb-0 text-center">
                <div className="col-md-12 mb-0">
                    <div className="card">
                        <div className="card-header bg-primary cartaHMod2">
                            <h4>Sub-Familias</h4>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 text-center">
                                <div className="col-md-3 mb-3">
                                    <h5>Código</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaHashtag className="iconSize" />
                                        </span>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder="Código de la Sub-Familia"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Descripción</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNotes className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaEye className="iconSize" />
                                        </span>
                                        <textarea
                                            class="form-control"
                                            rows="1"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <hr />
                                    <button className='btn btn-primary espacio'>Nuevo <MdNoteAdd className='iconSize' /></button>
                                    <button className='btn btn-success espacio'>Agregar <FaCirclePlus className='iconSize' /></button>
                                </div>
                            </div>
                            <div className="row mb-0 text-center" >
                                <div className="col-md-12 mb-0">
                                    <div className="table-responsive-md tablaP">
                                        <table
                                            className="table table-dark table-hover table-bordered text-md-center">
                                            <thead className="table-dark">
                                                <tr>

                                                    <th>Código</th>
                                                    <th>Descripción</th>
                                                    <th>Observaciones</th>
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
