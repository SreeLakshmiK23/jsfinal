import React from 'react';
import{Card,  CardColumns,Nav,ButtonGroup,Table,Badge,Alert} from 'react-bootstrap';
import {Button,Form} from 'react-bootstrap';
import  './check.css';
import Merge from './Merge.js';

import axios from 'axios';

import Picky from "react-picky";
import "react-picky/dist/picky.css";
import Modal from 'react-awesome-modal';
export default class Display extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state={
          items:[],
          isLoaded: false,
         abc:[],
         datalist:[],
         arrayValue:[],
         arrayValuenew:[],
         value:'',
          visibleabc: false,
          latestStatus:false,
          show:true,
          visiblenew2:false,
          visiblenew3:false

        //  name:''

  
      }
      this.openModalabc = this.openModalabc.bind(this);
      this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

//   componentDidMount()
//   {
  
//       fetch('http://bb1341ea.ngrok.io/list')     
//         .then(res=>res.json())
//           .then(json => { 
//        this.setState({
//               isLoaded:true,
//               items: json,
//                       })
  
//                   });
              
//   }  

async componentDidMount(){
  var res1 = await axios.get('http://16f6f9e6.ngrok.io/list');
  var res2= await axios.get('http://16f6f9e6.ngrok.io/final/nameandphone');
  console.log("###", res1);
  this.setState({
      isLoaded:true,
      items:res1.data,
      datalist:res2.data,
      // name:
    //   datalist_phone:res2.data.phone,
    })            
  console.log(this.state);
  console.log("received",this.state.items)
}


     openModal=(name) =>
    {
      this.setState({ name: name, visible : true ,arrayValue:[] });
      console.log("name",name)
    }

    openModalmm=(name) =>
    {
      this.setState({ name: name, visible : true ,visibleabc:false });
      console.log("name",name)
    }
   
  

    // closeModal = ()  => {
    //   console.log("i am here")
    //     this.setState({
    //         visible: false
    //     });
    // }


    openModalabc=(name) =>
    {
      this.setState({  visibleabc:true  });
      this.setState({  abc:name.data });
      console.log("name",name.checklist_name)
      console.log("abc",this.state.abc)
    }

     
  

    closeModalabc = ()  => {
        this.setState({
            visibleabc: false
        });
    }

deleteitems=(namea)=>
{   
  this.setState({ name: namea})
  console.log(namea)
 
    //  axios.delete('http://b9263691.ngrok.io/delete',{checklist_name:name}){ data: { checklist_name:namea } }
    axios.delete('http://16f6f9e6.ngrok.io/delete/'+namea ).then(response => {
      // console.log(response)
      if(response.status == "200"){
        // this.openModalnew4()
         window.location.reload(); 
      }
  })
  
      

}

// onDelete(name)
// {
//     this.setState({  name:name.data});
//   //  console.log("name",name.checklist_name)
//       console.log("abcdelete",this.state.name)
// axios.delete('https://54e275d4.ngrok.io/deletecheck'+name)
//  console.log("name",name)
// .then(response=>
// {
//   var items=this.state.items;
//   for(var i=0;i<items.length;i++)
//   {
//     if(items[i].checklist_name==name)
//     {
//       items.splice(i,1);
//       this.setState({items:items});
//     }
//   }
// }
// )}
  selectMultipleOption(value) {
    console.count('onChange')
    
      console.log("Vals", value);
      // value.map((i,j)=>
    
      //   this.state.arrayValue.push(value.toString().split(",")[j].split(" ")[1])
      
      // console.log("to string",i ,value.toString().split(",")[j].split(" ")[1])

       
      // )
      
      this.setState({arrayValue:value})
      console.log("out ", this.state.arrayValue)
    
     
     
       
  }
      submitHandler =async e =>
    {  
         e.preventDefault();
          this.state.arrayValue.map((i,j)=>
    
        // this.state.arrayValuenew.push(this.state.arrayValue.toString().split(",")[j].split(" ")[1])
        this.state.arrayValuenew.push(i.split(",")[0].split(" ")[1])
        
          )
      // console.log("to string",i ,value.toString().split(",")[j].split(" ")[1])

       
      
        const payload = {
          // selections: this.state.arrayValue.toString(),
          selections: this.state.arrayValuenew.toString(),
          name: this.state.name,
         
        }
        
        console.log('Payload', payload);
        try {
     await  axios.post('http://16f6f9e6.ngrok.io/final/assignnew',payload)
                      
            console.log("i am here")
            
                // this.closeModal()
                
                 this.openModalnew2()
           
              
     
          
        } 
        catch (e) {
          console.log(e);
          alert('Error posting data!')
        }
      this.closeModalabc()
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
// this.closeModal()
}



openModalnew4(del)
{   
  this.setState({
            visiblenew4: true,
            del:del
         
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
openModalnew2()
{  
  this.setState({
            visiblenew2: true,
         
        });


}

closeModalnew2()
{  
  this.setState({
            visiblenew2: false,
        });

}

closeModal()
{  
  this.setState({
            visible: false,
         
        });
this.closeModalnew3()
}


badgePrint(status){
  console.log(status)
  if(status=="false"){
    return <Badge  style={{width:'100px',height:'30px'}} pill variant="success"><text>Public</text></Badge>

  }
  else{
    return <Badge  style={{width:'100px',height:'30px'}} pill variant="warning"><text>Private</text></Badge>
  }
}


render(){

var { isLoaded, items,arrayValue,datalist,name} = this.state;
    //`${dat.name},`
    
   var bigList=this.state.datalist.map(dat=>dat.name+" "+dat.phone);




 if(!isLoaded){
     return (
       <div style={{marginTop:"12rem"}}>
         <center>
     <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
       </center>
       </div>);
 }
 
 else{
return(
<div className=''>

 
    <Merge/>

 

     <div style={{justifyContent:'center',alignItems:'center' , marginTop:'10rem',marginLeft:'7rem'}} >
     <Table striped bordered hover style={{width:"80%"}} >
     
  <thead>
    {/* <tr colSpan={4}>
      <th>{"Manage Checklist"}</th>
    </tr> */}
    <td colSpan={5} style={{backgroundColor:"#566787",color:'white'}}><h1>Manage Checklist</h1></td>
    <tr style={{color:"#566787",fontWeight:"700"}}>
      <th >#</th>
      <th>Checklist Name</th>
      <th>Created On</th>
      <th>Status</th>
      <th >Actions</th>
    </tr>
  </thead>
  <tbody>
  {
       this.state.items.map((item,i)=>
    <tr>
      <td style={{color:"#566787"}}>{i+1}</td>
      <td style={{color:"#2196F3"}}>{item.checklist_name}</td>
      <td>{item.date}</td>
      <td style={{align:'center'}}>{this.badgePrint(item.status)}</td>
      <td><Button style={{width:'60px' , backgroundColor:'#37bc9b'}} size="sm"  onClick={()=>this.openModal(item.checklist_name)}>Assign</Button> &nbsp; &nbsp;
        <Button style={{width:'60px'}} size="sm" variant="danger" onClick={()=>this.openModalnew4(item.checklist_name)} >Delete</Button>&nbsp; &nbsp;
        <Button style={{width:'60px'}} size="sm" variant="primary" onClick={()=>{this.openModalabc(items[i]);this.setState({latestStatus:item.status})}}> View </Button> &nbsp; &nbsp;
    </td>
    </tr>
       )
  }
  </tbody>
  {/* onClick={()=>this.deleteitems(item.checklist_name)} */}
 </Table>

 

     </div>

 {/* onClickAway={() => this.closeModal()}*/}
<Modal visible={this.state.visible}  effect="fadeInUp" >
<Button  data-dismiss="modal" class="close" onClick={() => this.closeModal()} style={{float:"right"}}>X</Button>
      <h2 ><center><strong>Assign checklist</strong></center></h2>
      <Form>
       
    
          
          
           
            <Picky
              value={this.state.arrayValue}
            
              options={bigList}
              onChange={value => this.selectMultipleOption(value)}
              open={false}
              valueKey="id"
              labelKey="name"
              multiple={true}
              includeSelectAll={true}
              includeFilter={true}
              // dropdownHeight={600}
              required
            />
             {console.log("array value : ",this.state.arrayValue )}
          {/* </div> */}

  
{/* </div> */}
  
    <div className="place">
       
       </div>
       <div style={{paddingBottom:"5rem",paddingLeft:"13rem"}}>
          <Button class="btn btn-primary" type="submit" onClick={this.submitHandler}>Assign</Button>  &nbsp;
        <Button onClick={()=>this.openModalnew3()}  class="btn btn-info">Cancel</Button>
       
       </div>
       </Form>  
    </Modal>

      <Modal visible={this.state.visibleabc} abc={this.state.abc} effect="fadeInUp" >
      <Button  data-dismiss="modal" class="close" onClick={() => this.closeModalabc()} style={{float:"right"}}>X</Button>
    <h2><center><strong>View checklist</strong></center></h2>
     <form className="pad">
       
      
          <div>
         
          
           <div>{this.badgePrint(this.state.latestStatus)}</div>
           <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Document Name</th>
      <th>Document Description</th>
    </tr>
  </thead>
  <tbody>
    

          {
            this.state.abc.map((aa,i)=>
              <tr>
                {console.log("aa",aa)}
                <td>{i+1}</td>
                <td>{aa.document_name}</td>
                
                <td>{aa.description}</td>
      
    </tr>
                 
              
          )
          }
    
    </tbody>
</Table>          
<Button style={{width:'60px' , backgroundColor:'#37bc9b'}} size="sm"  onClick={()=>this.openModalmm(this.state.abc.checklist_name)}>Assign</Button>
          </div>   
       </form>
    </Modal>

     <Modal visible={this.state.visiblenew2} width="600" effect="fadeInUp" class="btn btn-dark" >
             <Alert show={this.state.show} variant="success">
        <Alert.Heading>Checklist has been assigned successfully</Alert.Heading>
     
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


          <Modal visible={this.state.visiblenew4} width="600" effect="fadeInUp" class="btn btn-dark">
        <Alert show={this.state.show} variant="danger">
        <Alert.Heading>Are you sure you want to Delete this?</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={()=>this.deleteitems(this.del)} variant="outline-danger">
            Yes
          </Button> &nbsp; 
            <Button onClick={() => this.closeModalnew4()} variant="outline-danger">
            NO
          </Button>
        </div>
      </Alert>
      </Modal> 

        </div>


//  </div> 



);

 }

}
}










 
