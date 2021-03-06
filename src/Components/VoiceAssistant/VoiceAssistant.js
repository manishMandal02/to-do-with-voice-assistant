import { useState } from 'react';
import { useDispatch } from 'react-redux';
import annyang from 'annyang';
import axios from 'axios';

import classes from './VoiceAssistant.module.scss';
import { addItemAction } from '../../Store/Actions/TodoActions';
import LoadingRipple from '../UI/LoadingRipple/LoadingRipple';
import { Mic } from '@material-ui/icons';

const VoiceAssistant = ({ updateSuccess, deleteSuccess }) => {
  //initialize
  const dispatch = useDispatch();

  //state
  const [assistantStatus, setAssistantStatus] = useState(false);

  //voices
  const voices = () => {
    const voices = speechSynthesis.getVoices();
    const voice = voices.filter((v) => v.name === 'Google UK English Female');
    return voice[0];
  };

  voices();
  //Voice Assistant
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = voices();
    speech.lang = 'en-US';
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  //adding item
  const handelAddItemKona = (item) => {
    dispatch(addItemAction({ groceryItem: item, isPurchased: false }));
    speak('done');
    updateSuccess();
  };

  //updating item purchased
  const handelUpdateItemPurchasedKona = async (name) => {
    try {
      const { data } = await axios.post(
        '/grocery/voice/updateItem',
        {
          name,
        },
        {
          'Content-type': 'application/json',
        }
      );
      if (data.result === 'success') {
        updateSuccess();
        speak('done');
      }
    } catch (error) {
      speak(`could not find the item, please try again`);
    }
  };

  //updating item letgo
  const handelUpdateItemLetgoKona = async (name) => {
    try {
      const { data } = await axios.post(
        '/grocery/voice/updateItem?letgo=true',
        {
          name,
        },
        {
          'Content-type': 'application/json',
        }
      );
      if (data.result === 'success') {
        speak('done');
        updateSuccess();
      }
    } catch (error) {
      speak(`could not find the item, please try again`);
    }
  };

  //updating item
  const handelDeleteItemKona = async (name) => {
    try {
      const { data } = await axios.post(
        '/grocery/voice/deleteItem',
        {
          name,
        },
        {
          'Content-type': 'application/json',
        }
      );
      if (data.result === 'success') {
        speak('done');
        deleteSuccess();
      }
    } catch (error) {
      speak(`could not find the item, please try again`);
    }
  };

  const greetUer = () => {
    speak('Hello, what can I do for you');
  };
  const greetUer2 = () => {
    speak('Good. to know');
  };
  const response1 = () => {
    speak(`I am good`);
  };

  // handelUpdateItemKona('test');

  let commands = {
    'add (item) *item': handelAddItemKona,
    'purchase *item': handelUpdateItemPurchasedKona,
    'let go (of) *item': handelUpdateItemLetgoKona,
    'delete *item': handelDeleteItemKona,
    'hey (kona)': greetUer,
    'hi (kona)': greetUer,
    '(i)(am) good': greetUer2,
    'how are you': response1,
  };

  const startAssistant = () => {
    if (!assistantStatus) {
      annyang.start({ autoRestart: false, continuous: false });
      annyang.addCommands(commands);
      //   callbacks
      annyang.addCallback('end', () => {
        setAssistantStatus(false);
      });
      setAssistantStatus(true);
    } else {
      annyang.pause();
      annyang.removeCallback('end');
      annyang.removeCommands();
      annyang.abort();
      setAssistantStatus(false);
    }
  };

  return (
    <>
      {!assistantStatus && window.innerWidth > 800 && (
        <div className={classes.VoiceCommands}>
          <p>Some Commands</p>
          <p> "add tomato"</p>
          <p> "purcahsed tomato"</p>
          <p> "let go of tomato"</p>
          <p> "delete tomato"</p>
        </div>
      )}
      <div className={classes.Container} onClick={startAssistant}>
        {assistantStatus ? (
          <div className={classes.Loading}>
            {' '}
            <LoadingRipple />{' '}
          </div>
        ) : (
          <div className={classes.Mic}>
            <Mic />
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceAssistant;
