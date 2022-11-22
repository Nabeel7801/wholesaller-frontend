import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@material-ui/core/";
import { toggleModal } from "store/reducers/categories";

function MainCategoriesSection() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.list);
  const categorySelected = useSelector((state) => state.categories.selected);

  return (
    <>
      <Grid container spacing={{ xs: 0, md: 6 }} alignItems="center">
        <Grid item xs={12} md={3} lg={3}>
          <div className="hidden md:block">
            <a onClick={() => navigate("/")}>
              <img src={require("assets/img/logo2.png")} />
            </a>
          </div>
        </Grid>

        <Grid item xs={12} md={8} lg={7}>
          <div className="s003 md:ml-2  bg-white">
            <form>
              <div className="flex">
                <button
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center py-1 px-1 md:px-4 text-sm font-medium text-center border rounded-l-lg hover:bg-gray-200 focus:outline-none"
                  type="button"
                  onClick={() => dispatch(toggleModal())}
                > 
                  
                  {categorySelected?.title || "All categories"}
                  
                  <svg
                    className="ml-1 w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>

                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="What Are You Looking For?"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white  rounded-r-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  "
                    style={{ background: "#3f51b5" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="#3f51b5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>

      <div>
        <div className="w-full h-full relative overflow-hidden">
          <div className="overflow-x-auto flex justify-center gap-6 my-12">
            {categories
            .filter(category => category.parent === categorySelected?.id)
            .map(category => {
                return (
                  <div
                    className="relative cursor-pointer"
                    style={{ minWidth: "100px", height: '100%' }}
                    onClick={() => navigate(`/categories/${category.id}`)}
                  >
                    <img
                      className="w-40 h-40 rounded-full m-auto"
                      alt=""
                      src={`${window["apiLocation"]}/readfiles/${category.image}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                      }}
                    />
                    <div className="mt-2 text-center text-sm md:text-base font-semibold text-black">
                      {category.title}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainCategoriesSection;
