import { useState } from "react";
import {InputGroup, Form, Modal, Button, ModalDialog} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as bookService from "../../utils/booksService"
import { CapitalizeFirstLowercaseRest } from "../partial/FirstLetterCapitel";

export function Edit({book, bookId, setBook, setShowInfo, category, setShowEdit, show, hideEditButton}){
    
  const editBook = async(e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target.form));
    //console.log(data)
    const accessToken = localStorage.getItem("accessToken")
    await bookService.editBook(data, bookId, accessToken)
        .then(result => {
            setBook(result.data)
        });
    show = false;
    setShowEdit(false)
    hideEditButton(false)
    //setShowInfo(false)
    setBook((state) => {
        return state
    })
}

    const onClose = () => {
        setShowEdit(false);
        hideEditButton(false)
    }

    return(
        <>
        <Modal show={show} backdrop="static">
        <Form>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Заглавие</InputGroup.Text>
        <Form.Control
        //   placeholder={book.title}
        defaultValue={book.title}
        name="title"
          aria-label="Title"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
        name="author"
          defaultValue={book.author}
          aria-label="Book's author"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">Автор</InputGroup.Text>
      </InputGroup>

      <Form.Label htmlFor="basic-url">URL линк за корица</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control id="basic-url" name="imageUrl" aria-describedby="basic-addon3" defaultValue={book.imageUrl}/>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control id="basic-url" name="publication_year" aria-describedby="basic-addon3" defaultValue={book.year_published}/>
        <InputGroup.Text id="basic-addon2">Година на издаване</InputGroup.Text>
      </InputGroup>

      <Form.Label htmlFor="basic-url">Издателство</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control id="basic-url" name="publisher" aria-describedby="basic-addon3" defaultValue={book.publisher}/>
      </InputGroup>

      <Form.Label htmlFor="basic-url">Категория</Form.Label>
<InputGroup className="mb-3">
  <Form.Select id="basic-url" name="category" aria-describedby="basic-addon3" defaultValue={book.category}>
  <option value="детска литература">Детска литература</option>
                <option value="историческа литература">Историческа литература</option>
                <option value="фентъзи">Фентъзи</option>
                <option value="мистерия">Мистерия</option>
                <option value="трагедия">Трагедия</option>
                <option value="приключенска литература">Приключенска литература</option>
                <option value="биография">Биография</option>
                <option value="класика">Класика</option>
  </Form.Select>
</InputGroup>

      <InputGroup>
        <InputGroup.Text>Описание</InputGroup.Text>
        <Form.Control as="textarea" name="description" defaultValue={book.description} aria-label="Description" />
      </InputGroup>

      <Modal.Footer>
            <>
              <Button variant="warning" onClick={editBook}>Редактирай</Button>
              <Button variant="secondary" onClick={onClose}>Затвори</Button>
            </>
        </Modal.Footer>
        </Form>
        </Modal>
          </>
    )
}