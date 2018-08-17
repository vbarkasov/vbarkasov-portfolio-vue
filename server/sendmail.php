<?php
$mail_address = '';
$mail_subject = 'Email from site ' . $_SERVER['SERVER_NAME'];
$mail_text = '';
$recaptcha_secret = '';

function add_to_mail_text($title, $value){
    global $mail_text;
    $mail_text .= $title.': '.nl2br(htmlspecialchars(trim($value))).'<br>';
}

$inputs = array(
    array('name', 'Name'),
    array('email', 'Email'),
    array('message', 'Message'),
);

foreach ($inputs as $input){
    if(isset($_POST[$input[0]])){
        add_to_mail_text($input[1], $_POST[$input[0]]);
    }
}

$attachment = '';

if (!empty($_FILES['file']['tmp_name'])) {
    $path = $_FILES['file']['name'];
    if (copy($_FILES['file']['tmp_name'], $path)) $attachment = $path;
}

function send(){
    global $mail_address, $mail_subject, $mail_text, $redirect, $mail, $attachment;
    if(empty($attachment)){
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= 'From: no-reply@'.$_SERVER['SERVER_NAME']."\r\n";
        $multipart = $mail_text;
    } else {
        $boundary = "--".md5(uniqid(time()));
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";
        $headers .= 'From: no-reply@'.$_SERVER['SERVER_NAME']."\r\n";
        $multipart = "--$boundary\r\n";
        $multipart .= "Content-type: text/html; charset=utf-8\r\n";
        $multipart .= "Content-Transfer-Encoding: base64\r\n";
        $multipart .= "\r\n";
        $multipart .= chunk_split(base64_encode($mail_text));
        $fp = fopen($attachment,"r");
        $file = fread($fp, filesize($attachment));
        fclose($fp);
        $message_part = "\r\n--$boundary\r\n";
        $message_part .= "Content-Type: application/octet-stream; name=\"$attachment\"\r\n";
        $message_part .= "Content-Transfer-Encoding: base64\r\n";
        $message_part .= "Content-Disposition: attachment; filename=\"$attachment\"\r\n";
        $message_part .= "\r\n";
        $message_part .= chunk_split(base64_encode($file));
        $message_part .= "\r\n--$boundary--\r\n";
        $multipart .= $message_part;
    }
    $mail = mail($mail_address, $mail_subject, $multipart, $headers);
    if(!empty($attachment)){
        if (time_nanosleep(0, 500000000)) {
            unlink($attachment);
        }
    }

    $is_ajax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    if($is_ajax){
        header($_SERVER['SERVER_PROTOCOL'].' 200 OK');
        if($mail){
            echo json_encode(array("status" => "success"));
        }else{
            echo json_encode(array("status" => "error"));
        }
    } else {
        $redirect_url = isset($_POST['redirect']) ? $_POST['redirect'] : $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER['SERVER_NAME'];
        header('Location: '.$redirect_url);
    }
}

//recaptcha
if(isset($_POST['g-recaptcha-response'])) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $params = array(
        'secret' => $recaptcha_secret,
        'response' => $_POST['g-recaptcha-response'],
    );
    $result_str = file_get_contents($url, false, stream_context_create(array(
        'http' => array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => http_build_query($params)
        )
    )));

    if($result_str){
        $result = json_decode($result_str);
        if($result->success){
            send();
        }
    } else {
        echo json_encode(array("status" => "error"));
    }
}
