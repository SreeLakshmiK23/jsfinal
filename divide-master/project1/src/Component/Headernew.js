import React,{Component} from 'react';
import {Navbar,Button,Nav} from 'react-bootstrap';

class Header extends Component
{
render()
{

return(
  <Navbar bg="dark" variant="dark" fixed="top">

    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
      <Navbar.Brand href="#home">
      <img
    src={require("/home/nineleaps/Downloads/divide-master/project1/src/Component/Logo-10.png")}
        width="200"
        height="40"
        className="d-inline-block align-top"
        // alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="./table">Checklist</Nav.Link>
      <Nav.Link href="./faqdis">Faq</Nav.Link>
      <Nav.Link href="./displayblog">Blog</Nav.Link>
       <Nav.Link href="./join">User</Nav.Link>
        <Nav.Link href="./">Logout</Nav.Link> */}
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
     
  

     <Nav>
      <Nav.Link href="./table" >Checklist</Nav.Link>
      <Nav.Link eventKey={2} href="./faqdis">
        FAQ
      </Nav.Link>
       <Nav.Link eventKey={2} href="./displayblog">
       Blog
      </Nav.Link>
       <Nav.Link eventKey={2} href="./join">
      User
      </Nav.Link>
        <Nav.Link eventKey={2} href="./">
      Logout
      </Nav.Link>
    </Nav>
  </Navbar>
)
}
}
export default Header