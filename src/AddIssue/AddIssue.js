import React,{useState,useContext} from 'react'
import Axios from 'axios'
import { IssuesContext, ShowModal } from '../Context/Context'
import './AddIssue.css'
import Button from '@mui/material/Button';

const AddIssue = (props) => {
  const {setShowPostIssueModal} = useContext(ShowModal)
  const {searchResults, setSearchResults} = useContext(IssuesContext)  
  const [title,setTitle] = useState("")
    const [issueType,setIssueType] = useState("Bug")
    const [priority,setPriority] = useState("High")
    const [description,setDescription] = useState("")

    const postIssueHandler = () =>{
        var date = new Date()
        const utcDate = date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getDate())+"T"+(date.getUTCHours())+":"+(date.getUTCMinutes())+":"+(date.getUTCSeconds())+"."+(date.getUTCMilliseconds())+"Z"
        const data = {
            "title":title,
            "priority":priority,
            "issueType":issueType,
            "description":description,
            "completed":false,
            "created":utcDate
        }
        Axios.post("https://localhost:7195/api/issues",data).then((res)=>{
          setSearchResults([...searchResults,res.data])
          setTitle("")
          setIssueType("Bug")
          setPriority("High")
          setDescription("")
        })
        setShowPostIssueModal(false)
    }

  return (
    <article className='addIssue'>
    <h2>Add Issue</h2>
    <div className='titleInput'> 
    Title:<input className='titleInput' type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>

    <div className='_IssueType'>
           Issue Type:<select className='_issueType' value={issueType} onChange={(e)=>setIssueType(e.target.value)}>
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                    <option value="Documentation">Documentation</option>
                </select>
    </div>

    <div>
     Priority:<select className='_priority' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
    </div>
    
    <div>
    <textarea className='_description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    </div>

    <div className='buttons'>
    <Button className='_cancel' size="medium" variant="contained" color="error" onClick={props.cancel}>cancel</Button>
    <Button className='submit' variant='contained' color='success' size='medium' onClick={postIssueHandler}>Submit Issue</Button>
    </div>

    </article>
  )
}

export default AddIssue