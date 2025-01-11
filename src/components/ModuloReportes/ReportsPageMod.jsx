import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentTabReports } from '../../actions/ReportsAction';
import { ReportsCompras } from './ReportsTabs/ReportsCompras';
import { ReportsVentas } from './ReportsTabs/ReportsVentas';
import { ReportsInventarios } from './ReportsTabs/ReportsInventarios';
import { ReportsClientes } from './ReportsTabs/ReportsClientes';
import { ReportsProveedores } from './ReportsTabs/ReportsProveedor';
import { ReportsFooter } from './ReportsFooter';

export const ReportsPageMod = () => {

    const dispatch = useDispatch();

    const { currentTabReportes } = useSelector(
        (state) => state.reports
    );

    const handleChangeTab = (nameTab) => {
        dispatch(SetCurrentTabReports(nameTab))
    }

    return (

        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbarReportes">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbarReportes">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className={`nav-link ${currentTabReportes === 'ReportesComprasPage' ? 'active' : ''}`} onClick={() => handleChangeTab('ReportesComprasPage')}>
                                    Reporte Compras
                                </button>
                            </li>
                            <li className="nav-item ">
                                <button className={`nav-link ${currentTabReportes === 'ReportesVentasPage' ? 'active' : ''}`} onClick={e => { handleChangeTab('ReportesVentasPage') }}>
                                    Reporte Ventas
                                </button>
                            </li>
                            <li className="nav-item ">
                                <button className={`nav-link ${currentTabReportes === 'ReportesInventariosPage' ? 'active' : ''}`} onClick={e => { handleChangeTab('ReportesInventariosPage') }}>
                                    Reporte Inventarios
                                </button>
                            </li>
                            <li className="nav-item ">
                                <button className={`nav-link ${currentTabReportes === 'ReportesClientesPage' ? 'active' : ''}`} onClick={e => { handleChangeTab('ReportesClientesPage') }}>
                                    Reporte Clientes
                                </button>
                            </li>
                            <li className="nav-item ">
                                <button className={`nav-link ${currentTabReportes === 'ReportesProveedoresPage' ? 'active' : ''}`} onClick={e => { handleChangeTab('ReportesProveedoresPage') }}>
                                    Reporte Proveedores
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='container-fluid mt-3'>
                <div className='card'>
                    <div className='card-body'>
                        {currentTabReportes === "ReportesComprasPage" ? <ReportsCompras /> :
                            currentTabReportes === "ReportesVentasPage" ? <ReportsVentas /> :
                                currentTabReportes === "ReportesInventariosPage" ? <ReportsInventarios /> :
                                    currentTabReportes === "ReportesClientesPage" ? <ReportsClientes /> :
                                        currentTabReportes === "ReportesProveedoresPage" ? <ReportsProveedores /> : null}
                    </div>
                    <div className='card-footer'>
                        <ReportsFooter />
                    </div>
                </div>
            </div>
        </>
    );
}
