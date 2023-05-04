sap.ui.define([
    "sap/ui/core/mvc/Controller",
    
    "sap/ui/model/json/JSONModel",
    
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format"
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,ChartFormatter,Format) {
        "use strict";

        return Controller.extend("Traker.covidtraker.controller.Home", {
            dataPath : "../model/test.json",
            
            oVizFrame : null,

             onInit: function () {
               
                Format.numericFormatter(ChartFormatter.getInstance());
                var formatPattern = ChartFormatter.DefaultPattern;
                // var Data1 = this.getOwnerComponent().getModel("devraj");
                // this.getView().setModel(Data1);
                

    
                var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
                oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            formatString:formatPattern.SHORTFLOAT_MFD2,
                            visible: true
                        }
                    },
                    valueAxis: {
                        label: {
                            formatString: formatPattern.SHORTFLOAT
                        },
                        title: {
                            visible: false
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: false
                        }
                    },
                    title: {
                        visible: false,
                        text: 'Revenue by City and Store Name'
                    }
                });
                
    
                var Data1 = new JSONModel(this.dataPath);
                this.getView().setModel(Data1);
                // var oPopOver = this.getView().byId("idPopOver");
                // oPopOver.connect(oVizFrame.getVizUid());
                // oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
    
                

                

            },



            onLst: function(){
                    console.log("showing list")
            },
            onGrph: function(){
                console.log("showing graph")
            },
            testPress : function(){
                console.log("test")
            }

        });
    });
 