import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import { BsNewspaper } from "react-icons/bs";
import axios from 'axios';
import * as API from '../data/api'

import './ExperienceInput.css'

const ExperienceInput = ({ experienceData, experience, removeExperience, header }) => {
//  window.thisUserId = "23acaabd-d61d-4e90-9a3e-014192d42b51"
    const getBaseInfo = () => {
      if (window.thisUserId) {
        var searchId= window.thisUserId
        axios
          .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
          .then((data) => {
            if (data.data.msg === "success") {
              var resumeobj = data.data.data.experience
              if (resumeobj) {

                console.log(resumeobj);
                setExpHis({
                his:[...resumeobj]

                });
              }

            }
          })
      }
    }


    const [heading] = useState({
        title: 'Welcome to the CV Creator',
        secondTitle: 'Add your Experience History here'
    })

    const [experienceInput, setInput] = useState({
        comName: '',
        city: '',
        from: '',
        to: '',
        description: '',
        descriptions: [],
        position: ''

    })



    const { comName, city, from, to, description, position, descriptions } = experienceInput;

    const [experienceHis, setExpHis]=useState({
      his:[]
    })

    const onChange = e =>
        setInput({ ...experienceInput, [e.target.name]: e.target.value })

    const onExperienceSubmit = e => {
        e.preventDefault()

        setExpHis({
            his:[...experienceHis.his,experienceInput]
        })
        var searchId= window.thisUserId
        var experience=experienceHis.his
        experience.push(experienceInput)
        console.log('pass exp',experience);
        axios
          .post(API.BACKEND + API.POST_UPDATE_RECORD, {data:{experience:experience},searchId})
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

    const removeDescriptionDetail = (des, e) => {
        e.preventDefault()
        setInput({ ...experienceInput, descriptions: descriptions.filter(de => de !== des) })

    }

    useEffect(() => {
      getBaseInfo();
  }, [])
    //console.log(window.thisUserId);


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


            <legend><span class="number">3</span> Experience Input</legend>

            <div className="form-style-5">
                <form className='inputForm' onSubmit={e => onExperienceSubmit(e)}>
                    <div className="inputField">
                        <lable className="label">Company Name</lable>

                        <input
                            type="text"
                            name="comName"
                            value={comName}
                            placeholder="Company Name"
                            className=""

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">Position</lable>

                        <input
                            type="text"
                            name="position"
                            value={position}
                            placeholder="Position Name"
                            className=""

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">City</lable>

                        <input

                            type="text"
                            name="city"
                            value={city}
                            placeholder="City"
                            className=""

                            onChange={e => onChange(e)}
                            required />
                    </div>

                    <div className="inputField">
                        <lable className="label">From</lable>

                        <input
                            type="text"
                            name="from"
                            value={from}
                            placeholder="DD/MM/YYYY"
                            className=""

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">to</lable>

                        <input
                            type="text"
                            name="to"
                            value={to}
                            placeholder="DD/MM/YYYY"
                            className=""
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">Description</lable>

                        <textarea
                            type="text"
                            rows='10'
                            name="description"
                            value={description}
                            placeholder="description"
                            className="textArea"

                            onChange={e => onChange(e)}
                            required
                        />
                        {/*<button className="btn btn-primary button" onClick={(e) => descriptionDetail(description, e)}>Add Description</button>*/}
                        {descriptions.map((des) => <div>
                            {des}
                            <button onClick={(e) => removeDescriptionDetail(des, e)} className="btn btn-primary button">Remove Description<i class="fas fa-times-circle"></i></button>
                        </div>)}
                    </div>
                    <input type="submit" value='Add New' className="btn btn-primary bts" />
                </form>
                <div className="belowButtons">
                    <Link to="/education" className="btn btn-primary button">
                        Previous Section</Link>

                            <Link to="/skills" className="btn btn-primary button">
                                Next Section </Link>
                </div>
            </div>
        </div>
        {experienceHis ? <div>
          {console.log(experienceHis)}
            {experienceHis.his.length > 0  ? <div className="preview">
                <h1>Work History</h1>
                {experienceHis.his.map((exp, key) => (
                    <div className="preview">
                        <h2>Experience Data added</h2>
                        <h6> Company Name : {exp.comName}</h6>
                        <h6>Position: {exp.position}</h6>
                        <h6>City:{exp.city}</h6>
                        <h6>From:{exp.from}</h6>
                        <h6>To:{exp.to}</h6>
                        <h6>Description:{exp.description}</h6>
                        {/*exp.descriptions.map((des) => (
                            <div> {des}</div>
                        ))
                        <button className="btn btn-primary" onClick={(e) => removeTheExperience(exp.comName, exp.from, e)}>Remove</button>*/}
                    </div>
                ))}
            </div> : <div className="nothingToDisplay"><h2>Add Experience History to view here</h2></div>}</div>
            : <h1>Nothing</h1>}
      </div>
    )
}

export default ExperienceInput
