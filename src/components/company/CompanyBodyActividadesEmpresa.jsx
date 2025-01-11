import React from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { CompanyBodyActividadesEmpresaTable } from './CompanyBodyActividadesEmpresaTable';
import { startGetAllActividadesEmpresasHacienda } from '../../actions/CompanyAction';
import { FaIdCard } from 'react-icons/fa6';
export const CompanyBodyActividadesEmpresa = () => {

    const dispatch = useDispatch();
    const {
        empresa,
        identificacionBuscada,
        disableBtnSearchActividadesEmpresa,
        disableInputs
    } = useSelector(state => state.company);

    const { identificacion, actividades } = empresa;

    const columns = [
        {
            Header: "Identificacion",
            accessor: "cedula",
        },
        {
            Header: "Codigo",
            accessor: "codigo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Estado",
            accessor: "estado",
        },
    ];

    const handleSearchActividadesEmpresa = (e) => {

        if (!disableBtnSearchActividadesEmpresa && !disableInputs) {

            if (identificacion != '') {

                // if( identificacionBuscada === identificacion ) {

                //     Swal.fire({
                //         icon: 'warning',
                //         title: 'Advertencia',
                //         text: `La activades de Empresa ${identificacion} ya estan cargadas.`,
                //     });

                //     return;
                // }

                // Se llama el metodo para obtener las actividades empresas
                dispatch(startGetAllActividadesEmpresasHacienda(identificacion));

            } else {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Se debe ingresar una identificacion en la pestaña Datos Emisor.',
                });
            }

        }

    }

    return (
        <>
            <div className="row mb-3 text-center">
                <div className="col-md-2 mb-3"></div>
                <div className="col-md-8 mb-3">
                    <h5>Identificación</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Identificación de la Actividad"
                            disabled={true}
                            value={identificacion}
                        />
                        <button
                            className={
                                (disableInputs)
                                    ? 'btn btn-primary disabled'
                                    : (disableBtnSearchActividadesEmpresa)
                                        ? 'btn btn-primary disabled'
                                        : 'btn btn-primary'
                            }
                            onClick={handleSearchActividadesEmpresa}
                        >
                            Buscar Actividades
                        </button>
                    </div>
                </div>
                <div className="col-md-2 mb-3"></div>
            </div>

            <div className="row mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <CompanyBodyActividadesEmpresaTable columns={columns} data={actividades} />
                </div>
            </div>
        </>
    )
}