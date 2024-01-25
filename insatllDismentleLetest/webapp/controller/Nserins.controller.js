sap.ui.define(["./basecontroller"], function (Controller) {
	"use strict";
	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Nserins", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserins
		 */
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("RouteNserins").attachPatternMatched(this._onEquipNoMatched, this);
		},
		_onEquipNoMatched: function (oEvent) {
			this._equiP = oEvent.getParameter("arguments").equID;
			this.getView().byId("inEqui").setValue(this._equiP);
			this._equiP = oEvent.getParameter("arguments").equID;
			this.getView().byId("inEqui").setValue(this._equiP);
			var oModelNon = this.getView().getModel();
			var eqiPath = "/EquipInstallSet" + "('" + this._equiP + "')";
			oModelNon.read(eqiPath, {
				success: function (oData, oResponse) {

					this.getView().getModel("locModlNonSer").setData(oData);
				}.bind(this),
				error: function (eMsg) {}
			});
			var oFu = this.byId("inFunloc");
			if (oFu) {
				setTimeout(function () {
					oFu.focus();
				}, 1000);
			}
			this.getView().byId("inFunloc").setValue("");
		},
		clearFunclocNs: function () {
			this.getView().byId("inFunloc").setDOMValue(null);
		}


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserins
		 */

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserins
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserins
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 *@memberOf com.sap.ZPMINSDISMVT.controller.Nserins
		 */

	});
});