sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast,JSONModel) {
        "use strict";

        return Controller.extend("odata.controller.View1", {
            // dataPath : "https://services.odata.org/Northwind/Northwind.svc/Alphabetical_list_of_products?$format=json",
            
            onInit: function () {
                var LocalData = {
                    recipient : {
                       name : "World"
                    }
                 };
                 var oModel = new JSONModel();
                //  var dataPath = "../model/test.json";
                let dataPath1 = "https://services.odata.org/Northwind/Northwind.svc/Alphabetical_list_of_products?$format=json";
                let datapath2 = "https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json";
                // var oModel1 = new JSONModel(sap.ui.require.toUrl("odata/model/test"));
                 oModel.setData(LocalData);
                 //this.getView().setModel(oModel,"Hello");
                sap.ui.getCore().setModel(oModel,"Hello");
                var oModel1 = new JSONModel(dataPath1);
                this.getView().setModel(oModel1,"NorthWind");
                // var oDataModel = new sap.ui.model.odata.ODataModel();
                var oModel2 = new JSONModel(datapath2);
                this.getView().setModel(oModel2,"NorthWindCustomers");
                // oModel2.read();
                
            },
            onShowHello : function () {
                // let InputText = this.getView().getModel().getData().recipient.name;
                // MessageToast.show("Hello "+InputText);
                let InputVal = this.getView().byId("InputField").getProperty("value");
                sap.ui.getCore().getModel("Hello").getData().recipient.name = InputVal;
                MessageToast.show("Hello"+" "+InputVal);
            },
            OnAfterRendering : function(){
                alert("running");
                sap.ui.getCore().getModel("Hello").getProperty("/recipient/name");
            },
            ValueChange : function(oEvent){
                console.log(oEvent);
                var oVal = this.getView().byId("InputField").getValue();
                this.getView().byId("InputField").setDescription("Hello"+" "+oVal);
            }
            
        });
    });
