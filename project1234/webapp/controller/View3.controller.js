sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1234.controller.View3", {
            onInit: function () {

            },
            //selection of the insatll action
            oSelection:function(){
                this.getView().byId("btnAcc").setText("Install")
            },
            //selection of the Dismantle action
            oSelectionD:function(){
                this.getView().byId("btnAcc").setText("Dismantle")
            },
            //cancle button 
            oReject:function(){
                this.getView().byId("inEqui").setValue(null);
                this.getView().byId("inFunloc").setValue(null)
            }
            

        });
    });
