import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Radio } from '@material-ui/core';
import { selectCategory, toggleModal } from 'store/reducers/categories';

function Filtercards(props) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    dispatch(selectCategory(JSON.parse(event.target.value)))
    dispatch(toggleModal());
  };

  return (
    <div>
      {props.allcategory.map(category => (
        <>
          <Grid container spacing={1}>
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

            <Grid item xs={7}>
              <div className='text-xl text-black font-bold mt-4'>{category.title}</div>
            </Grid>
            <Grid item xs={2}>
              <div className='mt-4'>
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleChange}
                  value={JSON.stringify({id: category.id, title: category.title})}
                  name='radio-button-demo'
                  inputProps={{ 'aria-label': 'A' }}
                />
              </div>
            </Grid>
          </Grid>
        </>
      ))}
    </div>
  );
}

export default Filtercards;
