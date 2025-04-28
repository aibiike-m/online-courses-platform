document.addEventListener('DOMContentLoaded', function () {
	// =============================================
	// 1. WISHLIST FUNCTIONALITY
	// =============================================
	function initWishlist() {
		const removeButtons = document.querySelectorAll('.remove-from-wishlist')
		const wishlistForm = document.getElementById('wishlist-form')
		const wishlistActions = document.querySelector('.wishlist-actions')
		const cancelBtn = document.querySelector('.cancel-btn')

		if (
			!removeButtons.length ||
			!wishlistForm ||
			!wishlistActions ||
			!cancelBtn
		)
			return

		// Toggle selection for wishlist items
		function toggleWishlistItem(button) {
			const wishlistId = button.getAttribute('data-wishlist-id')
			const checkbox = document.querySelector(`#wishlist-${wishlistId}`)
			const trashIcon = button.closest('.trash-bin')
			checkbox.checked = !checkbox.checked
			trashIcon.classList.toggle('wishlist-selected')
			const selectedCount = document.querySelectorAll(
				'.wishlist-checkbox:checked'
			).length

			wishlistActions.style.display = selectedCount > 0 ? 'flex' : 'none'
		}

		// Reset all selections
		function resetSelections() {
			document.querySelectorAll('.wishlist-checkbox').forEach(checkbox => {
				checkbox.checked = false
			})

			document.querySelectorAll('.trash-bin').forEach(trash => {
				trash.classList.remove('wishlist-selected')
			})

			wishlistActions.style.display = 'none'
		}

		// Handle bulk deletion
		async function handleBulkDeletion() {
			const selectedItems = Array.from(
				document.querySelectorAll('.wishlist-checkbox:checked')
			).map(el => el.value)

			if (selectedItems.length === 0) {
				alert('Выберите хотя бы один курс для удаления')
				return false
			}

			if (
				!confirm(
					`Вы уверены, что хотите удалить ${selectedItems.length} курсов?`
				)
			) {
				return false
			}

			try {
				const params = new URLSearchParams()
				selectedItems.forEach(id => params.append('wishlist_ids', id))

				const response = await fetch(wishlistForm.action, {
					method: 'POST',
					headers: {
						'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')
							.value,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: params,
				})

				const data = await response.json()

				if (data.success) {
					selectedItems.forEach(id => {
						const item = document.querySelector(
							`.wishlist-item input[value="${id}"]`
						)
						item?.closest('.wishlist-item').remove()
					})
					resetSelections()
					return true
				} else {
					throw new Error('Server error')
				}
			} catch (error) {
				console.error('Error:', error)
				alert('Произошла ошибка при удалении')
				return false
			}
		}

		// Event listeners
		removeButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				e.preventDefault()
				toggleWishlistItem(this)
			})
		})

		cancelBtn.addEventListener('click', resetSelections)

		wishlistForm.addEventListener('submit', async function (e) {
			e.preventDefault()
			await handleBulkDeletion()
		})
	}

	// =============================================
	// 2. PROFILE SECTION
	// =============================================
	function initProfileSection() {
		const editBtn = document.getElementById('edit-btn')
		const cancelBtn = document.getElementById('cancel-btn')
		const saveBtn = document.getElementById('save-btn')
		const avatarUploadBtn = document.getElementById('avatar-upload-btn')
		const fileInput = document.getElementById('id_image')
		const fileNameDisplay = document.getElementById('file-name-display')
		const inputs = document.querySelectorAll('.profile-form input')
		const profileForm = document.getElementById('profile-form')

		if (!editBtn || !cancelBtn || !saveBtn || !profileForm) return

		let originalValues = {}

		// Toggle edit mode
		function toggleEditMode(edit = true) {
			inputs.forEach(input => {
				if (edit) {
					originalValues[input.id] = input.value
					input.disabled = false
				} else {
					input.value = originalValues[input.id] || ''
					input.disabled = true
				}
			})

			editBtn.classList.toggle('hidden', !edit)
			cancelBtn.classList.toggle('hidden', edit)
			saveBtn.classList.toggle('hidden', edit)
			if (avatarUploadBtn) avatarUploadBtn.classList.toggle('hidden', edit)

			if (!edit && fileInput) {
				fileInput.value = ''
				if (fileNameDisplay) {
					fileNameDisplay.textContent = 'No file selected'
					fileNameDisplay.classList.remove('has-file')
				}
			}
		}

		// Event listeners
		editBtn.addEventListener('click', e => {
			e.stopPropagation()
			toggleEditMode(true)
		})

		cancelBtn.addEventListener('click', e => {
			e.stopPropagation()
			toggleEditMode(false)
		})

		if (fileInput && fileNameDisplay) {
			fileInput.addEventListener('change', function () {
				if (this.files?.length > 0) {
					fileNameDisplay.textContent = this.files[0].name
					fileNameDisplay.classList.add('has-file')
				} else {
					fileNameDisplay.textContent = 'No file selected'
					fileNameDisplay.classList.remove('has-file')
				}
			})
		}

		profileForm.addEventListener('submit', function () {
			inputs.forEach(input => (input.disabled = true))
			toggleEditMode(false)
		})
	}

	// =============================================
	// 3. ACCORDIONS AND FILTERS
	// =============================================
	function initAccordions() {
		// Modules accordion
		document.querySelectorAll('.modules__head').forEach(item => {
			item.addEventListener('click', function (e) {
				e.stopPropagation()
				this.parentElement.classList.toggle('active')
			})
		})

		// Filter sections
		document.querySelectorAll('.filter-section__header').forEach(header => {
			header.addEventListener('click', function (e) {
				e.stopPropagation()
				this.closest('.filter-section').classList.toggle('active')
			})
		})
	}

	// =============================================
	// 4. CUSTOM SELECTS
	// =============================================
	function initCustomSelects() {
		// Category select
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

		// Profile dropdown
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

		// Close selects when clicking outside
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

	// =============================================
	// 5. HEADER FUNCTIONALITY
	// =============================================
	function initHeader() {
		// Search functionality
		const searchBtn = document.querySelector('.header__search-btn')
		if (searchBtn) {
			searchBtn.addEventListener('click', function (e) {
				e.stopPropagation()
				const container = this.closest('.header__container')
				const search = this.closest('.header__search')

				container.classList.toggle('search-active')
				search.classList.toggle('active')

				if (container.classList.contains('search-active')) {
					const closeSearch = function (event) {
						if (!event.target.closest('.header__search')) {
							container.classList.remove('search-active')
							search.classList.remove('active')
							document.removeEventListener('click', closeSearch)
						}
					}
					document.addEventListener('click', closeSearch)
				}
			})
		}

		// Burger menu
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

	// =============================================
	// 6. NOTIFICATIONS
	// =============================================
	function initNotifications() {
		function closeNotification(notification) {
			notification.classList.add('fade-out')
			notification.addEventListener('animationend', function () {
				notification.remove()
			})
		}

		document.querySelectorAll('.notification').forEach(notification => {
			setTimeout(() => closeNotification(notification), 5000)
			notification.addEventListener('click', () =>
				closeNotification(notification)
			)
		})
	}

	// =============================================
	// 7. INITIALIZE ALL COMPONENTS
	// =============================================
	initWishlist()
	initProfileSection()
	initAccordions()
	initCustomSelects()
	initHeader()
	initNotifications()

	// if (typeof Swiper !== 'undefined') {
	// 	new Swiper('.swiper', {
	// 		slidesPerView: 3,
	// 		spaceBetween: 16,
	// 		loop: true,
	// 		navigation: {
	// 			nextEl: '.s-button-next',
	// 			prevEl: '.s-button-prev',
	// 		},
	// 		breakpoints: {
	// 			768: { slidesPerView: 1, spaceBetween: 10 },
	// 			1024: { slidesPerView: 2, spaceBetween: 15 },
	// 		},
	// 	})
	// }
})

// const swiper = new Swiper('.swiper', {
// 	direction: 'horizontal',
// 	loop: true,
// 	navigation: {
// 		nextEl: '.s-button-next',
// 		prevEl: '.s-button-prev',
// 	},
// })
