import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SubCategories() {

  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.list);
  const categorySelected = useSelector((state) => state.categories.selected);

  return (
    <div className="w-full relative overflow-hidden">
      <div className="overflow-x-auto flex justify-center gap-4 my-2">
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
                    className="w-36 h-36 rounded-full m-auto"
                    alt="category"
                    src={`${window["apiLocation"]}/readfiles/${category.image}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                    }}
                  />

                  <div className="mt-1 text-center text-sm md:text-base font-semibold text-black">
                    {category.title}
                  </div>
                </div>
              );
          })
        }
      </div>
    </div>
  );
}

export default SubCategories;
