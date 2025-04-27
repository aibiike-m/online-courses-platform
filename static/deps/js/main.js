document.addEventListener('DOMContentLoaded', function () {
	// 1. Функционал профиля пользователя (аватар, форма редактирования)
	function initProfileSection() {
		const editBtn = document.getElementById('edit-btn')
		const cancelBtn = document.getElementById('cancel-btn')
		const saveBtn = document.getElementById('save-btn')
		const avatarUploadBtn = document.getElementById('avatar-upload-btn')
		const fileInput = document.getElementById('id_image')
		const fileNameDisplay = document.getElementById('file-name-display')
		const inputs = document.querySelectorAll('.profile-form input')

		let originalValues = {}

		if (editBtn && cancelBtn && saveBtn) {
			editBtn.addEventListener('click', e => {
				e.stopPropagation()

				// Сохранение исходных значений перед редактированием
				inputs.forEach(input => {
					originalValues[input.id] = input.value
					input.disabled = false
				})

				editBtn.classList.add('hidden')
				cancelBtn.classList.remove('hidden')
				saveBtn.classList.remove('hidden')
				if (avatarUploadBtn) avatarUploadBtn.classList.remove('hidden')
			})

			cancelBtn.addEventListener('click', e => {
				e.stopPropagation()

				inputs.forEach(input => {
					input.value = originalValues[input.id] || ''
					input.disabled = true
				})

				editBtn.classList.remove('hidden')
				cancelBtn.classList.add('hidden')
				saveBtn.classList.add('hidden')
				if (avatarUploadBtn) avatarUploadBtn.classList.add('hidden')
				if (fileInput) fileInput.value = ''
				if (fileNameDisplay) {
					fileNameDisplay.textContent = 'No file selected'
					fileNameDisplay.classList.remove('has-file')
				}
			})
		}

		// Обработчик изменения файла
		if (fileInput && fileNameDisplay) {
			fileInput.addEventListener('change', function () {
				if (this.files && this.files.length > 0) {
					fileNameDisplay.textContent = this.files[0].name
					fileNameDisplay.classList.add('has-file')
				} else {
					fileNameDisplay.textContent = 'No file selected'
					fileNameDisplay.classList.remove('has-file')
				}
			})
		}

		const profileForm = document.getElementById('profile-form')
		if (profileForm) {
			profileForm.addEventListener('submit', function (e) {
				inputs.forEach(input => (input.disabled = true))
				if (editBtn) editBtn.classList.remove('hidden')
				if (cancelBtn) cancelBtn.classList.add('hidden')
				if (saveBtn) saveBtn.classList.add('hidden')
				if (avatarUploadBtn) avatarUploadBtn.classList.add('hidden')
			})
		}
	}
	// 2. Модули и фильтры
	function initAccordions() {
		document.querySelectorAll('.modules__head').forEach(item => {
			item.addEventListener('click', function (e) {
				e.stopPropagation()
				this.parentElement.classList.toggle('active')
			})
		})

		document.querySelectorAll('.filter-section__header').forEach(header => {
			header.addEventListener('click', function (e) {
				e.stopPropagation()
				this.closest('.filter-section').classList.toggle('active')
			})
		})
	}

	// 3. Кастомные селекты
	function initCustomSelects() {
		const categorySelect = document.querySelector(
			'.custom-select:not(.user-profile)'
		)
		if (categorySelect) {
			const selected = categorySelect.querySelector('.selected')
			const optionItems = categorySelect.querySelectorAll('.option')
			const hiddenInput = document.getElementById('category')

			selected.addEventListener('click', function (e) {
				e.stopPropagation()
				categorySelect.classList.toggle('open')
			})

			optionItems.forEach(option => {
				option.addEventListener('click', function (e) {
					e.stopPropagation()
					selected.textContent = this.textContent
					if (hiddenInput) hiddenInput.value = this.dataset.value
					categorySelect.classList.remove('open')
				})
			})
		}

		const profileDropdown = document.querySelector('.user-profile')
		if (profileDropdown) {
			const profileToggle = profileDropdown.querySelector('.profile-link')

			profileToggle.addEventListener('click', function (e) {
				e.preventDefault()
				e.stopPropagation()
				profileDropdown.classList.toggle('open')
			})

			profileDropdown.querySelectorAll('.option a').forEach(link => {
				link.addEventListener('click', e => {
					e.stopPropagation()
					profileDropdown.classList.remove('open')
				})
			})
		}

		// Закрытие селектов при клике вне их области
		document.addEventListener('click', function (e) {
			if (
				!e.target.closest('.custom-select') &&
				!e.target.closest('.user-profile')
			) {
				document
					.querySelectorAll('.custom-select, .user-profile')
					.forEach(el => {
						el.classList.remove('open')
					})
			}
		})
	}

	// 4. Слайдеры
	function initSliders() {
		if (typeof Swiper !== 'undefined') {
			new Swiper('.swiper', {
				slidesPerView: 3,
				spaceBetween: 16,
				centeredSlides: false,
				loop: true,
				speed: 800,
				effect: 'slide',
				navigation: {
					nextEl: '.s-button-next',
					prevEl: '.s-button-prev',
				},
				breakpoints: {
					768: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
				},
			})
		}
	}

	// 5. Поиск в хедере
	function initHeaderSearch() {
		const searchBtn = document.querySelector('.header__search-btn')
		if (searchBtn) {
			searchBtn.addEventListener('click', function (e) {
				e.stopPropagation()
				const container = this.closest('.header__container')
				const search = this.closest('.header__search')

				container.classList.toggle('search-active')
				search.classList.toggle('active')

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
		}
	}

	// 6. Бургер-меню
	function initBurgerMenu() {
		const burger = document.querySelector('.burger')
		if (burger) {
			burger.addEventListener('click', function (e) {
				e.stopPropagation()
				const menu = document.querySelector('.header__nav')
				const overlay = document.querySelector('.overlay')

				menu.classList.toggle('active')
				overlay.classList.toggle('active')
				burger.classList.toggle('burger-hidden')
			})
		}
	}
	function initNotifications() {
		function closeNotification(notification) {
			notification.classList.add('fade-out')
			notification.addEventListener('animationend', function () {
				notification.remove()
			})
		}

		const notifications = document.querySelectorAll('.notification')
		notifications.forEach(notification => {
			setTimeout(() => closeNotification(notification), 5000)

			notification.addEventListener('click', () =>
				closeNotification(notification)
			)
		})
	}

	// Инициализация всех компонентов
	initProfileSection()
	initAccordions()
	initCustomSelects()
	initSliders()
	initHeaderSearch()
	initBurgerMenu()
	initNotifications()
	initAccountTabs()
})

// const swiper = new Swiper('.swiper', {
// 	direction: 'horizontal',
// 	loop: true,
// 	navigation: {
// 		nextEl: '.s-button-next',
// 		prevEl: '.s-button-prev',
// 	},
// })
