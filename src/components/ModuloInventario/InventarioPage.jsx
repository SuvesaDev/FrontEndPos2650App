import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentTab } from '../../actions/StateAction';
import { StatePage } from './StatePage/StatePage';
import { QRPage } from './QRPage/QRPage';

 export const InventarioPage = () => {
    const dispatch = useDispatch();
    
    const { currentTabInventory } = useSelector(
        (state) => state.stateInventory
      );

    const handleChangeTab = (nameTab) => {
        dispatch(SetCurrentTab(nameTab))
    }
     

  return (
    <>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbarMod">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbarMod">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link" onClick={e =>{handleChangeTab('StatePage')}} >Consulta Estados Albaranes</button>
                    </li>
                    <li className="nav-item ">
                        <button className="nav-link" onClick={e =>{handleChangeTab('QRPage')}}>Inventario QR</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
        {currentTabInventory === "StatePage" ? <StatePage /> : <QRPage />}
    </>
  )
}


