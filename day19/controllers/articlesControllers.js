let Article = require('../models/article');

exports.index = function(req, res, next) {
    let response_msg = req.query.message;
    Article.find({}, function(err, results) {
        if (err) throw err;
        res.render('articles/index', {
            data: results, 
            message: response_msg 
        });
        console.log(results);
    });
};

exports.detail = function(req, res, next) {
    let params = req.params;
    Article.findOne({ _id: params.articleId }, function(err, result) {
        res.render('articles/detail', { article: result });
        console.log(result);
    });
};

exports.edit = function(req, res, next) {
    let date = new Date();
    let params = req.params;
    Article.find({ _id: params.articleId }, function(err, result) {
        let date = result[0].published_date;
        let dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;
        res.render('articles/edit', {
            article: result,
            date: dateFormat
        });
    });
};

exports.delete = function(req, res, next) {
    let params = req.params;
    Article.deleteOne({ _id: params.articleId }, function(err, result) {
        res.redirect('/articles?message=Successfully deleted article!');
    });
};

exports.create = function(req, res, next) {
    res.render('articles/create');
};

exports.create_article = function(req, res, next) {
    console.log(req.body);
    let article = new Article(req.body)
    article.save((err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect('/articles');
        }
    });
};