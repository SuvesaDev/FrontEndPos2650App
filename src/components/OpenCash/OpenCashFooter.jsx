import { useSelector } from "react-redux";

export const OpenCashFooter = () => {

    const { caja } = useSelector(state => state.OpenCash);
    const { Anulado } = caja.encabezado;

    return (
        <div className='openCash_footer-main'>

            <div className='openCash_footer-check'>
                <div className="openCash_footer-check-anulada-input"> 
                    <input 
                        type="checkbox" 
                        id="checkAnulada"
                        name="anularOC" 
                        disabled={ true }
                        checked={Anulado}
                    />
                </div>
                <label for="checkAnulada" id="lblAnuladaOC">Anulada</label>
            </div>

            {/* <div className='openCash_footer-user'>
                
                <div className='openCash_footer-user-title'>
                    <p>Usuario →</p>
                </div>

                <div className='openCash_footer-user-inputPassword'>
                    <p>******</p>
                </div>

                <div className='openCash_footer-user-titleSistema'>
                    <p>SISTEMA</p>
                </div>

            </div> */}

        </div>
    )
}
