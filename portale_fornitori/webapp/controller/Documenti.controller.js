sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend(
      "portalefornitori.portalefornitori.controller.Documenti",
      {
        onInit: async function () {
          debugger;
          let objJSon = await fetch("/model/modMock.json");
          let data = await objJSon.json();

          let oModelAn = new JSONModel(data.azienda);
          let oModelDoc = new JSONModel(data.documenti);
          this.setModel(oModelAn, "anagraficaModel");
          this.setModel(oModelDoc, "docModel");
          let oValDoc = new JSONModel(data.validazione)
          this.setModel(oValDoc, "valModel")
        },
        navToRicercaDoc: function () {
          this.getRouter().navTo("RicercaDoc");
        },
        onOpenMaskAllega: function (oEvent) {
          debugger
          let mask = new JSONModel()
          this.setModel(mask,"modelloMask")
          this.onOpenDialog("nDialog","portalefornitori.portalefornitori.view.fragment.documenti.maskAllegati",this,"modelloMask");
        },
        onCloseAllegati:function (oEvent) {
          oEvent.getSource().getParent().getParent().close()
        }
      }
    );
  }
);
