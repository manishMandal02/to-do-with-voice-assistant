import axios from 'axios';
import {
  GET_ALL_ITEMS_REQUEST,
  GET_ALL_ITEMS_FAIL,
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
} from './ActionTypes';
export const getAllItemsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_ITEMS_REQUEST,
    });
    const { data } = await axios.get('/grocery/getAll');
    dispatch({
      type: GET_ALL_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addItemAction = ({ groceryItem, isPurchased }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ADD_ITEM_REQUEST,
    });
    const { data } = await axios.post('/grocery/add', {
      groceryItem,
      isPurchased,
    });
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateIsPurchasedState = ({ id, isPurchased }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: UPDATE_PURCHASE_STATE_REQUEST,
    });
    const { data } = await axios.put('/grocery/updatePurchaseStatus', {
      id,
      isPurchased,
    });
    dispatch({
      type: UPDATE_PURCHASE_STATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PURCHASE_STATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteItemAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ITEM_REQUEST,
    });

    const { data } = await axios.put('/grocery/deleteGroceryItem', {
      id,
    });
    dispatch({
      type: DELETE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
