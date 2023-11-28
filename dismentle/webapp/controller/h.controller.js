sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";



    return Controller.extend("GUIDEDBUYING.ZPUNCHOUT.controller.TestCatalog", {
        onInit: function () {
            var x = this.getView().getModel("catalogModel");
            console.log("Success");



            var oModelJson = new sap.ui.model.json.JSONModel();
            var sServiceUrl = this.getMetadata().getManifestEntry("sap.app").dataSources.catalogDetailSrv.uri;
            var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {
                json:true,
                loadMetadataAsync:true
            });
            this.setModel(oModel,"odata");
            this.setModel(new oModelJson({
                "results":[]
            }),"_metadata"
            )
    }

    })
})
