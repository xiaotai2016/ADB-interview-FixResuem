import React, {  useState } from "react";
import { Link } from 'react-router-dom'
import { BsNewspaper } from "react-icons/bs";
import styled from "styled-components";
import TempTwo from './TempTwo'

import TempOne from './TempOne'

const TABS = styled.div`
@media print {
    display: none;
  }
`

const Template = ({ header }) => {
    const [heading] = useState({
        title: 'Welcome to the CV Creator',
        secondTitle: 'Choose the template below'
    })

    return (

        <div>
          <TABS>
            <div className="divHeader">
              {/*    <div>
                <button onClick={e => changeLanguage(e, "de", heading.secondTitle, heading.title)}>German</button>
                <button onClick={e => changeLanguage(e, "English", heading.secondTitle, heading.title)}>English</button>
                </div>
              */}
              <h1 className="headerH1">
                {heading.title} <BsNewspaper />
              </h1>
              <h1 className="headerParagraph">{heading.secondTitle}</h1>


            </div>
          </TABS>
          <div className="container">
            <TABS>


              <div>
                <Link to="/tempskills" className="btn btn-primary">
                Previous </Link>


                <h2>Dynamic Tabs</h2></div>
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#home">Default Template</a></li>
                <li><a data-toggle="tab" href="#menu1">Classical</a></li>
                {/*<li><a data-toggle="tab" href="#menu2">Template 2</a></li>*/}

              </ul>
            </TABS>

            <div className="tab-content">
              <div id="home" className="tab-pane fade in active">
                <br></br>
                <br></br>
                <TempOne />
              </div>
              <div id="menu1" className="tab-pane fade">
                <br></br>
                <br></br>
                <TempTwo />
              </div>
              {/*<div id="menu2" className="tab-pane fade">
                <br></br>
                <br></br>
                <TempThree />
                </div>
                <div id="menu3" className="tab-pane fade">
                <br></br>
                <br></br>
                <TempFour />
                </div>
                <div id="menu4" className="tab-pane fade">
                <br></br>
                <br></br>
                <TempFive />
              </div>*/}
            </div>
          </div>
        </div>
    )
}

Template.propTypes = {
  //header: PropTypes.object.isRequired
}

export default Template
