
import React , {Component} from 'react';

import './check.css';

 import Modal from 'react-awesome-modal';

 import {Button,Form,Row,Col,Alert} from 'react-bootstrap';
import axios from 'axios';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Redirect} from 'react-router-dom';
import Popup from "reactjs-popup";
import Appone from "./Appone";

import RaisedButton from "material-ui/RaisedButton";
import Header from './../../Headernew';
import orderBy from "lodash/orderBy";

// import logo from "./logo.svg";
// import "./App.css";
import Formnew from "./Form";
import Table from "./Table";

import TextField from "material-ui/TextField";

import './check.css';
import Switch from "react-switch";



const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class Merge extends Component
{      
    constructor(props)
    {
        super(props)
      
        this.state={         
          length: 0,
          checklist_name:'',
    data: [ { order: 0, document_name: '', description: ''}],
           
      redirect:false,
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
   
          status:false,
        document_name:"",
    document_nameError:"",
   document_status:false,
   document_statusError:"",
   show:true,
  

    //  document_name:"",
    //   document_status:""
  };
  //  this.handleChangenew = this.handleChangenew.bind(this);
    
    }

change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      document_idError: "",
      document_statusError: "",
     
    };

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      //  this.props.handleSave(this.props.i, this.state.values);
      // clear form
      this.setState({
        document_name: "",
        document_nameError: "",
        document_status: false,
        document_statusError: "",
      
      });
    }
  };

  //     handleChangenew(checked) {
  //   this.setState({ checked });
  // } 

  // const body = {order,name,description};
  handleChange = idx => e => {
    //console.log('shravan:'+ typeof e);
  
    const { name, value } = e.target;
    // console.log("Target"+e.target)
    // console.log("Target Name"+[name])
    // console.log("Target Values"+[value])
    
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
      
    };
    // console.log(rows)
    this.setState({rows});
  };
  
  handleAddRow = () => {
    const item = {
        order:'',
      name: '',
      description:''
    };
    // console.log("items:",item )
    //console.log("rows:"+this.state.rows)

    this.setState({
      rows: [...this.state.rows, item]

//      rows: [...this.state.rows, item.order,item.name,item.description]
    });   
  };

// this.setState(previousState => ({
//     myArray: [...previousState.myArray, 'new value']
// }));


  handleRemoveRow = () => {
    
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1) //check
    // console.log("rows:"+rows)
    this.setState({ rows })
  }

openModal() {
this.setState({
visible : true,
checklist_name:'',
data: [{ order: 0, document_name: '', description: ''}],    
editIdx: -1,
columnToSort: "",
sortDirection: "desc",

status:false,
document_name:"",
document_status:false,

});
}

closeModal() {
this.setState({
visible : false
});
this.closeModalnew3()
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
    changeHandler= e =>{
      

        this.setState({[e.target.name]:e.target.value})
        
    }



 
     setRedirect=() =>
    {
        window.location.reload();
    }


  // change = e => {
  //   // this.props.onChange({ [e.target.name]: e.target.value });
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };
  // changeHandler= e =>{
  //       this.setState({[e.target.name]:e.target.value})
  //   }
      submitHandler= e =>
    {
        
        e.preventDefault()
        console.log("check this one",this.state)
        axios
        .post('http://16f6f9e6.ngrok.io/json',this.state)

        .then(response => {
            console.log(response)
            if(response.status == "200"){
              this.closeModal()
              this.openModalnew2()
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    
  handleRemove = i => {
    const { length } = this.state;
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
    if ( length > 0) this.setState({ length: this.state.length - 1});
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };
 
     


  render() 
  {   
  const{checklist_name}=this.state

    return (
       
      <div>
      <Header/>

            
            <div className="actualthree">
<input type="button" value="Create Checklist " class="btn btn-info" onClick={() => this.openModal()} />
            
    
            </div>
                   
               


{/*popup model*/}
    <div>
      <MuiThemeProvider>
        <section>
          <Modal visible={this.state.visible} effect="fadeInUp" width="600" >   
           <Button  data-dismiss="modal" class="close" onClick={() => this.closeModal()} style={{float:"right"}}>X</Button>
           <h1><center><strong>Create Checklist</strong></center></h1>
           <div className="overflowone">
   
           <div className="App">
          {/* <form  onSubmit={this.submitHandler }> */}
          <Form  onSubmit={this.submitHandler}>
          

        <div className="Appa">
        <TextField
          name="checklist_name"
         
          floatingLabelText="Checklist Name"
          value={this.state.checklist_name}
          onChange={e => this.change(e)}
         
          floatingLabelFixed
          required
        />
        <br/>
        <br/>
         {/* <label>Public/Private:</label>
                  <Switch
          onChange={this.handleChangenew}
          checked={this.state.checked}
          id="normal-switch"
        /> */}
       
       <Form.Group as={Row}>
      <Form.Label as="legend" row sm={10}>
       &nbsp;&nbsp; <strong>Status:</strong>
      </Form.Label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Row sm={30}>
        <Form.Check
          type="radio"
          label="Public"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          onChange={()=>this.setState({status:false})}
        /> &nbsp;&nbsp;
        <Form.Check
          type="radio"
          label="Private"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          onChange={()=>this.setState({status:true})}
        
        />
         {/* {console.log("status",this.state.status)} */}
      </Row>
    </Form.Group> 
 
     </div>
   
     


          <Table
            handleSort={this.handleSort}LLabelabel
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            length={this.state.length}
            header={[
                {
                name: "Order",
                prop: "order"
              },
              {
                name: "Document Name",
                prop: "document_name"
              },
            
             
              {
                name: "Decsription",
                prop: "description"
              }
              
            ]}
            
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Formnew 
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission],
                length: this.state.length + 1,
              })
            }
          />
     
          <div className="actualthree">
          {/* <input type="submit" class="btn btn-primary" value="Save"/> &nbsp;  &nbsp;  */}
          <Button type="submit">Save</Button>&nbsp;  &nbsp;
          <Button onClick={()=>this.openModalnew3()} class="btn btn-info">Cancel</Button> 
            <br/>   
            </div>
          
         
</Form>

        </div>





          </div>             
          </Modal>
        </section>
      </MuiThemeProvider>

           
            <Modal visible={this.state.visiblenew2} width="600" effect="fadeInUp" class="btn btn-dark" >
             <Alert show={this.state.show} variant="success">
        <Alert.Heading>Record has been successfully entered</Alert.Heading>
     
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
export default Merge;

