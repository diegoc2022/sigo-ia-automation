import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService { 

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';  
  tempWords='';
 

  constructor() { }  


  init() {    
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript.toLowerCase();
      //console.log("Transcript: ", transcript);        
    });
    
  }

  
  start() {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();    
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {       
        this.wordConcat();
        this.recognition.start();
      }      
    });
  }

  
  stop() {
    this.text = '';
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();   
    //console.log("End speech recognition")
  }
 
  wordConcat() {
    this.text = this.text + '' + this.tempWords + ''; 
    this.tempWords = ''; 
  }

 
}
