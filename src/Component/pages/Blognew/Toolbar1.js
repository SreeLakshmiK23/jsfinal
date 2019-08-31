import React, {Component} from 'react';
import './Toolbar1.css';
// import button from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Header from './../../Headernew';
// const toolbar=props=> //functional component
// (

    class Toolbarone extends Component
{
    state=
    {
        redirect:false

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
            return<Redirect to='/writeblog'/>
        }
     
    }
    render()
    { 
        return(
    


 <div>
 <Header/>
 { this.renderRedirect()}
 <div className="actualstyle">
 <input type="submit" class="btn btn-primary" value="CREATE BLOG" onClick={this.setRedirect} />
 </div>
 </div> 





);
    }
    }
export default Toolbarone;
