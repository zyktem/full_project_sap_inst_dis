sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
  ], function(Controller,JSONModel,fioriLibrary) {
    "use strict";
  
    return Controller.extend("pollution.controller.secondview", {

        onInit:function(){
            var countriesModel = new JSONModel('https://948e87b7-31c5-4fbd-a87f-b541d26ed0de.mock.pstmn.io/country');
			countriesModel.setSizeLimit(1000);
             this.getView().setModel(countriesModel, 'countries');  
             this.oRouter = this.getOwnerComponent().getRouter();
        },
        handleItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
				supplierPath = oEvent.getSource().getSelectedItem().getBindingContext("country").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("Deatil", {layout: oNextUIState.layout,
				product: this._product, supplier: supplier});
        }
    });
  });


