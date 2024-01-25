sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,MessageBox,MessageToast,Fragment) {
        "use strict";
        var oEventBus = sap.ui.getCore().getEventBus();

        return Controller.extend("project1234.controller.View1", {
            onInit: function () {
                var localData = {
                    "btnVal" : ""
                };
                // var oModelLocal = new JSONModel();
             // this.getView().setModel(oModelLocal, 'oModelLocal')


             this.getOwnerComponent().getModel('localModel').setData(localData)
            },
            serial: function () {
                console.log("i am serialize")
                //  this.getView().getModel('localModel').setProperty('/btnVal',this.byId('instBtn').getBindingInfo('text').parts[0].path)


                this.getOwnerComponent().getRouter().navTo("RouteView3");
            },
            nonSerial: function () {
                console.log("i am not serialize")
               


                this.getOwnerComponent().getRouter().navTo("RouteView2")
            },
            //if install action is triggerd
            actionIns: function () {
                // this.getOwnerComponent().getModel('localModel').setProperty('/btnVal',this.byId('instBtn').getBindingInfo('text').parts[0].path)
                if (this.getView().byId("equiInp").getValue() === "s") {
                 
                    this.serial()
                }
                else if (this.getView().byId("equiInp").getValue() === "n") {
                    this.nonSerial()
                }
            },
            //if dismantle action is triggerd
            actionDis: function () {
                
                this.getOwnerComponent().getModel('localModel').setProperty('/btnVal',this.byId('distBtn').getBindingInfo('text').parts[0].path)
                if (this.getView().byId("equiInp").getValue() === "s") {
                    this.getOwnerComponent().getRouter().navTo("serdis");

                    // this.serial()
                }
                if (this.getView().byId("equiInp").getValue() === "n") {
                    this.getOwnerComponent().getRouter().navTo("nsirdis");
                   // this.nonSerial()
                }
            },
            //action button controls
            // oSelection: function (oEvent) {
            //     if (oEvent.oSource.sId.slice(-7) === "instBtn") {
            //         var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            //         this.actionIns()
            //     }
            //     if (oEvent.oSource.sId.slice(-7) === "distBtn")
                
            //         this.actionDis()

            // }

            // import for transfring the data from one view to another view via target in maifest


            // onInit: function () {
            //     this.getOwnerComponent().getRouter().getRoute("RouteNserins").attachPatternMatched(this._onEquipNoMatched, this);
            // },
            // _onEquipNoMatched: function (oEvent) {
            //     this._equiP = oEvent.getParameter("arguments").equID;
            //     this.getView().byId("inEqui").setValue(this._equiP);
            
    
            // },

            testBtnFrag:function(oEvent){
                // this.pDialog ??= this.loadFragment({
                //     name: " project1234.webapp.fragment.sucesMsg"
                // });
    
                // this.pDialog.then((oDialog) => oDialog.open());
                var pView = this.getView();
				if (!this._pDialog) {
					this._pDialog = Fragment.load({
						id: pView.getId(),
						name: " project1234.webapp.fragment.sucesMsg",
						controller: this
					}).then(function (pDialog) {
						pView.addDependent(pDialog);
						return pDialog;
					});
				}
				this._pDialog.then(function (pDialog) {
					pDialog.open();
				}.bind(this));

            },
            oSerIns: function () {

                var equipment = this.getView().byId("inEqui").getValue()
                var fun = this.getView().byId("FuncLocInp").getValue();
                var oModel = this.getOwnerComponent().getModel();
    
                var data = this.getOwnerComponent().getModel("localModel").getData();
                data.Funcloc = fun
    
                oModel.create("/EquipSerialInstallSet", data, {
                    method: "POST",
                    success: function (oData, oResponse) {
                        console.log("success");
                        sap.m.MessageBox.success(JSON.parse(oResponse.headers['sap-message']).message);
    
                    },
                    error: function (y) {
                        console.log("error")
                        sap.m.MessageBox.error(JSON.parse(y.responseText).error.message.value), {
                            title: "Error",
                            onClose: function (oAction) {
                                // Custom logic upon message box close
                                if (oAction === sap.m.MessageBox.Action.CLOSE) {
                                    // Perform your custom action here
                                    that.onCloseBtMain()
                                        // Add your custom code here
                                }
                            }
    
                        }
                    }
                })
    
            },
            oODataModel:read("/YourEntitySet", {
                success: function(oData) {
                    // Create a JSONModel and set OData to it
                    var oJSONModel = new JSONModel();
                    oJSONModel.setData(oData);

                    // Set the JSON model to the view or controller
                    this.getView().setModel(oJSONModel, "modelName");
                    // "modelName" is the name by which the model is known in the view
                }.bind(this),
                error: function(oError) {
                    // Handle errors if the service call fails
                }
            })
                
    
        
        });
    });
