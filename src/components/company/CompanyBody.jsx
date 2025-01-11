import React from 'react'
import { useSelector } from 'react-redux';

import { CompanyBodyTabs } from './CompanyBodyTabs'

import { CompanyBodyDatosEmisor } from './CompanyBodyDatosEmisor';
import { CompanyBodyDatosTributarios } from './CompanyBodyDatosTributarios';
import { CompanyBodyActividadesEmpresa } from './CompanyBodyActividadesEmpresa';
import { CompanyBodyCuentasBancarias } from './CompanyBodyCuentasBancarias';

export const CompanyBody = () => {

    const { currentTabCompany } = useSelector(state => state.company);

    const redirectComponent = () => {

        switch (currentTabCompany) {

            case 'DatosEmisor':
                return <CompanyBodyDatosEmisor />

            case 'DatosTributarios':
                return <CompanyBodyDatosTributarios />

            case 'ActividadesEmpresa':
                return <CompanyBodyActividadesEmpresa />

            case 'CuentasBancarias':
                return <CompanyBodyCuentasBancarias />

            default:
                break;
        }
    }

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card text-center">
                    <div className="card-header bg-secondary text-white">
                        <CompanyBodyTabs />
                    </div>
                    <div className="card-body">{redirectComponent()}</div>
                </div>
            </div>
        </>
    )
}
