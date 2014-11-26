'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    User = mongoose.model('User'),
    _ = require('lodash'),
    nodemailer = require('nodemailer'),
    templates = require('../template'),
    config = require('meanio').loadConfig();

/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Send email
 */
function sendMail(mailOptions) {
    var transport = nodemailer.createTransport('SMTP', config.mailer);
    transport.sendMail(mailOptions, function(err, response) {
        if (err) return err;
        return response;
    });
}

/**
 * Create an article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the article'
            });
        }

        res.json(article);

        if (article.notifyUsers) {
            User.find().exec(function(err, users) {
                if (!err) {
                    for (var i = 0; i < users.length; i++) {
                        var mailOptions = {
                            to: users[i].email,
                            from: config.emailFrom
                        };

                        mailOptions = templates.new_article_email(req, users[i], article, mailOptions);
                        sendMail(mailOptions);
                    }
                }
            });
        }
    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the article'
            });
        }
        res.json(article);

    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the article'
            });
        }
        res.json(article);

    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.json(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the articles'
            });
        }
        res.json(articles);

    });
};
