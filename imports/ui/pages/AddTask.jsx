import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Tasks } from '../../api/tasks';

export default class AddTask extends Component {
  submitTask(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.inputDescription).value.trim();
    const completed = ReactDOM.findDOMNode(this.refs.completed).checked;

    Meteor.call('insert', text, description, completed, (error) => {
      if (!error) {
        ReactDOM.findDOMNode(this.refs.inputText).value = "";
        FlowRouter.go('/');
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <form role="form" onSubmit={this.submitTask.bind(this)}>
            <div className="form-group">
              <label htmlFor="">Title</label>
              <input
                type="text"
                ref="inputText"
                className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="">Description</label>
              <textarea ref="inputDescription" className="form-control" rows="7"></textarea>
            </div>

            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <input type="checkbox" ref="completed" />
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
