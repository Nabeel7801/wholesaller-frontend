import React from 'react';
import { EditButton, useListContext, useRedirect } from 'react-admin';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';

const CategoryGrid = (props) => {
    const redirectTo = useRedirect();
    
    const { data, isLoading } = useListContext();
    if (isLoading) {
        return null;
    }

    const styles = {
        height: 160, 
        cursor: 'pointer',
        ':hover': {
            boxShadow: '2px 5px 5px rgba(30, 30, 30, 0.1)'
        }
    }
    
    const redirectToSubCategory = e => {
        if (props.currPage === "main") {
            localStorage.setItem('main', JSON.stringify({id: e.target.id, title: e.target.name}))
            redirectTo(`/subcategories`)
        }else if (props.currPage === "sub") {
            localStorage.setItem('sub', JSON.stringify({id: e.target.id, title: e.target.name}))
            redirectTo(`/childcategories`)
        }
    }

    return (
        <Grid container spacing={2} sx={{ marginTop: '1em' }}>
            {data.map(record => (
                <Grid key={record.id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>

                        <CardMedia
                            component="img"
                            image={record.image ? typeof record.image === 'string' ? `${window["apiLocation"]}/file/${record.image}` : record.image.src : `${window["apiLocation"]}/file/default.png`}
                            sx={styles}
                            id={record.id}
                            name={record.title}
                            onClick={redirectToSubCategory}
                            onError={(e)=>{e.target.onerror = null; e.target.src=`${window["apiLocation"]}/file/default.png`}}
                        />

                        <CardContent sx={{ paddingBottom: '0.5em' }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                align="center"
                                sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                            >
                                {record.title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <EditButton record={record} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryGrid;