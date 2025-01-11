import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentTabFarmacy } from '../../actions/FarmacyAction';
import { FarmacyFooter } from './FarmaciaFooter';
import { FarmacyBody } from './FarmacyBody';

export const FarmacyPage = () => {

    const dispatch = useDispatch();

    const { currentTabReportes } = useSelector(
        (state) => state.farmacy
    );

    const handleChangeTab = (nameTab) => {
        dispatch(SetCurrentTabFarmacy(nameTab))
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
                                <button className={`nav-link ${currentTabReportes === 'FarmacyPage' ? 'active' : ''}`} onClick={() => handleChangeTab('FarmacyPage')}>
                                    Peticiones
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='container-fluid mt-3'>
                <div className='card'>
                    <div className='card-body'>
                        <FarmacyBody />
                    </div>
                    <div className='card-footer'>
                        <FarmacyFooter />
                    </div>
                </div>
            </div>
        </>
    );
}
