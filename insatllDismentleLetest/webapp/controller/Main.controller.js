sap.ui.define([
	// "sap/ui/core/mvc/Controller",
	"./basecontroller",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, Device, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("com.sap.ZPMINSDISMVT.controller.Main", {
		onInit: function () {

			var oInstallTile = this.getView().byId("installTile");
			var oDismantleTile = this.getView().byId("dismantleTile");

			if (Device.system.phone || Device.system.tablet) {
				// this.getView().byId("insbtn").setVisible(false)
				oInstallTile.addStyleClass("responsiveText");

				// console.log("css will be applyed") // Apply a responsive font class for phones and tablets
				oDismantleTile.addStyleClass("responsiveText");
			} else {
				oInstallTile.removeStyleClass("responsiveText");
				oDismantleTile.removeStyleClass("responsiveText");
			}
			if (Device.system.phone) {
				this._applyMobileStyles();
			}

		},
		// onFoucs: function () {
		// 	var oFoucs = this.getView().byId("installTile");
		// 	if (oFoucs) {
		// 		oFoucs.focus--
		// 	}
		// },
		
		
		
		_applyMobileStyles: function() {
         // Get the CSS class and apply styles
         var oStyleElement = document.createElement("style");
         oStyleElement.textContent = `
            .sapMTileCntContent>.sapMTcInnerMarker {
               font-size: large;
               vertical-align: bottom;
               line-height: normal;
               display: flex;
               align-content: space-around;
               flex-wrap: wrap;
               justify-content: space-between;
               font-weight: 500;
            }
         `;

         // Append the style element to the document head
         document.head.appendChild(oStyleElement);
      },
		onChngToIns: function () {
			var chngToIns = this.getView().byId("installTile");
			chngToIns.focus();
		},

		onAfterRendering: function () {
			var oequiInp = this.byId("equiInp"); // Get the reference to your input field
			if (oequiInp) {
				setTimeout(function () {
					oequiInp.focus(); // Set focus to the input field after a short delay
				}, 0);
				// console.log("triggered")
			}
		}
	});

});