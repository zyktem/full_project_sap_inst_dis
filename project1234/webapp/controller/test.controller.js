sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("com.sap.ZPMINSDISMVT.controller.basecontroller", {
		onInit: function () {
				var i18nModel = new ResourceModel({
					bundleName: "com.sap.ZPMINSDISMVT.i18n.i18n"
				});
				this.getView().setModel(i18nModel, "i18n");
				this.oBundle = this.getView().getModel("i18n").getResourceBundle();

		},

		onPressIns: function () {
			var that = this;

			var oModels = this.getOwnerComponent().getModel();

			var equiNo = this.getView().byId("equiInp").getValue();
			var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";

			oModels.read(eqiPath, {
				success: function (oData, oResponse) {
					var Inser = oData.ISerialnumber;
					var inEquip = oData.IEquipment;

					var olocalModel = that.getOwnerComponent().getModel("localModel");

					that.getOwnerComponent().getModel('localModel').setData(oData);

					if (Inser) {

						this.oRoutInstSer();
					} else if (inEquip) {

						this.oRoutInstNonSer();
					} else {
						MessageBox.error("Equipment is not define");
					}

				}.bind(this),
				error: function (eMsg) {

				},
			});

		},
		oRoutInstSer: function () {

			var equiNo = this.getView().byId("equiInp").getValue();

			this.getOwnerComponent().getRouter().navTo("RouteSerins", {
				"equID": equiNo
			});
			this.clearField();
		},
		oRoutInstNonSer: function () {

			var equiNo = this.getView().byId("equiInp").getValue();
		
			this.getOwnerComponent().getRouter().navTo("RouteNserins", {
				"equID": equiNo
			});
			this.clearField();
		},

		onPressDis: function () {
			var that = this;

			var oModel = this.getOwnerComponent().getModel();

			var equiNo = this.getView().byId("equiInp").getValue();
			var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";
			oModel.read(eqiPath, {
				success: function (oData, oResponse) {
					var Diser = oData.ISerialnumber;
					var inEquip = oData.IEquipment;

					var olocalModel = that.getOwnerComponent().getModel("localModel");

					that.getOwnerComponent().getModel('localModel').setData(oData);

					if (Diser) {
						this.oRoutDisSer();
					} else if (inEquip) {
						this.oRoutDisNonSer();
					} else {
						alert("Equipment is not define");
					}

				}.bind(this),
				error: function (eMsg) {},
			});

		},
		oRoutDisNonSer: function () {
			var equiNo = this.getView().byId("equiInp").getValue();

			this.getOwnerComponent().getRouter().navTo("RouteNserdis", {
				"equID": equiNo
			});
			this.clearField();
		},
		oRoutDisSer: function () {
			var equiNo = this.getView().byId("equiInp").getValue();

			this.getOwnerComponent().getRouter().navTo("RouteSerdis", {
				"equID": equiNo
			});
			this.clearField();
		},

		oSerDis: function () {
			var that = this;
			var equiInsSer = this.getView().byId("inEqui").getValue();
			var oModel = this.getOwnerComponent().getModel();
			oModel.remove("/EquiSerDismantleSet('" + equiInsSer + "')", {
				method: "DELETE",
				success: function (oData, oResponse) {

					MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (x) {

					sap.m.MessageBox.error(JSON.parse(x.responseText).error.message.value, {
						title: "Error",
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.CLOSE) {
								that.onCloseBtMain();
							}
						}
					});
				}
			})
			this.resetModel();
		},
		oSerIns: function () {
			var that = this;
			var equipment = this.getView().byId("inEqui").getValue()
			var fun = this.getView().byId("FuncLocInp").getValue();
			var oModel = this.getOwnerComponent().getModel();

			var data = this.getOwnerComponent().getModel("localModel").getData();
			data.Funcloc = fun;

			oModel.create("/EquipSerialInstallSet", data, {
				method: "POST",
				success: function (oData, oResponse) {
				

					MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (y) {
				
					MessageBox.error(JSON.parse(y.responseText).error.message.value, {
						title: "Error",
						onClose: function (oActions) {
							if (oActions === sap.m.MessageBox.Action.CLOSE) {
								that.onCloseBtMain();
							}
						}
					});
				}

			})
			this.resetModel();
		},
		oActnDisFrNs: function () {
			var that = this;
			var equiInsSer = this.getView().byId("inEqui").getValue();
			var oModel = this.getOwnerComponent().getModel();
			oModel.remove("/EquipDismantleSet('" + equiInsSer + "')", {
				method: "DELETE",
				success: function (oData, oResponse) {
					MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (x) {
					sap.m.MessageBox.error(JSON.parse(x.responseText).error.message.value, {
						title: "Error",
						onClose: function (oActions) {
							if (oActions === sap.m.MessageBox.Action.CLOSE) {
								that.onCloseBtMain();
							}
						}
					});
				}
			})
			this.resetModel();
		},
		oActnInsNonSer: function () {
			var that = this;
			var equipment = this.getView().byId("inEqui").getValue();
			var funt = this.getView().byId("inFunloc").getValue();
			var nonSerModl = this.getOwnerComponent().getModel();
			var upData = this.getOwnerComponent().getModel("locModlNonSer").getData();
			upData.Funcloc = funt;
			nonSerModl.create("/EquipInstallSet", upData, {
				method: "POST",
				success: function (oData, oResponse) {
					sap.m.MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (y) {
					sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value, {
						title: "Error",
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.CLOSE) {
								that.onCloseBtMain();
							}
						}
					});
				},
			});
			this.resetModel();
		},
		onCloseBtMain: function () {
			this.getOwnerComponent().getRouter().navTo("RouteMain");
		},

		handleSuccessEquipCall: function (oData, oResponse) {
			var olocalGetOwner = this.getOwnerComponent();
			var oLocalModel = olocalGetOwner.getModel("localModel");
			this.getOwnerComponent().getModel('localModel').setData(oData);
			this.updateInputValueEvent();
		},
		onInputChange: function (oEvent) {
	
			var oValue = oEvent.getParameter("value");
			var oModelDis = this.getOwnerComponent().getModel();
			var eqiPathDis = "/ZsrhHelpIdSet" + "('" + oValue + "')";
			var valueEq = 	this.getView().byId("discInp").getDOMValue()
			
			oModelDis.read(eqiPathDis, {
				success: this.handleSuccessEquipCall.bind(this),
				error: function (eMsg) {
				
				},
			})
			

		},
		clearField: function () {
			this.getView().byId("equiInp").setDOMValue(null);
			this.getView().byId("discInp").setDOMValue(null);
		},
		resetModel:function(){
		var oMdl = this.getOwnerComponent().getModel('localModel')
		oMdl.refresh()       
		},
		onExit:function(){
			this.resetModel();
		}
	

	});
});