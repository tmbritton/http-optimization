<?php 

$out = array();
foreach (glob('./docroot/images/original/*.jpg') as $image) {
  $out[] = exif_read_data($image);
}
$fh = fopen('./docroot/images.json', 'w');
fwrite($fh, json_encode($out, JSON_PARTIAL_OUTPUT_ON_ERROR));
fclose($fh);

foreach($out as $image_data) {
  $classes = 'grid-item';
  $rando = rand(1, 10);
  $double = FALSE;
  $path = 'small';
  if ($rando > 9) {
    $classes .= ' width2';
    $path = 'medium';
  }
  if ($rando <= 3) {
    $shard = 'shard1';
  }
  elseif ($rando == 4 || $rando == 5) {
    $shard = 'shard2';
  }
  elseif ($rando == 6 || $rando == 7) {
    $shard = 'shard3';
  }
  elseif ($rando >= 8) {
    $shard = 'shard4';
  }
  $html = '<a href="images/large/' . $image_data['FileName'] . '" data-lightbox="kittens" data-title="' . $image_data['FileName'] . '">' . "\n";
  $html .= "\t" . '<img class="' . $classes . '" src="//' . $shard . '.http-1-demo.tmbritton.com/images/' . $path . '/' . $image_data['FileName'] . '" alt="">' . "\n";
  $html .= '</a>' . "\n";

  echo $html;
}