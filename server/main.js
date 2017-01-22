import { Tasks } from '../imports/api/tasks';

import '../imports/api/tasks';

Meteor.publish('tasks', () => {
  return Tasks.find({});
});

Meteor.publish('task', (id) => {
  return Tasks.find(id);
});

Meteor.methods({
  insert(text, description, completed) {
    Tasks.insert({
      text,
      description,
      completed,
      createdAt: new Date(),
    });
  },
  update(id, text, description, completed) {
    Tasks.update(id, {
      $set: {
        text,
        description,
        completed
      }
    });
  },
  toggle(id, completed) {
    Tasks.update(id, {
      $set: {
        completed
      }
    });
  },
  delete(id) {
    Tasks.remove(id);
  }
});
