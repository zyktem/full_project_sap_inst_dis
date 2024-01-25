sap.ui.define([
	"./basecontroller",
	"sap/ui/Device"
], function (Controller, Device) {
	"use strict";

	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Serdis", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serdis
		 */
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("RouteSerdis").attachPatternMatched(this._onEquipNoMatched, this);
		},
		_onEquipNoMatched: function (oEvent) {
			// this._equiP = oEvent.getParameter("arguments").equID;
			// this.getView().byId("inEqui").setValue(this._equiP);
			// var oModel = this.getView().getModel();
			// var eqiPath = "/EquipSerialInstallSet" + "('" + this._equiP + "')";
			// oModel.read(eqiPath, {
			// 	success: function (oData, oResponse) {
			// 		var v = oData.ISerialnumber;
			// 		this.getOwnerComponent().getModel("localModel").setData(oData.results);
			// 		var olocalModel = this.getOwnerComponent().getModel("localModel");
			// 		this.getView().getModel("localModel").setData(oData);
			// 	}.bind(this),
			// 	error: function (eMsg) {}
			// });
			// sap.ui.getCore().byId("container-ZPMINSDISMVT---Serins--FuncLocInp").focus();

			// var oInput2 = this.getView().byId("FuncLocInp");
			// setTimeout(function () {
			// 	sap.ui.getCore().byId("container-ZPMINSDISMVT---Serins--FuncLocInp").focus(); // Set focus to the input field after a short delay
			// },2000);
			// 	var oserinsFunc = this.getView().byId("FuncLocInp");
			// setTimeout(function () {
			// 	oserinsFunc.focus(); // Set focus to the input field after a short delay
			// }, 1000);

			var oinStrg = this.byId("inStrg");
			if (oinStrg) {
				setTimeout(function () {
					oinStrg.focus();
				}, 1000);
			}
		},

		onAfterRendering: function () {
				// var oinStrg = this.byId("inStrg");
				// if (oinStrg) {
				// 	setTimeout(function () {
				// 		oinStrg.focus();
				// 	}, 400);
				// }

			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.sap.ZPMINSDISMVT.view.Serdis
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serdis
		 */
		// onAfterRendering: function () {
		// 	var lable = this.getView().byId("smpfromSeri");
		// 	var hbox = this.getView().byId("hbxseri");

		// 	if (lable && hbox) {
		// 		if (window.matchMedia("(max-width: 600px)").matches) {
		// 			// Apply styles for small screens (phones or tablets)
		// 			lable.addStyleClass("responsiveText");
		// 			hbox.addStyleClass("responsiveText");
		// 		} else {
		// 			// Remove styles for larger screens (desktops or larger tablets)
		// 			lable.removeStyleClass("responsiveText");
		// 			hbox.removeStyleClass("responsiveText");
		// 		}
		// 	}
		// }

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Serdis
		 */
		//	onExit: function() {
		//
		//	}

	});

});