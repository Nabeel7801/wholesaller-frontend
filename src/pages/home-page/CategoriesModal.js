import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slide, Dialog, DialogContent, Grid, Radio } from '@mui/material';

import { selectCategory, toggleModal } from "store/reducers/categories";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoriesModal = () => {

    const dispatch = useDispatch();
    const { modalOpen, mainCategories, selected } = useSelector((state) => state.categories)
    
    const handleClick = ({id, title}) => {
        dispatch(selectCategory({ id, title }))
        dispatch(toggleModal());
    };

    return (
        
        <Dialog
            maxWidth="sm"
            keepMounted
            open={Boolean(modalOpen)}
            TransitionComponent={Transition}
            onClose={() => dispatch(toggleModal())}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px', 
                    margin: 'auto',
                    width: '420px',
                    maxWidth: '95%',
                }
            }}
        >
            <DialogContent>

                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <h5 className="modal-title text-center">
                        Select Category
                    </h5>

                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={() => dispatch(toggleModal())}
                    >
                        <span aria-hidden={true}>x</span>
                    </button>
                </div>

                <hr />

                {mainCategories.map((category) => (
                    <Grid container spacing={1} className="my-1 cursor-pointer" onClick={() => handleClick(category)}>
                        <Grid item xs={3}>
                            <img
                                src={`${window["apiLocation"]}/readfiles/${category.image}`}
                                className='w-40 h-40 rounded-sm'
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                                }}
                            />
                        </Grid>

                        <Grid item xs={7} className="flex items-center">
                            <div className='text-xl text-black font-bold'>{category.title}</div>
                        </Grid>

                        <Grid item xs={2} className="flex items-center">
                            <Radio checked={selected?.id === category.id} />
                        </Grid>
                    </Grid>

                ))}
                
            </DialogContent>
        </Dialog>
        
    );
}

export default CategoriesModal;
