

















// sap.ui.define([
// 	"sap/ui/core/mvc/Controller"
// ], function (Controller) {
// 	"use strict";

// 	return Controller.extend("com.sap.ZPMINSDISMVT.controller.basecontroller", {
// 			onInit: function () {
// 				console.log("i am basecontroller")
// 			},
// 			testFunction: function () {
// 				console.log("i am basecontroller");
// 			},
// 			onPressIns: function () {
// 				var that = this;

// 				var oModel = this.getOwnerComponent().getModel();

// 				var equiNo = this.getView().byId("equiInp").getValue();
// 				var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";

// 				oModel.read(eqiPath, {
// 					success: function (oData, oResponse) {
// 						var Inser = oData.ISerialnumber;
// 						var inEquip = oData.IEquipment;

// 						var olocalModel = that.getOwnerComponent().getModel("localModel");

// 						that.getOwnerComponent().getModel('localModel').setData(oData)

// 						if (Inser) {

// 							this.oRoutInstSer()
// 						} else if (inEquip) {

// 							this.oRoutInstNonSer()
// 						} else {
// 							alert("Equipment is not define");
// 						}

// 					}.bind(this),
// 					error: function (eMsg) {

// 					},
// 				});

// 			},
// 			oRoutInstSer: function () {
// 				console.log("ser");
// 				var equiNo = this.getView().byId("equiInp").getValue();

// 				this.getOwnerComponent().getRouter().navTo("RouteSerins", {
// 					"equID": equiNo
// 				});
// 			},
// 			oRoutInstNonSer: function () {
// 				console.log("non ser")
// 				var equiNo = this.getView().byId("equiInp").getValue();
// 				var equiNo = this.getView().byId("equiInp").getValue();
// 				this.getOwnerComponent().getRouter().navTo("RouteNserins", {
// 					"equID": equiNo
// 				});
// 			},

// 			onPressDis: function () {
// 				var that = this;

// 				var oModel = this.getOwnerComponent().getModel();

// 				var equiNo = this.getView().byId("equiInp").getValue();
// 				var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";
// 				oModel.read(eqiPath, {
// 					success: function (oData, oResponse) {
// 						var Diser = oData.ISerialnumber;
// 						var inEquip = oData.IEquipment;

// 						var olocalModel = that.getOwnerComponent().getModel("localModel");

// 						that.getOwnerComponent().getModel('localModel').setData(oData)

// 						if (Diser) {

// 							this.oRoutDisSer()
// 						} else if (inEquip) {
// 							this.oRoutDisNonSer()
// 						} else {
// 							alert("Equipment is not define");
// 						}

// 					}.bind(this),
// 					error: function (eMsg) {

// 					},
// 				});

// 			},
// 			oRoutDisNonSer: function () {
// 				var equiNo = this.getView().byId("equiInp").getValue();

// 				this.getOwnerComponent().getRouter().navTo("RouteNserdis", {
// 					"equID": equiNo
// 				});
// 			},
// 			oRoutDisSer: function () {
// 				var equiNo = this.getView().byId("equiInp").getValue();

// 				this.getOwnerComponent().getRouter().navTo("RouteSerdis", {
// 					"equID": equiNo
// 				});

// 			},

// 			oSerDis: function () {
// 				var equiInsSer = this.getView().byId("inEqui").getValue();
// 				var oModel = this.getOwnerComponent().getModel();
// 				oModel.remove("/EquiSerDismantleSet('" + equiInsSer + "')", {
// 					method: "DELETE",
// 					success: function (oData, oResponse) {
// 						// MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
// 						console.log("Dismatle")

// 					},
// 					error: function (x) {
// 						// MessageToast.show(JSON.parse(x.responseText).error.message.value);
// 						console.log("Error in dismantle")
// 					},
// 				})
// 			},
// 			oSerIns: function () {

// 				var equipment = this.getView().byId("inEqui").getValue()
// 				var fun = this.getView().byId("FuncLocInp").getValue();
// 				var oModel = this.getOwnerComponent().getModel();

// 				var data = {
// 					"d": {
// 						"__metadata": {
// 									 "type": "YPMENH94803_SRV_01.EquipSerialInstall"
// 						},

// 						"Funcloc": "",


// 						"IEquipment": ""

// 					}
// 				}
// 				data.d.IEquipment = equipment;
// 				data.d.Funcloc = fun;
// 				// data.d.Supequi = sup;
// 				// console.log(oCreate);
// 				oModel.create("/EquipSerialInstallSet", data, {
// 					method: "POST",
// 					success: function (oData, oResponse) {
// 						 console.log("success");
// 						// MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
// 					},
// 					error: function (y) {
// 						console.log("error")
// 						// MessageToast.show(JSON.parse(y.responseText).error.message.value);
// 					},
// 				});



// 			}


// 	});
// });











// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/m/MessageBox"
// ], function (Controller, MessageBox) {
// 	"use strict";

// 	return Controller.extend("com.sap.ZPMINSDISMVT.controller.basecontroller", {
// 		onInit: function () {
// 			console.log("i am basecontroller")
// 		},
// 		testFunction: function () {
// 			console.log("i am basecontroller");
// 		},
// 		onPressIns: function () {
// 			var that = this;

// 			var oModel = this.getOwnerComponent().getModel();

// 			var equiNo = this.getView().byId("equiInp").getValue();
// 			var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";

// 			oModel.read(eqiPath, {
// 				success: function (oData, oResponse) {
// 					var Inser = oData.ISerialnumber;
// 					var inEquip = oData.IEquipment;

// 					var olocalModel = that.getOwnerComponent().getModel("localModel");

// 					that.getOwnerComponent().getModel('localModel').setData(oData)

// 					if (Inser) {

// 						this.oRoutInstSer()
// 					} else if (inEquip) {

// 						this.oRoutInstNonSer()
// 					} else {
// 						MessageBox.error("Equipment is not define");
// 					}

// 				}.bind(this),
// 				error: function (eMsg) {

// 				},
// 			});

// 		},
// 		oRoutInstSer: function () {
// 			console.log("ser");
// 			var equiNo = this.getView().byId("equiInp").getValue();

// 			this.getOwnerComponent().getRouter().navTo("RouteSerins", {
// 				"equID": equiNo
// 			});
// 		},
// 		oRoutInstNonSer: function () {
// 			console.log("non ser")
// 			var equiNo = this.getView().byId("equiInp").getValue();
// 			var equiNo = this.getView().byId("equiInp").getValue();
// 			this.getOwnerComponent().getRouter().navTo("RouteNserins", {
// 				"equID": equiNo
// 			});
// 		},

// 		onPressDis: function () {
// 			var that = this;

// 			var oModel = this.getOwnerComponent().getModel();

// 			var equiNo = this.getView().byId("equiInp").getValue();
// 			var eqiPath = "/EquipSerialInstallSet" + "('" + equiNo + "')";
// 			oModel.read(eqiPath, {
// 				success: function (oData, oResponse) {
// 					var Diser = oData.ISerialnumber;
// 					var inEquip = oData.IEquipment;

// 					var olocalModel = that.getOwnerComponent().getModel("localModel");

// 					that.getOwnerComponent().getModel('localModel').setData(oData)

// 					if (Diser) {

// 						this.oRoutDisSer()
// 					} else if (inEquip) {
// 						this.oRoutDisNonSer()
// 					} else {
// 						alert("Equipment is not define");
// 					}

// 				}.bind(this),
// 				error: function (eMsg) {

// 				},
// 			});

// 		},
// 		oRoutDisNonSer: function () {
// 			var equiNo = this.getView().byId("equiInp").getValue();

// 			this.getOwnerComponent().getRouter().navTo("RouteNserdis", {
// 				"equID": equiNo
// 			});
// 		},
// 		oRoutDisSer: function () {
// 			var equiNo = this.getView().byId("equiInp").getValue();

// 			this.getOwnerComponent().getRouter().navTo("RouteSerdis", {
// 				"equID": equiNo
// 			});

// 		},

// 		oSerDis: function () {
// 			var equiInsSer = this.getView().byId("inEqui").getValue();
// 			var oModel = this.getOwnerComponent().getModel();
// 			oModel.remove("/EquiSerDismantleSet('" + equiInsSer + "')", {
// 				method: "DELETE",
// 				success: function (oData, oResponse) {
// 					sap.m.MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);

// 					console.log("Dismatle")

// 				},
// 				error: function (x) {
// 					// MessageToast.show(JSON.parse(x.responseText).error.message.value);
// 					console.log("Error in dismantle")
// 					//	sap.m.MessageToast.show("Install Unsuccessful");
// 					sap.m.MessageBox.error(JSON.parse(x.responseText).error.message.value);
// 				},
// 			})
// 		},
// 		oSerIns: function () {

// 			var equipment = this.getView().byId("inEqui").getValue()
// 			var fun = this.getView().byId("FuncLocInp").getValue();
// 			var oModel = this.getOwnerComponent().getModel();

// 			var data = this.getOwnerComponent().getModel("localModel").getData();
// 			data.Funcloc = fun

// 			oModel.create("/EquipSerialInstallSet", data, {
// 				method: "POST",
// 				success: function (oData, oResponse) {
// 					console.log("success");
// 					sap.m.MessageBox.error(JSON.parse(oResponse.headers['sap-message']).message);

// 				},
// 				error: function (y) {
// 					console.log("error")
// 					sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value);

// 				},
// 			});

// 		},
// 		oActnInsNonSer: function () {
// 			var that = this;
// 			var equipment = this.getView().byId("inEqui").getValue();
// 			var funt = this.getView().byId("inFunloc").getValue();

// 			// create call
// 			var nonSerModl = this.getOwnerComponent().getModel()

// 			var upData = this.getOwnerComponent().getModel("locModlNonSer").getData();

// 			upData.Funcloc = funt;

// 			nonSerModl.create("/EquipInstallSet", upData, {
// 				method: "POST",
// 				success: function (oData, oResponse) {
// 					console.log("success");
// 					// sap.m.MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
// 					sap.m.MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
// 						title: "Error",
// 						onClose: function (oAction) {
// 							// Custom logic upon message box close
// 							if (oAction === sap.m.MessageBox.Action.CLOSE) {
// 								// Perform your custom action here
// 								console.log("Message box was closed by user");
// 								// Add your custom code here
// 							}
// 						},
// 						error: function (y) {
// 							console.log("Error");
// 							// sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value);
// 							sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value, {
// 								title: "Error",
// 								onClose: function (oAction) {
// 									// Custom logic upon message box close
// 									if (oAction === sap.m.MessageBox.Action.CLOSE) {
// 										// Perform your custom action here
// 										console.log("Message box was closed by user");
// 										// Add your custom code here
// 									}
// 								}
// 							})

// 						}

// 					})



// 				}
// 			})
// 		}

// 	});
// });















// xmlns:action="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1" action:wiring="\{'press':\{'navigation':\{'routeName':'Serins'\}\}\}"












// xmlns:action="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1" action:wiring="\{'press':\{'navigation':\{'routeName':'Nserins'\}\}\}"




























// action: function (oEvent) {
// 	var that = this;
// 	var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
// 	var eventType = oEvent.getId();
// 	var aTargets = actionParameters[eventType].targets || [];
// 	aTargets.forEach(function (oTarget) {
// 		var oControl = that.byId(oTarget.id);
// 		if (oControl) {
// 			var oParams = {};
// 			for (var prop in oTarget.parameters) {
// 				oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
// 			}
// 			oControl[oTarget.action](oParams);
// 		}
// 	});
// 	var oNavigation = actionParameters[eventType].navigation;
// 	if (oNavigation) {
// 		var oParams = {};
// 		(oNavigation.keys || []).forEach(function (prop) {
// 			oParams[prop.name] = encodeURIComponent(JSON.stringify({
// 				value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
// 				type: prop.type
// 			}));
// 		});
// 		if (Object.getOwnPropertyNames(oParams).length !== 0) {
// 			this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
// 		} else {
// 			this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
// 		}
// 	}
// }