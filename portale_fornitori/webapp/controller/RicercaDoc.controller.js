sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "portalefornitori.portalefornitori.controller.RicercaDoc",
      {
        onInit: async function () {
          this.setMockData();
          debugger;
        },
        setMockData: async function () {
          let objJSon = await fetch("/model/modMock.json");
          let data = await objJSon.json();
          let oModelAn = new JSONModel(data.azienda);
          this.setModel(oModelAn, "anagraficaModel");
          debugger
          let oModelDoc = new JSONModel(data.documenti);
          this.setModel(oModelDoc, "docModel");
        },
      }
    );
  }
);