import React from 'react'
import "./SingleIssue.css"
import Button from '@mui/material/Button';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';

const singleIssue = ({ issue, edit, Delete }) =>{
 
  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}
  var date = convertUTCDateToLocalDate(new Date(issue.created))
    return (
    <article className='SingleIssue' id={issue.id}> 
    <h2>{issue.title}</h2>
    {issue.completed?<span className='completed'>Completed<DoneAllTwoToneIcon/></span>:null}{/*<input type="checkbox" checked={issue.complete} readOnly/>*/}
   <span className='priority'> Priority  <span className={issue.priority}> {issue.priority} </span></span>
    <p className='issueType'>Issue Type <span className={issue.issueType}>{issue.issueType}</span></p>
    <textarea type="text" className='description' value={issue.description} readOnly/> 
    <p className='date'>Created on: {date.toString().split(' ').slice(0, 5).join('-')}</p> 
    <Button className='delete-button' size="large" variant="contained" color="error" onClick={Delete}>Delete</Button>  
    <Button className='edit-button' variant='contained' color='success' size='large' onClick={edit}>Edit</Button>
  
   </article>
  )
}

export default singleIssue