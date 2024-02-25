

import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import './CropImage.css'
import { BASEURL } from "../../constants/constant.json"
import Resizer from "react-image-file-resizer";
function CropImage({ src, setImage, setImgPrev, setCropWindow, id, setOldImage }) {


    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    //const [croppedImage, setCroppedImage] = useState(null)



    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })
    const getRadianAngle = (degreeValue) => {
        return (degreeValue * Math.PI) / 180
    }

    /**
     * Returns the new bounding area of a rotated rectangle.
     */
    const rotateSize = (width, height, rotation) => {
        const rotRad = getRadianAngle(rotation)

        return {
            width:
                rotation === 0 ? 353 : Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                rotation === 0 ? 416 : Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }

    /**
     * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
     */
    /**
     * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
     */
    const getCroppedImg = async (
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        const rotRad = getRadianAngle(rotation)

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        // const croppedCanvas = document.createElement('canvas')

        // const croppedCtx = croppedCanvas.getContext('2d')

        // if (!croppedCtx) {
        //     return null
        // }

        // // Set the size of the cropped canvas
        // croppedCanvas.width = pixelCrop.width
        // croppedCanvas.height = pixelCrop.height
        // console.log(canvas.width, canvas.height);

        // // Draw the cropped image onto the new canvas
        // croppedCtx.drawImage(
        //     canvas,
        //     pixelCrop.x,
        //     pixelCrop.y,
        //     pixelCrop.width,
        //     pixelCrop.height,
        //     0,
        //     0,
        //     pixelCrop.width,
        //     pixelCrop.height
        // )

        // As Base64 string
        // return croppedCanvas.toDataURL('image/jpeg');

        // As a blob

        canvas.toBlob(async (file) => {

            const url = URL.createObjectURL(file)
            setImage(file)
            setImgPrev((prev) => {
                if (id && prev) {
                    console.log("iam here");
                    let newUrl = prev.replace(new RegExp('^' + `${BASEURL}/`), '');
                    console.log(newUrl);
                    setOldImage((prev) => {
                        return [...prev, newUrl]
                    })

                }
                return url
            })
            setCropWindow(false)
            // setOldImage(url)
        })

    }





    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onDone = async () => {
        try {
            await getCroppedImg(
                src,
                croppedAreaPixels,
                rotation
            )

        } catch (e) {
            console.error(e)
        }
    }





    return (
        <>
            <div className='cropParent col-5 '>


                <div className='cropContainer'>
                    <Cropper
                        image={src}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={353 / 416}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        objectFit='contain'
                        restrictPosition={false}
                        cropSize={{ width: 353, height: 416 }}
                        style={{ containerStyle: { background: 'white' } }}

                    />
                </div>
                <div className='controls'>
                    <div >
                        <div style={{ display: 'flex', gap: 5 }}>
                            <label htmlFor="customRange1" className="form-label">Rotation</label>
                            <input type="range" className="form-range" id="customRange1" min={0} max={360} step={1} onChange={(e) => {
                                console.log(rotation);
                                setRotation(e.target.value)
                            }} value={rotation} />
                        </div>

                    </div>
                    <button type='button' className='btn btn-primary' onClick={() => {
                        onDone()
                    }}>Done</button>
                </div>
            </div>


        </>
    )
}

export default CropImage