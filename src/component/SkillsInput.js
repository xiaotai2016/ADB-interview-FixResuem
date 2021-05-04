import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { BsNewspaper } from "react-icons/bs";
import axios from 'axios';
import * as API from '../data/api'
import {TECH_SKILL_LIST} from '../data/content'

//import './SkillsInput.css'

const SkillsInput = ({ skillsData, skill, removeSkill }) => {
  //window.thisUserId = "23acaabd-d61d-4e90-9a3e-014192d42b51"
  const getBaseInfo = () => {
    if (window.thisUserId) {
      var searchId= window.thisUserId
      axios
        .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
        .then((data) => {
          if (data.data.msg === "success") {
              var resumeobj = data.data.data.techskills
            if (resumeobj) {

                console.log(resumeobj);
                setSkilllist({
                  list:[...resumeobj]
                });
            }

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
    const [skilllist, setSkilllist] =useState({
      list:[]
    })

    const { indiSkill } = formData

    const submitSkill = (e) => {
        e.preventDefault()
        setSkilllist({
            list:[...skilllist.list,formData.indiSkill]
        })
        var searchId= window.thisUserId
        var techskills=skilllist.list
        techskills.push(formData.indiSkill)
        console.log('pass exp',techskills);
        setFormData({indiSkill: ''})
        axios
          .post(API.BACKEND + API.POST_UPDATE_RECORD, {data:{techskills:techskills},searchId})
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
      <div className="container">
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
        <div className="form-style-5">
            <legend><span class="number">4</span>Technial Skills Input</legend>
            <div className="container">
                <lable className="label">Add your Technical skill here</lable>
                <input type = "text" list="skilllists" placeholder="Add your skill here" name="indiSkill" value={indiSkill} onChange={e => onChange(e)} />
                  <datalist id="skilllists">
                  {
                    TECH_SKILL_LIST.map((item,index)=>{
                      return (
                            <option value={item}/>
                      )
                    })
                  }
                  </datalist>
                <input type="submit" className="btn btn-primary bts"  value="Add Skill" onClick={(e) => submitSkill(e)}/>
                <div className="belowButtons">
                    <Link to="/experience" className="btn btn-primary button">
                        Previous Section</Link>
                    <Link to="/tempskills" className="btn btn-primary button">

                        Next Section</Link>
                </div>
            </div>


        </div>
        {skilllist.list ? <div>
            {skilllist.list.length > 0 ? <div className="preview">
                <h1>Technical Skills</h1>
                {skilllist.list.map((sk) => (
                    <div className="skillHis">
                        {sk} {/*<button className="btn btn-primary button" onClick={(e) => removeTheSkill(sk, e)}>Remove</button>*/}
                    </div>
                ))}
            </div> : <div className="nothingToDisplay"><h2>Add Technical Skills to View Below</h2></div>}</div>
            : <h2>Nothing</h2>}
        </div>
    )
}

export default SkillsInput
