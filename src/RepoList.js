import React from 'react';

const RepoList = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0 ) return <p></p> 
  else {
      if(repos.message) {
        return <>
            <h2 className='list-head'>Github User Not Found</h2>
        </>
      } else {
        return (
        <ul>
            <h3 className='list-head'> Public Repositories List of {repos[0].owner.login}</h3>
            {repos.map((repo) => {
            return (
                <li key={repo.id} className='list mt-3'>
                <span className='repo-text'>{repo.name}</span>
                <br></br>
                <span className='repo-description ml-3 mt-2'>{repo.description}</span> 
                </li>
            );
            })}
        </ul>
        );
      }
  }
};

export default RepoList;
