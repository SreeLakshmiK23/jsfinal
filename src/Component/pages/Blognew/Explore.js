import React, {Component} from 'react';
import './Toolbar1.css';
// import button from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './stylesnew.css';
import {Button} from 'react-bootstrap';
import ReactHtmlParser,{processNodes,convertNodeToElement,htmlparser2} from 'react-html-parser';
import Header from './../../Headernew';

    class explore extends Component
{
     constructor(props)
    {
        super(props);

        this.state=
        {
           items:[],
           abc:'',
          
           redirect:false
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
            return<Redirect to='/displayblog'/>
        }
     
    }
    render()

    { 
        console.log(this.props.history.location.state.id);
        const{items}=this.state;
        return(
<div>   
 
<Header/>

<div className="containernew">

<Button onClick={this.setRedirect} class="btn btn-success">Go Back</Button>
<center><h1><strong>{this.props.history.location.state.title}</strong></h1></center><br/>

<center>{this.props.history.location.state.subject}</center><br/>


{this.renderRedirect()}


</div>

<center><div style={{width:"50%"}}>
<center>{ReactHtmlParser(this.props.history.location.state.textAreaContent)}</center>
</div></center>
</div>


);
    }
    }
export default explore;
