sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("pollution.controller.Firstview", {
            onInit: function () {

            var apiModel = new JSONModel("https://948e87b7-31c5-4fbd-a87f-b541d26ed0de.mock.pstmn.io/country");
            this.getView().setModel(apiModel,"oView")




            },
            oPress:function(){
                console.log("clicked")
            }
        });
    });
