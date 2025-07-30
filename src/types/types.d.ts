import '@emailjs/browser';

declare module '@emailjs/browser' {
  interface EmailJSResponse {
    status: number;
    text: string;
  }
}