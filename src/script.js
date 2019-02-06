$(function(){
    /* seek setting */
    const $seekBar = $('#seek-content-bar');
    const $seekBarGauge = $('#seek-content-bar-gauge');
    const $seekPercent = $('#seek-content-percent-value');
    const $seekWindow = $('#seek-window');
    const $seekWindowImg = $('#seek-window img');
    const seekBarWidth = $seekBar.width();
    const seekWindowWidth = 320;
    const seekWindowHeight = seekWindowWidth / 16 * 9;

    /* seek image initial */
    $seekWindow.width(seekWindowWidth);
    $seekWindow.height(seekWindowHeight);
    $seekWindowImg.width(seekWindowWidth*10);
    $seekWindowImg.height(seekWindowHeight*20);

    $seekBar.mousemove(function( e ) {
        /* percent */
        var rect             = document.getElementById("seek-content-bar").getBoundingClientRect();
        var offsetX          = e.pageX - rect.left + window.pageXOffset;
        var seekPercentValue = Math.floor(( offsetX / seekBarWidth ) * (100+1));
        $seekPercent.text(seekPercentValue <= 0 ? 0 : seekPercentValue);
        $seekBarGauge.width(offsetX);

        /* seek position */
        var about10        = parseInt( seekPercentValue / 10 );
        var about1         = seekPercentValue - (about10 * 10);
        var seekWindowLeft = about1  * seekWindowWidth;
        var seekWindowTop  = about10 * seekWindowHeight;
        $seekWindowImg.css({ top: -seekWindowTop + 'px', left: -seekWindowLeft + 'px' });

        /* image position */
        var limit;
        if(offsetX < $seekWindow.width() / 2){
            limit = 0;
        } else if(offsetX + $seekWindow.width() / 2 > seekBarWidth){
            limit = seekBarWidth - $seekWindow.width();
        } else {
            limit = offsetX - $seekWindow.width() / 2;
        }
        $seekWindow.css({ left: limit + 'px' });
    });

    /* mouse event */
    $seekBar
        .mouseover(function(){ $seekWindow.show(); })
        .mouseout(function(){ $seekWindow.hide(); });
});