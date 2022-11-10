import { Modal } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import Filtercards from "pages/home-page/Filtercards";
import { toggleModal } from "store/reducers/categories";

function CategoriesModal() {

    const dispatch = useDispatch();
    const { modalOpen, mainCategories } = useSelector((state) => state.categories)
  
    return (
        
        <Modal
            isOpen={Boolean(modalOpen)}
            toggle={() => dispatch(toggleModal())}
        >
            <div className="modal-header">
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => dispatch(toggleModal())}
                >
                    <span aria-hidden={true}>x</span>
                </button>
                <h5 className="modal-title text-center">
                    Select Category
                </h5>
            </div>

            <div className="modal-body">
                <Filtercards
                    allcategory={mainCategories}
                    toggleModal={() => dispatch(toggleModal())}
                />
            </div>
        </Modal>
        
    );
}

export default CategoriesModal;
