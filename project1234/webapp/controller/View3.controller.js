sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("project1234.controller.View3", {
            onInit: function () {
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.getRoute("RouteView3").attachMatched(this._onRouteMatched, this);
            //       this.byId('actnV3').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))


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
            onAfterRendering:function(oEvent){
                console.log(oEvent)
                // this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))
                var valueBtn = oEvent.oSource.oPropagatedProperties.oModels.localModel.oData.btnVal;
                this.getView().byId("actnV3").setText(valueBtn)
            },

            onBeforeRendering:function(){
                console.log("on before ")
              //  this.byId('actnV2').setText(this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(this.getOwnerComponent().getModel('localModel').getProperty('/btnVal')))
            },
            oAction:function(){
                var oLocalModel = this.getOwnerComponent().getModel('localModel');
                console.log("Before reset:", oLocalModel.getData()); // Log before reset
                // oLocalModel.refresh(); // Reset the data
                
                // this.getOwnerComponent().getModel().refresh()
// new update 
                this.getOwnerComponent().getModel('localModel').refresh()
                console.log(this.getOwnerComponent().getModel('localModel').getData()) 
                console.log("After reset:", oLocalModel.getData());
                MessageBox.alert("Mesaage will pop-up according to action");
                this.getOwnerComponent().getRouter().navTo("RouteView1");
            },
            onExit:function(){
                console.log("i hit")
            }
            
        
            
            

        });
    });






































//     Enter your custom styles here
// /* for button size and text size */

// .mtbtn{
//     display: inline-block;
    
   
   
//     color: #FFFFFF;
//     text-align: center;
//     font-size: 28px;
//     padding: 18px;
//     width: 200px;
   
    
//     margin: 5px;
    

// }
// .sapUiSizeCompact .sapMBtnInner {
//     height: 2.625rem;
//     min-width: 3rem;
// }

// .sapMBtnInner {
//     font-size: 1.5rem;
//     height: 2.25rem;
//     min-width: 2.25rem;
//     margin: 5px;
//     padding: 7px;
//     text-align: center;
//     position: relative;
//     border-radius: 0.5rem;
//     text-shadow: none;
// }
// html.sap-desktop .sapContrast.sapMIBar.sapMFooter-CTX {
//     background-color: #2f3c48;
//     border-top: 1px solid #475b6d;
//     padding-bottom: 2.5rem;
//     padding-top: 1rem;
// }
// .sapMLabel {
//     color: #666666;
//     font-size: 1rem;
//     font-family: "72","72full",Arial,Helvetica,sans-serif;
//     font-weight: normal;
//     display: inline-block;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     white-space: nowrap;
//     cursor: text;
//     padding: 1rem;
// }
// .sapMTitleStyleAuto {
//     font-size: 1.2rem;
// }
// /* setting in the center of the page */
// .sapMFlexBoxJustifyStart {
//     justify-content: center;
// }
// /* alignment of lable and input field */
// .sapMFlexItemAlignAuto {
//     align-self: center;
// }
// .sapUiFormResGridCont > div {
//     padding: 18px 0.25rem;
//     box-sizing: border-box;
// }

