sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Fragment, ResourceModel) {
        "use strict";

        return Controller.extend("dismentle.controller.Installtion", {
            //function for the clearing the fields
            clearFields: function () {
                this.byId("ser").setVisible(false)
                this.byId("input-equip").setVisible(true)
                this.byId("input-superord.equip").setValue(null);
            },
            onInit: function () {



            //     this.clearFields()



            // },






            // oSelection: function (oEvent) {

            //     if (oEvent.getSource().getSelectedButton().getText() === "Install") {

            //         this.byId("ser").setVisible(false)
            //         this.byId("input-equip").setVisible(true)
                    
            //         this.clearFields()

            //     } if (oEvent.getSource().getSelectedButton().getText() === "Dismantle") {

            //         this.byId("ser").setVisible(true)
            //         this.byId("input-equip").setVisible(false)
            //         this.clearFields()
            //     }
            // },
            // oAccept: function (oEve) {
            //     console.log()
            //     var x = this.byId('rbg4').getSelectedButton().getText()
            //     if (x == 'Install') this.eve1()
            //     if (x == 'Dismantle') this.eve2()
            // },
            // eve1: function (x) {

            //     var equip = this.byId("input-equip").getValue();
            //     var fun = this.byId("input-funloc").getValue();
            //     var sup = this.byId("input-superord.equip").getValue();
            //     console.log(equip, fun, sup);
            //     this.clearFields()

            // },
            // eve2: function (x) {
            //     var equip = this.byId("ser").getValue();
            //     console.log("eve2")
            //     this.clearFields()

            },


        });
    });
