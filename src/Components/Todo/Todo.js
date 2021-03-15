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
import { CircularProgress, Tooltip } from '@material-ui/core';
import {
  DELETE_ITEM_RESET,
  UPDATE_PURCHASE_STATE_RESET,
  UPDATE_PURCHASE_STATE_SUCCESS,
} from '../../Store/Actions/ActionTypes';

const Todo = () => {
  //initialize
  const dispatch = useDispatch();

  //state
  const [enteredItem, setEnteredItem] = useState('');
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

  const {
    loading: updatePurchaseStateLoading,
    success: updatePurchaseStateSuccess,
  } = useSelector((state) => state.todo.updatePurchaseState);

  const {
    loading: deleteItemLoading,
    success: deleteItemSuccess,
  } = useSelector((state) => state.todo.deleteItem);

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
  };
  //handel delete  item
  const itemDeleteHandler = (id) => {
    dispatch(deleteItemAction(id));
  };

  return (
    <div className={classes.ToDo}>
      <nav>Monthly Grocery Planning App</nav>
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
                            updatePurchaseHandler(item._id, false);
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
                        {/* {deleteItemLoading ? (
                          'hello'
                        ) : ( */}
                        <i className='fas fa-trash'></i>
                        {/* )} */}
                      </button>
                    </Tooltip>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
