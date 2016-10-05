/*jslint browser:true */
/*global alert, myapp*/

myapp.controller = function () {
    'use strict';
    var model = null,
        view = null;

    this.init = function () {
        view  = new myapp.view(this);
        console.log(view);
        model = new myapp.model(view, this);
    };

    this.displayNextQuestion = function () {
        model.displayNextQuestion();
    };

    this.returnAllReport = function () {
        var app = model.getTheApp(),
            str = app.returnAllReport();
        return str;
    };
    
    this.returnModel = function () {
        return model;
    };
    
    this.returnView = function () {
        return view;
    };
    
    this.createQuiz = function () {
        var app = model.getTheApp();
        app.createQuiz();
    };
    
};