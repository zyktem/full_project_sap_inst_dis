sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("ztable.controller.View1", {
            onInit: function () {

            
                var odata = new JSONModel ("https://services.odata.org/northwind/northwind.svc/Categories/")
                this.getView().setModel(odata,"dataModel")
                console.log("test")

            }
        });
    });
