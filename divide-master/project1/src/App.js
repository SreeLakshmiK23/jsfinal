import React,{Component} from 'react';
import './App.css';
import {BrowserRouter , Route,Switch} from "react-router-dom";
import EditorConvertToHTML from './Component/pages/Blog/Welcome';
import PostList from './Component/pages/ToolBar/PostList';
import Abc from './Component/pages/Blognew/Abc';
import Headernew from './Component/Headernew';
import explore from './Component/pages/Blognew/Explore';
import Login from './Component/pages/Login/index';
import Display from './Component/pages/Work/Display';
import Merge from './Component/pages/Work/Merge';
import Join from './Component/pages/User/Join';
import profile from './Component/pages/User/Profile';
import Popup from './Component/Modal';

function App() {
  

  return (
    <div >
     
{/* <Popup/> */}
        <BrowserRouter>
          <Switch>
                   
                  
                  <Route path = "/faqdis" exact component={PostList}/>  
                 <Route path ="/writeblog" exact component={EditorConvertToHTML}/> 
                <Route path ="/displayblog" exact component={Abc}/> 
              
               
                <Route path="/"  exact component={Login}/> 
                
            
         
              
                     <Route path="/table"  exact component={Display}/>
                    <Route path="/merged"  exact component={Merge}/>
                  
                    <Route path="/join"  exact component={Join}/>
                      <Route path="/exploreblog"  exact component={explore}/>
                       
                     <Route path="/viewprofile"  exact component={profile}/>
                     
                       
                          
         </Switch>
        </BrowserRouter>     
         {/* <Footer/>  */}
    </div>
  );
}


export default App;
