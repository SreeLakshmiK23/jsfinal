import React,{Component} from 'react';
 import axios from 'axios';
import './Toolbar.css';
import Toolbar from './Toolbar.js';
import {Button,Accordion,Card,ButtonGroup,Alert} from 'react-bootstrap';
import { FaTrash} from "react-icons/fa";
import Modal from 'react-awesome-modal';
class PostList extends Component

{ constructor(props)
    {
        super(props);

        this.state=
        {
           items:[],
           isLoaded:false,
           show:true,
           visiblenew4:false,
        }
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

         openModal=() =>
    {
      this.setState({ 
        visible : true 
         });
    }

     
  

    closeModal = ()  => {
        this.setState({
            visible: false
        });
    }
    

    closeModalnew4()
{  
  this.setState({
            visiblenew4: false,
        });

}
closeModalrefresh()
{  
 window.location.reload(); 
}


    deleteitems=(id)=>
{   
  
  console.log(id)

      axios.delete('http://16f6f9e6.ngrok.io/faq/delete/'+id).then(response =>{
        console.log(response)
        if(response.status == "200"){
         
          this.openModalnew4()
        }
      })
  
}

render()
 {
   var  {isLoaded,items}=this.state;

   if(!isLoaded)
   {
     return (
       <div style={{marginTop:"12rem"}}>
       <center>
     <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
       </center>
       </div>)

   }
   else
   { return(
     <div >

       <Toolbar/>
         
  
         <div style={{width:"80%",marginLeft:"10rem", marginTop:"10rem"}}>   
          {items.map((item,i) =>(
            <Accordion style={{height:"auto",flexFlow:"row",marginTop:"10px"}} defaultActiveKey="1">
                  <Card >
                    <Accordion.Toggle style={{backgroundColor:"#566787"}} as={Card.Header} eventKey="0">
                    <div>
                      <text style={{color:'white'}}>{item.question }</text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   
                      
                      <a href="">  <FaTrash  style={{float:"right",color:"white"}} onClick={()=>this.deleteitems(item.id)}/></a>
                      
                      </div>
                    
                   

  
                    </Accordion.Toggle >
                    <Accordion.Collapse eventKey="0" style={{backgroundColor:"#ffe499"}}>
                      <Card.Body>{item.answer}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  </Accordion>
             ))}
          </div>

          <Modal visible={this.state.visiblenew4} width="600" effect="fadeInUp" class="btn btn-dark">
        <Alert show={this.state.show} variant="danger">
        <Alert.Heading>Are you sure you want to Delete this?</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.closeModalrefresh()} variant="outline-danger">
            Yes
          </Button> &nbsp; 
            <Button onClick={() => this.closeModalnew4()} variant="outline-danger">
            NO
          </Button>
        </div>
      </Alert>
      </Modal> 
          
         
     </div>
   );
   }
 }
}
export default PostList;

