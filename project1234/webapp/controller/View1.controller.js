sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1234.controller.View1", {
            onInit: function () {

            },
            
            onPress:function(){
                this.getOwnerComponent().getRouter().navTo("RouteView2");
            },
            onSerial:function(){
                this.getOwnerComponent().getRouter().navTo("RouteView3");  
            },
            //concel button
            oReject:function(){
                this.getView().byId("inEqui").setValue(null);
                this.getView().byId("inFunloc").setValue(null)
            }
            

        });
    });
