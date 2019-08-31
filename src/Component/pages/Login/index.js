import React from 'react';
import './index.css';
import {Form,Button,Card,Nav,Navbar} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
constructor (props){
super(props);
this.state={
username:"",
password:"",
redirect:false
}
this.adminLogin=this.adminLogin.bind(this);
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
      return<Redirect to='/table'/>
  }

}

adminLogin=(e)=>{
e.preventDefault();
console.log(this.state)
axios.post('http://16f6f9e6.ngrok.io/final/authenticate',this.state)
.then(response=>{
console.log(response.data.token)
localStorage.setItem("token",response.data.token)

if(response.status== 200)
{
  this.props.history.push('/table');

  // this.setRedirect()
  // this.renderRedirect()
      // return(<Redirect to='/table'/>)
  
}   
else {
  console.log("invalid")
  alert("Invalid Credentials")

} 

});


}
myChangeHandler=(event)=>{
this.setState({
[event.target.name]:event.target.value
});
}

render (){
return (

<div>

  <Navbar bg="dark" variant="dark" fixed="top">
       <Navbar.Brand href="#home">
      <img
    src={require("/home/nineleaps/Downloads/divide-master/project1/src/Component/Logo-10.png")}
        width="200"
        height="40"
        className="d-inline-block align-top"
         alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="./">Login</Nav.Link>
      <Nav.Link href="./">Register</Nav.Link> */}
    
    </Nav>


      <Nav>
      <Nav.Link href="./">Login</Nav.Link>
      <Nav.Link eventKey={2} href="./">
       Register
      </Nav.Link>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
  </Navbar>
<div className="App-header" >


<Card style={{opacity:"0.85", marginTop:"8rem",marginLeft:"45rem"}}>
<Card.Header style={{Textallign:"center",background:"#566787",textAlign:"center"}}><text style={{fontWeight:"800",fontSize:"50px",color:"white"}}>Admin Login</text></Card.Header>
<Card.Body>
<Form >
<Form.Group controlId="formBasicEmail">
  <Form.Label style={{color:"black"}}>Email address</Form.Label>
    <Form.Control type="email" name="username" placeholder="Enter email" onChange={this.myChangeHandler} required/>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
    <Form.Label style={{color:"black"}}>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={this.myChangeHandler} required/>
</Form.Group>
{this.renderRedirect()}
<Button variant="primary" type="submit" onClick={(e)=>this.adminLogin(e)}>
Submit
</Button>
</Form>
</Card.Body>
</Card>
{/* </header> */}
</div>
</div>
);
}
}

export default Login;