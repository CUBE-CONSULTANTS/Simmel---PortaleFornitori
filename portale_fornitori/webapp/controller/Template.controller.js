sap.ui.define(
  ["./BaseController",
	"sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
    JSONModel, Fragment) {
    "use strict";

    return Controller.extend(
      "portalefornitori.portalefornitori.controller.Template",
      {
        onInit: function () {

        },
        onOpenMaskAllega: function (oEvent) {
          debugger
          let mask = new JSONModel()
          this.setModel(mask,"modelloMask")
          this.onOpenDialog("nDialog","portalefornitori.portalefornitori.view.fragment.templateN.maskAllegati",this,"modelloMask");
        },
        onCloseAllegati: function(oEvent){
          oEvent.getSource().getParent().getParent().close()
        },
      }
    );
  }
);
