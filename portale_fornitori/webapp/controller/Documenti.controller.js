sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel", "sap/m/ColumnListItem","sap/m/Button","sap/m/Input","sap/m/Select","sap/m/Text","sap/ui/core/Icon","sap/ui/core/Item"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel,ColumnListItem, Button,Input,Select,Text,Icon,Item) {
    "use strict";

    return Controller.extend(
      "portalefornitori.portalefornitori.controller.Documenti",
      {
        onInit: async function () {
          debugger;
          let objJSon = await fetch("/model/modMock.json");
          let data = await objJSon.json();

          let oModelAn = new JSONModel(data.azienda);
          let oModelDocForn = new JSONModel(data.documenti_azienda);
          let oModelDocPersonale = new JSONModel(data.documenti_dipendenti)
          let oModelDocMezzi = new JSONModel(data.documenti_automezzi)
          this.setModel(oModelAn, "anagraficaModel");
          this.setModel(oModelDocForn, "docModel");
          this.setModel(oModelDocPersonale,"personaleModel")
          this.setModel(oModelDocMezzi,"mezziModel")
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
        },
        onIconTabSelect: function (oEvent) {
          debugger
          let sKey = oEvent.getSource().getSelectedKey();
          let oTable = this.byId("changeTable"); 
          const sTipoUtente = this.getModel("userModel").getProperty("/tipoUtente");
          const aCellContent = this.createCellContent(sKey, sTipoUtente);
          const oTemplate = new ColumnListItem({ cells: aCellContent });
            
            switch (sKey) {
                case "info":
                    oTable.bindItems({
                        path: "docModel>/",
                        templateShareable: false,
                        template: oTemplate
                    });
                    break;
                case "people":
                    oTable.bindItems({
                        path: "personaleModel>/",
                        templateShareable: false,
                        template: oTemplate
                    });
                    break;
                case "car":
                    oTable.bindItems({
                        path: "mezziModel>/",
                        templateShareable: false,
                        template: oTemplate
                    });
                    break;
                default:
                    break;
            }
        },
       createCellContent: function (sModelName, sTipoUtente) {
        debugger
          switch (sModelName) {
              case "info":
                  return [
                      new Text({ text: "{docModel>descrizione}" }),
                      new Button({
                          visible: "{= !${docModel>scarica} ? false : true}",
                          icon: "{docModel>scarica}",
                          type: "Emphasized"
                      }),
                      new Select({
                          width: "150px",
                          items: { path: "docModel>validazione", templateShareable: false,
                          template: new Item({
                            key: "{value}",
                            text: "{text}"
                        })
                        }
                      }),
                      new Button({
                          type: "Emphasized",
                          icon: "{docModel>allega}",
                          press: "onOpenMaskAllega"
                      }),
                      new Icon({
                          alt: "Download",
                          size: "1.3rem",
                          src: "{docModel>stato}",
                          color: "{docModel>color}"
                      }),
                      new Text({ text: "{docModel>data}" }),
                      new Text({ text: "{docModel>esito_validazione}" }),
                      new Input({
                          textAlign: "Center",
                          value: "{docModel>scadenza}",
                          editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${docModel>editable} }"
                      })
                  ];
              case "people":
                return [
                  new Text({ text: "{personaleModel>descrizione}" }),
                  new Button({
                      visible: "{= !${personaleModel>scarica} ? false : true}",
                      icon: "{personaleModel>scarica}",
                      type: "Emphasized"
                  }),
                  new Select({
                      width: "150px",
                      items: { path: "personaleModel>validazione" , templateShareable: false,
                    template: new Item({
                        key: "{value}",
                        text: "{text}"
                    })
                  }
                  }),
                  new Button({
                      type: "Emphasized",
                      icon: "{personaleModel>allega}",
                      press: "onOpenMaskAllega"
                  }),
                  new Icon({
                      alt: "Download",
                      size: "1.3rem",
                      src: "{personaleModel>stato}",
                      color: "{personaleModel>color}"
                  }),
                  new Text({ text: "{personaleModel>data}" }),
                  new Text({ text: "{personaleModel>esito_validazione}" }),
                  new Input({
                      textAlign: "Center",
                      value: "{personaleModel>scadenza}",
                      editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${personaleModel>editable} }"
                  })
              ];
              case "car":
                return [
                  new Text({ text: "{mezziModel>descrizione}" }),
                  new Button({
                      visible: "{= !${mezziModel>scarica} ? false : true}",
                      icon: "{mezziModel>scarica}",
                      type: "Emphasized"
                  }),
                  new Select({
                      width: "150px",
                      items: { path: "mezziModel>validazione",templateShareable: false,
                    template: new Item({
                        key: "{value}",
                        text: "{text}"
                    })
                  }
                  }),
                  new Button({
                      type: "Emphasized",
                      icon: "{mezziModel>allega}",
                      press: "onOpenMaskAllega"
                  }),
                  new Icon({
                      alt: "Download",
                      size: "1.3rem",
                      src: "{mezziModel>stato}",
                      color: "{mezziModel>color}"
                  }),
                  new Text({ text: "{mezziModel>data}" }),
                  new Text({ text: "{mezziModel>esito_validazione}" }),
                  new Input({
                      textAlign: "Center",
                      value: "{mezziModel>scadenza}",
                      editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${mezziModel>editable} }"
                  })
              ];
              default:
                  return [];
          }
        },
      }
    );
  }
);
