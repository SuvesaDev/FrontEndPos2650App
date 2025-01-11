import { useDispatch, useSelector } from 'react-redux';
import { SelectTabPays } from '../../../actions/pays';

export const PaysBodyTabs = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.pays);
    const { currentTabPays, disableInputs} = state;

    const handleSelectTabPays = (nameTab) => {
        dispatch(SelectTabPays(nameTab));
    }

    return (

        <>
            <div className="inline-containerBtns">
                <button
                    className={
                        currentTabPays == "DatosAbono"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    disabled={disableInputs}
                    onClick={() => handleSelectTabPays('DatosAbono')}
                >
                    Datos del Abono
                </button>

                <button
                    className={
                        currentTabPays == "DetalleFactura"
                            ? "btn btn-outline-primary activeP"
                            : "btn btn-primary"
                    }
                    disabled={disableInputs}
                    onClick={() => handleSelectTabPays('DetalleFactura')}
                >
                    Detalle de la(s) Factura(s) a Abonar
                </button>


            </div>
        </>
    )
}
