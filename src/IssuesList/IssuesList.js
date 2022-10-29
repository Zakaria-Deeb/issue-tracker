import React from 'react'
import SingleIssue from '../SingleIssue/SingleIssue'
import Axios from 'axios'
import EditIssue from '../EditSingleIssue/EditSingleIssue'
import EditIssueModal from '../UI/editIssueModal'
import { useState } from 'react';

const IssuesList = ({ searchResults,setSearchResults }) => {
    const [editIssueModal, setEditIssueModal] = useState(false)
    const [id, setId] = useState()
    const [title, setTitle] = useState("")
    const [issueType, setIssueType] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [completed, setCompleted] = useState(false)

    const deleteHandler = (id) => {
        Axios.delete("https://localhost:7195/api/issues/" + id)
        .then(setSearchResults(searchResults.filter(issue=>issue.id!==id)))
    }

    const editModalHandler = async (id) => {
        setEditIssueModal(true)
        await Axios.get("https://localhost:7195/api/issues/" + id)
            .then(response => {
                let res = response.data
                setId(res.id)
                setTitle(res.title)
                setIssueType(res.issueType)
                setPriority(res.priority)
                setDescription(res.description)
                setCompleted(res.completed)
            })
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value)
    }
    const changeIssueTypeHandler = (e) => {
        setIssueType(e.target.value)
    }
    const changePriorityHandler = (e) => {
        setPriority(e.target.value)
    }
    const changeDescriptionHandler = (e) => {
        setDescription(e.target.value)
    }
    const completeHandler = () => {
        setCompleted(true)
    }
    const closeModalHandler = () => {
        setEditIssueModal(false)
    }

    const submitEditHandler = () => {
        Axios.put('https://localhost:7195/api/issues/' + id, {
            "id": id,
            "title": title,
            "description": description,
            "priority": priority,
            "issueType": issueType,
            "created": "2022-10-15T21:41:03.898Z",
            "completed": completed

        }).then(res => {
            const newState = searchResults.map(obj=>{
                if(obj.id === id){
                    return{...obj,title:title,description:description,priority:priority,issueType:issueType,completed:completed}
                }
                return obj
            })
            setSearchResults(newState)

            setEditIssueModal(false)
        })
    }

    const results = searchResults.map(issue => <SingleIssue key={issue.id} issue={issue}
        Delete={() => deleteHandler(issue.id)}
        edit={() => editModalHandler(issue.id)}
    />)

    const content = results?.length ? results : <article><h3>No Matching Issues</h3></article>
    return (
        <main>
            <EditIssueModal show={editIssueModal}>
                <EditIssue key={id}
                    titleInfo={title}
                    changeTitle={changeTitleHandler}
                    IssueTypeValue={issueType}
                    changeIssueType={changeIssueTypeHandler}
                    PriorityValue={priority}
                    changePriority={changePriorityHandler}
                    description={description}
                    changeDescription={changeDescriptionHandler}
                    complete={completed}
                    changeStatus={completeHandler}
                    confirmEdit={() => { submitEditHandler() }}
                    cancel={closeModalHandler} />
            </EditIssueModal>
            {content}
        </main>
    )
}

export default IssuesList