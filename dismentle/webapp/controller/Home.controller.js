sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Fragment,ResourceModel) {
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

				if (oEvent.getSource().getSelectedButton().getId().slice(-5) === "RB4-1") {
					this.byId("btnAcc").setText(this.oBundle.getText('btnInstall'));
					this.byId("ser").setVisible(false);
					this.byId("input-equip").setVisible(true);
					this.byId("input-equip").setValue(null);
					this.byId("input-funloc").setValue(null);
					this.byId("input-superord.equip").setValue(null);
				}
				if (oEvent.getSource().getSelectedButton().getId().slice(-5) === "RB4-2") {
					this.byId("btnAcc").setText(this.oBundle.getText('btnDismantle'));
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
				var sPath = "/EquipInstallSet" + "('" + EquiNo + "')";
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						funloc.setValue(oData.Funcloc);
						superord.setValue(oData.Supequi);
					}.bind(this)
				});
			},

			oAccept: function (oEve) {
				if (this.byId('RB4-1').mProperties.selected) this.eve1()
				if (this.byId('RB4-2').mProperties.selected) this.eve2()
			},
			eve1: function (y) {
				var oModel = this.getView().getModel();
				var equip = this.getView().byId("input-equip").getValue();
				var fun = this.getView().byId("input-funloc").getValue();
				var sup = this.getView().byId("input-superord.equip").getValue();
				var oCreate = {};
				oCreate.Equipment = equip;
				oCreate.Funcloc = fun;
				oCreate.Supequi = sup;
				console.log(oCreate);
				oModel.create("/EquipInstallSet", oCreate, {
					method: "POST",
					success : function (oData, oResponse) {
						// console.log("success");
						MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
					},
					error: function (y) {
						MessageToast.show(JSON.parse(y.responseText).error.message.value);
					},
				});
				this.getView().byId("input-equip").setValue(null);
				this.getView().byId("input-funloc").setValue(null);
				this.getView().byId("input-superord.equip").setValue(null);
			},
			eve2: function (x) {
				var equipDis = this.byId("ser").getValue();
				var oModel = this.getView().getModel();
				oModel.remove("/EquipDismantleSet('" + equipDis + "')", {
					method: "DELETE",
					success: function (oData, oResponse) {
						MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
					},
					error: function (x) {
						MessageToast.show(JSON.parse(x.responseText).error.message.value);
					},
				})
				this.byId("ser").setValue(null);
				this.byId("input-funloc").setValue(null);
				this.byId("input-superord.equip").setValue(null);
			},
			oReject: function () {
				this.getView().byId('input-funloc').setValue(null);
				this.byId("input-superord.equip").setValue(null);
				this.byId("ser").setValue(null);
				this.byId("input-equip").setValue(null);
			}

            
        });
    })