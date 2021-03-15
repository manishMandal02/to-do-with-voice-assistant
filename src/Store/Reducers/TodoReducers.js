import { combineReducers } from 'redux';
import {
  GET_ALL_ITEMS_FAIL,
  GET_ALL_ITEMS_REQUEST,
  GET_ALL_ITEMS_SUCCESS,
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  UPDATE_PURCHASE_STATE_FAIL,
  UPDATE_PURCHASE_STATE_REQUEST,
  UPDATE_PURCHASE_STATE_SUCCESS,
  UPDATE_PURCHASE_STATE_RESET,
  DELETE_ITEM_RESET,
} from '../Actions/ActionTypes';

const getaAllItemsReducer = (state = { items: [], loading: false }, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS_REQUEST:
      return {
        items: [],
        loading: true,
      };
    case GET_ALL_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case GET_ALL_ITEMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        loading: true,
      };
    case ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
const updatePurchaseState = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_PURCHASE_STATE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PURCHASE_STATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_PURCHASE_STATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PURCHASE_STATE_RESET:
      return {};
    default:
      return state;
  }
};

const deleteItemReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DELETE_ITEM_REQUEST:
      return {
        loading: true,
      };
    case DELETE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_ITEM_RESET:
      return {};
    default:
      return state;
  }
};

export const toDoReducer = combineReducers({
  getAllItems: getaAllItemsReducer,
  addItem: addItemReducer,
  updatePurchaseState: updatePurchaseState,
  deleteItem: deleteItemReducer,
});
