sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("project1234.controller.serdis", {
            onInit: function () {
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.getRoute("RouteView3").attachMatched(this._onRouteMatched, this);
            //       this.byId('actnV3').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))


            },
            oAction:function(){
                MessageBox.alert("Mesaage will pop-up according to action");
                this.getOwnerComponent().getRouter().navTo("RouteView1");

            },

            funcValueHelpRequested: function () {
               	var that = this;
				var funlocmodel = new JSONModel();
				this.getView().getModel(funlocmodel, 'FuncLocModel')
				$.ajax({
					url: "/sap/opu/odata/sap/YPMENH94803_SRV/ZshFuncLocSet?$format=json",
					success: function (oData) {
						var data = {
							"ZshFuncLocSet": oData.d.results
						};
						var FuncLocModel = that.getOwnerComponent().getModel("FuncLocModel");
						that.getView().getModel('FuncLocModel').setData(data)
						FuncLocModel.setData(data);
						that.ofunlocdiag();
					}.bind(this),
					error: function (e) {
						console.log(e);
					}
				});
            },
    
            funcDialog: function () {
                var funView = this.getView();
                if (!this._funDialog) {
                    this._funDialog = Fragment.load({
                        id: funView.getId(),
                        name: "com.sap.ZPMINSDISMVT.Fragment.equip",
                        controller: this
                    }).then(function (funDialog) {
                        funView.addDependent(funDialog);
    
                        return funDialog;
                    });
                }
                this._funDialog.then(function (funDialog) {
                    funDialog.open();
                }.bind(this));
            },
    
            funcSearch: function (eqEvent) {
                // add filter for search
                var funcValue = [];
                var sQuery = eqEvent.getSource().getProperty('value');
                var eFilters = new Filter({
                	filters: [
                		new Filter("Fltyp", FilterOperator.Contains, sQuery),
    
                	]
                });
          
                var oList = this.byId("idList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(funcValue);
    
            },
    
            funcHandelConfirm: function (eqConEvent) {
                var oSelectedItem = eqConEvent.getSource().getProperty('title');
                var disEquip = eqConEvent.getSource().getProperty('info');
                this.byId("discInp").setValue("");
                // eqConEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
                this.byId("equiInp").setValue(oSelectedItem);
                this.byId("discInp").setValue(disEquip);
                this.onpressCloseValueHelpAdmin();
            },
            onpressCloseValueHelpAdmin: function () {
                this.byId("digFunloc").close();
                this.byId("serFunc").setValue("");
                this.byId("listFunc").getBinding("items").resetData();
            },
    

          
          
           
                    
        






            ofunlocdiag: function () {
				var zView = this.getView();
				if (!this._zDialog) {
					this._zDialog = Fragment.load({
						id: zView.getId(),
						name: "com.sap.zpminstdis.Fragment.func-loc",
						controller: this
					}).then(function (zDialog) {
						zView.addDependent(zDialog);
						return zDialog;
					});
				}
				this._zDialog.then(function (zDialog) {
					zDialog.open();
				}.bind(this));
			},

        
         
        
            
            

        });
    });




// sap.ui.define([
// 	// "sap/ui/core/mvc/Controller",
// 	"./basecontroller"
// ], function (Controller) {
// 	"use strict";

// 	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Main", {
// 		onInit: function () {
// 			this.testFunction();
// 		}
	

// 	});
// });