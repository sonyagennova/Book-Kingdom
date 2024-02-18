import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as userService from "../../utils/userService"


export function Discount({showModal, closeModal}){
    const [publishing_house, isPublishing_house] = useState(false)
    const [show, setShow] = useState(false)
    const [showVoucherX, setShowVoucherX] = useState(false)
    const [showVoucherY, setShowVoucherY] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)

    const onPublishingHouseBtnClicked = () => {
        isPublishing_house(true);
        setShow(true)
        setIsDisabled(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const onPublishingHouseX = async() => {
        await userService.setVouchers(localStorage.getItem("auth").split(",")[2], "../../../images/Ваучер за книги/1.png")
        setShowVoucherX(true)
        setShow(false)
    }

    const closeVoucherModalX = () => {
        setShowVoucherX(false)
    }

    const onPublishingHouseY = async() => {
        await userService.setVouchers(localStorage.getItem("auth").split(",")[2], "../../../images/Ваучер за книги/2.png")
        setShowVoucherY(true)
        setShow(false)
    }

    const closeVoucherModalY = () => {
        setShowVoucherY(false)
    }

    return(
        <>
        <>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Спечелихте!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Поадравления! Вие спечелихте <span style={{color: "tomato"}}>10% намаление</span> от издателство!</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={closeModal}>
            Затвори
          </Button> */}
          <Button variant="primary" disabled={isDisabled} onClick={onPublishingHouseBtnClicked}>
            Избери издателство
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    {publishing_house && 
        <>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Избери издателство</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
          <Button variant="primary" onClick={onPublishingHouseX}>
              Издателство Х
            </Button>
            <Button variant="primary" onClick={onPublishingHouseY}>
            Издателство Y
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    }

    {showVoucherX && 
        <Modal show={showVoucherX} onHide={closeVoucherModalX}>
        <Modal.Header closeButton>
          <Modal.Title>Ваучер за издателство Х</Modal.Title>
        </Modal.Header>
        <Modal.Body><img style={{width: "300px"}} src='../../../images/Ваучер за книги/1.png'/></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeVoucherModalX}>
            Затвори
          </Button>
        </Modal.Footer>
      </Modal>
    }

{showVoucherY && 
        <Modal show={showVoucherY} onHide={closeVoucherModalY}>
        <Modal.Header closeButton>
          <Modal.Title>Ваучер за издателство Y</Modal.Title>
        </Modal.Header>
        <Modal.Body><img style={{width: "300px"}} src='../../../images/Ваучер за книги/2.png'/></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeVoucherModalY}>
            Затвори
          </Button>
        </Modal.Footer>
      </Modal>
    }

    </>
    )
}