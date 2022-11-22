import React, { useEffect } from 'react'

import { useRecordContext, ImageInput, ImageField } from 'react-admin';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Box } from '@mui/material'

const ImageComponent = props => {
    const record = useRecordContext(props);

    const myRef= React.createRef();

    useEffect(() => {
        
        const elem = myRef.current.querySelector(".RaFileInput-preview");
        if (elem && elem.children.length === 0) {
            const img = document.createElement('img');
            img.src = record && record.image ? `${window["apiLocation"]}/file/${record.image}` : `${window["apiLocation"]}/file/default.png`;
            img.className = "RaImageField-image"
            elem.appendChild(img)
        } 
        
    }, [window["apiLocation"], myRef, record])

    const styles = {
        position: 'relative',
        paddingTop: '20px',
        height: '200px', 
        width: '100%',
        marginBottom: '20px',

        '& .defaultImage': {
            display: "block",
            objectFit: "cover",
            height: '180px', 
            width: '100%',
            borderRadius: '10px',
            padding: '8px',
            boxSizing: 'border-box',
        },

        '& .ra-input': {

            '& .previews': {
                position: 'absolute',
                top: '0',
                boxSizing: 'border-box',
                marginTop: '20px',
                height: '180px', 
                width: '100%',

                '& .RaImageField-image': {
                    zIndex: '10',
                    display: "block",
                    objectFit: "cover",
                    height: '180px', 
                    width: '100%',
                    borderRadius: '10px'
                },
            },

            '& .RaFileInput-removeButton, & .RaFileInput-preview': {
                width: '100%'
            },

        },

        '& .ra-input-image': {
            position: 'absolute',
            top: '0',
            '& .RaFileInput-dropZone': {
                backgroundColor: 'transparent',
                zIndex: '1000',
                height: '180px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            '& .RaFileInput-dropZone:hover': {
                backgroundColor: 'rgba(200, 200, 200, 0.4)',
            },

            '& .RaFileInput-dropZone:hover svg': {
                fontSize: '3rem',
                color: '#333'
            },
            '& svg': {
                color: 'transparent'
            }
        }
    }

    return (

        <Box sx={styles}>
            <div ref={myRef}>
                <img className="defaultImage" alt="default"
                    src={`${window["apiLocation"]}/file/${record.image}`}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${window["apiLocation"]}/file/default.png`;
                    }}
                />
                <ImageInput 
                    label="Attach an Image" 
                    accept="image/*"
                    placeholder={<span className="placeholder"><CollectionsIcon /></span>}
                    source="image"
                >
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </div>
        </Box>

    )
}

export default ImageComponent