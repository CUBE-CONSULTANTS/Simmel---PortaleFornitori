sap.ui.define(
  ["./BaseController", 
  "sap/ui/model/json/JSONModel", 
  "sap/ui/core/Fragment"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel,Fragment) {
    "use strict";

    return BaseController.extend(
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

          this.newRowPers = data.newRowPers
          this.newRowMezzo = data.newRowMezzo
          this.loadFragment("tableAzienda", this.byId("panelContainer"));
          this.dateToChange
        },
        onOpenMaskAllega: function (oEvent) {
          debugger
          let mask = new JSONModel()
          this.setModel(mask,"modelloMask")
          this.onOpenDialog("nDialog","portalefornitori.portalefornitori.view.fragment.documenti.maskAllegati",this,"modelloMask");

          oEvent.getSource().getBindingContext("docModel") ? this.dateToChange = oEvent.getSource().getBindingContext("docModel") :
          oEvent.getSource().getBindingContext("personaleModel") ? this.dateToChange = oEvent.getSource().getBindingContext("personaleModel") :
          oEvent.getSource().getBindingContext("mezziModel") ?this.dateToChange = oEvent.getSource().getBindingContext("mezziModel") : null   
        },
        onCloseAllegati:function (oEvent) {
          oEvent.getSource().getParent().getParent().close()
        },
        onIconTabSelect: function (oEvent) {
          this.sKey = oEvent.getSource().getSelectedKey();
          const oPanel = this.byId("panelContainer");
          switch (this.sKey) {
            case "info":
                this.loadFragment("tableAzienda", oPanel);
                oPanel.setVisible(true)
                break;
            case "people":
                this.loadFragment("tablePersonale", oPanel);
                oPanel.setVisible(true)
                break;
            case "car":
                this.loadFragment("tableMezzi", oPanel);
                oPanel.setVisible(true)
                break;
            default:
                break;
        }
    },
    loadFragment: function(sFragmentName, oPanel) {
        var oFragment = sap.ui.xmlfragment("portalefornitori.portalefornitori.view.fragment.documenti." + sFragmentName, this);
        oPanel.removeAllContent();
        oPanel.addContent(oFragment);
    },
    addRowPers:function (oEvent) {
      debugger
      let oModel = this.getModel("personaleModel")
      let currentData = oModel.getProperty("/");
         
      currentData.push(this.newRowPers)
      oModel.setProperty("/",currentData)
    },
    addRowMezzo:function (oEvent) {
      debugger
      let oModel = this.getModel("mezziModel")
      let currentData = oModel.getProperty("/");
         
      currentData.push(this.newRowMezzo)
      oModel.setProperty("/",currentData)
    },
    deleteRow:function (oEvent,modelName){
      debugger
      let table = oEvent.getSource().getParent().getParent()
      let oRowsToDelete = table.getSelectedIndices() 
      let oModel = table.getModel(modelName);
    
        if (oRowsToDelete.length > 0) { 
            for (let i = oRowsToDelete.length - 1; i >= 0; i--) {
                let path = oRowsToDelete[i];
                let aData = oModel.getData();
                aData.splice(path, 1); 
            }
            table.clearSelection(); 
            oModel.updateBindings(); 
        } else {
            MessageBox.error("Selezionare almeno un elemento");
        }
      },
      deleteMezzo: function (oEvent){
        this.deleteRow(oEvent,"mezziModel")
      }, 
      deletePers: function(oEvent){
        this.deleteRow(oEvent,"personaleModel")
      },
      onDatePickerMaskChange: function (oEvent){
        debugger
        let dueDate = oEvent.getSource().getModel().getProperty("/dataScad")
        let oModelToChange =  this.dateToChange.getModel()
        if(this.formatter.ctrlDatePickerValue(oEvent)){     
          oModelToChange.setProperty(this.dateToChange.getPath() + "/scadenza", dueDate)  
        }      
      },
      //   createInfoTable:function () { 
      //     const oTable = new sap.m.Table({
      //       id: "changeTable",
      //       sticky: ["HeaderToolbar", "ColumnHeaders"],
      //       growing: true,
      //       autoPopinMode: true,
      //       class: "table",
      //       items: {
      //           path: "docModel>/",
      //           factory: this.createCellContent("people",this.getOwnerComponent().getModel("userModel"))
      //       }
      //     });
      
      //     oTable.addColumn(new sap.m.Column({
      //         width: "100px",
      //         hAlign: "Left",
      //         header: new Text({ text: "{i18n>Descrizione}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "60px",
      //         hAlign: "Center",
      //         header: new Text({ text: "{i18n>Scarica}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "100px",
      //         hAlign: "Center",
      //         visible: "{= ${userModel>/tipoUtente} === 'Interno' ? true : false }",
      //         header: new Text({ text: "{i18n>Validazione}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "60px",
      //         hAlign: "Center",
      //         visible: "{= ${userModel>/tipoUtente} === 'Interno' ? false : true }",
      //         header: new Text({ text: "{i18n>Allega}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "60px",
      //         hAlign: "Center",
      //         header: new Text({ text: "{i18n>Stato}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "130px",
      //         hAlign: "Center",
      //         visible: "{= ${userModel>/tipoUtente} === 'Interno' ? true : false }",
      //         header: new Text({ text: "{i18n>Datacaricamento}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "60px",
      //         hAlign: "Center",
      //         visible: "{= ${userModel>/tipoUtente} === 'Interno' ? false : true }",
      //         header: new Text({ text: "{i18n>Esito}" })
      //     }));
      //     oTable.addColumn(new sap.m.Column({
      //         width: "90px",
      //         hAlign: "Center",
      //         header: new Text({ text: "{i18n>Scadenza}" })
      //     }));  
      //       return oTable;
      //   },
      //  createCellContent: function (sModelName, sTipoUtente) {
      //   debugger
      //     switch (sModelName) {
      //         case "info":
      //             return [
      //                 new Text({ text: "{docModel>descrizione}" }),
      //                 new Button({
      //                     visible: "{= !${docModel>scarica} ? false : true}",
      //                     icon: "{docModel>scarica}",
      //                     type: "Emphasized"
      //                 }),
      //                 new Select({
      //                     width: "150px",
      //                     items: { path: "docModel>validazione", templateShareable: false,
      //                     template: new Item({
      //                       key: "{value}",
      //                       text: "{text}"
      //                   })
      //                   }
      //                 }),
      //                 new Button({
      //                     type: "Emphasized",
      //                     icon: "{docModel>allega}",
      //                     press: "onOpenMaskAllega"
      //                 }),
      //                 new Icon({
      //                     alt: "Download",
      //                     size: "1.3rem",
      //                     src: "{docModel>stato}",
      //                     color: "{docModel>color}"
      //                 }),
      //                 new Text({ text: "{docModel>data}" }),
      //                 new Text({ text: "{docModel>esito_validazione}" }),
      //                 new Input({
      //                     textAlign: "Center",
      //                     value: "{docModel>scadenza}",
      //                     editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${docModel>editable} }"
      //                 })
      //             ];
      //         case "people":
      //           return [
      //             new Text({ text: "{personaleModel>descrizione}" }),
      //             new Button({
      //                 visible: "{= !${personaleModel>scarica} ? false : true}",
      //                 icon: "{personaleModel>scarica}",
      //                 type: "Emphasized"
      //             }),
      //             new Select({
      //                 width: "150px",
      //                 items: { path: "personaleModel>validazione" , templateShareable: false,
      //               template: new Item({
      //                   key: "{value}",
      //                   text: "{text}"
      //               })
      //             }
      //             }),
      //             new Button({
      //                 type: "Emphasized",
      //                 icon: "{personaleModel>allega}",
      //                 press: "onOpenMaskAllega"
      //             }),
      //             new Icon({
      //                 alt: "Download",
      //                 size: "1.3rem",
      //                 src: "{personaleModel>stato}",
      //                 color: "{personaleModel>color}"
      //             }),
      //             new Text({ text: "{personaleModel>data}" }),
      //             new Text({ text: "{personaleModel>esito_validazione}" }),
      //             new Input({
      //                 textAlign: "Center",
      //                 value: "{personaleModel>scadenza}",
      //                 editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${personaleModel>editable} }"
      //             })
      //         ];
      //         case "car":
      //           return [
      //             new Text({ text: "{mezziModel>descrizione}" }),
      //             new Button({
      //                 visible: "{= !${mezziModel>scarica} ? false : true}",
      //                 icon: "{mezziModel>scarica}",
      //                 type: "Emphasized"
      //             }),
      //             new Select({
      //                 width: "150px",
      //                 items: { path: "mezziModel>validazione",templateShareable: false,
      //               template: new Item({
      //                   key: "{value}",
      //                   text: "{text}"
      //               })
      //             }
      //             }),
      //             new Button({
      //                 type: "Emphasized",
      //                 icon: "{mezziModel>allega}",
      //                 press: "onOpenMaskAllega"
      //             }),
      //             new Icon({
      //                 alt: "Download",
      //                 size: "1.3rem",
      //                 src: "{mezziModel>stato}",
      //                 color: "{mezziModel>color}"
      //             }),
      //             new Text({ text: "{mezziModel>data}" }),
      //             new Text({ text: "{mezziModel>esito_validazione}" }),
      //             new Input({
      //                 textAlign: "Center",
      //                 value: "{mezziModel>scadenza}",
      //                 editable: "{= ${userModel>/tipoUtente} === 'Interno' ? false : ${mezziModel>editable} }"
      //             })
      //         ];
      //         default:
      //             return [];
      //     }
      //   },
      }
    );
  }
);
