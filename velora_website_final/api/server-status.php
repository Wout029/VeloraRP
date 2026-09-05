<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$urls = [
  'https://frontend.cfx-services.net/api/servers/single/3ygare8',
  'https://servers-frontend.fivem.net/api/servers/single/3ygare8'
];
foreach ($urls as $url) {
  $ctx = stream_context_create(['http'=>['timeout'=>6,'header'=>"Accept: application/json\r\nUser-Agent: VeloraRP-Website\r\n"]]);
  $body = @file_get_contents($url,false,$ctx);
  if ($body !== false) { echo $body; exit; }
}
http_response_code(503);
echo json_encode(['error'=>'server-status-unavailable']);
