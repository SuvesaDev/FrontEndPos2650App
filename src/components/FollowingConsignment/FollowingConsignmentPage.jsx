
import { FollowingConsignmentBody } from "./FollowingConsignmentBody"
import { FollowingConsignmentFooter } from "./FollowingConsignmentFooter"


export const FollowingConsignmentPage = () => {

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Seguimiento de Consignaciones</h3>
                    </div>
        
                    <div className="card-body">
                        <FollowingConsignmentBody />
                    </div>
        
                    <div className="card-footer cartaP">
                        <FollowingConsignmentFooter />
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}