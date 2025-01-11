import { RaffleBody } from './RaffleBody';
import { RaffleIcons } from './RaffleIcons';

export const Raffle = () => {
    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Rifas</h3>
                    </div>
                    <div className="card-body">
                        <RaffleBody />

                    </div>
                    <div className="card-footer cartaP">
                        <RaffleIcons />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}