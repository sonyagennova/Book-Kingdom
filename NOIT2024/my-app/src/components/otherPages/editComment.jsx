import { Form, Modal, Button} from "react-bootstrap";
import * as commentService from "../../utils/commentService"

export function EditComment({show, com, setCom, comment, commentId, setShowEditComment, hideButton}) {
    const editComment = async(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target.form));
        //console.log(data)
        const accessToken = localStorage.getItem("accessToken")

        try {
            const result = await commentService.editComment(data, commentId, accessToken);
            //console.log(result)
            const editedComment = { _id: result.data._id, comment: data.comments, username: result.data.name, image: result.data.userImage, ownerId: result.data.ownerId };
            // Find the index of the comment in the array
            const commentIndex = com.findIndex((c) => c._id === commentId);
      
            // Replace the edited comment in the array
            setCom((prevState) => [
               ...prevState.slice(0, commentIndex),
               editedComment,
               ...prevState.slice(commentIndex + 1),
            ]);
            
         } catch (error) {
            console.error(error);
         }
        setShowEditComment(false);
        hideButton(false);
        
    }

    //console.log(commentId)

    const onClose = () => {
        setShowEditComment(false);
        hideButton(false);
    }

    return(
        <Modal show={show}>
        <Form>
        <Form.Label htmlFor="inputPassword5">Коментирай</Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        name="comments"
        defaultValue={comment}
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Редактирай коментара си.
      </Form.Text>
      <Modal.Footer>
            <>
              <Button variant="warning" onClick={editComment}>Редактирай</Button>
              <Button variant="secondary" onClick={onClose}>Затвори</Button>
            </>
        </Modal.Footer>
      </Form>
      </Modal>
    )
}