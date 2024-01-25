sap.ui.define([
	"./basecontroller",
	"sap/m/MessageToast",
	"sap/ui/Device"
], function (Controller, JSONModel, MessageToast, Device) {
	"use strict";
	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Serins", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serins
		 */
		onInit: function () {

			this.getOwnerComponent().getRouter().getRoute("RouteSerins").attachPatternMatched(this._onEquipNoMatched, this);

			var olable = this.getView().byId("smpfromSeri");
			var ohbox = this.getView().byId("hbxseri");

			if (window.matchMedia("(max-width: 600px)").matches) {
				// Apply styles for small screens (phones or tablets)
				olable.addStyleClass("responsiveText");
				ohbox.addStyleClass("responsiveText");
			} else {
				// Remove styles for larger screens (desktops or larger tablets)
				olable.removeStyleClass("responsiveText");
				ohbox.removeStyleClass("responsiveText");
			}

		},
		_onEquipNoMatched: function (oEvent) {
			this._equiP = oEvent.getParameter("arguments").equID;
			this.getView().byId("inEqui").setValue(this._equiP);
			var oModel = this.getView().getModel();
			var eqiPath = "/EquipSerialInstallSet" + "('" + this._equiP + "')";
			oModel.read(eqiPath, {
				success: function (oData, oResponse) {
					var v = oData.ISerialnumber;
					this.getOwnerComponent().getModel("localModel").setData(oData.results);
					var olocalModel = this.getOwnerComponent().getModel("localModel");
					this.getView().getModel("localModel").setData(oData);
				}.bind(this),
				error: function (eMsg) {}
			});
			// sap.ui.getCore().byId("container-ZPMINSDISMVT---Serins--FuncLocInp").focus();

			// var oInput2 = this.getView().byId("FuncLocInp");
			// setTimeout(function () {
			// 	sap.ui.getCore().byId("container-ZPMINSDISMVT---Serins--FuncLocInp").focus(); // Set focus to the input field after a short delay
			// },2000);
				var oserinsFunc = this.getView().byId("FuncLocInp");
			setTimeout(function () {
				oserinsFunc.focus(); // Set focus to the input field after a short delay
			}, 1000);
		},
		clearFunclocSr: function () {
			this.getView().byId("FuncLocInp").setDOMValue(null);
		}



		// onAfterRendering: function () {
		// 	var oserinsFunc = this.getView().byId("FuncLocInp");
		// 	setTimeout(function () {
		// 		oserinsFunc.focus(); // Set focus to the input field after a short delay
		// 	}, 1000);
		// }
	

		// {
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serins
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serins
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serins
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 *@memberOf com.sap.ZPMINSDISMVT.controller.Serins
		 */

	});
});