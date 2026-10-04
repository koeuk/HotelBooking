<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Contact message</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#f6f7fb; margin:0; padding:24px; color:#111;">
    <table role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.06);">
        <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:28px 28px 22px; color:#fff;">
                <p style="margin:0; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; opacity:0.85;">HotelBook · Contact form</p>
                <h1 style="margin:6px 0 0; font-size:22px; line-height:1.3;">{{ $subjectLine }}</h1>
            </td>
        </tr>
        <tr>
            <td style="padding:24px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px; line-height:1.5;">
                    <tr>
                        <td style="padding:6px 0; color:#6b7280; width:80px;">From</td>
                        <td style="padding:6px 0; color:#111;">{{ $senderName }}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px 0; color:#6b7280;">Email</td>
                        <td style="padding:6px 0;"><a href="mailto:{{ $senderEmail }}" style="color:#6366f1; text-decoration:none;">{{ $senderEmail }}</a></td>
                    </tr>
                </table>

                <hr style="border:none; border-top:1px solid #eef0f5; margin:18px 0;">

                <p style="margin:0 0 8px; color:#6b7280; font-size:12px; letter-spacing:0.06em; text-transform:uppercase;">Message</p>
                <div style="background:#f6f7fb; border-radius:12px; padding:16px; white-space:pre-wrap; font-size:14px; line-height:1.6; color:#111;">{{ $body }}</div>

                <p style="margin:24px 0 0; font-size:12px; color:#9ca3af;">
                    Reply directly to this email to respond to {{ $senderName }}.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
