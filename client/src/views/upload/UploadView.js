import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import FileUploader from '../../components/fileuploader/FileUploader';
import Footer from '../../components/footer/footer';

class UploadView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <FileUploader></FileUploader>
        <Footer></Footer>
      </div>
    )
  }
}

export default UploadView;