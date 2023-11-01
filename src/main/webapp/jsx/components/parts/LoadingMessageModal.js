import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CircularProgress, Snackbar } from "@mui/material";

function LoadingMessageModal(props) {
  return (

    <div style={{maxWidth: '100px'}}>
            <Modal
      {...props}
    //   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
   
      <Modal.Body>
        <h4 style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center'}}> <CircularProgress size={34} /> <span>{props.message}</span></h4>
        <p>
   
        </p>
      </Modal.Body>
     
    </Modal>

    </div>
  );
}

export default LoadingMessageModal

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// } 

// render(<App />);