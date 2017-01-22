import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

import { Tasks } from '../../api/tasks';

class UpdateTask extends Component {
  componentWillReceiveProps(props) {
    ReactDOM.findDOMNode(this.refs.inputText).value = props.task.text;
    ReactDOM.findDOMNode(this.refs.inputDescription).value = props.task.description;
    ReactDOM.findDOMNode(this.refs.completed).checked = props.task.completed;
  }

  updateTask(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.inputDescription).value.trim();
    const completed = ReactDOM.findDOMNode(this.refs.completed).checked;

    Meteor.call('update', this.props.task._id, text, description, completed, (error) => {
      if (!error) {
        FlowRouter.go('homepage');
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <form role="form" onSubmit={this.updateTask.bind(this)}>
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                type="text"
                ref="inputText"
                defaultValue={this.props.task.text}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Description</label>
              <textarea
                ref="inputDescription"
                className="form-control"
                rows="7"
                defaultValue={this.props.task.description}>
              </textarea>
            </div>

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                {this.props.task.completed?
                  <input type="checkbox" ref="completed" defaultChecked/> :
                  <input type="checkbox" ref="completed" />
                }
                </span>
                <label className="form-control">Is Completed?</label>
              </div>
            </div>

            <div className="form-group">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default createContainer(({ params }) => {
  const { id } = params;
  const subscription = Meteor.subscribe('task', id);
  const isReady = subscription.ready();

  return {
    task: isReady ? Tasks.findOne({_id: id}) : '',
  };
}, UpdateTask);
