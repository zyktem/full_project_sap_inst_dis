sap.ui.define([
    "sap/ui/core/mvc/Controller",
    
    "sap/ui/model/json/JSONModel",
    
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,ChartFormatter,Format) {
        "use strict";

        return Controller.extend("Traker.covidtraker.controller.Home", {
            dataPath : "../../model/test.json",
            
            oVizFrame : null,
             onInit: function () {
                // var odata = "../model/test.json" ;
                // var odataModel = new JSONModel(odata);
                // this.getView().setModel(odataModel,"testData")
                Format.numericFormatter(ChartFormatter.getInstance());
                var formatPattern = ChartFormatter.DefaultPattern;
                // set explored app's demo model on this sample

    
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
                var dataModel = new JSONModel(this.dataPath);
                oVizFrame.setModel(dataModel);
    
                var oPopOver = this.getView().byId("idPopOver");
                oPopOver.connect(oVizFrame.getVizUid());
                oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
    
                //InitPageUtil.initPageSettings(this.getView()); 

                

            },



            onLst: function(){
                    console.log("showing list")
            },
            onGrph: function(){
                console.log("showing graph")
            }
        });
    });
 