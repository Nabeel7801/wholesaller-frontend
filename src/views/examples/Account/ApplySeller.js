import React, { useState, useEffect } from 'react';
import { Button, Label, FormGroup, Input, Modal, Row, Col } from 'reactstrap';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { Tag, message } from 'antd';
import MainNavbar from 'components/Navbars/MainNavbar.js';
function ApplySeller() {
  const [category, setcategory] = useState('');

  const [businessname, setbusinessname] = useState('');
  const [marketplace, setmarketplace] = useState('');
  const [businesstype, setbusinesstype] = useState('');
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const applyforseller = async () => {
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/applyforseller', {
        businessname: businessname,

        businesstype: businesstype,
        category: category,
        id: JSON.parse(localStorage.getItem('wholesaller'))._id,
      })
      .then((res) => {
        alert(res.data);
        message.info('You have applied for Seller');
        window.location.href = '/';
      });
  };

  return (
    <div>
      <MainNavbar />
      <br />
      <Container maxWidth='sm'>
        <div className='modal-header'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            Apply for Seller
          </h5>
        </div>
        <div className='modal-body'>
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>Name</Label>
              <FormGroup>
                <div class='ui left icon input input-styl'>
                  <i aria-hidden='true' class='user circle icon'></i>
                  <input
                    type='text'
                    onChange={(e) => setbusinessname(e.target.value)}
                    placeholder='Business Name'
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <FormGroup>
                <Label for='exampleSelect'>business type</Label>
                <Input
                  type='select'
                  name='select'
                  id='exampleSelect'
                  onChange={(e) => setbusinesstype(e.target.value)}
                >
                  <option>--select option--</option>
                  <option>Manufacturer</option>
                  <option>Trader Supplier</option>
                  <option>Wholesaller</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <FormGroup>
                <Label for='exampleSelect'>Category</Label>
                <Input
                  type='select'
                  name='select'
                  id='exampleSelect'
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option>--select option--</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                  <option>Electronic Accessories</option>

                  <option>Artifical Jewellery</option>
                  <option>IT and Computer</option>
                  <option>Home & Kitchen</option>
                  <option>Footwear</option>
                  <option>Others Accessories</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <FormGroup>
                <Label for='exampleSelect'>Sub Category</Label>
                <Input
                  type='select'
                  name='select'
                  id='exampleSelect'
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option>--select option--</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>Are you selling other marketplace</Label>
              <FormGroup>
                <div class='ui left icon input input-styl'>
                  <input
                    type='text'
                    placeholder=' marketplace'
                    onChange={(e) => setmarketplace(e.target.value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>City</Label>
              <div class='ui left icon input input-styl'>
                <input
                  type='text'
                  placeholder=' City'
                  onChange={(e) => setmarketplace(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className='modal-footer'>
          <div className='left-side'>
            <Button className='btn-link' color='danger' type='button'>
              Cancel
            </Button>
          </div>
          <div className='divider' />
          <div className='right-side'>
            <Button
              className='btn-link'
              color='success'
              type='button'
              onClick={applyforseller}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ApplySeller;
