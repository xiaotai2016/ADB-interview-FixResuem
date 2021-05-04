import React, { useState, useEffect } from "react";

//import html2pdf from 'html2pdf.js';

import axios from 'axios';
import * as API from '../data/api'
import styled from "styled-components";
import { AiOutlinePrinter } from "react-icons/ai";

import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLinkedin } from "react-icons/ai";



const PrintButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrintButton = styled.button`
  padding: 8px 26px;
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #11698e;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #11698e;
  font-weight: bold;
  transition: 0.3s ease;
  &:hover {
    background: #11698e;
    color: white;
  }
  @media print {
    display: none;
  }
`;

const TempTwo = () => {
  //window.thisUserId = "23acaabd-d61d-4e90-9a3e-014192d42b51"
  const getBaseInfo = () => {
      if (window.thisUserId) {
      var searchId= window.thisUserId
      axios
          .post(API.BACKEND + API.GET_RECORD,{data:{searchId}})
          .then((data) => {
          if (data.data.msg === "success") {
              var resumeobj = data.data.data
              console.log(resumeobj)
              setresumeData(resumeobj)
          }
          })
      }
  }
  const [resumeData, setresumeData]=useState({
      firstName:"",
      lastName:"",
      role:"",
      education:[{description:[1,2]}],
      email:"",
      experience:[{description:[1,2]}],
      linkedIn:"",
      manageskills:[],
      phone:"",
      softskills:[],
      summary:"",
      techskills:[]}
      )
    const {firstName,lastName,education,email,experience,linkedIn,phone,softskills,summary,techskills} = resumeData


//   const exportPdf = () => {
//     const element = document.getElementById('show');
//     console.log(element);
//     const opt = {
//       margin: [0, 0, 0, 0],
//       filename: 'resume',
//       image: { type: 'jpeg', quality: 0.5 },
//       html2canvas: { scale: 2, useCORS: true},
//       jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
//     };
//     if (element) {
//       html2pdf().set(opt).from(element).save();
//     }
// };

//console.log(resumeData)

useEffect(() => {
  getBaseInfo();
  console.log('??')
}, [])

  return (
    <div >
      <div className="container" id='doc' >
        <div className="row t2_header">
        <h1 className="fullName" >
            {firstName} {lastName}
        </h1>
        </div>
          <div className="row">
              <div className="col-md-4" >

                  <h1 className="headings"> Summary</h1>
                  <hr style={{ width: '100%', marginLeft: '0' }} />
                  <p className="summaryPara">{summary}</p>
                  <br/>

                  <h1 className="headings">Experience</h1>
                  <hr style={{ width: '80%', marginLeft: '0' }} />
                  <div>
                  {
                      experience.map((item,index)=>{
                          console.log(1)
                         return (
                              <div className="baseinfo">
                              <span className='experience'>{item.comName}</span>
                              <span className="experience">{item.position?'--'+item.position:''}</span><br/>
                              <span className="locaion">{item.city?item.city+',':''}</span>
                              <span className="locaion">{item.state?item.state+',':''}</span>
                              <span className="locaion">{item.country?item.country:''}</span>
                              <span className="worktime">{item.from+'~'+item.to}</span> <br/><br/>
                              <span className="description">{item.description[0]}</span>
                              <div>________</div><br/>
                              </div>
                         )
                      })
                  }

                  <br/>
                  <h1 className="headings">Education</h1>
                  <hr style={{ width: '80%', marginLeft: '0' }} />
                  <div className="education">

                  {
                      education.map((item,index)=>{
                         return (
                              <div className="baseinfo">
                              <span className='experience'>{item.uniName}</span>
                              <span className="experience">{item.position?'--'+item.position:''}</span><br/>
                              <span className="locaion">{item.city?item.city+',':''}</span>
                              <span className="locaion">{item.state?item.state+',':''}</span>
                              <span className="locaion">{item.country?item.country:''}</span>
                              <span className="worktime">{item.from+'~'+item.to}</span><br/><br/>
                              <span className="description">{item.description}</span>
                                <div>________</div><br/>
                              </div>
                         )
                      })
                  }
                  <br/>
                  </div>
                  </div>


              </div>


              <div className="col-md-4" >


                  <br />
                  <div className="allIcons"><FiPhone /> {phone}</div>
                  <div className="allIcons"><HiOutlineMail /> {email}</div>
                  <div className="allIcons"><AiOutlineLinkedin />{linkedIn}</div>
                  {/*<div className="allIcons"><FiGithub /> www.github.com</div>
                  <div className="allIcons"><AiOutlineLinkedin />www.bowen.com</div>*/}
                  <hr style={{ width: '80%', marginLeft: '0' }} />

              <h1 className="headings"> Technial Skills</h1>
              <hr style={{ width: '80%', marginLeft: '0' }} />
              <div className="softSkills">
              <ul>
                  {
                      techskills.map((item,index)=>{
                          return (
                              <li key={index} >{item}</li>
                          )
                      })
                  }
              </ul>
              </div>
              <br/><br/>
              <h1 className="headings"> Soft Skills</h1>
              <hr style={{ width: '80%', marginLeft: '0' }} />
              <div className="softSkills">
              <ul>
                  {
                      softskills.map((item,index)=>{
                          return (
                              <li key={index} >{item}</li>
                          )
                      })
                  }
              </ul>
              </div>
              </div>
              </div>



          </div>

          <PrintButtonContainer>
              <PrintButton >
                  <AiOutlinePrinter style={{ verticalAlign: "middle" }} /> Print CV
              </PrintButton>
          </PrintButtonContainer>
      </div>
  )
}

export default TempTwo
