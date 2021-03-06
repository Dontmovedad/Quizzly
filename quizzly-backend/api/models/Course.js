/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    title: { // 'CSCI 201'
      type: 'string',
      required: true
    },
    professor: {
      model: 'professor',
    },
    term: {
      model: 'term'
    },
    // Associations
    quizzes: {
      collection: 'quiz',
      via: 'course'
    },
    sections: {
      collection: 'section',
      via: 'course'
    },

    // Methods
  }
};
