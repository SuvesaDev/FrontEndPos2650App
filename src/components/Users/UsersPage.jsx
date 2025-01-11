import React from 'react';

import { UsersBody } from './UsersBody';
import { UsersIcons } from './UsersIcons';

export const UsersPage = () => {

    return (
        <>
            <div className="container-fluid mt-2 text-center">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="card">
                            <div className="card-header bg-primary cartaHMod2">
                                <h4>Usuarios</h4>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3 text-center" >
                                    <div className="col-md-12 mb-0">
                                        <UsersBody />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer cartaP">
                                <UsersIcons />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
