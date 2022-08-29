import React, { useContext } from 'react';
import { useTheme, useMediaQuery, Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useCreatePath, useListContext, ReferenceField, TextField } from 'react-admin';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context';

const GridList = () => {
    const { isLoading } = useListContext();
    return isLoading ? <LoadingGridList /> : <LoadedGridList />;
};

const useColsForWidth = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    // there are all dividers of 24, to have full rows on each page
    if (xl) return 8;
    if (lg) return 6;
    if (md) return 4;
    if (sm) return 3;
    return 2;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
    const { perPage } = useListContext();
    const cols = useColsForWidth();
    return (
        <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
            {times(perPage, key => (
                <ImageListItem key={key}>
                    <Box bgcolor="grey.300" height="100%" />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

const LoadedGridList = () => {
    const { appState } = useContext(AppContext);
    const url = appState.ATLAS_URI;

    const { data } = useListContext();
    const cols = useColsForWidth();
    const createPath = useCreatePath();

    if (!data) return null;

    return (
        <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
            {data.map(record => (
                <ImageListItem
                    component={Link}
                    key={record.id}
                    to={createPath({
                        resource: 'products',
                        id: record.id,
                        type: 'edit',
                    })}
                    sx={{
                        overflow: 'hidden'
                    }}
                >
                    <img alt=""
                        src={`${url}/file/${record.image}`}
                        onError={(e)=>{e.target.onerror = null; e.target.src=`${url}/file/product_default.jpg`}}/>
                    <ImageListItemBar
                        title={record.reference}
                        subtitle={
                            <span>
                                ₹ <TextField source="price" record={record} sx={{fontSize: '1em'}}/>
                                <ReferenceField
                                    source="category_id"
                                    reference="categories"
                                    record={record}
                                    link={false}
                                >
                                    <span style={{fontSize: '0.7rem'}}>
                                        &nbsp;(<TextField source="name" sx={{fontSize: '0.75rem'}}/>)
                                    </span>
                                </ReferenceField>

                            </span>
                        }
                        sx={{
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default GridList;
