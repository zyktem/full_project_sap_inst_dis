sap.ui.define([
	"./basecontroller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/library",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text"

], function (Controller,MessageBox,MessageToast,coreLibrary,Dialog,Button,mobileLibrary,Text) {
	"use strict";
		var DialogType = mobileLibrary.DialogType;
		var ButtonType = mobileLibrary.ButtonType;

	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Nserdis", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserdis
		 */
		onInit: function () {
				this.getOwnerComponent().getRouter().getRoute("RouteNserdis").attachPatternMatched(this._onEquipNoMatched, this);
		},
			_onEquipNoMatched: function (oEventNonS) {
			this._equiP = oEventNonS.getParameter("arguments").equID;
			this.getView().byId("inEqui").setValue(this._equiP);

		
		
		}
		// oActnDisFrNs:function(){

		
		
		
		// var equiInsSer = this.getView().byId("inEqui").getValue();
		// 		var oModel = this.getOwnerComponent().getModel();
		// 		oModel.remove("/EquipDismantleSet('" + equiInsSer + "')", {
		// 			method: "DELETE",
		// 			success: function (oData, oResponse) {
		// 				sap.m.MessageToast.show(JSON.parse(oResponse.headers['sap-message']).message);
		// 				console.log("Dismatle")
						
		// 			},
		// 			error: function (x) {
		// 				// MessageToast.show(JSON.parse(x.responseText).error.message.value);
		// 				console.log("Error in dismantle")
		// 				sap.m.MessageToast.show(JSON.parse(x.responseText).error.message.value);
		// 			},
		// 			// Changes to navigate to main view
		// 			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 			// oRouter.navTo("RouteMain");
		// 		})
		// }
	
			
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserdis
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserdis
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.ZPMINSDISMVT.view.Nserdis
		 */
		//	onExit: function() {
		//
		//	}
		

	});

});