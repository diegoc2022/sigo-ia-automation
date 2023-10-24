import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognition2Service {
  recognition: any;
  isStoppedSpeechRecog = false;
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private speakingPaused: Subject<any> = new Subject();
  private tempWords: string = '';

  constructor() { }

  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }

  init() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.voiceToTextSubject.next(this.text || transcript);

    });
    return this.initListeners();
  }

  initListeners() {
    this.recognition.addEventListener('end', (condition: any) => {
      this.recognition.stop();
    });
    return this.speakingPaused.asObservable();
  }

  start() {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('result', (e:any) => {
      console.log("Result: ",e.results);
      
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log("Transcript: ", transcript);
            
       /*        
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();        
        if (!this.recognition.lastActiveTime || (Date.now() - this.recognition.lastActive) > 300) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
        
      }
      this.voiceToTextSubject.next(this.text);
      */
    });
  }

  stop() {
    this.text = '';
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    this.recognition.isActive = false;
    this.speakingPaused.next('Stopped speaking');
  }

  wordConcat() {
    this.text = this.text.trim() + ' ' + this.tempWords;
    this.text = this.text.trim();
    this.tempWords = '';
  }

  funcRetornaTexto(){
    return this.speechInput;
  }

}
