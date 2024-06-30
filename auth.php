<?php
// auth.php
$auth_data = $_GET;
$bot_token = '7283094295:AAGZUTS5n7N0x20kN26W501hcwN8iqZHL7c';

// 데이터 유효성 검증
$check_hash = $auth_data['hash'];
unset($auth_data['hash']);
$data_check_string = '';

foreach ($auth_data as $key => $value) {
    $data_check_string .= "$key=$value\n";
}

$secret_key = hash('sha256', $bot_token, true);
$hash = hash_hmac('sha256', $data_check_string, $secret_key);

if (strcmp($hash, $check_hash) !== 0) {
    die('Data is NOT from Telegram');
}

// 유효한 데이터 처리
$user = json_encode($auth_data);
echo "<script>window.opener.onTelegramAuth($user); window.close();</script>";
?>
