import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Task from '../components/Task';

import { Tasks } from '../../../imports/api/tasks';

class Home extends Component {
  renderQuestions() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="row">
        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  const loading = Meteor.subscribe('tasks');

  return {
    tasks: loading ? Tasks.find({}, { sort: { createdAt: -1 } }).fetch() : '',
  };
}, Home);
