import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

import { RepaymentBodyGeneralTabs } from './RepaymentBodyGeneralTabs';
import { RepaymentBodyTabGeneral } from './RepaymentBodyTabGeneral';
import { RepaymentBodyTabValidacion } from './RepaymentBodyTabValidacion';

import { SetCurrentTabRepayment } from '../../actions/repaymentAction';

export const RepaymentBodyGeneral = () => {

    const dispatch = useDispatch();
    const { currentTab, disableInputs, isShowSecondTab } = useSelector(state => state.repayment);

    const redirectComponent = () => {

        switch (currentTab) {

            case 'General':
                return <RepaymentBodyTabGeneral />

            case 'Validacion':
                return <RepaymentBodyTabValidacion />

            default:
                break;
        }
    }

    const handleContinueTab = (nameTab) => {
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
            <div className="row">
                <div className='card'>
                    <div className='card-header'>
                        <RepaymentBodyGeneralTabs />
                    </div>
                    <div className='card-body'>
                        {
                            redirectComponent()
                        }
                    </div>
                    <div className='card-footer inline-containerFinal'>
                        {
                            (currentTab === 'General')
                                ?
                                <button className={
                                    (disableInputs)
                                        ? 'btn btn-dark disabled'
                                        : (isShowSecondTab)
                                            ? 'btn btn-dark'
                                            : 'btn btn-dark disabled'
                                }
                                    onClick={() => handleContinueTab('Validacion')}>
                                    <BsFillArrowRightCircleFill
                                        className='iconSizeXL'
                                    />
                                </button>

                                :
                                <button className={
                                    (disableInputs)
                                        ? 'btn btn-dark disabled'
                                        : 'btn btn-dark'
                                }
                                    onClick={() => handleContinueTab('General')}>
                                    <BsFillArrowLeftCircleFill
                                        className='iconSizeXL'
                                    />
                                </button>
                        }
                    </div>
                </div>
            </div>

        </>

    )
}