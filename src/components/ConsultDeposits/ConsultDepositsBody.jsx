import React from 'react'
import { useSelector } from 'react-redux';

import { ConsultDepositsBodyTabs } from './ConsultDepositsBodyTabs';

import { ConsultDepositsDepositosBody } from './ConsultDepositsDepositosBody';
import { ConsultDepositsPreDepositosBody } from './ConsultDepositsPreDepositosBody';

export const ConsultDepositsBody = () => {

    const { currentTab } = useSelector(state => state.consultDeposits);

    const redirectComponent = () => {

        switch (currentTab) {

            case 'Depositos':
                return <ConsultDepositsDepositosBody />

            case 'PreDepositos':
                return <ConsultDepositsPreDepositosBody />

            default:
                break;
        }
    }

    return (
        <>

            <div className="card">
                <div className="card-header cartaHMod2">
                    <ConsultDepositsBodyTabs />
                </div>
                <div className="card-body">
                    <div className="row mb-2 text-center" >
                        {
                            redirectComponent()
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
