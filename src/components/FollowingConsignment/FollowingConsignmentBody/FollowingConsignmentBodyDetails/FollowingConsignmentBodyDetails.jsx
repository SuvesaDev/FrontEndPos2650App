import { createRef } from "react";

import { FollowingConsignmentBodyDetailsHeader } from "./FollowingConsignmentBodyDetailsHeader";
import { FollowingConsignmentBodyDetailsHeaderCustomer } from "./FollowingConsignmentBodyDetailsHeaderCustomer";
import { FollowingConsignmentBodyDetailsConditions } from "./FollowingConsignmentBodyDetailsConditions";
import { FollowingConsignmentBodyDetailsItems } from "./FollowingConsignmentBodyDetailsItems";

export const FollowingConsignmentBodyDetails = () => {


    return (

        <>

            <div className="container-fluid mt-2">

                <div className="card">
                    <div className="card-header cartaMods">
                        <FollowingConsignmentBodyDetailsHeader />
                    </div>

                    <div className="card-body">

                        <div className="row mb-2 text-center" >
                            <div className="col-md-8 mb-1">
                                <FollowingConsignmentBodyDetailsHeaderCustomer />
                            </div>
                            <div className="col-md-4 mb-1">
                                <FollowingConsignmentBodyDetailsConditions />
                            </div>
                        </div>

                        <hr />

                        <div className="col-md-12 mb-3 text-center">
                            <div className='billing_items'>
                                <FollowingConsignmentBodyDetailsItems />
                            </div>

                        </div>
            
                    </div>

                </div>
                <br />
            </div>

        </>

    )
}