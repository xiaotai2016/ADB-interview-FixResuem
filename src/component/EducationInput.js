import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { BsNewspaper } from "react-icons/bs";
import axios from 'axios';
import * as API from '../data/api'
import './EducationInput.css'


const EducationInput = ({ educationData, education, removeEducation }) => {
//window.thisUserId = "23acaabd-d61d-4e90-9a3e-014192d42b51"
  const getBaseInfo = () => {
    if (window.thisUserId) {
      var searchId= window.thisUserId
      console.log(searchId);
      console.log(API.BACKEND + API.GET_RECORD);
      axios
        .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
        .then((data) => {
            console.log('data',data);
          if (data.data.msg === "success") {
            var resumeobj = data.data.data.education
            console.log(resumeobj);
            if (resumeobj!=null) {

              console.log("if win has",resumeobj);
              setEduHis({
              his:[...resumeobj]

              });
            }

          }
        })
    }
  }

    const [heading] = useState({
        title: 'Welcome to the CV Creator',
        secondTitle: 'Add your Education History here'
    })
    const [educationInput, setInput] = useState({
        uniName: '',
        city: '',
        state: '',
        from: '',
        to: '',
        degree: '',
        description: '',
        descriptions: []

    })
    const [educationHis, setEduHis]=useState({
      his:[]
    })

    const { uniName, city, state, from, to, degree, description } = educationInput;

    const onChange = e =>
        setInput({ ...educationInput, [e.target.name]: e.target.value })

    const onEducationSubmit = e => {
        e.preventDefault()
        setEduHis({
            his:[...educationHis.his,educationInput]
        })
        var searchId= window.thisUserId;
        var education=educationHis.his;
        education.push(educationInput);
        axios
          .post(API.BACKEND + API.POST_UPDATE_RECORD, {data:{education:education},searchId})
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
            <legend><span class="number">2</span> Education information Input</legend>
                <form className='inputForm' onSubmit={e => onEducationSubmit(e)}>
                    <div className="inputField">
                        <lable className="label">College Name</lable>
                        <input
                            type="text"
                            name="uniName"
                            value={uniName}
                            placeholder="College Name"
                            className="inputFields"
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
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div className="inputField">
                        <lable className="label">State</lable>

                        <input
                            type="text"
                            name="state"
                            value={state}
                            placeholder="State"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">From</lable>

                        <input
                            type="text"
                            name="from"
                            value={from}
                            placeholder="DD/MM/YYYY"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">To</lable>

                        <input
                            type="text"
                            name="to"
                            value={to}
                            placeholder="DD/MM/YYYY"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">Degree</lable>

                        <input
                            type="text"
                            name="degree"
                            value={degree}
                            placeholder="degree"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">Description</lable>

                        <textarea
                            type="text"
                            rows="10"
                            name="description"
                            value={description}
                            placeholder="Description"
                            className="textArea"
                            onChange={e => onChange(e)}
                            required
                        />
                        {/*
                        <button className="btn btn-primary button" onClick={(e) => descriptionDetail(description, e)}>Add Description</button>
                        */}
                    </div>


                    <input type="submit" value='Add Education ' className="btn btn-primary bts" />

                </form>
                <div className="belowButtons">
                    <Link to="/" className="btn btn-primary button">
                        Previous Section</Link>
                    <Link to="/experience" className="btn btn-primary button">
                        Next Section</Link>
                </div>

            {console.log(educationHis)}



        </div>
        {educationHis ? <div>
          {console.log(educationHis)}
            {educationHis.his.length > 0 ? <div className="preview">
                <h1>Education History</h1>
                {educationHis.his.map((edu, key) => (
                    <div className="preview">

                        <h2>Education Data added</h2>
                        <h6> Institution Name : {edu.uniName}</h6>
                        <h6> City : {edu.city}</h6>
                        <h6> State : {edu.state}</h6>
                        <h6> From : {edu.from}</h6>
                        <h6> To : {edu.to}</h6>
                        <h6>Degree : {edu.degree}</h6>
                        <h6>Description :{edu.description} </h6>

                        {/*getDescription(edu)}
                        {/*
                        <button className="btn btn-primary" onClick={(e) => removeTheEducation(edu.colName, edu.from, e)}>Remove Education History</button>
                        */}
                    </div>
                ))}
            </div> : <div className="nothingToDisplay"><h2>Add Education History to view here</h2></div>}</div> : <p>You have not added anything
        </p>
        }
</div>
    )
}

export default EducationInput
