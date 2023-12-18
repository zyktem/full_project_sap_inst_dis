sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,MessageBox,MessageToast) {
        "use strict";
        var oEventBus = sap.ui.getCore().getEventBus();

        return Controller.extend("project1234.controller.View1", {
            onInit: function () {
                var localData = {
                    "btnVal" : ""
                };
                // var oModelLocal = new JSONModel();
             // this.getView().setModel(oModelLocal, 'oModelLocal')


             this.getOwnerComponent().getModel('localModel').setData(localData)
            },
            serial: function () {
                console.log("i am serialize")
                //  this.getView().getModel('localModel').setProperty('/btnVal',this.byId('instBtn').getBindingInfo('text').parts[0].path)


                this.getOwnerComponent().getRouter().navTo("RouteView3");
            },
            nonSerial: function () {
                console.log("i am not serialize")
               


                this.getOwnerComponent().getRouter().navTo("RouteView2")
            },
            //if install action is triggerd
            actionIns: function () {
                // this.getOwnerComponent().getModel('localModel').setProperty('/btnVal',this.byId('instBtn').getBindingInfo('text').parts[0].path)
                if (this.getView().byId("equiInp").getValue() === "s") {
                 
                    this.serial()
                }
                else if (this.getView().byId("equiInp").getValue() === "n") {
                    this.nonSerial()
                }
            },
            //if dismantle action is triggerd
            actionDis: function () {
                
                this.getOwnerComponent().getModel('localModel').setProperty('/btnVal',this.byId('distBtn').getBindingInfo('text').parts[0].path)
                if (this.getView().byId("equiInp").getValue() === "s") {
                    this.getOwnerComponent().getRouter().navTo("serdis");

                    // this.serial()
                }
                if (this.getView().byId("equiInp").getValue() === "n") {
                    this.getOwnerComponent().getRouter().navTo("nsirdis");
                   // this.nonSerial()
                }
            },
            //action button controls
            // oSelection: function (oEvent) {
            //     if (oEvent.oSource.sId.slice(-7) === "instBtn") {
            //         var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            //         this.actionIns()
            //     }
            //     if (oEvent.oSource.sId.slice(-7) === "distBtn")
                
            //         this.actionDis()

            // }

            // import for transfring the data from one view to another view via target in maifest


            // onInit: function () {
            //     this.getOwnerComponent().getRouter().getRoute("RouteNserins").attachPatternMatched(this._onEquipNoMatched, this);
            // },
            // _onEquipNoMatched: function (oEvent) {
            //     this._equiP = oEvent.getParameter("arguments").equID;
            //     this.getView().byId("inEqui").setValue(this._equiP);
            
    
            // },



        });
    });
