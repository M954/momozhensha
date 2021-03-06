const data = `
[
    {
        "demo.aisec.cn":
            [
                {
                    "demo":
                    [
                        {
                            "aisec":
                            [
                                "html_link.php",
                                "js_link.php",
                                "post_link.php",
                                "click_link.php"
                            ]
                        }
                    ]
                }
            ]
    }
]`


// offset for each level
$('.structure p').each(function(index, el) {
    let level = $(el).parent().attr('class').split('level')[1];
    let offset = level * 10;
    console.log(offset);
    $(this).css('margin-left', `${offset}px`);

});

// collapse for each level
$('.trigger-show').click(function(event) {
    console.log('show');
    $(this).hide();
    $(this).siblings('.trigger-hide').show();
    $(this).parent().siblings().show('fast');
});
$('.trigger-hide').click(function(event) {
    console.log('hide');
    $(this).hide();
    $(this).siblings('.trigger-show').show();
    $(this).parent().siblings().hide('fast');
});

function trshow() {
  $('.trigger-show').click(function(event) {
      console.log('show');
      $(this).hide();
      $(this).siblings('.trigger-hide').show();
      $(this).parent().siblings().show('fast');
  });
}
function trhide() {
  $('.trigger-hide').click(function(event) {
      console.log('hide');
      $(this).hide();
      $(this).siblings('.trigger-show').show();
      $(this).parent().siblings().hide('fast');
  });
}

// content show test
function myrefresh() {
    $('.structure').empty();
    $('.structure').append('<h2>Content</h2>');
    $.getJSON('get_elements_from_db', function(data) {
        // console.log(data.comments);
        $.each( data, function( key, val ) {
            let cnt = 1;
            let el = $('<div class=\"level'+cnt+'\"></div>');
            let p = $('<p>'+key+'</p>');
            if(!jQuery.isEmptyObject(val)){
                let trigger_show = $('<i class="fa fa-plus trigger-show"></i>');
                $(p).append($(trigger_show));
                let trigger_hide = $('<i class="fa fa-minus trigger-hide" style="display:none;"></i>');
                $(p).append($(trigger_hide));
                trshow()
                trhide()
            }
            setoffset($(p), cnt);
            $(el).append(p);
            $.each(val, function( key, val ) {
                dirlist(key, val, $(el), cnt+1);
            });
            // $each(val, dirlist(i, item, el, cnt+1));
            $('.structure').append(el);
            // console.log($('.structure').html());
        });
        // $.each(data.comments, );
    });
}

function setoffset(el, level) {
    // let level = $(el).parent().attr('class').split('level')[1];
    let offset = level * 10;
    // console.log(offset);
    $(el).css('margin-left', `${offset}px`);
}

// setInterval(myrefresh, 1000);
setTimeout('myrefresh()',1000);

function dirlist(key, val, element, cnt) {
    let el = $('<div class=\"level'+cnt+'\" style="display:none;"></div>');
    let p = $('<p>'+key+'</p>');
    if(!jQuery.isEmptyObject(val)){
        let trigger_show = $('<i class="fa fa-plus trigger-show"></i>');
        $(p).append($(trigger_show));
        let trigger_hide = $('<i class="fa fa-minus trigger-hide" style="display:none;"></i>');
        $(p).append($(trigger_hide));
        trshow()
        trhide()
    }
    setoffset($(p), cnt);
    $(el).append(p);
    $(element).append(el);
    $.each(val, function( nkey, nval ) {
        dirlist(nkey, nval, $(el), cnt+1);
    });
    // $each(val, dirlist(i, item, el, cnt+1));
}

// test
$.ajax({
    url: '/momo/get_elements_from_db',
    dataType: 'json',
    // data: {searchWord: 'value1'}
})
.done(function(data) {
    console.log(data);
    console.log("success");
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});
