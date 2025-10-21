import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BonusesBody } from "./BonusesBody";
import { BonusesIcons } from "./BonusesIcons";

import { startGetAllBonificaciones } from "../../actions/BonificacionesAction";

export const BonusesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Equivalente a ngOnInit: se ejecuta una sola vez al montar
        dispatch( startGetAllBonificaciones() );

        return () => {};
    }, []);

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    
                    <div className="card-header cartaMods">
                        <h3 className="mb-2">Mantenimiento de Bonificaciones</h3>
                    </div>

                    <div className="card-body">
                        <BonusesBody />
                    </div>

                    <div className="card-footer cartaP">
                        <BonusesIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
