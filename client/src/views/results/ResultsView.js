import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import Results from '../../components/results/Results';
import Footer from '../../components/footer/footer';

class ResultsView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <Results></Results>
        <Footer></Footer>
      </div>
    )
  }
}

export default ResultsView;