import { BonusesBody } from "./BonusesBody"
import { BonusesIcons } from "./BonusesIcons"

export const BonusesPage = () => {
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
