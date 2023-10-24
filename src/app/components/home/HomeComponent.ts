import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './services/home.service';
import { VoiceRecognitionService } from './services/voice-recognition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  message: boolean = true; 
  table:boolean=false; 
  form = new FormGroup({
    msg: new FormControl(),
  });

 

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private homeService: HomeService,
    public voiceRecognition: VoiceRecognitionService
  ) {
    this.voiceRecognition.init(); 
  }

  ngOnInit(): void {
      
  }

  funcGetMessage() {
    console.log("Message: ", this.voiceRecognition.text);
    if (this.form.value.msg != '') {
      this.loading = true;
      this.homeService.func_retorna_textos(this.form.value).subscribe(resp => {
        if (resp) {
          setTimeout(() => {
            this.toastr.info('Estamos procesando su mensaje', 'Info:');
            this.table = true;
            this.form.controls.msg.setValue('');
            this.loading = false;
          }, 2000);
          return;
        }
      });
      this.message = false;
    }

  }

  
  
  startRecording() {
    this.voiceRecognition.start();
    this.form.controls.msg.reset();
  }

  stopRecording() {
    this.voiceRecognition.stop();
    this.funcGetMessage();       
  }

  funcClear() {
    this.voiceRecognition.stop();    
    this.voiceRecognition.text = '';
    this.table = false;     
    //this.form.controls.msg.setValue('');
  }

 
}
