import React from 'react';

export const MainLayout = ({content}) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <a href="/" className="navbar-brand">HOME</a>
          <ul className="nav navbar-nav">
            <li>
              <a href='/new-task'>New Task</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="container">
      {content}
    </div>
  </div>
)
