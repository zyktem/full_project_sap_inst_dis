sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("com.sap.ZPMINSDISMVT.controller.basecontroller", {
		onInit: function () {

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

					that.getOwnerComponent().getModel('localModel').setData(oData)

					if (Inser) {

						this.oRoutInstSer()
					} else if (inEquip) {

						this.oRoutInstNonSer()
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
		},
		oRoutInstNonSer: function () {

			var equiNo = this.getView().byId("equiInp").getValue();
			var equiNo = this.getView().byId("equiInp").getValue();
			this.getOwnerComponent().getRouter().navTo("RouteNserins", {
				"equID": equiNo
			});
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

					that.getOwnerComponent().getModel('localModel').setData(oData)

					if (Diser) {

						this.oRoutDisSer()
					} else if (inEquip) {
						this.oRoutDisNonSer()
					} else {
						alert("Equipment is not define");
					}

				}.bind(this),
				error: function (eMsg) {

				},
			});

		},
		oRoutDisNonSer: function () {
			var equiNo = this.getView().byId("equiInp").getValue();

			this.getOwnerComponent().getRouter().navTo("RouteNserdis", {
				"equID": equiNo
			});
		},
		oRoutDisSer: function () {
			var equiNo = this.getView().byId("equiInp").getValue();

			this.getOwnerComponent().getRouter().navTo("RouteSerdis", {
				"equID": equiNo
			});

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
							// Custom logic upon message box close
							if (oActionS === sap.m.MessageBox.Action.OK) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});

				},
				error: function (x) {

					sap.m.MessageBox.error(JSON.parse(x.responseText).error.message.value, {
						title: "Error",
						onClose: function (oAction) {
							// Custom logic upon message box close
							if (oAction === sap.m.MessageBox.Action.CLOSE) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});
				}
			})
		},
		oSerIns: function () {
			var that = this;
			var equipment = this.getView().byId("inEqui").getValue()
			var fun = this.getView().byId("FuncLocInp").getValue();
			var oModel = this.getOwnerComponent().getModel();

			var data = this.getOwnerComponent().getModel("localModel").getData();
			data.Funcloc = fun

			oModel.create("/EquipSerialInstallSet", data, {
				method: "POST",
				success: function (oData, oResponse) {
					console.log("success");

					MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							// Custom logic upon message box close
							if (oActionS === sap.m.MessageBox.Action.OK) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});

				},
				error: function (y) {
					console.log("error")
					MessageBox.error(JSON.parse(y.responseText).error.message.value, {
						title: "Error",
						onClose: function (oActions) {
							// Custom logic upon message box close
							if (oActions === sap.m.MessageBox.Action.CLOSE) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});

				}

			})

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
							// Custom logic upon message box close
							if (oActionS === sap.m.MessageBox.Action.OK) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});

				},
				error: function (x) {
					// MessageToast.show(JSON.parse(x.responseText).error.message.value);
					console.log("Error in dismantle");
					sap.m.MessageBox.error(JSON.parse(x.responseText).error.message.value, {
						title: "Error",
						onClose: function (oActions) {
							// Custom logic upon message box close
							if (oActions === sap.m.MessageBox.Action.CLOSE) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});
				}
			})
		},
		oActnInsNonSer: function () {
			var that = this;
			var equipment = this.getView().byId("inEqui").getValue();
			var funt = this.getView().byId("inFunloc").getValue();

			// create call
			var nonSerModl = this.getOwnerComponent().getModel()

			var upData = this.getOwnerComponent().getModel("locModlNonSer").getData();

			upData.Funcloc = funt;

			nonSerModl.create("/EquipInstallSet", upData, {
				method: "POST",
				success: function (oData, oResponse) {
					console.log("success");
					// sap.m.MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
					// that.showResponsiveMessageBox(JSON.parse(oResponse.headers['sap-message']).message);
					sap.m.MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							// Custom logic upon message box close
							if (oActionS === sap.m.MessageBox.Action.OK) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});
				},
				error: function (y) {

					// sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value);
					sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value, {
						title: "Error",
						onClose: function (oAction) {
							// Custom logic upon message box close
							if (oAction === sap.m.MessageBox.Action.CLOSE) {
								// Perform your custom action here
								that.onCloseBtMain()
									// Add your custom code here
							}
						}
					});

					// that.showResponsiveMessageBox(JSON.parse(y.responseText).error.message.value);

				},
			});

		},
		onCloseBtMain: function () {
			// console.log("Message box was closed by user");
			// test code

			this.getOwnerComponent().getRouter().navTo("Landing");

		},
		onInputChange: function (oEvent) {
			var that = this;
			var oValue = oEvent.getParameter("value");
			var oModelDis = this.getOwnerComponent().getModel();
			var eqiPathDis = "/ZsrhHelpIdSet" + "('" + oValue + "')";

			if (oValue.length === 8) {

				oModelDis.read(eqiPathDis, {
					success: function (oData, oResponse) {

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
			}

			console.log(oValue)

			this.onSerch()
		},
		onSerch: function (sEvent) {
			console.log(sEvent)
		}

	});
});