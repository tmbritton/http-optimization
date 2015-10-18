<?php 

foreach (glob('./docroot/images/*.jpg') as $image) {
  //var_dump($image);
  $meta = exif_read_data($image);
  var_dump($meta);
}
