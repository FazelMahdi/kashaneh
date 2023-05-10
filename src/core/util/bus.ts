import mitt, { EventType } from 'mitt';

export interface ToastEvent {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
}

export type Locale = 'fa' | 'fa-IR' | 'en' | 'en-US';
export interface Events extends Record<EventType, unknown> {
  toast: ToastEvent;
  lang: Locale;
  'set-lang': Locale;
}

export const bus = mitt<Events>();

export type { Emitter } from 'mitt';
