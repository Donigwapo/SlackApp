/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';

const SlackThemePicker = () => {
  const [colorPickers, setColorPickers] = useState([]);
  const [hexCodeInputs, setHexCodeInputs] = useState([]);
  const [shareInput, setShareInput] = useState(null);
  const [radioInputs, setRadioInputs] = useState([]);

  useEffect(() => {
    const colorPickerElements = document.querySelectorAll('.main__colorpicker');
    const hexCodeInputElements = document.querySelectorAll('.main__hexcode');
    const shareInputElement = document.getElementById('share-colors');
    const radioInputElements = document.querySelectorAll('.radio__input');

    setColorPickers(colorPickerElements);
    setHexCodeInputs(hexCodeInputElements);
    setShareInput(shareInputElement);
    setRadioInputs(radioInputElements);
  }, []);

  useEffect(() => {
    if (!shareInput) return;

    const handleColorPickerUpdate = (event) => {
      document.documentElement.style.setProperty(`--${event.target.id}`, event.target.value);
      const hexcodeDiv = document.querySelectorAll(`.main__hexcode[data-color='${event.target.id}']`);

      hexcodeDiv[0].value = event.target.value;
      generateShareString();
    };

    const handleShareUpdate = () => {
      const newShareArr = shareInput.value.split(',');

      newShareArr.forEach((hexcode, i) => {
        const trimmedHex = hexcode.trim();
        const colorPicker = colorPickers[i];

        if (colorPicker.value === trimmedHex || !/^#[0-9a-f]{3}[0-9a-f]{3}?$/i.test(trimmedHex)) return;
        colorPicker.value = trimmedHex;
        const evt = new CustomEvent('change');
        colorPicker.dispatchEvent(evt);
      });
    };

    const handleHexCodeInputChange = (event) => {
      const hexCode = event.target.value;
      if (/^#[0-9a-f]{3}[0-9a-f]{3}?$/i.test(hexCode)) {
        const colorPicker = document.getElementById(event.target.getAttribute('data-color'));
        colorPicker.value = hexCode;
        const evt = new CustomEvent('change');
        colorPicker.dispatchEvent(evt);
      }
    };

    colorPickers.forEach((input) => {
      input.addEventListener('change', handleColorPickerUpdate);
    });

    shareInput.addEventListener('keyup', handleShareUpdate);
    shareInput.addEventListener('change', handleShareUpdate);

    hexCodeInputs.forEach((input) => {
      ['keyup', 'change'].forEach((evt) => {
        input.addEventListener(evt, handleHexCodeInputChange);
      });
    });

    return () => {
      colorPickers.forEach((input) => {
        input.removeEventListener('change', handleColorPickerUpdate);
      });

      shareInput.removeEventListener('keyup', handleShareUpdate);
      shareInput.removeEventListener('change', handleShareUpdate);

      hexCodeInputs.forEach((input) => {
        ['keyup', 'change'].forEach((evt) => {
          input.removeEventListener(evt, handleHexCodeInputChange);
        });
      });
    };
  }, [colorPickers, hexCodeInputs, shareInput]);

  useEffect(() => {
    const updateTheme = () => {
      let hexString;

      switch (event.target.id) {
        case 'aubergine':
          hexString = '#4D394B,#3E313C,#4C9689,#FFFFFF,#3E313C,#FFFFFF,#38978D,#EB4D5C';
          break;
        // Add cases for other themes
      }

      updateShareInput(hexString, event.target.id);
    };

    radioInputs.forEach((radio) => {
      radio.addEventListener('click', updateTheme);
    });

    return () => {
      radioInputs.forEach((radio) => {
        radio.removeEventListener('click', updateTheme);
      });
    };
  }, [radioInputs]);

  const handleColorPickerUpdate = (event) => {
    document.documentElement.style.setProperty(`--${event.target.id}`, event.target.value);
    const hexcodeDiv = document.querySelectorAll(`.main__hexcode[data-color='${event.target.id}']`);

    hexcodeDiv[0].value = event.target.value;
    generateShareString();
  };

  const updateShareInput = (newStr, presetThemeId) => {
    if (!newStr) newStr = '#4D394B,#3E313C,#4C9689,#FFFFFF,#3E313C,#FFFFFF,#38978D,#EB4D5C';

    if (!presetThemeId) presetThemeId = 'aubergine';

    shareInput.value = newStr;
    const evt = new CustomEvent('change');
    shareInput.dispatchEvent(evt);

    localStorage.setItem('slack-demo-theme', newStr);
    if (presetThemeId) {
      document.getElementById(presetThemeId).checked = true;
      localStorage.setItem('slack-demo-theme-id', presetThemeId);
    } else {
      localStorage.removeItem('slack-demo-theme-id');
    }
  };

  const generateShareString = () => {
    let shareArr = [];

    colorPickers.forEach((input) => {
      const colorHex = window.getComputedStyle(document.body).getPropertyValue(`--${input.id}`).trim();
      input.value = colorHex;

      const hexcodeDiv = document.querySelectorAll(`.main__hexcode[data-color='${input.id}']`);

      hexcodeDiv[0].value = colorHex;
      shareArr.push(colorHex);
    });
    const themeStr = shareArr.join(',');

    if (shareInput.value.toUpperCase() !== themeStr.toUpperCase()) updateShareInput(themeStr);
  };

  return <div>{/* Your React component JSX goes here */}</div>;
};

export default SlackThemePicker;
