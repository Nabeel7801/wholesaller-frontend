import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { Container, Box } from "@material-ui/core"
import { GlobalState } from '../../context/GlobalState'
import {
  useCloseOnEsc
} from "@weahead/react-customizable-modal";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

const Modal = () => {
  const { modal: [showModal, setShowModal] } = useContext(GlobalState)
  useCloseOnEsc(() => setShowModal(!showModal));

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }
  return (
    showModal ? (
      <Background ref={modalRef} onClick={closeModal} >
        <Container maxWidth="lg">
          <Box px={{ xs: 1, sm: 0 }}>
            <ModalWrapper showModal={showModal}>
              <iframe width="100%" height={"100%"} src="https://www.youtube.com/embed/Vs-TWDQQB18" title="YouTube video player"  frameBorder="{0}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </ModalWrapper>
          </Box>
        </Container>
      </Background>
    ) : null
  )
}
export default Modal
