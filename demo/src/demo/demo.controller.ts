import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Controller('demo')
export class DemoController {
    @Get('code')
    createCode(@Req() req, @Res() res) {
         const Captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#cc9900',
         });
         req.session.code = Captcha.text; // 直接从 req 对象获取 session
         res.type('image/svg+xml');
         res.send(Captcha.data);
    }

    @Post('login')
    login(@Body() body, @Req() req) {
        if (body.code === req.session.code) { // 同样地，从 req 获取 session
            return {
                code: 200,
            };
        } else {
            return {
                code: 400,
            };
        }
    }
}