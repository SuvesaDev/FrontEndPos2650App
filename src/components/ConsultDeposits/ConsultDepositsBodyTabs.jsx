import { useDispatch, useSelector } from 'react-redux';

import { SetCurrentTabConsultDeposits } from '../../actions/ConsultDepositsAction';

export const ConsultDepositsBodyTabs = () => {

    const dispatch = useDispatch();
    const {
        disableInputs,
        currentTab
    } = useSelector(state => state.consultDeposits);

    const handleSelectTabCompany = (nameTab) => {

        if (!disableInputs) {
            dispatch(SetCurrentTabConsultDeposits(nameTab));
        }

    }

    return (
        <>
            <div className="text-center" >
                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-dark disbaled espacio'
                            : (currentTab === 'Depositos')
                                ? 'btn btn-dark espacio'
                                : 'btn btn-outline-dark espacio'
                    }
                    onClick={() => handleSelectTabCompany('Depositos')}
                >
                    Depósitos
                </button>

                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-dark disbaled'
                            : (currentTab === 'PreDepositos')
                                ? 'btn btn-dark espacio'
                                : 'btn btn-outline-dark espacio'
                    }
                    onClick={() => handleSelectTabCompany('PreDepositos')}
                >
                    Pre Depósitos
                </button>
            </div>
        </>

    )
}
