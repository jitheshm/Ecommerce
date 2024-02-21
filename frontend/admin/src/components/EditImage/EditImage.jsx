/* eslint-disable react/prop-types */

import { useRef, useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults, createNode } from '@pqina/pintura';
import { BASEURL } from "../../constants/constant.json"
import '@pqina/pintura/pintura.css';
import '../EditImage/EditImage.css'
import { useEffect, } from 'react';
const editorDefaults = getEditorDefaults();
const browse = (options) => {
    return new Promise((resolve) => {
        const element = document.createElement('input');
        element.type = 'file';
        element.accept = options.accept;
        element.onchange = () => {
            const [file] = element.files;
            if (!file) return resolve();
            resolve(file);
        };
        element.click();
    });
};


function EditImage(props) {
    const [editorSrc, setEditorSrc] = useState(undefined);
    const editorRef = useRef(null);

    const willRenderShapeControls = (controls, selectedShapeId) => {

        controls[0][3].push(
            // Add a "Select image" button
            createNode('Button', 'my-button', {
                label: 'Select image',
                onclick: async () => {
                    // Find the currently selected shape
                    const annotations =
                        editorRef.current.editor.imageAnnotation;
                    const shape = annotations.find(
                        (shape) => shape.id === selectedShapeId
                    );

                    // browse for an image
                    const file = await browse({
                        accept: 'image/*',
                    });

                    // no file selected
                    if (!file) return;

                    // update background image
                    shape.backgroundImage = URL.createObjectURL(file);

                    // redraw annotations
                    editorRef.current.editor.imageAnnotation = annotations;
                },
            })
        );

        return controls;
    };



    useEffect(() => {
        const image = document.createElement('canvas');
        image.width = 600;
        image.height = 800;

        // The default <canvas> is transparent, let's make it white
        const imageContext = image.getContext('2d');
        imageContext.fillStyle = 'white';
        imageContext.fillRect(0, 0, image.width, image.height);
        setEditorSrc(image);
    }, [])



    return (
        <div className='mt-5 pt-5 px-5' style={{ height: '80vh' }}>
            <PinturaEditor
                ref={editorRef}
                {...editorDefaults}
                src={editorSrc}
                willRenderShapeControls={willRenderShapeControls}
                
                onProcess={(res) => {

                    props.setImage(res.dest)

                    props.setImgPre((prev) => {
                        if (props.id && prev) {

                            let newUrl = prev.replace(new RegExp('^' + `${BASEURL}/`), '');

                            props.setOldImage((prev) => {
                                return [...prev, newUrl]
                            })

                        }

                        return URL.createObjectURL(res.dest)
                    })

                    props.setEditor(null)

                }

                }


            />


        </div>

    )
}

export default EditImage