<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../phpmailerlib/Exception.php';
require '../phpmailerlib/PHPMailer.php';
require '../phpmailerlib/SMTP.php';

// Check if the form is submitted by checking required fields
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
    // Recipient email address (your email)
    $to = "brandon.helm@strategicpivot.com"; // Replace with your email address
    
    // Collect form data
    $name = $_POST['name'];
    $from = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    $mail = new PHPMailer(true);

    // Server settings; With this method, you will need to set up an email account and SMTP server to send emails from. I used Gmail's SMTP server for this example, but you can use any email service that provides SMTP access.
    // NOTE: If you use Gmail's SMTP server, you will need to set up an App Password in your Google Account settings and use that as the SMTP password. Regular Gmail passwords will not work due to Google's security measures.
    // NOTE: The "from" email address you set in the setFrom() method below must match the email address you set up in your Google Cloud Console for the SMTP credentials. If they don't match, Gmail's SMTP server will reject the email.
    // NOTE: If you want to use a different email service, you will need to update the Host, Username, Password, SMTPSecure, and Port settings accordingly based on your email provider's SMTP configuration.
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'brandonhelm0x38@gmail.com'; // Replace with your SMTP username; This will be the from email address you set up in your Google Cloud Console
    $mail->Password = 'wnxq rniw rdnn fcnl'; // Replace with your SMTP password; This is your Google APP Password, not your regular Gmail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // Replace with your SMTP port

    // Recipients
    // NOTE: I think that the From address will automatically be overriden by the SMTP server to match the email address associated with the SMTP credentials (the email address you set up in your Google Cloud Console). However, I set the From address here to include the sender's name for better formatting in the email body. The Reply-To header will ensure that when you click "Reply" in your email client, it will reply to the sender's email address from the form.
    $mail->setFrom('brandonhelm0x38@gmail.com', 'FROM: '.$name); // In my outlook, this makes the senders name appear right below the subject line in the email body, and the email address appear in the Reply-To field when I click "Reply" in my email client. This is a workaround to make the sender's name more visible in the email body since Gmail's SMTP server will override the From address to match the email address associated with the SMTP credentials.
    $mail->addReplyTo($from); // Set the Reply-To header to the sender's email address from the form, so that when you click "Reply" in your email client, it will reply to the sender's email address instead of the SMTP credentials email address.
    $mail->addAddress($to); // Add a recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = "PORTFOLIO SITE MSG FROM: ".$name;
    $mail->Body    = "
    <html>
    <body>
    <p><strong>From:</strong> {$name}</p>
    <p><strong>Email:</strong> {$from}</p>
    <p><strong>Phone:</strong> {$phone}</p>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
    </body>
    </html>
    ";

    $success = $mail->send();

    if ($success) {
        header("Location: ../thank-you.html");
        exit();
    } else {
        echo "<p>There was a problem sending your message. See the below error report for details...</p>";
        echo "<p>{$mail->ErrorInfo}</p>";
        // header removed so user can see the echo message
        exit();
    }
}
else {
    // header removed so user can see the echo message
    echo "<p>If you're seeing this message, your post request was not received properly.</p>";
    exit();
}

?>