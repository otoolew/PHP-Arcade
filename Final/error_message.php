<?php
echo'<div class="scoreContent">               
        </br>
            <label class="review-labelView">Error: </label></br>';
foreach ($errors as $key => $value) {
    echo'<p class = "viewComment">' . $value . '</p></br>';
}

echo'</div>';

