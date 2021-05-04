import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Landing from './component/Landing'
import EducationInput from './component/EducationInput';
import ExperienceInput from './component/ExperienceInput'
import SkillsInput from './component/SkillsInput'
import PersonalSkInput from './component/PersonalSkInput'
import Template from './component/Template'
import Summary from './component/Summary'

function App() {
  return (


      <Router>
        <Fragment>

          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/education" component={EducationInput} />
            <Route exact path='/experience' component={ExperienceInput} />
            <Route exact path="/skills" component={SkillsInput} />
            <Route exact path='/tempskills' component={PersonalSkInput} />
            <Route exact path='/template' component={Template} />
            <Route exact path='/summary' component={Summary} />

          </Switch>

        </Fragment>
      </Router>




  );
}

export default App;
