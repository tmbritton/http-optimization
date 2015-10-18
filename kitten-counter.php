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
  if ($rando > 9) {
    $classes .= ' width2';
  }
  $html = '<a href="images/original/' . $image_data['FileName'] . '" data-lightbox="kittens" data-title="' . $image_data['FileName'] . '">' . "\n";
  $html .= "\t" . '<img class="' . $classes . '" src="images/original/' . $image_data['FileName'] . '" alt="">' . "\n";
  $html .= '</a>' . "\n";

  echo $html;
}