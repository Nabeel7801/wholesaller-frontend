import React from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
 
function Filtercards(props) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const config = require('views/config');

  const handleChange = (event) => {
    props.setselectionCategory(JSON.parse(event.target.value));
    props.toggleModal();
  };

  return (
    <div>
      {props.allcategory.map(category => (
        <>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <img
                src={config.servername + '/readfiles/' + category.image}
                className='w-20 h-20 rounded-sm'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${config.servername}/readfiles/product_default.jpg`;
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
                  value={JSON.stringify({id: category._id, title: category.title})}
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
