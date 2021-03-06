import { Reducer } from 'redux';

import { ActiveRowsState, Action } from './types';
import initialState from './state';

const activeRowReducer: Reducer<ActiveRowsState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_FARMER': {
      return {
        ...state,
        activeFarmerUUID : action.currentFarmerUUID,
      };
    }
    case 'CLEAR_CURRENT_FARMER': {
      return {
        ...state,
        activeFarmerUUID : '',
      };
    }
    case 'UPDATE_CURRENT_MILK_ENTRY': {
      return {
        ...state,
        activeMilkEntryUUID : action.currentMilkEntryUUID,
      };
    }
    case 'CLEAR_CURRENT_MILK_ENTRY': {
      return {
        ...state,
        activeMilkEntryUUID : '',
      };
    }
    case 'UPDATE_CURRENT_EXPORT_ENTRY': {
      return {
        ...state,
        activeExportEntryUUID : action.currentExportEntryUUID,
      };
    }
    case 'CLEAR_CURRENT_EXPORT_ENTRY': {
      return {
        ...state,
        activeExportEntryUUID : '',
      };
    }
    case 'UPDATE_CURRENT_LOAN_ENTRY': {
      return {
        ...state,
        activeLoanEntryUUID : action.currentLoanEntryUUID,
      };
    }
    case 'CLEAR_CURRENT_LOAN_ENTRY': {
      return {
        ...state,
        activeLoanEntryUUID : '',
      };
    }
    case 'UPDATE_CURRENT_PAYMENT_ENTRY': {
      return {
        ...state,
        activePaymentEntryUUID : action.currentPaymentEntryUUID,
      };
    }
    case 'CLEAR_CURRENT_PAYMENT_ENTRY': {
      return {
        ...state,
        activePaymentEntryUUID : '',
      };
    }
    case 'LOGIN': {
      const { uuid } = action.payload;

      return {
        ...state,
        activeTraderUUID : uuid,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        activeTraderUUID : '',
      };
    }
    default:
      return state;
  }
};

export default activeRowReducer;
