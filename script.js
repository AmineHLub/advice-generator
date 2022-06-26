const adviceIdTag = document.querySelector('.advice-tag-id')
const adviceText = document.querySelector('.advice-paragraph')

const fetchAdvice = async () => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip;
  }
  catch {
    return 'Error';
  }
}

const createNewAdvice = () => {
  adviceText.style.display = 'none';
  adviceText.parentElement.classList.add('loading-for-adv')
  setTimeout( async () => {
    const newAdvice = await fetchAdvice();
    if (newAdvice !== 'Error') {
      adviceIdTag.innerText = `Advice #${newAdvice.id}`
      adviceText.innerText = newAdvice.advice;
      adviceText.parentElement.classList.remove('loading-for-adv')
      adviceText.style.display = 'block';
    } else {
      adviceText.innerText = 'Error';
      adviceText.parentElement.classList.remove('loading-for-adv')
      adviceText.style.display = 'block';
    }
  }, 900);
}

document.querySelector('.reroll-container').addEventListener('click', createNewAdvice);