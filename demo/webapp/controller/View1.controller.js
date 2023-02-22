sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, Filter, FilterOperator,formatter) {
        "use strict";
        
        return Controller.extend("demo.controller.View1", {
            formatter:formatter,
            onInit: function () {

                var path = "../model/index.json";
               
                var oModel = new JSONModel(path);
                this.getView().setModel(oModel,"goods");
                
                // set data model
                var oViewModel = new JSONModel({
                    currency: "EUR"
                });
                this.getView().setModel(oViewModel, "view");
            },

            onPressDetail : function(){
                alert("impress")
            },
            onPress : function(){
                alert("clicked");
            },
            handleDelete: function(oEvent) {
                var oList = oEvent.getSource(),
                    oItem = oEvent.getParameter("listItem"),
                    sPath = oItem.getBindingContext().getPath();
    
                // after deletion put the focus back to the list
                oList.attachEventOnce("updateFinished", oList.focus, oList);
    
                // send a delete request to the odata service
                // this.oModel.remove(sPath);
                this.oModel.removeBinding(sPath);
            },

            onFilterInvoices : function (oEvent) {

                // build filter array
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }
    
                // filter binding
                var oList = this.byId("idList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },
            messageS : function(event){
                var price = this.getView().getModel("goods").getData();
                for(var i = 0;i<price.Invoices.length;i++){
                    //console.log(price.Invoices[i].ExtendedPrice)
                    
                    console.log(Math.round(price.Invoices[i].ExtendedPrice)) 
                }
            }
          
        });
    });
