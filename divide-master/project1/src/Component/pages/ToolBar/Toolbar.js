import React , {Component} from 'react';
// import {button} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Toolbar.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import{Form,FormGroup,Row,Col} from 'react-bootstrap';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
//   import Modal from 'react-bootstrap/Modal'
  import {Button,Alert} from 'react-bootstrap';
   import Modal from 'react-awesome-modal';
import { Container } from '@material-ui/core';
import Header from './../../Headernew';
// import { Modal, Button } from 'antd'; 

class Toolbar extends Component
{
      constructor(props)
    {
        super(props)

        this.state={
            question:'' ,
            category:'' ,
            answer:'' ,
            visible: false,
            show:true,
            //  items: []
        }
    }

    setRedirect=() =>
    {
        this.setState({
            redirect:true
        })
    }

    renderRedirect =() =>{
        if(this.state.redirect)
        {
            return<Redirect to='/faqdis'/>
        }
     
    }
         openModal=() =>
    {
      this.setState({ 
          visible : true,
            question:'' ,
            category:'' ,
            answer:'' ,
        
            });
    }

     
    closeModal = ()  => {
        this.setState({
            visible: false
        });
        this.closeModalnew3()
    }

    //  handleClose = () => setShow(false);
    //  handleShow = () => setShow(true);

       changeHandler= e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    componentDidMount()
         {
      fetch('http://16f6f9e6.ngrok.io/faq/displayall')
       .then(res => res.json())
         .then(json => 
         {
           this.setState({
             isLoaded:true,
             items:json,
           })
         }) ;
         }

        submitHandler= e =>
    {
        e.preventDefault()
        console.log(this.state)
        axios
        .post('http://16f6f9e6.ngrok.io/faq/save',this.state)

        .then(response => {
            console.log(response)
            if(response.status == "200"){
                this.closeModal()
                 this.openModalnew2()
            //    window.location.reload()
              }
        })
        .catch(error => {
            console.log(error)
        })
        //  window.location.reload(e);
    }
      notify = () => toast("Wow so easy !");
      closeabc = () => {
          this.setState({show:false})
      }

       openModalnew2()
    {
       this.setState({
            visiblenew2: true,
         
        });
       
    }
closeModalnew2()
{  
  this.setState({
            visiblenew2: false,
         
        });

}   

    openModalnew3()
    {
       this.setState({
            visiblenew3: true,
         
        });
       
    }
closeModalnew3()
{  
  this.setState({
            visiblenew3: false,
         
        });

} 

    render()
   {
       
        const{question,category,answer}=this.state
       return(
           <div>
<Header/>
   <div className="actual">
     <button type="button" class="btn btn-primary" onClick={()=>this.openModal()}>ADD FAQ</button>    
   
</div>









 <div>


 

           <Modal visible={this.state.visible}  effect="fadeInUp"  >
           <Button  data-dismiss="modal" class="close" class="btn btn-dark" onClick={() => this.closeModal()} style={{float:"right"}}>X</Button>
           <Container style={{padding:"30px"}}>
           <Form>
                
           <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="auto">
                    Question :
                    </Form.Label>
                    <Col >
                    <Form.Control value={this.state.question}
                onChange={this.changeHandler} type="text" name="question" placeholder="Question" required />
                    </Col>
                </Form.Group> 
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="auto">
                    Category :
                    </Form.Label>
                    <Col >
                    <Form.Control value={this.state.category}
                onChange={this.changeHandler} type="text" name="category" placeholder="Category" required/>
                    </Col>
                </Form.Group> 
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label >Answer :</Form.Label>
                    <Form.Control value={this.state.answer}
                onChange={this.changeHandler} as="textarea" name="answer"  rows="3" />
                        
                    
                </Form.Group>
                <Button style={{marginLeft:"5rem"}} variant="primary" type="submit" onClick={()=>this.submitHandler()}>
                 Submit
                </Button>
                <Button style={{marginLeft:"3px"}} variant="primary" variant="dark" onClick={()=>this.openModalnew3()}>
                 Cancel
                </Button>
            </Form>
            </Container>
                            
                               
            </Modal> 


      <Modal visible={this.state.visiblenew2} width="600" effect="fadeInUp" class="btn btn-dark" >
             <Alert show={this.state.show} variant="success">
        <Alert.Heading>Successfully entered the questions</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.closeModalnew2()} variant="outline-success">
      
            Close
          </Button>
        </div>
      </Alert>
</Modal>

        <Modal visible={this.state.visiblenew3} width="600" effect="fadeInUp" class="btn btn-dark">
        <Alert show={this.state.show} variant="danger">
        <Alert.Heading>Are you sure you want to cancel?</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.closeModal()} variant="outline-danger">
            Yes
          </Button> &nbsp; 
            <Button onClick={() => this.closeModalnew3()} variant="outline-danger">
            NO
          </Button>
        </div>
      </Alert>
      </Modal> 
      

            </div>

  </div>
       );
   }
}

export default Toolbar;

