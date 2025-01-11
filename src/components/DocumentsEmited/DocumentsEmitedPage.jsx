import React from 'react'
import { DocumentsEmitedBody } from './DocumentsEmitedBody'
import { DocumentsEmitedFooter } from './DocumentsEmitedFooter'

export const DocumentsEmitedPage = () => {
    return (


        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Documentos Emitidos</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <DocumentsEmitedBody />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <DocumentsEmitedFooter />
                    </div>
                </div>
            </div>
            <br />
        </>

    )
}
