import React, { useContext, useEffect } from 'react'

import { ImageInput, ImageField } from 'react-admin';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Box } from '@mui/material'
import { useWatch} from 'react-hook-form';

import { AppContext } from '../../../context';

const ImageComponent = props => {
    const { appState } = useContext(AppContext);
    const url = appState.ATLAS_URI;

    const myRef= React.createRef();
    const image = useWatch({name: "image"})
    
    useEffect(() => {
        const defaultImg = myRef.current.querySelector(".defaultImage");
        if (typeof image === "string") {
            defaultImg.src = `${url}/file/${image}`
        }
    }, [image, url, myRef])

    const styles = {
        position: 'relative',
        paddingTop: '20px',
        width: '14em',
        height: '15em',

        '& .defaultImage': {
            display: "block",
            objectFit: "cover",
            height: '15em', 
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
                width: '14em',
                height: '15em',
                
                '& .RaImageField-image': {
                    zIndex: '10',
                    display: "block",
                    objectFit: "cover",
                    height: '15em', 
                    width: '100%',
                    borderRadius: '10px'
                },
            },

            '& .RaFileInput-removeButton, & .RaFileInput-preview': {
                width: '100%'
            }

        },

        '& .ra-input-image': {
            position: 'absolute',
            top: '0',
            '& .RaFileInput-dropZone': {
                zIndex: '1000',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '15em', 
                width: '14em',
                backgroundColor: 'rgba(200, 200, 200, 0.1)',
            },

            '& .RaFileInput-dropZone:hover': {
                backgroundColor: 'rgba(200, 200, 200, 0.4)',
            },
            '& .RaFileInput-dropZone:focus': {
                backgroundColor: 'rgba(200, 200, 200, 0.1)',
            },

            '& .RaFileInput-dropZone svg': {
                fontSize: '3rem',
                color: 'rgba(51, 51, 51, 0.005)'
            },

            '& .RaFileInput-dropZone:hover svg': {
                color: '#333'
            },
            '& .RaFileInput-dropZone:focus svg': {
                color: 'rgba(51, 51, 51, 0.005)'
            },

            '& svg': {
                color: 'transparent'
            }
        }
    }

    return (

        <Box sx={styles}>
            <div ref={myRef}>
                <img 
                    className="defaultImage" 
                    src={`${url}/file/product_default.jpg`} 
                    alt="product" 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${url}/file/product_default.jpg`;
                    }}
                />
                <ImageInput 
                    label="Attach Product Image" 
                    accept="image/*"
                    placeholder={<span className="placeholder"><CollectionsIcon /></span>}
                    {...props}
                >
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </div>
        </Box>

    )
}

export default ImageComponent