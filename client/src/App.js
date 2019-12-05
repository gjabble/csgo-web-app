import React from 'react';
import './App.css';
import axios from 'axios';
import Messages from './Messages.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.uploadFile}>
          <input id="fileupload" type="file" ></input>
          <button type='submit'>Submit</button>
        </form>
        <Messages messages={this.state.messages}></Messages>
      </div >
    )
  }

  uploadFile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', document.querySelector('#fileupload').files[0]);
    axios.post('file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      this.setState({
        messages: response.data
      });
      console.log(response.data);
    });
  }
}

export default App;
