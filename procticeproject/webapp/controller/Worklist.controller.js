sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
    "sap/ui/table/Table"
], function (BaseController, JSONModel,Fragment, formatter, Filter, FilterOperator,exportLibrary,Spreadsheet,Table) {
    "use strict";
    var EdmType = exportLibrary.EdmType;
    return BaseController.extend("procticeproject.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var oViewModel;

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */
        onUpdateFinished : function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
            } else {
                sTitle = this.getResourceBundle().getText("worklistTableTitle");
            }
            this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress : function (oEvent) {
            // The source is the list item that got pressed
            //console.log("")
            this._showObject(oEvent.getSource());
        },

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack : function() {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },


        onSearch : function (oEvent) {
            if (oEvent.getParameters().refreshButtonPressed) {
                // Search field's 'refresh' button has been pressed.
                // This is visible if you select any main list item.
                // In this case no new search is triggered, we only
                // refresh the list binding.
                this.onRefresh();
            } else {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            }

        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh : function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject : function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/Alphabetical_list_of_products".length)
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function(aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
            oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        },
        onValueHelpRequest: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "procticeproject.view.ValueHelpDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpDialog.then(function(oDialog) {
				// Create a filter for the binding
				oDialog.getBinding("items").filter([new Filter("ProductName", FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				oDialog.open(sInputValue);
			});
		},

		onValueHelpSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("ProductName", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
            
		},
        onValueHelpClose: function (oEvent) {

            //  var oSelectedItem = oEvent.getParameter("selectedItem");
    
                var oTable = this.byId("table")
    
              //  oViewModel = this.getModel("worklistView");
    
                var sValue = oEvent.getSource()._sSearchFieldValue;
    
                var oFilter = new Filter("ProductName", FilterOperator.Contains, sValue);
    
                // oEvent.getSource().getBinding("items").filter([oFilter]);
    
               
    
                oTable.getBinding("items").filter(oFilter);
    
          //  changes the noDataText of the list in case there are no filter results
    
                    if (oFilter.length === 0) {
    
                       oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
    
                     }
    
            },
        onFind : function(){
            var aTableSearchState = [];
            
                var sQuery = this.getView().byId("productInput").getValue();;

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
        },
        onDown :function (oEvent){
            var oTable = this.getView().byId("table");
            oTable.getBinding("items")
        },
        
        
		createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Full name',
				property: 'ProductName',
				type: EdmType.String,
				scale: 0
			});

			aCols.push({
				label: 'ID',
				type: EdmType.String,
				property: 'UnitPrice',
				scale: 0
			});

			
			return aCols;
		},

        
        // /*
        onExportXls: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('table');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},
        // */
       onExportPdf: function(){
            // var oTableRef = this.getView().byId("table").getFocusDomRef();
            // window.addEventListener('beforeprint', (event) => {
                
            //     console.log('Before print');
            // });
            // window.onbeforeprint = (event) => {
            //     // oTableRef
            //     console.log('Before print');
            //   };  
            
        // var oTable = this.byId("table");
        // var Tabdata = oTable.getBinding("items").aKeys;
        // let divToPrint = document.getElementById('table');
        // let htmlToPrint = 
        //     '<style type="text/css">' + 
        //     'table {'+'font-family: arial, sans-serif;'+ 
        //     'border-collapse: collapse;'+'width: 95%;'+ 
        //     'margin-left: 20px'+'}'+   
        //     'th, td {' +
        //     'border:1px solid #000;' +
        //     'padding: 8px;' +
        //     '}'+ 'tr:nth-child(even) {'+
        //     'background-color: #dddddd;'+'}'+
        //     '</style>';
        // htmlToPrint += oTable.outerHTML;
        // let windowToPrint = window.open("");    
        // windowToPrint.document.write(oTableRef);
        // windowToPrint.print();
        // windowToPrint.close();
        this.closePopover();
        
        window.print();
        
       },
       handlePopoverPress: function (oEvent) {
        var oButton = oEvent.getSource(),
            oView = this.getView();

        // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "procticeproject.view.Popover",
                    controller: this
                }).then(function(oPopover) {
                    oView.addDependent(oPopover);
                    //oPopover.bindElement("/ProductCollection/0");
                    return oPopover;
                });
            }
            this._pPopover.then(function(oPopover) {
                oPopover.openBy(oButton);
                
            });
            
        },
        closePopover:function(){
            this.byId("myPopover").close();
        }

    });
});
