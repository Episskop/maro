import React, { useState } from 'react'
import { useLanguage } from '../../components/Language.tsx'
import { sendMessage } from '../../telegram.ts';

interface Answers {
  [key: string]: string | string[] | undefined
}

const PopupQuiz = ({ isPopupVisibleQuiz, handlePopupCloseQuiz }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setAnswers((prevAnswers) => {
      const currentValues = prevAnswers[name]

      if (checked) {
        if (Array.isArray(currentValues)) {
          return { ...prevAnswers, [name]: [...currentValues, value] }
        } else {
          return { ...prevAnswers, [name]: [value] }
        }
      } else {
        if (Array.isArray(currentValues)) {
          return {
            ...prevAnswers,
            [name]: currentValues.filter(
              (selectedValue) => selectedValue !== value
            ),
          }
        } else {
          return { ...prevAnswers, [name]: [] }
        }
      }
    })
  }
  const { language } = useLanguage()
  const formatAnswers = (answers) => {
    let formattedString = '';
  
    const keyMap = {
      question: 'Шаг 1',
      question1: 'Шаг 1',
      question3: 'Шаг 3',
      type: 'Шаг 2',
      step: 'Шаг 3'
    };
  
    for (const [key, value] of Object.entries(answers)) {
      const newKey = keyMap[key] || key;  
      if (Array.isArray(value)) {
        formattedString += `${newKey}: ${value.join(', ')}\n`;
      } else {
        formattedString += `${newKey}: ${value}\n`;
      }
      formattedString += '***\n'; 
    }
  
    return formattedString;
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
       const mes = formatAnswers(answers)
      await sendMessage(mes)
    } catch (e){
      console.log(e)
    }
    console.log(formatAnswers(answers))
    setShowThankYouMessage(true);
  };

  return (
    <>
      {isPopupVisibleQuiz && (
        <div className='popup-overlay-quiz'>
          <div className='popup-content-quiz'>
            <img
              src='/img/close-button.png'
              alt='close-button-overlay'
              className='close-button'
              onClick={handlePopupCloseQuiz}
            />
            {showThankYouMessage ? (
              <div className='thank-you-message' >
              <p style={{fontSize:"5.5vw"}}>
                {language === 'ru'
                  ? 'Спасибо! '
                  : 'Thank you!'}
              </p>
              <p>
                {language === 'ru'
                  ? 'Мы свяжемся с Вами в ближайшее время!'
                  : 'We will contact you soon!'}
              </p>
            </div>
            ) : (
              <>
                <p className='popup-overlay-quiz-head'>
                  {language === 'ru' ? 'ПРОЙДИТЕ НАШ ОПРОС' : 'ANSWER SEVERAL QUESTIONS'}
                </p>
                <p className='popup-overlay-quiz-head-2'>
                  {language === 'ru'
                    ? 'чтобы вы получить бесплатную консультацию и скидку на дизайн-проект'
                    : 'to get a free consultation and a discount on design project'}
                </p>
                <p className='popup-overlay-quiz-steps'>
                  {currentStep} {language === 'ru' ? 'шаг из' : 'step of'} 4
                </p>
                {currentStep === 1 && (
                  <div>
                    <p className='popup-overlay-quiz-heading'>
                      {language === 'ru' ? 'ПО КАКОМУ ВОПРОСУ ВАМ НУЖНА КОНСУЛЬТАЦИЯ?' : 'WHICH QUESTION DO YOU NEED CONSULTATION ON?'}
                    </p>
                    <label>
                  <input
                    type='radio'
                    name='question'
                    value='Дизайн-проект'
                    checked={
                      (answers['question'] as string[])?.includes(
                        'Дизайн-проект'
                      ) || false
                    }
                    onChange={handleCheckboxChange}
                  />
                  {language === 'ru' ? 'Дизайн-проект' : 'Design project'}
                </label>
                <label>
                  <input
                    type='radio'
                    name='question'
                    value='Подбор мебели и предметов интерьера'
                    checked={
                      (answers['question'] as string[])?.includes(
                        'Подбор мебели и предметов интерьера'
                      ) || false
                    }
                    onChange={handleCheckboxChange}
                  />
                  {language === 'ru'
                    ? 'Подбор мебели и предметов интерьера'
                    : 'Furniture and interior item selection'}
                </label>
                <label>
                  <input
                    type='radio'
                    name='question'
                    value='Кухни'
                    checked={
                      (answers['question'] as string[])?.includes('Кухни') ||
                      false
                    }
                    onChange={handleCheckboxChange}
                  />
                  {language === 'ru' ? 'Кухни' : 'Kitchens'}
                </label>
                <label>
                  <input
                    type='radio'
                    name='question'
                    value='Другой'
                    checked={
                      (answers['question'] as string[])?.includes('Другой') ||
                      false
                    }
                    onChange={handleCheckboxChange}
                  />
                  {language === 'ru' ? 'Другой' : 'Other'}
                </label>
                <input
                  type='text'
                  name='question1'
                  placeholder={language === 'ru' ? 'Ваш ответ' : 'Your answer'}
                  value={(answers['question1'] as string) || ''}
                  onChange={(e) =>
                    setAnswers({ ...answers, question1: e.target.value })
                  }
                />
              </div>
                )}
                {currentStep === 2 && (
                    <div>
                    <p className='popup-overlay-quiz-heading'>
                      {language === 'ru' ? 'ТИП ОБЪЕКТА' : 'TYPE OF OBJECT'}
                    </p>
                    <label>
                      <input
                        type='radio'
                        name='type'
                        value='Квартира'
                        checked={
                          (answers['type'] || []).includes('Квартира')
                        }
                        onChange={handleCheckboxChange}
                      />
                      {language === 'ru' ? 'Квартира' : 'Apartment'}
                    </label>
                    <label>
                      <input
                        type='radio'
                        name='type'
                        value='Дом'
                        checked={
                          (answers['type'] || []).includes('Дом')
                        }
                        onChange={handleCheckboxChange}
                      />
                      {language === 'ru' ? 'Дом' : 'House'}
                    </label>
                    <label>
                      <input
                        type='radio'
                        name='type'
                        value='Коммерческое'
                        checked={
                          (answers['type'] || []).includes('Коммерческое')
                        }
                        onChange={handleCheckboxChange}
                      />
                      {language === 'ru'
                        ? 'Коммерческое (ресторан, магазин, офис и пр.)'
                        : 'Commercial (restaurant, shop, office, etc.)'}
                    </label>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                  <p className='popup-overlay-quiz-heading'>
                    {language === 'ru'
                      ? 'НА КАКОМ ЭТАПЕ НАХОДИТСЯ ВАШ ПРОЕКТ?'
                      : 'AT WHAT STAGE IS YOUR PROJECT?'}
                  </p>
                  <label>
                    <input
                      type='radio'
                      name='step'
                      value={
                        language === 'ru' ? 'Строится' : 'Under construction'
                      }
                      checked={
                        (answers['step'] as string[])?.includes(
                          language === 'ru' ? 'Строится' : 'Under construction'
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                    {language === 'ru' ? 'Строится' : 'Under construction'}
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='step'
                      value={
                        language === 'ru'
                          ? 'Готов, но без отделки'
                          : 'Finished, but without finishing'
                      }
                      checked={
                        (answers['step'] as string[])?.includes(
                          language === 'ru'
                            ? 'Готов, но без отделки'
                            : 'Finished, but without finishing'
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                    {language === 'ru'
                      ? 'Готов, но без отделки'
                      : 'Finished, but without finishing'}
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='step'
                      value={
                        language === 'ru'
                          ? 'Полностью готов (с отделкой)'
                          : 'Completely finished (with finishing)'
                      }
                      checked={
                        (answers['step'] as string[])?.includes(
                          language === 'ru'
                            ? 'Полностью готов (с отделкой)'
                            : 'Completely finished (with finishing)'
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                    {language === 'ru'
                      ? 'Полностью готов (с отделкой)'
                      : 'Completely finished (with finishing)'}
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='step'
                      value={
                        language === 'ru'
                          ? 'Готов, отделка есть, нужны небольшие изменения'
                          : 'Finished, there is finishing, small changes needed'
                      }
                      checked={
                        (answers['step'] as string[])?.includes(
                          language === 'ru'
                            ? 'Готов, отделка есть, нужны небольшие изменения'
                            : 'Finished, there is finishing, small changes needed'
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                    {language === 'ru'
                      ? 'Готов, отделка есть, нужны небольшие изменения'
                      : 'Finished, there is finishing, small changes needed'}
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='step'
                      value={language === 'ru' ? 'Другое' : 'Other'}
                      checked={
                        (answers['step'] as string[])?.includes(
                          language === 'ru' ? 'Другое' : 'Other'
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                    {language === 'ru' ? 'Другое (указать)' : 'Other (specify)'}
                  </label>
                  <input
                    type='text'
                    name='question3'
                    placeholder={language === 'ru' ? 'Ваш ответ' : 'Your answer'}
                    value={answers['question3'] || ''}
                    onChange={(e) =>
                      setAnswers({ ...answers, question3: e.target.value })
                    }
                  />
                </div>
                )}
                {currentStep === 4 && (
                   <div>
                   <p className='popup-overlay-quiz-heading'>
                     {language === 'ru'
                       ? 'ОСТАВЬТЕ СВОИ КОНТАКТНЫЕ ДАННЫЕ ДЛЯ ПОЛУЧЕНИЯ БЕСПЛАТНОЙ КОНСУЛЬТАЦИИ И ПРЕДВАРИТЕЛЬНОГО РАСЧЁТА:'
                       : 'LEAVE YOUR CONTACT INFORMATION FOR A FREE CONSULTATION AND PRELIMINARY CALCULATION:'}
                   </p>
                   <div className='popup-overlay-quiz-heading-inputs'>
                     <div>
                       <p className='popup-overlay-quiz-input-text'>
                         {language === 'ru' ? 'Ваше имя' : 'Your name'}
                       </p>
                       <input
                         type='name'
                         name='name'
                         value={answers['name'] || ''}
                         onChange={(e) =>
                           setAnswers({ ...answers, name: e.target.value })
                         }
                       />
                     </div>
                     <div>
                       <p className='popup-overlay-quiz-input-text'>
                         {language === 'ru' ? 'Ваша почта' : 'Your email'}
                       </p>
                       <input
                         type='email'
                         name='email'
                         placeholder=''
                         value={answers['email'] || ''}
                         onChange={(e) =>
                           setAnswers({ ...answers, email: e.target.value })
                         }
                       />
                     </div>
                     <div>
                       <p className='popup-overlay-quiz-input-text'>
                         {language === 'ru' ? 'Ваш телефон' : 'Your phone'}
                       </p>
                       <input
                         type='number'
                         name='number'
                         value={answers['number'] || ''}
                         onChange={(e) =>
                           setAnswers({ ...answers, number: e.target.value })
                         }
                       />
                     </div>
                   </div>
                 </div>
                )}
                {currentStep === 4 ? (
                  <>
                    <button onClick={handlePrevStep} className='quiz-button-back-1'>
                      {language === 'ru' ? 'Назад' : 'Back'}
                    </button>
                    <button onClick={handleSubmit} className='quiz-button-send'>
                      {language === 'ru' ? 'Отправить' : 'Send'}
                    </button>
                  </>
                ) : (
                  <>
                    {currentStep !== 1 && (
                      <button onClick={handlePrevStep} className='quiz-button-back'>
                        {language === 'ru' ? 'Назад' : 'Back'}
                      </button>
                    )}
                    <button onClick={handleNextStep} className='quiz-button'>
                      {language === 'ru' ? 'Далее' : 'Next'}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className='popup-overlay' onClick={handlePopupCloseQuiz}></div>
        </div>
      )}
    </>
  );
};

export default PopupQuiz
