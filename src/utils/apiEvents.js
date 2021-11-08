import EventEmitter from 'events';

export const dispatcher = new EventEmitter();

export const API_EVENTS = {
  ERROR : 'API_ERROR'
};