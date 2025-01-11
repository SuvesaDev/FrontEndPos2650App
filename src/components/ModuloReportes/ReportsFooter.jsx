import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaKey, FaUserCheck } from "react-icons/fa";
import { SetClaveInternaReports, startValidateClaveInternaReports } from '../../actions/ReportsAction';
import Swal from "sweetalert2";

export const ReportsFooter = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { claveInterna, disableInputsUser, nameUser, disablePassword } = useSelector((state) => state.reports);

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleOnKeyDownUser = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (claveInterna == "") {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia!",
                    text: "Escriba su contraseña.",
                });
                return;
            }
            dispatch(startValidateClaveInternaReports(claveInterna));
        }
    };

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="col-md-3 mb-2">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaKey className="iconSize" />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Clave Interna"
                            value={claveInterna}
                            disabled={disablePassword}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={(e) => {
                                handleInputChangeWithDispatch(e, SetClaveInternaReports);
                            }}
                        />
                        <span
                            className="input-group-text"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <div className="col-md-3 mb-2 espacio">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUserCheck className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de Usuario"
                            disabled={true}
                            value={nameUser}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
