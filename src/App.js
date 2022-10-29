import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react'
import SearchBar from './SearchBar/SearchBar';
import IssuesList from './IssuesList/IssuesList';
import EditIssueModal from './UI/editIssueModal';
import AddIssue from './AddIssue/AddIssue';
import { IssuesContext, ShowModal } from './Context/Context';

function App() {

  const [issues, setIssues] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showPostIssueModal,setShowPostIssueModal] = useState(false)

  useEffect(() => {
   Axios.get("https://localhost:7195/api/issues")
      .then(Response => {
        setIssues(Response.data)
        setSearchResults(Response.data)
      })
  }, [])

  const showPostModalHandler = () =>setShowPostIssueModal(true)

  return (
    <div className="App">
      
      <div className='header'>
        <h1 className='title'>Issue Tracker</h1>
          <div className='search'>
            <SearchBar issues={issues} setSearchResults={setSearchResults} />
          </div>
         <button className='AddButton' onClick={showPostModalHandler}>Add</button>
      </div>
      
      <div className='issues'>
      <IssuesContext.Provider value={{searchResults, setSearchResults}}>
      <EditIssueModal show={showPostIssueModal}>
      <ShowModal.Provider value={{showPostIssueModal,setShowPostIssueModal}}>
        <AddIssue cancel={()=>setShowPostIssueModal(false)}/>
        </ShowModal.Provider>
      </EditIssueModal>
      </IssuesContext.Provider>
       
        <IssuesList searchResults={searchResults} setSearchResults={setSearchResults}/>
      </div>
    </div>
  );
}

export default App;
