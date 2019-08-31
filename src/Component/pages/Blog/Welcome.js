import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './styleblog.css';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import {Redirect} from 'react-router-dom';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import Header from './../../Headernew';
 import Modal from 'react-awesome-modal';

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = '<p> Write blog here !!</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
         title:'' ,
         subject:'' ,
         content: null,
         textAreaContent: '',
         show:true,
      };
    }
    window.blogPageState = this.state;
  }

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
            return<Redirect to='/displayblog'/>
        }
    }

 
    onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
    changeHandler = (e, editorType = false , value = '') => {
        if (editorType) {
            this.setState({content :e , textAreaContent: value }, () => console.log('editorType',this.state)); 
        } else {
            this.setState({[e.target.name]:value ? e.target.value : e.target.value}, () => console.log('data',this.state));
        }
    }
    submitHandler= e =>
    {
        e.preventDefault()
        console.log("blog obj :",this.state)
        axios
        .post('http://16f6f9e6.ngrok.io/blog/save',this.state)

        .then(response => {
            console.log(response)
              if(response.status == "200"){
              
                 this.openModalnew2()
            //    window.location.reload()
              }
        })



        .catch(error => {
            console.log(error)
        })
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
 render()
 { 
    const { editorState } = this.state;
      const{title,subject,textAreaContent}=this.state
    return(
      
      <div >
              <Header/>   
            <div>
                               
              <Form onSubmit={this.submitHandler} style={{backgroundposition:'fixed'}}>
              <div className="container-c">   
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column ><strong>Title :</strong>
                   
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="title" required name="title" value={title}  onChange={this.changeHandler} style={{width: "600px"}}/>
                  </Col>
            </Form.Group>closeModalnew2
                                        
                       
                       
                       
                        {/* <p>Subject :</p>
                        <input  type="text" required name="subject" value={subject}  onChange={this.changeHandler} style={{width: "500px"}}/> */}
        <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column ><strong>Subject :</strong>
                   
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="subject" required name="subject" value={subject}  onChange={this.changeHandler} style={{width: "600px"}}/>
                  </Col>
            </Form.Group>                
                  <div className="editor" >
                            <Editor 
                              required
                              
                              onChange={(e) => this.changeHandler(e,true,draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                              editorState={editorState}
                              wrapperClassName="demo-wrapper"
                              editorClassName="demo-editor"
                              onEditorStateChange={this.onEditorStateChange}  
                              
                          />

                  </div>
                  
                     <br/> 
                        </div>
                        { this.renderRedirect()}
                          <div className="actualtwo">
                          <input type="submit"   class="btn btn-primary" value="Submit"  />  &nbsp;  &nbsp; 
                          <button onClick={this.setRedirect} class="btn btn-success" >Visit blog</button>
                        
                          </div>
                            
                  </Form>


         <Modal visible={this.state.visiblenew2} width="600" effect="fadeInUp" class="btn btn-dark" >
             <Alert show={this.state.show} variant="success">
        <Alert.Heading>Successfully posted the blog</Alert.Heading>
     
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.closeModalnew2()} variant="outline-success">
      
            Close
          </Button>
        </div>
      </Alert>
            </Modal>
         
                          
              </div>
            
            
    
                       </div>

    );
}
}

export default EditorConvertToHTML;