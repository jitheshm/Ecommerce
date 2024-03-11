

import React, { useRef, useState } from 'react'
// import Cropper from 'react-easy-crop'
import './CropImage.css'
import { BASEURL } from "../../constants/constant.json"
// import Resizer from "react-image-file-resizer";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
function CropImage({ src, setImage, setImgPrev, setCropWindow, id, setOldImage }) {


    const cropperRef = useRef()
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        cropper.getCroppedCanvas().toBlob((blob) => {
            setImage(blob);
            //setImgPrev(URL.createObjectURL(blob));
            setImgPrev((prev) => {
                if (id && prev) {
                    console.log("iam here");
                    let newUrl = prev.replace(new RegExp('^' + `${BASEURL}/`), '');
                    console.log(newUrl);
                    setOldImage((prev) => {
                        return [...prev, newUrl]
                    })

                }
                return URL.createObjectURL(blob)
            })
            setCropWindow(false);
        });
    };
    const handleLeftRotate = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(-20);
    }
    const handleRightRotate = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(20);
    }

    const handleMove = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.setDragMode('move')
    }
    const handleCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.setDragMode('crop')
    }

    const handleReset = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.reset()
    }


    return (
        <>
            <div className='cropParent col-10 py-4 '>
                <div className='col-2'>
                    <div className='col-3 m-auto py-4' style={{ height: "max-content", border: "solid", borderColor: "white", borderRadius: "40px", borderWidth: "1px" }}>
                        <div className='m-auto d-flex' style={{ width: "min-content" }} onClick={handleMove}>
                            <i className="fa-solid fa-up-down-left-right" style={{ fontSize: "25px" }} title='Move'/>
                        </div>
                        <div className='m-auto d-flex mt-4' style={{ width: "min-content" }} >
                            <i className="fa-solid fa-crop" style={{ fontSize: "25px" }} onClick={handleCrop} title='Crop'/>
                        </div>
                        <div className='m-auto d-flex mt-4' style={{ width: "min-content" }}>
                            <i className="fa-solid fa-rotate-left" style={{ fontSize: "25px" }} onClick={handleLeftRotate} title='Rotate left'/>
                        </div>
                        <div className='m-auto d-flex mt-4' style={{ width: "min-content" }} >
                            <i className="fa-solid fa-rotate-right" style={{ fontSize: "25px" }} onClick={handleRightRotate} title='Rotate right'/>
                        </div>
                        <div className='m-auto d-flex mt-4' style={{ width: "min-content" }} >
                            <i className="fa-solid fa-rotate" style={{ fontSize: "25px" }} onClick={handleReset} title='Reset'/>
                        </div>
                        <div className='m-auto d-flex mt-4' style={{ width: "min-content" }} >
                            <i className="fa-solid fa-check" style={{ fontSize: "25px" }} onClick={onCrop} title='Done'/>
                        </div>

                    </div>

                </div>

                <div className='cropContainer col-10 d-flex align-items-center'>
                    <Cropper
                        src={src}
                        style={{ height: "100%", width: "100%" }}
                        // Cropper.js options
                        aspectRatio={353 / 416}
                        guides={false}

                        ref={cropperRef}
                    />
                </div>

            </div>


        </>
    )
}

export default CropImage