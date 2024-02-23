sap.ui.define([], function() {
	"use strict";

	return  {
    ctrlDatePickerValue: function (oEvent) {      
        const ValueState = sap.ui.core.ValueState;
        let oDp = oEvent.getSource()
        let bValid = oEvent.getParameter("valid")
        if (!bValid) {
            oDp.setValueState(ValueState.Error)
            oDp.setValue("dd/MM/yyyy")
            return false
        } else {
            oDp.setValueState(ValueState.None)
            return true
        }
    },
	};
});