sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/MessagePopover",
    "sap/m/MessageItem",
    "sap/m/MessageBox"

 

], function (Controller, JSONModel, MessageToast, Fragment, MessagePopover, MessageItem, MessageBox) {
    "use strict";

 

    return Controller.extend("zfcl.controller.Master", {
        onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()
        },


        onItemPress: function (oEvent) {
           
            var product = oEvent.getSource().getSelectedItem().getBindingContext().getPath().substr(1)
            
            this.oRouter.navTo("Detail", { prod : product });
        }
    });
});