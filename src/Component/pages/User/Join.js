import React,{Component,useState} from 'react';
import {Button,Table,Form,Col,InputGroup,Alert} from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-awesome-modal';

import { render } from "react-dom";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import { createBrowserHistory } from 'history';
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Header from './../../Headernew';
const history = createBrowserHistory();

const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
});






class Join extends Component {

  
  constructor(props){
    super(props);
  this.state={
    // visiblenew: false,
        data:[],
        isLoaded: false,
        show:true,
        
        i:1,

      // value: null,
      arrayValue: [],
      datalist:[],
      redirect:false,
      name: '',
            phone: '',
            email: '',
            place: '',
            designation: '',
            values:'',
           
  };

    this.selectMultipleOption = this.selectMultipleOption.bind(this);
   
  
}



async componentDidMount(){
  var res1 = await axios.get('http://16f6f9e6.ngrok.io/final/listuser');
  var res2= await axios.get('http://16f6f9e6.ngrok.io/distinct');
  console.log(res1, res2);
  this.setState({
      isLoaded:true,
      data:res1.data,
      datalist:res2.data,
    })            
  console.log(this.state);
  this.userClick=this.userClick.bind(this);
}

 changetry =(event,object,id) => {
event.preventDefault();
console.log("here is the object",object)

 console.log("this.props",this.props)  
     //props is not initialized

 this.props.history.push({
    pathname: '/viewprofile/',
    state:{detail:object.id}
    // state : {id: 1}
 })
  }

    //  setRedirectnew=() =>
    // {
    //     window.location.reload();
    // }

    //     setRedirect=() =>
    // {
    //     this.setState({
    //         redirect:true
    //     })
    //     //window.location.reload();
    // }

    // renderRedirect =() =>{
    //     if(this.state.redirect)
    //     {
    //         return<Redirect to='/profile'/>
    //     }
     
    // }

   openModal=(phone) =>
    {
      this.setState({ phone: phone, visible : true });
      // const postData = { phone: this.state.phone }  onClick={ (e)=>this.changetry(e,obj,phone)} 
}  

    closeModal = ()  => {
        this.setState({
            visible: false,
             arrayValue: [],
    
        });
         this.closeModalnew3()
    }
    result(params) {
    console.log(params);
  }
    submitHandler = async e =>
    {  
        e.preventDefault();
        const payload = {
          selections: this.state.arrayValue.toString(),
          phone: this.state.phone,
        }
        console.log('Payload', payload);
        try {
        await axios.post('http://16f6f9e6.ngrok.io/final/assign',payload);
        this.closeModal()
        this.openModalnew2()
        // alert('Successfully posted data!')
        
        } catch (e) {
          console.log(e);
          alert('Error posting data!')
        }
    }
    
    userClick(item){
      console.log('=====', this.props);
      this.props.history.push({
        pathname:'/viewprofile',
        state: item
      })
    }

  selectMultipleOption(value) {
    console.count('onChange')
     console.log("Val", value);
     this.setState({ arrayValue: value }); 
  }
  openModalnew() {
        this.setState({
            visiblenew: true,
         
        });
    
    }

    openModalnew2()
    {
       this.setState({
            visiblenew2: true,
         
        });
        return false;
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
    closeModalnew() {
      // console.log("i am getting called")
        this.setState({
          visiblenew: false,
          name: '',
          phone: '',
          email: '',
          place: '',
          designation: ''
        });
      this.closeModalnew3() 
    }
  changeHandlernew = e => {
        if(e.target.name == "phone")
        {
        this.setState({ [e.target.name]:"+91"+ e.target.value })
        }
        else{
          this.setState({ [e.target.name]: e.target.value }) 
        }
    }


    submitHandlernew = e => {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('http://16f6f9e6.ngrok.io/final/save', this.state)
            .then(response => {

                console.log(response)
                              
                 if(response.status == "200"){
                //  alert('Your Record has been succesfully submitted')
                //  return( this.AlertDismissiblepop())
                  // this.componentDidMount()
                  this.closeModalnew()
                  this.openModalnew2()
                        // this.closeModalnew2()
                
                  
                //  window.location.reload();
                }
                else
                {
                  this.openModalnew3()
                }
            
               

            })
            .catch(error => {

                console.log(error)

            })

    }
//   AlertDismissiblepop(){
//     return(
//       <view>
// <AlertDismissible/>
// </view>
//     )
//   }

  render() { 
    var { i,isLoaded,data,arrayValue}= this.state;

    var {datalist}=this.state;
    
    {console.log(datalist)}
   const bigList=this.state.datalist;
  const{ name, phone, email, place,designation,values } = this.state


    if(!isLoaded){

      return (
        <div style={{marginTop:"12rem"}}>
  
     
        <center>
      
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>
       </center>
       </div> )
    }
    else{
      return (  

        <div>
<Header/>
                       
                       
                          <div className="actual">
                          
                            <input type="button" value="Add user"  class="btn btn-primary" onClick={() => this.openModalnew()} />
                        
                            
                            </div>
                           <div>
                             <section>
                            <Modal visible={this.state.visiblenew}  effect="fadeInUp" class="btn btn-dark">
                            <Button  data-dismiss="modal" class="close" onClick={() => this.closeModalnew()} style={{float:"right"}}>X</Button>
                                {/* <div style={{}}>
                                    <h1 style={{flex:"start"}}> User Details</h1> 
                                    <Button  data-dismiss="modal" class="close" onClick={() => this.closeModalnew()} style={{float:"right"}}>X</Button>
                                 </div> */}
                                
                                
                                 <div>
                                    
   
                                  
<Form onSubmit={this.submitHandlernew}  style={{padding:"2rem"}}>


  <Form.Group controlId="formGridAddress1">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text"  name="name"  value={this.state.values.name}
                onChange={this.changeHandlernew} placeholder="Name" required />
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Phone</Form.Label>
    <InputGroup>
    <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
           
    <Form.Control   name="phone"  value={this.state.values.phone}
                onChange={this.changeHandlernew} placeholder="Phone"  maxLength="10" required  />
                 </InputGroup.Prepend>
    </InputGroup>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" name="email"  value={this.state.values.email}
                onChange={this.changeHandlernew} placeholder="Email"   required  />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Place</Form.Label>
    <Form.Control type="text" name="place"  value={this.state.values.place}
                onChange={this.changeHandlernew} placeholder="Place"  required />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Designation</Form.Label>
      <Form.Control type="text"  name="designation" value={this.state.values.designation}
                onChange={this.changeHandlernew} placeholder="Designation"   required />
    </Form.Group>




  </Form.Row>

  <Button variant="primary" type="submit">
    Submit
  </Button> &nbsp; &nbsp;
   <Button variant="primary" type="submit" onClick={()=>this.openModalnew3()}>
    Cancel
  </Button>
</Form>

    

                                </div>
                            </Modal>
                        </section>
                    
        </div>
          <div key={data.id} >          
            {/* <table class="table" style={{width:" 80%", color: "#212529",    margin: "110px",
                    border:" 2px solid red"}}> */}
            <Table striped bordered hover style={{width:"80%",marginLeft:"8rem"}} >
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
              
                <th>Mobile</th>
                <th>email</th>
                <th>Place</th>
                <th>Designation</th>
                <th></th>
              </tr>
            </thead>
            {

                   
              data.map(obj=>( 
                    
                
                   <tbody>
                     
                   
                     <tr>
                       <td>{` ${i++}`}</td>
                       <td>{obj.name}</td>
                       
                       <td>{obj.phone}</td>
                       <td>{obj.email}</td>
                       <td>{obj.place}</td>
                       <td>{obj.designation}</td>
                      <div className="actualone">
                       <Button size="sm" onClick={()=>this.openModal(obj.phone)}  variant="primary">Assign</Button> &nbsp; &nbsp;
                       <Button size="sm" variant="secondary"  onClick={()=>this.userClick(obj) } >Profile</Button>
                    </div>
                     </tr>
                     
                      
              
                   </tbody>))
                   }
                 {/* </table> */}
                 </Table>
               
              
          </div>  
          
  <Modal visible={this.state.visible} effect="fadeInUp">
  <Button  data-dismiss="modal" class="btn btn-dark" class="close" onClick={() => this.closeModal()} style={{float:"right"}}>X</Button>
     <h2><center><strong>Assign checklist</strong></center></h2>
     <Form  className="spacing">
       
       
          <div>
          
           
                 <Picky
              value={this.state.arrayValue}
              options={bigList}
              onChange={this.selectMultipleOption}

              onChange={e => this.selectMultipleOption(e)}
              open={false}
              valueKey="id"
              labelKey="name"
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              // dropdownHeight={600}
            />
          </div>

  

  
    <div className="place">
    <Button class="btn btn-primary" type="submit" onClick={this.submitHandler}>Assign</Button>  &nbsp;
       <Button onClick={()=>this.openModalnew3()}  class="btn btn-info">Cancel</Button>
     {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */} 
       </div>
       </Form>
  
  
    </Modal>

            
            <Modal visible={this.state.visiblenew2} width="600" effect="fadeInUp" class="btn btn-dark" >
             <Alert show={this.state.show} variant="success">
        <Alert.Heading>Successfully Assigned to user</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.closeModalnew2()} variant="outline-success">
          {/* openModalnew2:false */}
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
          <Button onClick={()=>{this.closeModal();this.closeModalnew()}} variant="outline-danger">
            Yes
          </Button> &nbsp; 
            <Button onClick={() => this.closeModalnew3()} variant="outline-danger">
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
 
export default withRouter(Join);