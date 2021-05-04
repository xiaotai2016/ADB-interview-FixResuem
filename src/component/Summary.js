import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { BsNewspaper } from "react-icons/bs";
import axios from 'axios';
import * as API from '../data/api'


import './SkillsInput.css'

const SkillsInput = ({ skillsData, skill, removeSkill }) => {

  //window.thisUserId = "23acaabd-d61d-4e90-9a3e-014192d42b51"
  const getBaseInfo = (callback) => {
    if (window.thisUserId) {
      var searchId= window.thisUserId
      axios
        .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
        .then((data) => {
          if (data.data.msg === "success") {
            var resumeobj = data.data.data

            setFormData({
              indiSkill:resumeobj.summary
            })
          
          }
        })
    }
  }


    const [heading] = useState({
        title: 'Welcome to the CV Creator',
        secondTitle: 'Add your Technical Skills here'
    })
    const [formData, setFormData] = useState({
        indiSkill: '',
    })
    const [skilllist] =useState({
      list:[]
    })

    const { indiSkill } = formData

    const submitSkill = (e) => {
        e.preventDefault()

        var searchId= window.thisUserId
        var summary=formData.indiSkill


        axios
          .post(API.BACKEND + API.POST_UPDATE_RECORD, {data:{summary:summary},searchId})
          .then((response) => {
          console.log(response.data);
          if (response.data["status"] === "SUCCESS") {
            alert('SUCCESS update')
            //handleShow();
          } else {
            console.log(`Error - ${response.data.message}`);
          }
        })
        .catch((err) => {
          console.log(`DEBUG - ${err}`);
        });

    }



    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

      useEffect(() => {
       getBaseInfo();
  }, [])
    return (
      <div>
        <div className="divHeader">
          {/* <div>
            <button onClick={e=> changeLanguage(e, "de", heading.secondTitle, heading.title)}>German</button>
            <button onClick={e=> changeLanguage(e, "English", heading.secondTitle, heading.title)}>English</button>
          </div>
          */}
          <h1 className="headerH1">
            {heading.title}
            <BsNewspaper />
          </h1>
          <h1 className="headerParagraph">{heading.secondTitle}</h1>


        </div>
        <div className="belowButtons">
          <Link to="/tempskills" className="btn btn-primary button">
          Previous Section</Link>
          <Link to="/template" className="btn btn-primary button">
          Next Section</Link>
        </div>
        <div ><h3>Please click the template summary, and edit at right side text area. Please replace all the [job title] and all [] with your own information.</h3></div>
        <br/><br/><br/>
        <div className="mainbody">


          <div className="form-style-5 summary-form">

            <legend><span class="number">6</span> Personal Summary</legend>
            <div className="container">
              <lable className="label">Please select and edit summary here</lable>
              <textarea rows="10" type='text' placeholder="Select summary from left and edit" name="indiSkill" value={indiSkill} onChange={e=> onChange(e)} />


              <input type="submit" className="btn btn-primary bts"  value="Save Summary" onClick={(e) => submitSkill(e)}/>

            </div>
            {skilllist.list ? <div>
              {skilllist.list.length > 0 ? <div className="skillsHistory">
                <h1>Technical Skills</h1>
                {skilllist.list.map((sk) => (
                <div className="skillHis">
                  {sk} {/*<button className="btn btn-primary button" onClick={(e)=> removeTheSkill(sk, e)}>Remove</button>*/}
                </div>
                ))}
              </div> : <div className="nothingToDisplay">
                <h2>Add Technical Skills to View Below</h2>
              </div>}</div>
            : <h2>Nothing</h2>}

          </div>
        </div>
      </div>

    )
}

export default SkillsInput
