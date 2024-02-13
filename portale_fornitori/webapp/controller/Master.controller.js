sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend(
      "portalefornitori.portalefornitori.controller.Master",
      {
        onInit: function () {       
          this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
        },

        navToMaster: function () {
          this.getRouter().navTo("Master");
        },
        navToRicercaDoc: function () {
          this.getRouter().navTo("RicercaDoc");
        },
        navToRicerca: function () {
          this.getRouter().navTo("RicercaForn");
        },

        navToDocumenti: function () {
          this.getRouter().navTo("Documenti");
        },

        navToTemplate: function () {
          this.getRouter().navTo("Template");
        },
        navToAnagrafica: function () {
          this.getRouter().navTo("Anagrafica");
        },
        onAnagraficaBtnPress: function () {
          debugger;
          this.userType === "Interno"
            ? this.navToRicerca()
            : this.navToAnagrafica();
        },
        onDocBtnPress: function () {
          this.userType === "Interno"
          ? this.navToRicercaDoc()
          : this.navToDocumenti();
        }
      }
    );
  }
);
