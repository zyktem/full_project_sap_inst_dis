sap.ui.define([
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
        "use strict";

        return Controller.extend("zfcl.controller.Detail", {
            onInit: function () {

                this.oRouter = this.getOwnerComponent().getRouter();
              
                this.oModel = this.getOwnerComponent().getModel();
    
                this.oRouter.getRoute("Detail").attachPatternMatched(this._onCategoryMatched, this);
            },
            _onCategoryMatched: function(ect){
                this.pro = ect.getParameter('arguments').prod
                this.getView().bindElement({
                    path: '/'+this.pro
                })
               
             
            },
           
         

        });
    });
