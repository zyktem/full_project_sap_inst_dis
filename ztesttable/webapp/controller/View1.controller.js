sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("ztesttable.controller.View1", {
            onInit: function () {

            },

            
            oVisible : function(oEvent){
                if (oEvent.getSource().getPressed()){
                
                this.byId("tgBtn").setText('Last four coloum'); 
                this.byId("tgBtn").setIcon('sap-icon://navigation-right-arrow'); 
                this.getView().byId("cl4").setHAlign('End')    
                this.getView().byId("cl1").setVisible(true);
                this.getView().byId("cl2").setVisible(true);
                this.getView().byId("cl5").setVisible(false);
                this.getView().byId("cl6").setVisible(false);
               
           
                }
                else{
                    this.byId("tgBtn").setText('First four coloum');
                    this.byId("tgBtn").setIcon('sap-icon://nav-back');

                    this.getView().byId("cl4").setHAlign('Begin')  
                    this.getView().byId("cl1").setVisible(false);
                    this.getView().byId("cl2").setVisible(false);
                    this.getView().byId("cl5").setVisible(true);
                    this.getView().byId("cl6").setVisible(true);
                  
                   
                }


            },
            onFilterPosts : function(oEvent){
                var aFilter = [];
			    var sQuery = oEvent.getParameter("query");
			    if (sQuery) {
				aFilter.push(new Filter("OrderID", FilterOperator.EQ, sQuery));
			}

			// filter binding
			var oTable = this.byId("idProductsTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
                
            }
        });
    });
