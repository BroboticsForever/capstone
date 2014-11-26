'use strict';

module.exports = {
    new_article_email: function(req, user, article, mailOptions) {
        mailOptions.subject = 'Brobotics Forever - New article posted!';

        mailOptions.html = [
            'Hello ' + user.name + ',',
            '',
            'A new article has been posted on BroboticsForever.com:',
            '<h2>' + article.title + '</h2>',
            'Click this link to view the article:',
            'http://' + req.headers.host + '/#!/articles/' + article._id,
            '',
            'Thank you for registering with Brobotics Forever!',
            '',
            'Sincerely,',
            'The Brobotics Forever Development Team'
        ].join('<br>');

        return mailOptions;
    }
};