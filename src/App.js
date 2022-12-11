import React, { Component } from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import { Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=9
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <NavBar/>
        <Routes>
        <Route  path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='in' category="general"/>} />
        <Route path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='business' pageSize={this.pageSize} country='in' category="business"/>} />
        <Route path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country='in' category="entertainment"/>} />
        <Route path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='in' category="general"/>} />
        <Route path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='health' pageSize={this.pageSize} country='in' category="health"/>} />
        <Route path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='science' pageSize={this.pageSize} country='in' category="science"/>} />
        <Route path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country='in' category="sports"/>} />
        <Route path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country='in' category="technology"/>} />
      </Routes>
       
      </div>
    )
  }
}