sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "portalefornitori.portalefornitori.controller.Anagrafica",
      {
        onInit: async function () {
          debugger;
          let objJSon = await fetch("/model/modMock.json");
          let data = await objJSon.json();

          let oModelAn = new JSONModel(data.azienda);
          let oModelDoc = new JSONModel(data.documenti);
          this.setModel(oModelAn, "anagraficaModel");
          this.setModel(oModelDoc, "docModel");
        },        
      }
    );
  }
);
