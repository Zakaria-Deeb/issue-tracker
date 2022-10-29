import React from 'react'
import "./EditSingleIssue.css"
import Button from '@mui/material/Button';


const editIssue = (props) => {

    return (
        <div className='editPage'>
            <h2>Edit {props.titleInfo}</h2>
            <div>
                <p>Title: <input className='Title' type="text" value={props.titleInfo} onChange={props.changeTitle} /></p>
                <div>
                    <select className='issueType' value={props.IssueTypeValue} onChange={props.changeIssueType}>
                        <option>Bug</option>
                        <option>Feature</option>
                        <option>Documentation</option>
                    </select>
                </div>

                <div>
                    Priority:<select className='Priority' value={props.PriorityValue} onChange={props.changePriority}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <p>Description: <textarea className='Description' value={props.description} onChange={props.changeDescription} /></p>
                {props.complete ? <p><input className='complete' type="checkbox" onChange={props.changeStatus} checked={props.complete} />completed</p>
                    : <p><input className='complete' type="checkbox" onChange={props.changeStatus} />Check to mark the issue Completed</p>}
            </div>
            <div>
                <Button className="cancel" size="medium" variant="contained" color="error" onClick={props.cancel}>cancel</Button>
                <Button className='Edit' variant='contained' color='success' size='medium' onClick={props.confirmEdit}>Submit Edit</Button>
            </div>
        </div>
    )
}

export default editIssue