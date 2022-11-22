import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slide, Dialog, DialogContent } from '@mui/material';

import Filtercards from "pages/home-page/Filtercards";
import { toggleModal } from "store/reducers/categories";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoriesModal = () => {

    const dispatch = useDispatch();
    const { modalOpen, mainCategories } = useSelector((state) => state.categories)
  
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

                <Filtercards
                    allcategory={mainCategories}
                    toggleModal={() => dispatch(toggleModal())}
                />

            </DialogContent>
        </Dialog>
        
    );
}

export default CategoriesModal;
