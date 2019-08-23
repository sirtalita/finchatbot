import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BotService {

    private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
    private token: string = "13fd4352ad754a42b6e8e6b8b2d1b442";

    sendDialogue(info) {

        let data = {
            query : info.message,
            lang: 'en',
            sessionId: '123456789!@#$%'
        }
        axios.post(`${this.baseURL}`, data, {headers: { Authorization: `Bearer ${this.token}` }})
        .then( response => {
            this.postToPusher(response.data.result.fulfillment.speech, data.query);
        })    
    }

    postToPusher(speech, query) {
        const Pusher = require('pusher');

        var pusher = new Pusher({
            appId: '848358',
            key: '7694ae9785ee526b3fa1',
            secret: '04826d565807c48a1c35',
            cluster: 'ap2',
            useTLS: true
        });
        const response = {
            query: query,
            speech: speech
        }

        pusher.trigger('bot', 'bot-response', response);
    }
}