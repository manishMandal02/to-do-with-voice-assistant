import { useEffect, useState } from 'react';
import LoadingRipple from '../UI/LoadingRipple/LoadingRipple';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Todo.module.scss';
import {
  addItemAction,
  deleteItemAction,
  getAllItemsAction,
  updateIsPurchasedState,
} from '../../Store/Actions/TodoActions';
import { Snackbar, Tooltip } from '@material-ui/core';
import {
  DELETE_ITEM_RESET,
  UPDATE_PURCHASE_STATE_RESET,
} from '../../Store/Actions/ActionTypes';
import { Alert } from '@material-ui/lab';
import VoiceAssistant from '../VoiceAssistant/VoiceAssistant';
import { Delete } from '@material-ui/icons';

const Todo = () => {
  //initialize
  const dispatch = useDispatch();

  //state
  const [enteredItem, setEnteredItem] = useState('');

  const [snackbar1, setSnackbar1] = useState(false);
  const [snackbar2, setSnackbar2] = useState(false);
  //getting the month
  const monthNum = new Date().getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const { loading, items } = useSelector((state) => state.todo.getAllItems);

  const purcahsedItems = items.filter((item) => item.isPurchased === true);
  const nonPurchasedItems = items.filter((item) => item.isPurchased !== true);
  const filteredItems = [...nonPurchasedItems, ...purcahsedItems];

  const { success: updatePurchaseStateSuccess } = useSelector(
    (state) => state.todo.updatePurchaseState
  );

  const { success: deleteItemSuccess } = useSelector(
    (state) => state.todo.deleteItem
  );

  const { success: addItemSuccess } = useSelector(
    (state) => state.todo.addItem
  );

  //get all items on page load or any other changes
  useEffect(() => {
    dispatch(getAllItemsAction());
    if (addItemSuccess) {
      setEnteredItem('');
    }
    if (updatePurchaseStateSuccess) {
      dispatch({
        type: UPDATE_PURCHASE_STATE_RESET,
      });
    }
    if (deleteItemSuccess) {
      dispatch({
        type: DELETE_ITEM_RESET,
      });
    }
  }, [dispatch, addItemSuccess, updatePurchaseStateSuccess, deleteItemSuccess]);

  //add item handler
  const handelAddItem = (e) => {
    e.preventDefault();
    dispatch(addItemAction({ groceryItem: enteredItem, isPurchased: false }));
  };
  //handel purchase state update for item
  const updatePurchaseHandler = (id, isPurchased) => {
    dispatch(updateIsPurchasedState({ id, isPurchased }));
    setSnackbar1(true);
  };
  //handel purchase state update for item
  const updatePurchaseHandler2 = (id, isPurchased) => {
    dispatch(updateIsPurchasedState({ id, isPurchased }));
  };
  //handel delete  item
  const itemDeleteHandler = (id) => {
    dispatch(deleteItemAction(id));
    setSnackbar2(true);
  };

  return (
    <div className={classes.ToDo}>
      <nav>
        <img src='/logo192.png' alt='logo' />
        Grocery Planning App
      </nav>
      <div className={classes.Wrapper}>
        <div className={classes.Container}>
          <p>Plan for the Month of {months[monthNum]}</p>
          <form onSubmit={handelAddItem}>
            <input
              value={enteredItem}
              onChange={(e) => setEnteredItem(e.target.value)}
              type='text'
              placeholder='Add Item...'
              autoFocus
            />
          </form>
          <div className={classes.ItemsContainer}>
            {loading ? (
              <LoadingRipple />
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className={classes.ItemCard}
                  style={{
                    backgroundColor:
                      item.isPurchased !== true ? '#1281FE' : '#ff7f50',
                  }}
                >
                  <p>
                    {item.isPurchased ? (
                      <strike>{item.groceryItem}</strike>
                    ) : (
                      item.groceryItem
                    )}
                  </p>
                  <span>
                    <Tooltip
                      title='Mark item as purchased'
                      placement='top'
                      enterDelay={300}
                    >
                      {item.isPurchased ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updatePurchaseHandler2(item._id, false);
                          }}
                        >
                          Let Go
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updatePurchaseHandler(item._id, true);
                          }}
                        >
                          Purchased
                        </button>
                      )}
                    </Tooltip>
                    <Tooltip
                      title='Delete item'
                      placement='top'
                      enterDelay={300}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          itemDeleteHandler(item._id);
                        }}
                      >
                        <Delete />
                      </button>
                    </Tooltip>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={classes.VoiceAssistant}>
          <VoiceAssistant
            updateSuccess={() =>
              // setUpdateVoiceSuccess(updateVoiceSuccess === true ? false : true)
              // setUpdateVoiceSuccess(true)
              dispatch(getAllItemsAction())
            }
            deleteSuccess={() =>
              // setDeleteVoiceSuccess(deleteVoiceSuccess === true ? false : true)
              // setDeleteVoiceSuccess(true)
              dispatch(getAllItemsAction())
            }
          />
        </div>
        <Snackbar
          open={snackbar1}
          autoHideDuration={2000}
          onClose={() => setSnackbar1(false)}
        >
          <Alert onClose={() => setSnackbar1(false)} severity='success'>
            Item marked as purcahsed
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackbar2}
          autoHideDuration={2000}
          onClose={() => setSnackbar2(false)}
        >
          <Alert onClose={() => setSnackbar2(false)} severity='success'>
            Item deleted
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Todo;
