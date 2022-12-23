$(document).ready(function() {

	inputTextFocus( '.ipt_txt' );

});

/* 높이 */
$( window ).bind( 'orientationchange resize', function() {
	var docH = $( document ).height();
 	var winH = $( window ).height();

 	docH > winH ? $( '.wrapper' ).css( 'height', docH ) : $( '.wrapper' ).css( 'height', '100%' );
});

/* 높이 관련 이벤트 발생시 높이값 다시 조정 */
var heightResize = function() {
	$( '.wrapper' ).css( 'height', 'auto' );
	$( window ).resize();
};

/* input 텍스트 focus */
var inputTextFocus = function( ipt ) {
	var $ipt = $( ipt ).find( 'input' );

	$ipt.focus( function() {
		$( this ).parent( ipt ).addClass( 'ipt_focus' );
	});

	$ipt.blur( function() {
		$( this ).parent( ipt ).removeClass( 'ipt_focus' );
	});
};

/* 토글 버튼 */
var toggleBtn = function( btn ) {
	$( btn ).click( function( e ) {
		$( this ).toggleClass( 'on' );
	});
};

/* 팝업 열기 */
var modalOpen = function( modal, posi ) {
	var $modal = $( modal );

	$( 'body' ).addClass( 'modal_show' );

	$modal.fadeIn( 100, function(){
		$( this ).addClass( 'on' );
	});

	modalPosi( modal, posi );
	$( window ).bind( 'orientationchange resize', function() {
		if ( $modal.hasClass( 'on' ) ) {
			modalPosi( modal, posi );
		};
	});

	$modal.find( '.modal_backdrop' ).click( function() {
		modalClose( modal );
	});
	$modal.find( '.btn_close' ).click( function() {
		modalClose( modal );
	});
};

/* 팝업 위치 */
var modalPosi = function( modal, posi ) {
	var $modal = $( modal );
	var $dialog = $modal.find( '.modal_dialog' );
	var $backdrop = $modal.find( '.modal_backdrop' );
	var topGap = 0;

	if ( posi === 'bottom' ) {
		topGap = $modal.outerHeight() - $dialog.outerHeight();		
	} else if ( posi === 'middle' ) {
		topGap = ( $modal.outerHeight() / 2 ) - ( $dialog.outerHeight() / 2 );
	} else {
		topGap = 0;
	};

	topGap >= 0 ? $dialog.css( 'top', topGap ) : $dialog.css( 'top', 'auto' );

	var winH = $( window ).height();
	var dialogH = $dialog.outerHeight();

	dialogH > winH ? $backdrop.css( 'height', dialogH ) : $backdrop.css( 'height', winH );
};

/* 팝업 닫기 */
var modalClose = function( modal ) {
	var $modal = $( modal );

	$( 'body' ).removeClass( 'modal_show' );

	$modal.removeClass( 'on' ).fadeOut( 300, function() {
		$( this ).find( '.modal_backdrop' ).css( 'height', '' ).next( '.modal_dialog' ).css( 'top', '' );
	});
};