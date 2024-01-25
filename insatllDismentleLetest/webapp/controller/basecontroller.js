sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (Controller, MessageBox, JSONModel, UIComponent, Fragment, Filter, FilterOperator) {
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
					MessageBox.error(JSON.parse(eMsg.responseText).error.message.value);

				},
			});

		},
		oRoutInstSer: function () {

			var equiNo = this.getView().byId("equiInp").getValue();
			this.getView().byId("equiInp").setValue("");
			this.getView().byId("discInp").setValue("");
			this.getOwnerComponent().getRouter().navTo("RouteSerins", {
				"equID": equiNo
			});
			var oFuncLocInp = sap.ui.getCore().byId("container-ZPMINSDISMVT---Serins--FuncLocInp");
			setTimeout(function () {
				if (oFuncLocInp !== undefined) {
					oFuncLocInp.focus();
				}

			}, 1000);

			this.clearField();

		},
		oRoutInstNonSer: function () {

			var equiNo = this.getView().byId("equiInp").getValue();
			this.getView().byId("equiInp").setValue("");
			this.getView().byId("discInp").setValue("");
			this.getOwnerComponent().getRouter().navTo("RouteNserins", {
				"equID": equiNo
			});
			var oFuncNoSer = sap.ui.getCore().byId("container-ZPMINSDISMVT---Nserins--inFunloc");
			setTimeout(function () {
				if (oFuncNoSer !== undefined) {
					oFuncNoSer.focus();
				}

			}, 1000);

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
						MessageBox.error("Equipment is not define");
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
			var oinSt = sap.ui.getCore().byId("container-ZPMINSDISMVT---Serdis--inStrg");

			setTimeout(function () {
				if (oinSt !== undefined) {
					oinSt.focus();
				}

			}, 1000);

			this.clearField();
		},

		oSerDis: function () {
			var that = this;
			var equiInsSer = this.getView().byId("inEqui").getValue();
			var oModel = this.getOwnerComponent().getModel();
			var oStrgLoc = this.getView().byId("inStrg").getValue();

			oModel.read("/EquiSerDismantleSet('" + equiInsSer + "')", {
				method: "READ",
				success: function (oData) {

					var PlocalModel = that.getOwnerComponent().getModel("localModelStrg");

					PlocalModel.setData(oData);
				},
				error: function (e) {

				}.bind(this),
			});
			var temData = that.getOwnerComponent().getModel("localModelStrg").getData();
			temData.StgeLoc = oStrgLoc;

			oModel.update("/EquiSerDismantleSet('" + equiInsSer + "')", temData, {
				method: "PUT",

				success: function (data, oResponse) {
					MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message, {
						title: "Success",
						onClose: function (oActionS) {
							if (oActionS === sap.m.MessageBox.Action.OK) {
								that.onCloseBtMain();
							}
						}
					});
				},
				error: function (e) {
					sap.m.MessageBox.error(JSON.parse(e.responseText).error.message.value, {
						title: "Error",
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.CLOSE) {
								that.onCloseBtMain();
							}
						}
					});
				}
			});
		

		},
		oSerIns: function () {
			var that = this;
			var equipment = this.getView().byId("inEqui").getValue();
			var fun = this.getView().byId("FuncLocInp").getValue().toUpperCase();
			this.getView().byId("FuncLocInp").setValue("");
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

			});
		
			// var oInput2 = this.getView().byId("FuncLocInp");
			// setTimeout(function () {
			// 	oInput2.focus();
			// }, 0);

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
			});
			
		},
		oActnInsNonSer: function () {
			var that = this;

			var equipment = this.getView().byId("inEqui").getValue();
			var funt = this.getView().byId("inFunloc").getValue().toUpperCase();

			var nonSerModl = this.getOwnerComponent().getModel();
			var upData = this.getOwnerComponent().getModel("locModlNonSer").getData();

			upData.Funcloc = funt;
			nonSerModl.create("/EquipInstallSet", upData, {
				method: "POST",
				success: function (oData, oResponse) {
					that.getView().byId("inFunloc").setValue("");
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
					that.getView().byId("inFunloc").setValue("");
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
		
		},
		onCloseBtMain: function () {
			this.getOwnerComponent().getRouter().navTo("RouteMain");
			this.distroyModel();
			this.resetModel();
		},

		handleSuccessEquipCall: function (oData, oResponse) {
			var olocalGetOwner = this.getOwnerComponent();
			var oLocalModel = olocalGetOwner.getModel("localModel");
			this.getOwnerComponent().getModel('localModel').setData(oData);
			this.updateInputValueEvent();
		},
		updateInputValueEvent: function () {
			var disModel = new JSONModel(this.getOwnerComponent().getModel("localModel"));
			this.getView().setModel(disModel, "disModel");
			var setDis = disModel.oData.oData.Eqktu;
			this.getView().byId("discInp").setDOMValue(setDis);

		},

		onInputChange: function (oEvent) {
			var that = this;
			var oValue = oEvent.getParameter("value");
			var oModelDis = this.getOwnerComponent().getModel();
			var eqiPathDis = "/ZsrhHelpIdSet" + "('" + oValue + "')";
			var valueEq = this.getView().byId("discInp").getDOMValue();

			oModelDis.read(eqiPathDis, {
				success: function (oData, oResponse) {
					var olocalGetOwner = this.getOwnerComponent();
					var oLocalModel = olocalGetOwner.getModel("localModel");
					this.getOwnerComponent().getModel('localModel').setData(oData);
					this.updateInputValueEvent();

				}.bind(this),
				error: function (eMsg) {
					that.getView().byId("discInp").setDOMValue("");
				},
			});

		},
		clearField: function () {
			this.getView().byId("equiInp").setDOMValue(null);
			this.getView().byId("discInp").setDOMValue(null);

		},
		resetModel: function () {
			var oMdl = this.getOwnerComponent().getModel('localModel');

			oMdl.refresh();
		},
		distroyModel: function () {
			this.getOwnerComponent().getModel("locModlNonSer").destroy();
			this.getOwnerComponent().getModel("localModel").destroy();
			this.getOwnerComponent().getModel("locModlNonSer").refresh();
			this.getOwnerComponent().getModel("localModel").refresh();

		},
		onChange: function () {
			var oFoucs = this.getView().byId("actIns");
			if (oFoucs) {
				oFoucs.focus();
			}
		},

		onNonSerIns: function () {
			var oF = this.getView().byId("actnV2");
			if (oF) {
				oF.focus();
			}
		},

		equipmentValueHelpRequested: function () {
			var that = this;
			var equipmodel = new JSONModel();
			this.getView().getModel(equipmodel, 'localModel');
			$.ajax({
				url: "/sap/opu/odata/sap/YPMENH94803_SRV_01/ZsrhHelpIdSet?$format=json",
				success: function (oData) {
					var data = {
						"ZsrhHelpIdSet": oData.d.results
					};
					var EquipmentModel = that.getOwnerComponent().getModel("localModel");
					that.getView().getModel('localModel').setData(data);
					EquipmentModel.setData(data);
					that.sl();
				}.bind(this),
				error: function (e) {

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
		},

		equipmentsearch: function (eqEvent) {
			// add filter for search
			var storValue = [];
			var sQuery = eqEvent.getSource().getProperty('value');
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Equnr", FilterOperator.Contains, sQuery);
				storValue.push(filter);
			}
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(storValue);

		},

		EquipmentHandelConfirm: function (eqConEvent) {
			var oSelectedItem = eqConEvent.getSource().getProperty('title');
			var disEquip = eqConEvent.getSource().getProperty('description');
			this.byId("discInp").setValue("");
			if (!oSelectedItem) {
				return;
			}
			this.byId("equiInp").setValue(oSelectedItem);
			this.byId("discInp").setValue(disEquip);
			this.onpressCloseValueHelpAdmin();
		},
		onpressCloseValueHelpAdmin: function (oDialog) {
			this.byId("AdminVH").close();
			this.byId("_IDGenSearchField1").setValue("");
			this.byId("idList").getBinding("items").resetData();
		},

		// funcValueHelpRequested: function () {
		// 	this.funcDialog();
		// },

		funcDialog: function () {
			var funView = this.getView();
			if (!this._funDialog) {
				this._funDialog = Fragment.load({
					id: funView.getId(),
					name: "com.sap.ZPMINSDISMVT.Fragment.funcloc",
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
			var sQuery = eqEvent.getSource().getProperty('value').toUpperCase();
			var filter = new Filter("Tplnr", FilterOperator.Contains, sQuery);
			funcValue.push(filter);

			var pList = this.byId("listFunc");
			var oBinding = pList.getBinding("items");
			oBinding.filter(funcValue);

		},

		funcHandelConfirm: function (eqConEvent) {
			var oSelectedItem = eqConEvent.getSource().getProperty('title');
			if (this.getView().getId().slice(-6) == "Serins") {

				if (!oSelectedItem) {
					return;
				}
				var localFunSe = this.byId("FuncLocInp");
				localFunSe.setValue(oSelectedItem);
			}
			if (this.getView().getId().slice(-7) == "Nserins") {

				if (!oSelectedItem) {
					return;
				}
				var localFunNSe = this.byId("inFunloc");
				localFunNSe.setValue(oSelectedItem);
			}
			this.closeFunc();
		},
		closeFunc: function () {
			this.byId("digFunloc").close();
			this.byId("serFunc").setValue("");
			this.byId("listFunc").getBinding("items").resetData();
		},
		onNavBack:function(){
		this.onCloseBtMain();	
		var onFcsEquip = sap.ui.getCore().byId("container-ZPMINSDISMVT---MainV--equiInp");
		if(onFcsEquip !== undefined){
			onFcsEquip.focus();
		}
		},
		onExit:function(){
			console.log("..");
		}

	});
});