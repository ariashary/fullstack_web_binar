var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleShcema = new Schema(
    {
        title: { type: String },
        author: { type: String },
        description: { type: String },
        published_date: { type: Date }
    }
)

module.exports = mongoose.model('Article', articleShcema);