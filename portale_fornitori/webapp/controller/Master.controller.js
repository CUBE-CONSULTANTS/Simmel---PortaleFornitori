sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "portalefornitori.portalefornitori.controller.Master",
      {
        onInit: function () {       
          this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
        },

      }
    );
  }
);
