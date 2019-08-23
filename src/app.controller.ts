import { Controller, Get, Post, Res, HttpStatus, Body  } from '@nestjs/common';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';

@Controller()
export class AppController {
  constructor(private botService:BotService) {}

  @Get()
  dialogueHomepage(@Res() res) {
      res.render('index');
  }
  
  @Post()
  startDialogue(@Res() res, @Body() data) {
      this.botService.sendDialogue(data);
      res.status(HttpStatus.OK).send("Posted successfully");
  }
}

/**
 * This controller will ensure that Nest.js maps every '/' route to the index.js file
 */
