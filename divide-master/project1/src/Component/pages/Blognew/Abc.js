import React, {Component} from "react";
import ContactCard from "./ContactCard";
import ReactHtmlParser,{processNodes,convertNodeToElement,htmlparser2} from 'react-html-parser';

import {Redirect} from 'react-router-dom';
  import{Card,  CardColumns,Nav} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './stylesnew.css';
import { Container, Row, Col } from 'react-grid-system';

class Abc extends Component 
{ 

     constructor(props)
    {
        super(props);

        this.state=
        {
           items:[],
           isolated:false,
          //  redirect:false
        }
    }

    exploreClick(item){
      this.props.history.push({
        pathname:'/exploreblog',
        state: item
      })
    }
    componentDidMount()
         {
      fetch('http://16f6f9e6.ngrok.io/blog/display')
      // fetch('https://raw.githubusercontent.com/Asmitha-Asmi/Data_Json/master/blog.json')
       .then(res => res.json())
         .then(json => 
         {
           this.setState({
             isLoaded:true,
             items:json,
           })
           console.log('props are',this.props);
         }) ;
         }
        

render()
 {
   var  {isLoaded,items}=this.state;
//  const html={} <p>Content:{ReactHtmlParser(item.textAreaContent)}</p> onClick={this.setRedirect()}
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

       <ContactCard/>
                     

{/* <Container>
  <Row>
    <Col sm={4}>
      One of three columns
    </Col>
    <Col sm={4}>
      One of three columns
    </Col>
     </Row>
</Container> */}




<div className="cardstyle"> 
<CardColumns>
<div>
{items.map(item=>(
<Card className="stamps">
<div>
<Card.Body>
<center>
<Card.Title><strong>{item.title}</strong></Card.Title>

<p>{item.subject}</p>
</center>
{/* <p>Content:{ReactHtmlParser(item.textAreaContent)}</p> */}
<img 
src={item.url}
// width="200"

width="100%"
height="200"
/>


<Card.Footer >

<Button size="sm" variant="primary" onClick={()=>this.exploreClick(item)} >Explore</Button> 

</Card.Footer>
</Card.Body>
</div>
</Card>
))}
</div>
</CardColumns>
</div>

     </div>
   );
   }
 }
}
export default Abc;























