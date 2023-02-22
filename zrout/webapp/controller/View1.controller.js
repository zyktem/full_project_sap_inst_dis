sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zrout.controller.View1", {
            onInit: function () {

                //setiing the path of the JSON url to the variable
                var path = "https://services.odata.org/v4/northwind/northwind.svc/Products?$format=JSON";
                //Assigning the a variable with jsonModel Along with the path url
                var myModel = new JSONModel(path);
                //now assigning the datas into model with model name
                this.getView().setModel(myModel, "oData");
            },
            handleDelete: function (oEvent) {
                    //assigning the delete event of the oList
                    //var oList = oEvent.getSource(),
                    var oItem = oEvent.getParameter("listItem"),
                       sPath = oItem.getBindingContextPath();
                    // let index = sPath.split('/')[2];
                   // this.getView().byId("listId");
                // after deletion put the focus back to the list
                //    oList.attachEventOnce("updateFinished", oList.focus, oList);
                    this.getView().getModel("oData").getData().value.splice(sPath[-1],1);
                 //   oList.refreshBinding();
                // send a delete request to the odata service
                // this.myModel.remove(sPath);
                this.getView().getModel("oData").refresh();
                // this.getView().getModel("oData").setData(newData);
            },
            tap: function (e) {
                var oitem = e.getSource().getBindingContext().getObject()


                var array = oListStandardNoImageNoHeader.getModel().getData().custSomeData;
                array.splice(array.indexOf(oitem), 1);
                oListStandardNoImageNoHeader.getModel().refresh();
            },
            oAction: function () {
                this.getOwnerComponent().getRouter().navTo("RouteView2");
            }

        });
    });
