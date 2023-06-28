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
            //set data model for the combobox
            //     let dataPath = "../model/operation.json";
            //     let dataModel = new JSONModel(dataPath);
            //     this.getView().setModel(dataModel, "myData");
            //adding laguages

            // var oLang =  sap.ui.getCore().getConfiguration().getLanguage();
            // var i18nPath = "i18n/i18n";
            // if(oLang==="de_DE"){
            //     i18nPath = i18nPath + "_de.properties";
            // }else if(oLang === "fr_")

                let modelPath = "../dismentle/webapp/model/demo.json";
                let testModel = new JSONModel(modelPath);
                this.getView().setModel(testModel,"oDmodel")


            // this.byId("ser").setVisible(false)
            // this.byId("input-equip").setVisible(true)

            //setting the resource model of i18n
        //  var i18n= new ResourceModel({
        //     bundleName : 'dismentle.webapp.i18n.i18n'
        //  });
        //  this.getView().setModel(i18n,"i18n");
        //  var oBun = i18n.getResourceBundle()
        
         
        },
            //function for the clearing the fields
            clearFields : function(){
                this.byId("ser").setVisible(false)
                this.byId("input-equip").setVisible(true)
            },
        
            //these are function for the footer elements.
            oAccept: function () {
                alert("Accepted")
            },
            oReject: function () {
                alert("Rejected")
            },
            oReset: function () {
                alert("Fileds have been reset")
            },
            oSelectedChange: function (oEvent) {
                alert("hello")
            },
            //fagments calling for toggel
            // FragmentCall : function(oEvent){
            //     if(oEvent.oSource.mProperties.selectedKey === "Dismantling"){
            //         this.dismentleFragment();
            //     }
            //     if(oEvent.oSource.mProperties.selectedKey === "Installing"){
            //         this.installFragment();
            //     }
            // },
            //showing fragments
            // installFragment: function () {
            //     if (!this.iDialog) {

            //         this.iDialog = this.loadFragment({
    
            //             name: "dismentle.view.install"
    
            //         });
    
            //     }
    
            //     this.iDialog.then(function(oDialog) {
                  
            //         oDialog.open();
    
            //     });
            // },
            // dismentleFragment: function () {
            //     if (!this.disDialog) {

            //         this.disDialog = this.loadFragment({
    
            //            name: "dismentle.view.dismentle"
    
            //         });
    
            //     }
    
            //     this.disDialog.then(function(oDialog) {
                  
            //         oDialog.open();
    
            //     });
            // },
            // onCloseDimentle : function () {

            //     this.byId("dismentle").close();
    
            // },
            // onCloseInstall : function () {

            //     this.byId("install").close();
    
            // },
            
            oSelection:function(oEvent){
                
                 if(oEvent.getSource().getSelectedButton().getText() === "Install"){
                  
                    this.byId("ser").setVisible(false)
                    this.byId("input-equip").setVisible(true)
                    this.byId("input-equip").setValue(null);
                    this.byId("input-funloc").setValue(null);
                    this.byId("input-superord.equip").setValue(null);
                }if(oEvent.getSource().getSelectedButton().getText() === "Dismantle"){
                  
                    this.byId("ser").setVisible(true)
                    this.byId("input-equip").setVisible(false)
                    this.byId("ser").setValue(null);
                    this.byId("input-funloc").setValue(null);
                    this.byId("input-superord.equip").setValue(null);
                }
            },
            oAccept:function(oEve){
               console.log("")
            //    var x = this.byId('rbg4').getSelectedButton().getText()
                if(this.byId('RB4-1').mProperties.selected)this.eve1()
                if(this.byId('RB4-2').mProperties.selected) this.eve2()
            },
            eve1:function(x){
              
                var equip = this.byId("input-equip").getValue();
                var fun = this.byId("input-funloc").getValue();
                var sup = this.byId("input-superord.equip").getValue();
                console.log(equip,fun,sup);
                this.byId("input-equip").setValue(null);
                this.byId("input-funloc").setValue(null);
                this.byId("input-superord.equip").setValue(null);

            },
            eve2:function(x){
                var equip = this.byId("ser").getValue();
                console.log("eve2")
                this.byId("ser").setValue(null);
                this.byId("input-funloc").setValue(null);
                this.byId("input-superord.equip").setValue(null);
                
            },
            ODate: function(){
                var Dat= new Date();
                console.log(Dat)
                this.byId

            }

            
        });
    });
