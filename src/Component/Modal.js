 import React,{Component} from 'react';
// import {Navbar,Button,Nav} from 'react-bootstrap';

class Popup extends Component
{
render()
{

return(
   <div className="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div >
      <div className="modal-content">
        <div className="modal-header"> 
          <h4 className="modal-title">Register</h4>
        </div>
        <div class="modal-body">
          <form >  
            <input type="text"  name="username" placeholder="User Name (min 6 alphanumeric characters)"/>
            <input type="password" name="password" placeholder="Password (min 6 alphanumeric characters)"/>
            <input type="text"  name="firstname" placeholder="First Name"/>
            <input type="text"  name="lastname" placeholder="Last Name"/> 
            <input type="text" name="email" placeholder="Email ID"/>    
            <input type="submit" style={{float:"right"}} name="submit_register" value="Sign Up" class="button" /> 
          </form>
        </div> 
        <div class="modal-footer">
          <div style="display:none;color: red;" id="error_div_2">Please Enter your details Correctly!</div>
          </div>
      </div>
    </div>
  </div>
  )
  }
  }
  export default Popup;