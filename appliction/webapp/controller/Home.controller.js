sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("appliction.controller.Home", {
            onInit: function () {
                var path = "../model/dataVcc.json";
                var oModel = new JSONModel(path);
                this.getView().setModel(oModel,"oVacc")

                let switchView = {
                    "table" : true,
                   "calendar" : false
                    
                };
                let viewModel = new JSONModel(switchView)
                this.getView().setModel(viewModel,"oView")
            },
            formateDate:function(input){
                return new Date(input)
            },
            formateState:function(input){
                var currentDate = new Date();
                var appointment = new Date(input);
                if (currentDate>appointment){
                    return "Success";
                }else if(currentDate<appointment){
                    return "Warning";
                }else{
                    return "Error";
                }
            }
                
            
            

        });
    });
