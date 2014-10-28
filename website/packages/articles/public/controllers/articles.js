'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles',
    function($scope, $stateParams, $location, Global, Articles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var article = new Articles({
                    title: this.title,
                    content: this.content,
                    images: $scope.images,
                    documents: $scope.documents
                });
                article.$save(function(response) {
                    $location.path('articles/' + response._id);
                });

                this.title = '';
                this.content = '';
                $scope.images = [];
                $scope.documents = [];
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var article = $scope.article;
                if (!article.updated) {
                    article.updated = [];
                }
                article.updated.push(new Date().getTime());

                article.$update(function() {
                    $location.path('articles/' + article._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };

        $scope.uploadFileCallback = function(file) {
            var filename = file.name.toLowerCase();

            if (filename.indexOf('.doc') !== -1 || filename.indexOf('.pdf') !== -1) {
                file.simpletype = 'document';
            } else if (filename.indexOf('.jpg') !== -1 || filename.indexOf('.jpeg') !== -1 || filename.indexOf('.png') !== -1 || filename.indexOf('.gif') !== -1 ||  filename.indexOf('.bmp') !== -1) {
                file.simpletype = 'image';
            }
        };

        $scope.uploadFinished = function(files) {
            var images = [],
                documents = [];

            for (var i = 0; i < files.length; i++) {
                if (files[i].simpletype === 'document') {
                    documents.push(files[i]);
                } else if (files[i].simpletype === 'image') {
                    images.push(files[i]);
                }
            }

            $scope.images = images;
            $scope.documents = documents;
        };
    }
]);
