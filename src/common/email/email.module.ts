import { Module } from "@nestjs/common";
import { MailerModule as NestMilerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";
import { MailerService } from './email.service';

@Module({
    imports:[
        NestMilerModule.forRoot({
            transport:{
                service:"gmail",
                auth:{
                    user:"feruzbegmuxammatov682@gmail.com",
                    pass:"gcwqotxwhecwcqqr"
                }
            },
            defaults:{
                from:`<n25_crm> dilshodolimov@gmail.com`
            },
            template:{
                dir:join(process.cwd(),"template"),
                adapter: new HandlebarsAdapter(),
                options:{
                    strict:true
                }
            }
            
        })
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule{}