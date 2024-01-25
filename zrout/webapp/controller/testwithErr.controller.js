sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"

], function (Controller, MessageBox, JSONModel, Fragment) {
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
					MessageBox.error(JSON.parse(eMsg.responseText).error.message.value)

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
			upData.Equipment = equipment;
			upData.Funcloc = funt;
			nonSerModl.create("/EquipInstallSet", upData, {
				method: "POST",
				success: function (oData, oResponse) {
					console.log("succes")
					sap.m.MessageBox.success("INSATLLED", {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (y) {
					console.log("Error")
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


		onInputChange: function (oEvent) {
			var that = this;
			var oValue = oEvent.getParameter("value");
			var oModelDis = this.getOwnerComponent().getModel();
			var eqiPathDis = "/ZsrhHelpIdSet" + "('" + oValue + "')";

			oModelDis.read(eqiPathDis, {
				success:function (oData, oResponse) {

					var olocalGetOwner = that.getOwnerComponent()
					var oLocalModel = olocalGetOwner.getModel("localModel")
					that.getOwnerComponent().getModel('localModel').setData(oData)
					var disModel = new JSONModel(this.getOwnerComponent().getModel("localModel"));
					this.getView().setModel(disModel, "disModel");
					var setDis = disModel.oData.oData.Eqktu;
					this.getView().byId("discInp").setDOMValue(setDis)

				}.bind(this),
				error: function (eMsg) {

				},
			})

		},
		clearField: function () {
			this.getView().byId("equiInp").setDOMValue(null);
			this.getView().byId("discInp").setDOMValue(null);
		},
		resetModel: function () {
			var oMdl = this.getOwnerComponent().getModel('localModel')
			oMdl.refresh()
		},
		equipmentValueHelpRequested: function () {
			var that = this;
			// var equipmodel = new JSONModel();
			// this.getView().getModel(equipmodel, 'localModel')
			$.ajax({
				url: "/sap/opu/odata/sap/YPMENH94803_SRV_01/ZsrhHelpIdSet?$format=json",
				success: function (oData) {
					var data = {
						"ZsrhHelpIdSet": oData.d.results
					};
					var EquipmentModel = that.getOwnerComponent().getModel("localModel");
					// that.getView().getModel('EquipmentModel').setData(data)
					EquipmentModel.setData(data);
					that.sl();
				}.bind(this),
				error: function (e) {
					console.log(e);
				}
			});
		},

		sl: function () {
				var oView = this.getView();
				if (!this._oDialog) {
					this._oDialog = Fragment.load({
						id: oView.getId(),
						name: "com.sap.ZPMINSDISMVT.Fragment.equip",
						controller: this
					}).then(function (oDialog) {
						oView.addDependent(oDialog);
						return oDialog;
					});
				}
				this._oDialog.then(function (oDialog) {
					oDialog.open();
				}.bind(this));
			}
			// JSON.parse(oResponse.headers['sap-message']).message

	});
});