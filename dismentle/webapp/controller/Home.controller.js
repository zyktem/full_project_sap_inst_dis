sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel",
	'sap/m/MessagePopover',
	'sap/m/MessageItem',

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Fragment,ResourceModel,MessagePopover,MessageItem) {
        "use strict";

        return Controller.extend("dismentle.controller.Home", {
             onInit: function () {
				var i18nModel = new ResourceModel({
					bundleName: "dismentle.i18n.i18n"
				});
				this.getView().setModel(i18nModel, "i18n");
				this.oBundle = this.getView().getModel("i18n").getResourceBundle();
				
				
				
			},
			oSelection: function (oEvent) {

				if (oEvent.getSource().getId().slice(-3) === "tb1") {
					this.byId("btnAcc").setText(this.oBundle.getText('btnInstall'));
					this.getView().byId("tb1").setType("Success")
					this.getView().byId("tb2").setType("Default")

					this.byId("ser").setVisible(false);
					this.byId("input-equip").setVisible(true);
					this.byId("input-equip").setValue(null);
					this.byId("input-funloc").setValue(null);
					this.byId("input-superord.equip").setValue(null);
				}
				if (oEvent.getSource().getId().slice(-3) === "tb2") {
					this.byId("btnAcc").setText(this.oBundle.getText('btnDismantle'));
					this.getView().byId("tb2").setType("Success")
					this.getView().byId("tb1").setType("Default")
					this.getView().byId("tb1").setEnabled(true)

					this.byId("ser").setVisible(true);
					this.byId("input-equip").setVisible(false);
					this.byId("ser").setValue(null);
					this.byId("input-funloc").setValue(null);
					this.byId("input-superord.equip").setValue(null);
				}
			},

			onSearch: function () {
				var EquiNo = this.getView().byId("ser").getValue();
				var funloc = this.getView().byId("input-funloc");
				var superord = this.getView().byId("input-superord.equip");
				var oModel = this.getView().getModel();
				var sPath = "/EquipInstallSet/" + "('" + EquiNo + "')";
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						funloc.setValue(oData.Funcloc);
						superord.setValue(oData.Supequi);
					}.bind(this)
				});
			},

			oAccept: function (oEve) {
				if (this.byId('tb1').mProperties.pressed) this.eve1()
				if (this.byId('tb2').mProperties.pressed) this.eve2()
			},
			eve1: function (y) {
				// var oModel = this.getView().getModel();
				// var equip = this.getView().byId("input-equip").getValue();
				// var fun = this.getView().byId("input-funloc").getValue();
				// var sup = this.getView().byId("input-superord.equip").getValue();
				// var oCreate = {};
				// oCreate.Equipment = equip;
				// oCreate.Funcloc = fun;
				// oCreate.Supequi = sup;
				// console.log(oCreate);
				// oModel.create("/EquipInstallSet", oCreate, {
				// 	method: "POST",
				// 	success : function (oData, oResponse) {
				// 		// console.log("success");
				// 		MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
				// 	},
				// 	error: function (y) {
				// 		MessageToast.show(JSON.parse(y.responseText).error.message.value);
				// 	},
				// });
				console.log("install")
				
				this.getView().byId("input-equip").setValue(null);
				this.getView().byId("input-funloc").setValue(null);
				this.getView().byId("input-superord.equip").setValue(null);
				// location.reload()
			},
			eve2: function (x) {
				// var equipDis = this.byId("ser").getValue();
				// var oModel = this.getView().getModel();
				// oModel.remove("/EquipDismantleSet('" + equipDis + "')", {
				// 	method: "DELETE",
				// 	success: function (oData, oResponse) {
				// 		MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
				// 	},
				// 	error: function (x) {
				// 		MessageToast.show(JSON.parse(x.responseText).error.message.value);
				// 	},
				// })
				console.log("dismantle")
				
				MessageToast.show("status updated");
				this.byId("ser").setValue(null);
				this.byId("input-funloc").setValue(null);
				this.byId("input-superord.equip").setValue(null);
				// setTimer(10000).location.reload()
			},
			oReject: function () {
				this.getView().byId("tb1").setEnabled(true)
				this.getView().byId('input-funloc').setValue(null);
				this.byId("input-superord.equip").setValue(null);
				this.byId("ser").setValue(null);
				this.byId("input-equip").setValue(null);
			},
			onInstall : function(){
			
				this.eve1()

			},
			onDismantle : function(){
			this.eve2()
			},
			openFagment : function(){
				if (!this.pDialog) {
					this.pDialog = this.loadFragment({
						name: "dismentle.view.dismentle"
					});
				}
	
				this.pDialog.then(function(oDialog) {
					oDialog.open();
				});

			},
			closeDialogInst: function () {
				
                this.byId("openDialogdis").close();
				
            },
			closeDialogDis: function () {
				
               
				this.byId("openDialogInst").close();
            },
			// this function is for calling the equipment no's value help
		
			equiFagment:function(){
				if (!this.instDialog) {
					this.instDialog = this.loadFragment({
						name: "dismentle.view.install"
					});
				}
	
				this.instDialog.then(function(qDialog) {
					qDialog.open();
				});
				
			},
			showStatus:function(){
				MessageToast.show("status updated")
			},
			
			handleMessagePopoverPress: function (oEvent) {
				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					this._oPopover = new sap.ui.xmlfragment("dismentle.Fragment.message", this);
					this.getView().addDependent(this._oPopover);
				}
				if (this.message !== undefined) {
					this.message = this.message;
				} else {
					this.meassage = "";
				}
				//sap.ui.getCore().byId("textId").setText(this.message)
				//this._oPopover.openBy(oButton);
			}	
				
        });
    })
	