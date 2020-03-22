import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import Results from '../../components/results/Results';

class ResultsView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <Results></Results>
      </div>
    )
  }
}

export default ResultsView;