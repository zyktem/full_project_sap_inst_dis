sap.ui.define([
    "sap/ui/core/mvc/Controller"
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("binding.controller.View1", {
            onInit: function () {
                    
            var oModel = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/v2/northwind/northwind.svc/");
            this.getView().setModel(oModel,"myData");
                    
            }
        });
    });
