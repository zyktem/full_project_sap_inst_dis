sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("pollution.controller.App", {
        onInit() {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oModel = this.getOwnerComponent().getModel();
        },
        handleClose: function () {
          window.history.go(-1);
        },
        onBack: function () {
          window.history.go(-1);
        }
      });
    }
  );
  