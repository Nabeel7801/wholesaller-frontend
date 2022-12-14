import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@material-ui/core/";
import { toggleModal } from "store/reducers/categories";
import { populateProducts } from "store/reducers/products";

function TopSection() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const categorySelected = useSelector((state) => state.categories.selected);
    const products = useSelector((state) => state.products.list);

    const [searchText, setSearchText] = React.useState("");

    const searchProducts = (e) => {
        e.preventDefault();
        const filteredProducts = products.filter(p => p.reference?.toLowerCase().includes(searchText?.toLowerCase()));
        dispatch(populateProducts(filteredProducts || []))
        navigate(`/products?searchText=${searchText || ""}`);
    }

    return (
        <Grid container spacing={2} className="items-center">
            <Grid item md={3} className="flex justify-center">
                <div className="hidden md:block">
                    <img src={require("assets/img/logo2.png")} onClick={() => navigate("/")} />
                </div>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
                <div className="flex">
                    <button
                        className="flex-shrink-0 inline-flex items-center py-1 px-1 md:px-4 text-sm font-medium text-center border rounded-l-md hover:bg-gray-200 focus:outline-none"
                        onClick={() => dispatch(toggleModal())}
                    >   
                        {categorySelected?.title || "All categories"}

                        <svg className="ml-1 w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <form className="relative w-full" onSubmit={searchProducts}>
                        <input
                            type="search"
                            placeholder="What Are You Looking For?"
                            onChange={(e) => setSearchText(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-md border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none"
                        />

                        <button
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white  rounded-r-md border border-blue-700 focus:outline-none"
                            style={{ background: "#3f51b5" }}
                        >
                            <svg className="w-5 h-5" fill="#3f51b5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </Grid>
      </Grid>
    )
}

export default TopSection