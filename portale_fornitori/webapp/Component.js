/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "portalefornitori/portalefornitori/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models,JSONModel) {
        "use strict";
        function getRandomUserType() {
            // Restituisce casualmente "Interno" o "Esterno"
            return Math.random() < 0.5 ? "Interno" : "Fornitore";
          }

        return UIComponent.extend("portalefornitori.portalefornitori.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                sap.ui.getCore().getConfiguration().setLanguage("IT");

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                const user = new JSONModel({
                    tipoUtente: null,
                    nome: null,
                  });
                 
                  this.setModel(user, "userModel");
                  const randomUserType = getRandomUserType();
                  this.getModel("userModel").setProperty("/tipoUtente", randomUserType);
                  this.getModel("userModel").setProperty("/nome", randomUserType);    
                  this.getRouter().navTo("Master");    
            }
        });
    }
);