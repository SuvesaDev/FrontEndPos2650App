import { useDispatch, useSelector } from 'react-redux';

import { SetSelectedTabCompany } from '../../actions/CompanyAction';

export const CompanyBodyTabs = () => {

    const dispatch = useDispatch();

    const { currentTabCompany, disableInputs } = useSelector(state => state.company);

    const handleSelectTabCompany = (nameTab) => {
        if (!disableInputs) {
            dispatch(SetSelectedTabCompany(nameTab));
        }
    }

    return (

        <>
            <div className="inline-containerBtns">
                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (currentTabCompany == 'DatosEmisor')
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabCompany('DatosEmisor')}
                >
                    Datos Emisor
                </button>

                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (currentTabCompany == 'DatosTributarios')
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabCompany('DatosTributarios')}
                >
                    Datos Tributarios
                </button>

                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (currentTabCompany == 'ActividadesEmpresa')
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabCompany('ActividadesEmpresa')}
                >
                     Actividades de Empresa
                </button>

                <button
                    className={
                        (disableInputs)
                            ? 'btn btn-primary disabled'
                            : (currentTabCompany == 'CuentasBancarias')
                                ? "btn btn-outline-primary activeP"
                                : "btn btn-primary"
                    }
                    onClick={() => handleSelectTabCompany('CuentasBancarias')}
                >
                     Cuentas Bancarias
                </button>
            </div>
        </>

    )
}
