sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("vaccination.controller.Home", {
            onInit: function () {
                var path = "../model/vacc.json";
                var oModel = new JSONModel(path);
                this.getView().setModel(oModel,"oVacc")


            }
        });
    });
