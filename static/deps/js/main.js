document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.modules__head').forEach(item => {
		item.addEventListener('click', function () {
			this.parentElement.classList.toggle('active')
		})
	})
})
document.addEventListener('DOMContentLoaded', function () {
	const filterSections = document.querySelectorAll('.filter-section')

	filterSections.forEach(section => {
		const header = section.querySelector('.filter-section__header')
		header.addEventListener('click', () => {
			section.classList.toggle('active')
		})
	})
})

// const coursesSwiper = new Swiper('.popular-courses__slider', {
// 	slidesPerView: 'auto',
// 	centeredSlides: true,
// 	spaceBetween: 20,
// 	loop: true,
// 	loopAdditionalSlides: 2,
// 	autoplay: {
// 		delay: 2000,
// 		disableOnInteraction: false,
// 	},
// 	speed: 800,
// 	navigation: {
// 		nextEl: '.s-button-next',
// 		prevEl: '.s-button-prev',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 10,
// 			centeredSlides: false,
// 		},
// 		576: {
// 			slidesPerView: 1.5,
// 			centeredSlides: true,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 15,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1200: {
// 			slidesPerView: 4,
// 			spaceBetween: 25,
// 		},
// 	},
// })
document.addEventListener('DOMContentLoaded', function () {
	const swiper = new Swiper('.swiper', {
		// Количество слайдов для показа
		slidesPerView: 3,
		// Расстояние между слайдами
		spaceBetween: 16,
		// Центрирование активного слайда
		centeredSlides: false,
		// Бесконечная прокрутка
		loop: true,
		// Скорость анимации
		speed: 800,
		// Эффект перехода
		effect: 'slide',
		// Навигация
		navigation: {
			nextEl: '.s-button-next',
			prevEl: '.s-button-prev',
		},
		// Адаптивность
		breakpoints: {
			// при ширине экрана меньше 768px
			768: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			// при ширине экрана меньше 1024px
			1024: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
		},
	})
})

document
	.querySelector('.header__search-btn')
	.addEventListener('click', function (e) {
		e.stopPropagation()
		const container = this.closest('.header__container')
		const search = this.closest('.header__search')

		// Переключаем классы
		container.classList.toggle('search-active')
		search.classList.toggle('active')

		// Закрываем при клике вне области поиска
		if (container.classList.contains('search-active')) {
			document.addEventListener('click', function closeSearch(event) {
				if (!event.target.closest('.header__search')) {
					container.classList.remove('search-active')
					search.classList.remove('active')
					document.removeEventListener('click', closeSearch)
				}
			})
		}
	})

function toggleMenu() {
	const menu = document.querySelector('.header__nav')
	const overlay = document.querySelector('.overlay')

	menu.classList.toggle('active')
	overlay.classList.toggle('active')
	burger.classList.toggle('burger-hidden')
}

document.addEventListener('DOMContentLoaded', function () {
	const customSelect = document.querySelector('.custom-select')
	const selected = customSelect.querySelector('.selected')
	const options = customSelect.querySelector('.options')
	const optionItems = customSelect.querySelectorAll('.option')
	const hiddenInput = document.getElementById('category')

	// Открытие/закрытие списка
	selected.addEventListener('click', function () {
		customSelect.classList.toggle('open')
	})

	// Выбор опции
	optionItems.forEach(option => {
		option.addEventListener('click', function () {
			selected.textContent = this.textContent // Меняем текст
			hiddenInput.value = this.dataset.value // Меняем значение hidden input
			customSelect.classList.remove('open') // Закрываем список
		})
	})

	document.addEventListener('click', function (e) {
		if (!customSelect.contains(e.target)) {
			customSelect.classList.remove('open')
		}
	})
})

// const swiper = new Swiper('.swiper', {
// 	direction: 'horizontal',
// 	loop: true,
// 	navigation: {
// 		nextEl: '.s-button-next',
// 		prevEl: '.s-button-prev',
// 	},
// })
