import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  SetBase64ImagenIntentory, 
  SetNameImagenIntentory 
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesImagen = () => {

    const dispatch = useDispatch();
    const inputRef = useRef();
    const [preview, setPreview] = useState(null);

    const { disableInputs } = useSelector((state) => state.inventory);

    const openFileSelector = () => {
      if(!disableInputs) {
        inputRef.current.click();
      }
    };

    const handleChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      dispatch(SetNameImagenIntentory(file.name));

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result);

        dispatch(SetBase64ImagenIntentory(reader.result.split(",")[1]));
      };
    };

    return (
      <>
        <div className="container mt-4 d-flex justify-content-center">

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChange}
                style={{ display: "none" }}
              />

              <div
                className="card text-center shadow-sm"
                style={{ width: "250px", cursor: "pointer" }}
                onClick={openFileSelector}
              >
                  <div div className="card-body p-2">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="img-fluid rounded"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <>
                        <div style={{ fontSize: "40px" }}>📷</div>
                        <p className="text-muted mb-0">Subir imagen</p>
                        <small className="text-secondary">
                          Click para seleccionar
                        </small>
                      </>
                    )}
                  </div>
              </div>
        </div>
      </>
    );
};
