import React, { Component } from 'react';

import { Tasks } from '../../api/tasks';

export default class Task extends Component {
  deleteTask(event) {
    Meteor.call('delete', this.props.task._id);
  }

  toggleComplete(event) {
    Meteor.call('toggle', this.props.task._id, !this.props.task.completed);
  }

  operationalIcon() {
    return this.props.task.completed ? "pull-right glyphicon glyphicon-minus": "pull-right glyphicon glyphicon-ok";
  }

  render() {
    return (
      <li className={this.props.task.completed ? "list-group-item danger" : "list-group-item"}>
        {this.props.task.completed ?
          <div className="text-center">
            <span className="text-huge">Completed</span>
            <i className="glyphicon glyphicon-remove pull-right" onClick={this.deleteTask.bind(this)}></i>
            <i className="glyphicon glyphicon-minus pull-right" onClick={this.toggleComplete.bind(this)}></i>
          </div>
          :
          <div>
            <h4>
              <a href={"/task/" + this.props.task._id}>{this.props.task.text}</a>
              <i className="glyphicon glyphicon-remove pull-right" onClick={this.deleteTask.bind(this)}></i>
              <i className={this.operationalIcon()} onClick={this.toggleComplete.bind(this)}></i>
            </h4>
            <p>
              {this.props.task.description}
            </p>
          </div>
        }
    </li>
    );
  }
}
