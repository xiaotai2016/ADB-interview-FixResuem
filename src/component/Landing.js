import React, { useState, useEffect } from "react";
//import styled from "styled-components";
import { BsNewspaper } from "react-icons/bs";
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as API from '../data/api';


import './EducationInput.css';
import './Landing.css';
import './SkillsInput.css';
const Landing = () => {

console.log(window.thisUserId);
  const getBaseInfo = () => {
    if (window.thisUserId) {
      var searchId= window.thisUserId

      axios
        .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
        .then((data) => {
          console.log('data',data);
          if (data.data.msg === "success") {
            var resumeobj = data.data.data
            //console.log(resumeobj.email);
            setInput({
              firstName: resumeobj.firstName,
              lastName: resumeobj.lastName,
              email: resumeobj.email,
              role: resumeobj.role,
              phone: resumeobj.phone,
              github: resumeobj.github,
              linkedIn: resumeobj.linkedIn,
              type: resumeobj.type,
              summary: resumeobj.summary,
              portfolio: resumeobj.portfolio
            });
          }
        })
    }
  }

  const postBaseInfo = ()=>{
    if (window.thisUserId) {
      var searchId= window.thisUserId
      axios
        .post(API.BACKEND + API.POST_UPDATE_RECORD, {data:headerInput,searchId})
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
    }else {
      axios
        .post(API.BACKEND + API.POST_NEW_RECORD, headerInput)
        .then((response) => {
        console.log(response.data);
        if (response.data["status"] === "SUCCESS") {
          window.thisUserId= response.data.rid
          alert('SUCCESS Saved')
          //handleShow();
        } else {
          console.log(`Error in sign up - ${response.data.message}`);
        }
      })
      .catch((err) => {
        console.log(`DEBUG - ${err}`);
      });
    }

  }


    const [heading] = useState({
        title: 'Welcome to the CV Creator',
        secondTitle: 'Build your dream CV today'
    })

    const [headerInput, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        phone: '',
        github: '',
        linkedIn: '',
        summary: '',
        portfolio: '',
        type: ''
    })
    const { firstName, lastName, email, role, phone, linkedIn } = headerInput;

    const onChange = e => {
        //console.log(e.target.name)

        setInput({ ...headerInput, [e.target.name]: e.target.value })
    }

    const onHeaderSubmit = e => {
        e.preventDefault()
        // headerData(headerInput)
        postBaseInfo();

    }
    useEffect(() => {
      getBaseInfo();

        //console.log(header)
        // if (header != null) {
        //     setInput({
        //         firstName: loading || !header.firstName ? '' : header.firstName,
        //         lastName: loading || !header.lastName ? '' : header.lastName,
        //         email: loading || !header.email ? '' : header.email,
        //         role: loading || !header.role ? '' : header.role,
        //         phone: loading || !header.phone ? '' : header.phone,
        //         github: loading || !header.github ? '' : header.github,
        //         linkedIn: loading || !header.linkedIn ? '' : header.linkedIn,
        //         type: loading || !header.type ? '' : header.type,
        //         summary: loading || !header.summary ? '' : header.summary,
        //         portfolio: loading || !header.portfolio ? '' : header.portfolio
        //
        //
        //     })
        // }

    }, [])
    // const changeLanguage = async (e, lang, secondTitle, title) => {
    //     e.preventDefault()
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }

    //     }
    //     let formData = { lang, title, secondTitle }
    //     console.log(formData)
    //     let res = await axios.post('/ap', formData, config);
    //     console.log(res)
    //     setheading({
    //         secondTitle: res.data.secondTitle,
    //         title: res.data.title
    //     })}

    return (

        <div className="container">
            <div className="divHeader">
                {/*    <div>
        <button onClick={e => changeLanguage(e, "de", heading.secondTitle, heading.title)}>German</button>
        <button onClick={e => changeLanguage(e, "English", heading.secondTitle, heading.title)}>English</button>
      </div>
  */}
            <div>


            <h1 className="headerH1">
                {heading.title} <BsNewspaper />
            </h1>
            <h1 className="headerParagraph">{heading.secondTitle}</h1>


            </div>
            </div>
            <div className="form-style-5" style={{}}>
                <legend><span class="number">1</span> Personal information Input</legend>
                <form className='inputForm' onSubmit={e => onHeaderSubmit(e)} >
                    <div className="inputField"  style={{float:'left'}}>
                        <lable className="label">First Name</lable>

                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            placeholder="First Name"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField" style={{float:'right'}}>
                        <lable className="label">Last Name</lable>

                        <input

                            type="text"
                            name="lastName"
                            value={lastName}
                            placeholder="Last Name"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div className="inputField" style={{float:'left'}}>
                        <lable className="label">Email</lable>

                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email Address"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField" style={{float:'right'}}>
                        <lable className="label">Role</lable>

                        <input
                            type="text"
                            name="role"
                            value={role}
                            placeholder="Role"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField" style={{float:'left'}}>
                        <lable className="label">Contact</lable>

                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            placeholder="Contact number"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="inputField"  style={{float:'right'}}>
                        <lable className="label">LinkedIn</lable>

                        <input
                            type="text"
                            name="linkedIn"
                            value={linkedIn}
                            placeholder="LinkedIn"
                            className="inputFields"

                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    {/*<div className="inputField">
                        <lable className="label">Github</lable>

                        <input
                            type="text"
                            name="github"
                            value={github}
                            placeholder="GitHub"
                            className="inputFields"

                            onChange={e => onChange(e)}

                        />
                    </div>
                    <div className="inputField">
                        <lable className="label">Portfolio</lable>

                        <input
                            type="text"
                            name="portfolio"
                            value={portfolio}
                            placeholder="Portfolio"
                            className="inputFields"

                            onChange={e => onChange(e)}

                        />
                    </div>

                    <div className="inputField">
                        <select name="type" value={type} onChange={e => onChange(e)} className="inputFields" style={{ marginBottom: '1rem', paddingBottom: '0.5rem', paddingTop: '0.5rem' }} required>
                            <option value="0">What type Resume you want to create</option>
                            <option value="1">IT</option>
                            <option value="2">Non-IT</option>
                        </select>
                    </div>*/}

                    <input type="submit" value='Add Profile' className="btn btn-primary" />
                    <div><h3>Please click Add Profile to save</h3></div>
                    <div className="nextSection">
                        <Link to="/education" className="btn btn-primary">
                            Next Section</Link>
                    </div>





                </form>
            </div>
            <div className="preview">
                {true && headerInput ? <div>
                    <h1>Preview</h1>
                    <h4>First Name:{headerInput.firstName}</h4>
                    <h4>Last Name: {headerInput.lastName}</h4>
                    <h4>Email:{headerInput.email}</h4>
                    <h4>Phone: {headerInput.phone}</h4>
                    <h4>Role: {headerInput.role}</h4>
                    <h4>LinkedIn: {headerInput.linkedIn}</h4>
                </div> : <div></div>}
            </div>
        </div>

    );
};


export default Landing
