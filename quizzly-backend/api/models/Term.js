/**
* Term.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    season: {
      model: 'season',
      required: true
    },
    year: {
      model: 'year',
      required: true
    },

    // Methods
    getFullTerm: function() {
      return this.season + " " + this.year;
    }
  }
};
