import { useDispatch, useSelector } from 'react-redux';

import { SetCurrentTabRepayment } from '../../actions/repaymentAction';

export const RepaymentBodyGeneralTabs = () => {

    const dispatch = useDispatch();

    const { currentTab, disableInputs, isShowSecondTab } = useSelector(state => state.repayment);

    const handleSelectTabRepayment = (nameTab) => {
        if (!disableInputs) {
            if (nameTab === "Validacion") {
                if (!isShowSecondTab) {
                    return;
                }
            }
            dispatch(SetCurrentTabRepayment(nameTab));
        }
    }

    return (
        <>
            <div className='inline-containerCenter'>
                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (currentTab == 'General')
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabRepayment('General')}
                >
                    General
                </button>

                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (isShowSecondTab)
                                ? (currentTab == 'Validacion')
                                    ? "btn btn-outline-primary activeP"
                                    : "btn btn-primary"
                                : 'btn btn-primary disabled'
                    }
                    onClick={() => handleSelectTabRepayment('Validacion')}
                >
                    Validación
                </button>
            </div>
        </>
    )
}
