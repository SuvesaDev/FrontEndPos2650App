
import { useSelector } from 'react-redux';

import { FaSearch, FaUser, FaHome } from 'react-icons/fa';
import { FaIdCard } from "react-icons/fa6";
import { TbListNumbers, TbNotes } from 'react-icons/tb';

export const FollowingConsignmentBodyDetailsHeaderCustomer = () => {

    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);
    
    const { factura, surcursales } = useSelector(state => state.followingConsignment);
    const { 
        cedula_Usuario,
        tipoDocumento,
        nombre_Cliente,
        observaciones,
        surcursal
    } = factura.encabezado;

    return (

        <>
            <div className="row mb-2">

                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            name="cedula_Usuario"
                            type='number'
                            min="0"
                            className='form-control'
                            placeholder='Cédula del Cliente'
                            disabled={true}
                            value={cedula_Usuario}
                        />
                        <button
                            type="button"
                            className='btn btn-primary disabled'
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbListNumbers className="iconSize" />
                        </span>
                        <select
                            name="idTipoCliente"
                            className="form-select"
                            disabled={true}
                            value={tipoDocumento}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null && tiposIdentificacion.length > 0)
                                    ?   tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.id} value={tipoD.id}> {tipoD.descripcion} </option>
                                        })
                                    :   <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            name="nombre_Cliente"
                            autoComplete="off"
                            disabled={true}
                            value={nombre_Cliente}
                            readOnly
                        />
                    </div>
                </div>

            </div>

            <div className="row mb-2">
            
                <div className="col-md-4 mb-3">
                    <h5>Surcursal</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHome className="iconSize" />
                        </span>
                        <select
                            name="idTipoCliente"
                            className="form-select"
                            disabled={true}
                            value={surcursal}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (surcursales != null && surcursales.length > 0)
                                    ?   surcursales.map(surcursal => {
                                            return <option key={surcursal.id} value={surcursal.id}> {surcursal.descripcion} </option>
                                        })
                                    :   <option value=''>No existen surcursales para el cliente</option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-8 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones Extra"
                            name='observaciones'
                            autoComplete='off'
                            disabled={true}
                            value={observaciones}
                        />
                    </div>
                </div>

            </div>

        </>
    )
}