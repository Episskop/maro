import React, { useState } from 'react'
import { useLanguage } from '../../components/Language.tsx'
import { sendMessage } from '../../telegram.ts'

interface Answers {
  [key: string]: string | string[] | undefined
}

const PopupQuizMobile = ({ isPopupVisibleQuiz, handlePopupCloseQuiz }) => {
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

  const { language } = useLanguage()
  return (
    <>
      {isPopupVisibleQuiz && (
        <div className='popup-overlay-quiz-mobile'>
          <div className='popup-content-quiz-mobile'>
            <img
              src='/img/close-mobile.svg'
              alt='close-button-overlay-1'
              className='close-button-mobile-1'
              onClick={handlePopupCloseQuiz}
            />
            {showThankYouMessage ? (
              <div className='thank-you-message' >
                <p style={{fontSize:"5.5vw"}}>
                  {language === 'ru'
                    ? 'Спасибо! '
                    : 'Thank you!'}
                </p>
                <p style={{maxWidth:'50vw'}}>
                  {language === 'ru'
                    ? 'Мы свяжемся с Вами в ближайшее время!'
                    : 'We will contact you soon!'}
                </p>
              </div>
            ) : (
              <>
            <p className='popup-overlay-quiz-head-mobile'>
              {language === 'ru'
                ? 'ПРОЙДИТЕ НАШ ОПРОС'
                : 'ANSWER SEVERAL QUESTIONS'}
            </p>
            <p className='popup-overlay-quiz-head-2-mobile'>
              {' '}
              {language === 'ru'
                ? 'чтобы вы получить бесплатную консультацию и скидку на дизайн-проект'
                : 'to get a free consultation and a discount on design project'}
            </p>
            <p className='popup-overlay-quiz-steps-mobile'>
              {currentStep} {language === 'ru' ? 'шаг из' : 'step of'} 4
            </p>
            {currentStep === 1 && (
              <div>
                <p className='popup-overlay-quiz-heading-mobile'>
                  {language === 'ru'
                    ? 'ПО КАКОМУ ВОПРОСУ ВАМ НУЖНА КОНСУЛЬТАЦИЯ?'
                    : 'WHICH QUESTION DO YOU NEED CONSULTATION ON?'}
                </p>
                <label className='radio-mobile'>
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
                  <p>
                    {' '}
                    {language === 'ru' ? 'Дизайн-проект' : 'Design project'}
                  </p>
                </label>
                <label className='radio-mobile'>
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
                  <p>
                    {language === 'ru'
                      ? 'Подбор мебели и предметов интерьера'
                      : 'Furniture and interior item selection'}
                  </p>
                </label>
                <label className='radio-mobile'>
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
                  <p> {language === 'ru' ? 'Кухни' : 'Kitchens'}</p>
                </label>
                <label className='radio-mobile'>
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
                  <p> {language === 'ru' ? 'Другой' : 'Other'}</p>
                </label>
                <input
                  className='input-type-text-mobile'
                  type='text-mobile'
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
                <p className='popup-overlay-quiz-heading-mobile'>
                  {' '}
                  {language === 'ru' ? 'ТИП ОБЪЕКТА' : 'TYPE OF OBJECT'}
                </p>
                <label className='radio-mobile'>
                  <input
                    type='radio'
                    name='type'
                    value='Квартира'
                    checked={
                      (answers['type'] as string[])?.includes('Квартира') ||
                      false
                    }
                    onChange={handleCheckboxChange}
                  />
                  <p>{language === 'ru' ? 'Квартира' : 'Apartment'}</p>
                </label>
                <label className='radio-mobile'>
                  <input
                    type='radio'
                    name='type'
                    value='Дом'
                    checked={
                      (answers['type'] as string[])?.includes('Дом') || false
                    }
                    onChange={handleCheckboxChange}
                  />
                  <p>{language === 'ru' ? 'Дом' : 'House'}</p>
                </label>
                <label className='radio-mobile'>
                  <input
                    type='radio'
                    name='type'
                    value='Коммерческое (ресторан, магазин, офис и пр.)'
                    checked={
                      (answers['type'] as string[])?.includes('type') || false
                    }
                    onChange={handleCheckboxChange}
                  />
                  <p>
                    {language === 'ru'
                      ? 'Коммерческое (ресторан, магазин, офис и пр.)'
                      : 'Commercial (restaurant, shop, office, etc.)'}
                  </p>
                </label>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <p className='popup-overlay-quiz-heading-mobile'>
                  {language === 'ru'
                    ? 'НА КАКОМ ЭТАПЕ НАХОДИТСЯ ВАШ ПРОЕКТ?'
                    : 'AT WHAT STAGE IS YOUR PROJECT?'}
                </p>
                <label className='radio-mobile'>
                  <input
                    type='radio'
                    name='step'
                    value='Строится'
                    checked={
                      (answers['step'] as string[])?.includes('Строится') ||
                      false
                    }
                    onChange={handleCheckboxChange}
                  />
                  <p>{language === 'ru' ? 'Строится' : 'Under construction'}</p>
                </label>
                <label className='radio-mobile'>
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
                  <p>
                    {' '}
                    {language === 'ru'
                      ? 'Готов, но без отделки'
                      : 'Finished, but without finishing'}
                  </p>
                </label>
                <label className='radio-mobile'>
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
                  <p>
                    {' '}
                    {language === 'ru'
                      ? 'Полностью готов (с отделкой)'
                      : 'Completely finished (with finishing)'}
                  </p>
                </label>
                <label className='radio-mobile'>
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
                  <p>
                    {language === 'ru'
                      ? 'Готов, отделка есть, нужны небольшие изменения'
                      : 'Finished, there is finishing, small changes needed'}
                  </p>
                </label>
                <label className='radio-mobile'>
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
                  <p>
                    {language === 'ru' ? 'Другое (указать)' : 'Other (specify)'}
                  </p>
                </label>
                <input
                  className='input-type-text-mobile'
                  type='text-mobile'
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
                <p className='popup-overlay-quiz-heading-mobile'>
                  {language === 'ru'
                    ? 'ОСТАВЬТЕ СВОИ КОНТАКТНЫЕ ДАННЫЕ ДЛЯ ПОЛУЧЕНИЯ БЕСПЛАТНОЙ КОНСУЛЬТАЦИИ И ПРЕДВАРИТЕЛЬНОГО РАСЧЁТА:'
                    : 'LEAVE YOUR CONTACT INFORMATION FOR A FREE CONSULTATION AND PRELIMINARY CALCULATION:'}
                </p>
                <div className='popup-overlay-quiz-heading-inputs-mobile'>
                  <div>
                    <p className='popup-overlay-quiz-input-text-mobile'>
                      {language === 'ru' ? 'Ваше имя' : 'Your name'}
                    </p>
                    <input
                      type='text-mobile'
                      name='name'
                      value={answers['name'] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <p className='popup-overlay-quiz-input-text-mobile'>
                      {language === 'ru' ? 'Ваша почта' : 'Your email'}
                    </p>
                    <input
                      type='text-mobile'
                      name='email'
                      placeholder=''
                      value={answers['email'] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <p className='popup-overlay-quiz-input-text-mobile'>
                      {language === 'ru' ? 'Ваш телефон' : 'Your phone'}
                    </p>
                    <input
                      type='text-mobile'
                      name='phone'
                      value={answers['phone'] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 ? (
              <>
                <button
                  onClick={handlePrevStep}
                  className='quiz-button-back-1-mobile'
                >
                  {language === 'ru' ? 'Назад' : 'Back'}
                </button>
                <button
                  onClick={handleSubmit}
                  className='quiz-button-send-mobile'
                >
                  {language === 'ru' ? 'Отправить' : 'Send'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`quiz-button-back-mobile mobile${currentStep}`}
                >
                  {language === 'ru' ? 'Назад' : 'Back'}
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStep === 4}
                  className='quiz-button-mobile'
                >
                  {language === 'ru' ? 'Далее' : 'Next'}
                </button>
              </>
            )}
             </>
            )}
          </div>
          <div
            className='popup-overlay-mobile'
            onClick={handlePopupCloseQuiz}
          ></div>
        </div>
      )}
    </>
  )
}

export default PopupQuizMobile
