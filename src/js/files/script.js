// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

document.addEventListener("DOMContentLoaded", () => {
  // Анимация букв на главном экране

  function wrappingLettersInSpans() {
    const word = document.querySelector('[data-word]'),
                wordArr = word.innerHTML.split('');

    word.innerHTML = '';

    wordArr.forEach(letter => {
      const span = document.createElement('span');
      span.innerText = letter;
      word.insertAdjacentElement("beforeend", span);
    });
  }
  wrappingLettersInSpans();

  let countAnim = 0;

  function animLetters() {
    const word = document.querySelector('[data-word]'),
          letters = word.querySelectorAll('span');  

    if (countAnim < letters.length) {
      try {
        letters[countAnim].classList.add('anim');
        letters[countAnim - 1].classList.remove('anim');
        countAnim++;
      } catch {
        countAnim++;
        console.error('Error');
      }
    } else if (letters.length === countAnim) {
      letters[countAnim - 1].classList.remove('anim');
      letters[0].classList.add('anim');
      countAnim = 1;
    }
  }
  setInterval(animLetters, 300);

  //========================================================================================================================================================
  // Отрисовка линии в why секции

  function getLineHeight() {
    const items = document.querySelectorAll('.item-why'),
          lines = document.querySelectorAll('.item-why__line-main');

    items.forEach((item, i) => {
      const currHeight = ((item.getBoundingClientRect().height / 2) - 45);
      let nextHeight = 0;

      if (item.nextElementSibling) {
        nextHeight = item.getBoundingClientRect().height / 2;
      }

      const summ = currHeight + nextHeight + 90;
      lines[i].style.height = `${summ}px`;

    });

  }

  getLineHeight();

//========================================================================================================================================================
  // Добавление класса триугольника к select

  function addTriangleToSelect(e) {
    const options = document.querySelectorAll('.select__option');
    options.forEach(item => {
      item.addEventListener("click", e => setTimeout( () => addTriangleToSelect(e), 50));
    });

    const currSelect = document.querySelectorAll('[data-triangle]');

    currSelect.forEach(select => {
      select.nextElementSibling.querySelector('.select__title').classList.add(select.dataset.triangle);
    
      if (select.closest('.form__column_phone')) {
        try {
          changePhone('.form__column_phone input', e.target.closest('.select__option').dataset.value);
        } catch {
          console.error('Error');
        }
      }
    });
  }
  addTriangleToSelect();

  function changePhone(inputClass, value) {
    const input = document.querySelector(inputClass);

    if (value === 'ukr') {
      input.setAttribute('placeholder', '(+380) 000000000');
    }
    if (value === 'usa') {
      input.setAttribute('placeholder', '(+1) 000000000');
    }
    if (value === 'gb') {
      input.setAttribute('placeholder', '(+44) 000000000');
    }
  }

//========================================================================================================================================================
//Включение попапа спустя 5 секунд

setTimeout(() => {
  if (flsModules.popup) {
    flsModules.popup.open('#popup');
  }
}, 4000);

});