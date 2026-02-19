import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TbTrashXFilled } from "react-icons/tb";

import { 
  SetBase64ImagenIntentory, 
  SetIdImagenIntentory, 
  SetNameImagenIntentory, 
  SetPreviewImagenIntentory,
  startDeleteImage
} from "../../../../actions/inventory";

export const InventoryBodyFeaturesImagen = () => {

    const dispatch = useDispatch();
    const inputRef = useRef();

    const { disableInputs, imagen, hasImage} = useSelector((state) => state.inventory);
    const { base64Imagen, idImagen } = imagen; 

    const openFileSelector = () => {
      if(!disableInputs) {
        inputRef.current.click();
      }
    };

    const handleUploadFile = (e) => {
      
      if (!hasExtension(e.target.files[0].name, ['jpg', 'jpeg', 'png'])) {
          // Se muestra mensaje
          Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'Archivo no tiene una extencion Valida. Por favor intentelo de nuevo con archivos con extensiones: (jpg, jpeg, png).'
          });
          return;
      }

      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file); // Convierte el archivo a Base64
      
      if (inputRef.current) {
          inputRef.current.value = "";
      }
      fileReader.onload = () => {

          // dispatch(SetIdImagenIntentory(0));
          dispatch(SetNameImagenIntentory(file.name));
          dispatch(SetBase64ImagenIntentory(fileReader.result));
          
      }

      fileReader.onerror = () => {

          // Se muestra mensaje
          Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'Ocurrio un error cargando el archivo, por favor intentelo de nuevo.'
          });
      }
    }

    const hasExtension = (fileName, exts) => {
      return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    const handleDeleteImagen = () => {
      dispatch(startDeleteImage(idImagen));
    }

    return (
      <>
        <div className="btn-group mb-2">
            <button
                className={
                    hasImage
                        ? "btn btn-danger espacio"
                        : "d-none"
                }
                onClick={handleDeleteImagen}
            >
                Eliminar
                <TbTrashXFilled className="iconSizeBtn" />
            </button>
        </div>
        <div className="container mt-4 d-flex justify-content-center">

              

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUploadFile}
                style={{ display: "none" }}
              />

              <div
                className="card text-center shadow-sm"
                style={{ width: "250px", cursor: "pointer" }}
                onClick={openFileSelector}
              >
                  <div div className="card-body p-2">
                    {(base64Imagen != '') ? (
                      <img
                        src={base64Imagen}
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
