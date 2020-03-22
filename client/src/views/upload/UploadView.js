import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import FileUploader from '../../components/fileuploader/FileUploader';

class UploadView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <FileUploader></FileUploader>
      </div>
    )
  }
}

export default UploadView;