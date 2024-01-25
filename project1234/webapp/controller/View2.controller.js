sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageBox",
    
	"sap/m/MessageToast"
],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("project1234.controller.View2", {
            onInit: function () {
                
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);
                   this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))
              
            },
           
         
            //cancle button 
            oReject:function(){
                this.getView().byId("inEqui").setValue(null);
                this.getView().byId("inFunloc").setValue(null)
            },

            // back button
            onHome:function(){
                this.getOwnerComponent().getRouter().navTo("RouteView1")
            },
            onBeforeRendering:function(){
                console.log("on before ")
              //  this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))
              this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')));
            },
            onAfterRendering:function(){
                console.log("on after")
                // this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))
                this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')));
            },
            oAction:function(){
                var oLocalModel = this.getOwnerComponent().getModel('localModel');
                MessageBox.alert("Mesaage will pop-up according to action");

                oLocalModel.refresh();
                this.getOwnerComponent().getRouter().navTo("RouteView1");

            // fragment call 
            
            this.pDialog ??= this.loadFragment({
				name: "project1234.webapp.fragment.successMsg"
			});

			this.pDialog.then((oDialog) => oDialog.open());





            },
            testAct:function(){
                this.getOwnerComponent().getModel('localModel').refresh()
            },
            onExit:function(){
                console.log("i hit")
            }
           
            
          

        });
    });
