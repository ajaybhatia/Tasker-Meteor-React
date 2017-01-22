import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../../ui/layouts/MainLayout';

import Home from '../../ui/pages/Home';
import AddTask from '../../ui/pages/AddTask';
import UpdateTask from '../../ui/pages/UpdateTask';


FlowRouter.route('/', {
  name: 'homepage',
  action() {
    mount(MainLayout, {
      content: <Home />
    })
  }
});

FlowRouter.route('/new-task', {
  name: 'newtask',
  action() {
    mount(MainLayout, {
      content: <AddTask />
    });
  }
});

FlowRouter.route('/task/:id', {
  name: 'updatetask',
  action(params, queryParams) {
    mount(MainLayout, {
      content: <UpdateTask params={{id: params.id}} />
    });
  }
});
