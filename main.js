require(['jquery'], ($) => {

	window.ShowUsage = function (e) {
		$(e).next().show()
		$(e).next().one('click', () => {
			$(e).next().hide()
		})
	}

	$(() => {

		$('.Item .Header').on('click', function () {
			$(this).parent().children('.Content').toggle()
		})

		$('sbutton.Usage').on('click', function () {
			log($(this).next())
			$(this).next().show()
			$(this).next().one('click', () => {
				$(this).next().hide()
			})
		})

		if (location.href.includes('#') && !location.href.split('#')[1].startsWith('_')) {
log('loading')
			location.assign(location.href.split('#')[0]+'#_'+location.href.split('#')[1])
		}

	})


})
