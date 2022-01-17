export const regEmailLogin = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  export const REG_STREET = /^[а-яА-Я0-9_\-]+$/iu; 

  export const REG_PASSWORD  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  export const REG_CYRILLIC =  /^[^а-яё]+$/iu;

  export const REG_HOUSE = /[0-9абвгде]+$/

  export const LAT_CYR = /^([а-яё\s]+|[a-z\s]+)$/;

  export const ISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

  export const BOOK_TITLE = /^[а-яА-ЯёЁa-zA-Z0-9]|[".!?\\-]+$/

  export const BUILDING = /^[а-яА-ЯёЁ]?(?:[0-9]{1,2})?$/