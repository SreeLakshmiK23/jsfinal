import React, {Component} from 'react';
import axios from 'axios';

// import button from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
// import './fetch.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import './profilecss.css';
import{Card,Button,Image} from 'react-bootstrap';
import { FaEnvelope,FaPhone,FaAddressCard,FaBriefcase} from "react-icons/fa";
import Header from './../../Headernew';

// import ReactHtmlParser,{processNodes,convertNodeToElement,htmlparser2} from 'react-html-parser';

  class profile extends Component
  {
  constructor(props)
  {
      super(props);
      this.state={
          checked:false,
          data:[],
          idata:[],
          isLoaded: true
  
      }
  }

componentDidMount(){
//  return fetch('https://54e275d4.ngrok.io/list')
// .then(res=>res.json())
// .then(json => {
// this.setState({
// isLoaded:false,
// data:json,
// })
// });

//  fetch('https://54e275d4.ngrok.io/final/data',{
//     method:'POST',
//     headers:{
//       Accept:'application/json',
//       'content-Type':'application/json'
//       },
//       body:JSON.stringify({
//         phone:"+91"+this.props.history.location.state.phone
//       }),
//   }
// )
axios.post('http://16f6f9e6.ngrok.io/final/data1',{phone:this.props.history.location.state.phone})
.then(response=>{
  console.log("data aa raha hai ",response)
  this.setState({
  isLoaded:false,
  data:response.data,
    })
  })
}

sendResponse(item){
  axios.post('http://16f6f9e6.ngrok.io/final/updatecheck',item).then(response=>{
  const statusCode= response.status;
  this.componentDidMount()
})
}
    render()

    { 
        console.log(this.props.history.location.state.id);
        const{items}=this.state;
        return(
<div>   
 
<Header/>
    






 <div className='abc'>
 <section className="aasection"  >
 
  
  <div className="left-half">

  {/* <div style={{float:"left",width:"45%"}}> */}
   <Card
    style={{height:'635px' ,width:'auto',margin:'10px',padding:'60px',marginTop:"6rem"}}
    class="cardView">
    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbV5SgrUFQAfOK_QxSoffelnRrg1dJmIgHSbaEB2pz3t9UHRSb' 
    style={{height:'100px' ,width:'100px'}} />

    <Card.Body>
      
       
    
      <h1>{this.props.history.location.state.name}</h1>
      <text>this guy works in nineleaps</text>
      <br/>
      <br/>
      <FaEnvelope/><text className='textStyle'>{this.props.history.location.state.email}</text>
      <br/>
      <br/>
      <FaPhone/><text className='textStyle'>{this.props.history.location.state.phone}</text>
      <br/>
      <br/>
      <FaAddressCard/><text className='textStyle'>{this.props.history.location.state.place}</text>
      <br/>
      <br/>
      <FaBriefcase/><text className='textStyle'>{this.props.history.location.state.designation}</text>
      <br/>
      <br/>
      <br/>
     {/* <Button primary>Edit</Button>  {""}
      <Button secondary>Save</Button> */}
   
      </Card.Body>
    </Card>

  </div>
  {/* <Card style={{height:'10%',width:'50%'}}>
  <Card.Body>
   <h1 >Document Status</h1>
   </Card.Body>
  </Card> */}


  
  <div className="right-half">
  {
    this.state.data.map((item)=>{
         return(
      
    //  <div style={{height:"50%",float:"right",height:'50%',width:"50%",overflow:"true"}}>
    
  <Card  
  
  //  style={{backgroundcolor:'#e6e6e6',margin:'10px',padding:'10px',borderRadius:'10px',marginTop:"6rem"}}
   >
     
  <Card.Body>
   <Card.Header style={{fontWeight:'1000',fontSize:'50'}}>{item.checklist_name}</Card.Header>
   </Card.Body>
   <hr/>
    
     <List>
     {item.data.map((doc,i)=>{
         
         return (
           <ListItem >
             <ListItemText  primary={doc.document_name} />
             <ListItemSecondaryAction>
               <Checkbox document_name
                 edge="end" 
                 value={doc.document_status}
                 onChange={()=>{doc.document_status=!doc.document_status;this.sendResponse(item)}}
                 checked={doc.document_status}/>
             </ListItemSecondaryAction>
           </ListItem>
         );
         })
       }
     </List>     
   </Card>
  // </div>
     )
  })}
</div>  
 </section>

 </div>
  );
}

}





</div>


);
    }
    }
export default profile;
