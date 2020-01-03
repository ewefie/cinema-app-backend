const createBookingMessage = (booking) => {
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title>${booking.customer.name}, confirm your showtime booking!</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
    
        <style>
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                background: #f1f1f1;
            }
    
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
    
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }
    
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
    
            a {
                text-decoration: none;
            }
    
            *[x-apple-data-detectors],
            .unstyle-auto-detected-links *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                u~div .email-container {
                    min-width: 320px !important;
                }
            }
    
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                u~div .email-container {
                    min-width: 375px !important;
                }
            }
    
            @media only screen and (min-device-width: 414px) {
                u~div .email-container {
                    min-width: 414px !important;
                }
            }
    
            .btn {
                padding: 5px 15px;
                display: inline-block;
            }
    
            .btn.btn-primary {
                border-radius: 30px;
                background: #448ef6;
                color: #ffffff;
            }
    
            body {
                font-family: 'Work Sans', sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 1.8;
                color: rgba(0, 0, 0, .4);
            }
    
            a {
                color: #448ef6;
            }
    
            .logo h1 {
                margin: 0;
            }
    
            .logo h1 a {
                color: #000000;
                font-size: 20px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: 'Poppins', sans-serif;
            }
    
            .hero {
                position: relative;
                z-index: 0;
            }
    
            .hero .overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: '';
                width: 100%;
                background: #000000;
                z-index: -1;
                opacity: .3;
            }
    
            .hero .text {
                color: rgba(255, 255, 255, .9);
            }
    
            .hero .text h2 {
                color: #fff;
                font-size: 50px;
                margin-bottom: 0;
                font-weight: 300;
                line-height: 1;
                margin-top: 0;
            }
    
            .hero .text h2 span {
                font-weight: 600;
                color: #448ef6;
            }
        </style>
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
            <div
                style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
    
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                    style="margin: auto;">
                    <tr>
                        <td valign="top" style="padding: 1em 2.5em;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <div class="logo" style="text-align: center;">
                                        <h1><a href="#">All cinemas in one place</a></h1>
                                    </div>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" class="hero" style="height: 400px;">
                            <div class="overlay"></div>
                            <table>
                                <tr>
                                    <td>
                                        <div class="text" style="padding: 0 4em; text-align: center;">
                                            <h2>Hi ${booking.customer.name}!</h2>
                                            <p>We got your showtime reservation!</p>
                                            <p>To confirm booking please make payment via our completle non-suspicious
                                                website ^^</p>
                                            <p><a href="#" class="btn btn-primary">Gib us money - add link to uur website</a></p>
                                            <p>If it wasn't you, just ignore this email.</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>
    
    </html>`;
}
const createConfirmationMessage = (booking) => {
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title>${booking.customer.name}, your booking is confirmed!</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
    
        <style>
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                background: #f1f1f1;
            }
    
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
    
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }
    
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
    
            a {
                text-decoration: none;
            }
    
            *[x-apple-data-detectors],
            .unstyle-auto-detected-links *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                u~div .email-container {
                    min-width: 320px !important;
                }
            }
    
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                u~div .email-container {
                    min-width: 375px !important;
                }
            }
    
            @media only screen and (min-device-width: 414px) {
                u~div .email-container {
                    min-width: 414px !important;
                }
            }
    
            .bg_white {
                background: #ffffff;
            }
    
            .btn {
                padding: 5px 15px;
                display: inline-block;
            }
    
            .btn.btn-primary {
                border-radius: 30px;
                background: #448ef6;
                color: #ffffff;
            }
    
            body {
                font-family: 'Work Sans', sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 1.8;
                color: rgba(0, 0, 0, .4);
            }
    
            a {
                color: #448ef6;
            }
    
            .logo h1 {
                margin: 0;
            }
    
            .logo h1 a {
                color: #000000;
                font-size: 20px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: 'Poppins', sans-serif;
            }
    
            .hero {
                position: relative;
                z-index: 0;
            }
    
            .hero .overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: '';
                width: 100%;
                background: #000000;
                z-index: -1;
                opacity: .3;
            }
    
            .hero .text {
                color: rgba(255, 255, 255, .9);
            }
    
            .hero .text h2 {
                color: #fff;
                font-size: 50px;
                margin-bottom: 0;
                font-weight: 300;
                line-height: 1;
                margin-top: 0;
            }
    
            .hero .text h2 span {
                font-weight: 600;
                color: #448ef6;
            }
        </style>
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
        <center style="width: 100%; background-color: #f1f1f1;">
            <div
                style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
    
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                    style="margin: auto;">
                    <tr>
                        <td valign="top" style="padding: 1em 2.5em;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <div class="logo" style="text-align: center;">
                                        <h1><a href="#">All cinemas in one place</a></h1>
                                    </div>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" class="hero" style="height: 400px;">
                            <div class="overlay"></div>
                            <table>
                                <tr>
                                    <td>
                                        <div class="text" style="padding: 0 4em; text-align: center;">
                                            <h2>Hi ${booking.customer.name}!</h2>
                                            <p>Your payment is confirmed!</p>
                                            <p><a href="#" class="btn btn-primary">Check booking details</a></p>
                                            <p>If it wasn't you, just ignore this email.</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>
    
    </html>`;
}

exports.createBookingMessage = createBookingMessage;
exports.createConfirmationMessage = createConfirmationMessage;