import React, {useCallback, useState} from "react";
import {AiFillDelete} from "react-icons/ai";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {DropzoneEmpty} from "./components/dropzome-empty";
import c from './style.module.css'


export const FormikDropzone = ({form, name, imagePreview, height}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isHaveError =
    form && form.touched[name] && Boolean(form.errors[name]);
  const containerClass = isHaveError ? `${c.container} ${c.containerActive}` : c.container

  const notify = (text) => toast(text);


  const onDrop = useCallback(
    async (acceptedFiles) => {

      if (acceptedFiles.length && !isLoading) {
        setIsLoading(true);
        form.setFieldValue(name, acceptedFiles[0])
        setIsLoading(false);
      } else {
        notify("unknown error")
      }
    },
    [form.values[name]]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/doc': ['.doc'],
      'application/docx': ['.docx'],
    },
  });

  const setFileNull = (e) => {
    form.setFieldValue(imagePreview, null);
    form.setFieldValue(name, null);
    e.stopPropagation();
  };

  if (isLoading) {
    return (
      <div>
        loading
      </div>
    );
  }


  return (
    <>
      {
        form.values[name] !== null ? (
          <div className={c.activeFile}>
             <span className={c.removeIconWrap} onClick={setFileNull}>
              <AiFillDelete className={c.removeIcon}/>
            </span>
            <div>
              {form.values[name].name}
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={containerClass}
          >
            <input {...getInputProps()} />
            <div>
              <DropzoneEmpty/>
            </div>
          </div>
        )
      }
    </>
  )
}
