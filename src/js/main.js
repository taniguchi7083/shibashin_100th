/* ハンバーガーボタン */
/* ------------------------------------------------------------- */
const menuHam = document.querySelector('#js_ham');
const menuNav = document.querySelector('#js_nav');
const menuLogo = document.querySelector('#js_logo');
const menuBody = document.querySelector('#js_body');

menuHam.addEventListener('click', () => {
	menuHam.classList.toggle('is_active');
	menuNav.classList.toggle('is_active');
	menuLogo.classList.toggle('is_active');
	menuBody.classList.toggle('is_active');
});


/* カウントダウン */
/* ------------------------------------------------------------- */
const showRestTime = () => {
	const countDowns = document.querySelectorAll('.js_countDown');
	const now = new Date();
	const goal = new Date(2025, 5, 1); // 月は0から始まるため、5は6月を意味する

	const restMillisecond = goal.getTime() - now.getTime();
	const day = Math.floor(restMillisecond / 1000 / 60 / 60 / 24) + 1; // 今日を含まないため+1する

	countDowns.forEach(countDown => {
		countDown.textContent = day;
	});
};

setInterval(showRestTime, 1000);


/* 背景 パーティクル */
/* ------------------------------------------------------------- */
particlesJS("particles-js", {
	"particles": {
		"number": {
			"value": 20,
			"density": {
				"enable": true,
				"value_area": 800
			}
		},
		"color": {
			"value": ["#ffffff", "#CEE0FF"]
		},
		"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#000000"
			},
			"polygon": {
				"nb_sides": 5
			}
		},
		"opacity": {
			"value": 0.5,
			"random": true,
			"anim": {
				"enable": false
			}
		},
		"size": {
			"value": 100,
			"random": true,
			"anim": {
				"enable": false
			}
		},
		"line_linked": {
			"enable": false
		},
		"move": {
			"enable": true,
			"speed": 3,
			"direction": "none",
			"random": true,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": false
			},
			"onclick": {
				"enable": false
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 400,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
});


/* テキストアニメーション */
/* ------------------------------------------------------------- */
// 監視対象が選択範囲内に入ったら実行する動作
const animateFade = (entries, obs) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.animate(
				{
					opacity: [0, 1],
					translate: ['0 56rem', 0],
				},
				{
					duration: 1000,
					easing: 'ease',
					fill: 'forwards',
				}
			);
			obs.unobserve(entry.target);
		}
	});
};

// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// js_fadeinを監視するよう指示
const fadeElements = document.querySelectorAll('.js_fadein');
fadeElements.forEach((fadeElement) => {
	fadeObserver.observe(fadeElement);
});


/* ローディングから画面遷移 */
/* ------------------------------------------------------------- */
const loadingAreaGrey = document.querySelector('#bl_loading');
const loadingAreaGreen = document.querySelector('#bl_loading_screen');
const loadingText = document.querySelector('#bl_loading p');

window.addEventListener('load', () => {
	// ローディング中（グレースクリーン）
	loadingAreaGrey.animate(
		{
			opacity: [1, 0],
			visibility: 'hidden',
		},
		{
			duration: 2000,
			delay: 1200,
			easing: 'ease',
			fill: 'forwards',
		}
	);

	// const keyframes = {
	//   opacity: [1, 0],
	//   visibility: 'hidden',
	// };
	// const options = {
	//   duration: 2000,
	//   delay: 1200,
	//   easing: 'ease',
	//   fill: 'forwards',
	// };

	// loadingAreaGrey.animate(keyframes, options);

	// ローディング中（薄緑スクリーン）
	loadingAreaGreen.animate(
		{
			translate: ['0 100vh', '0 0', '0 -100vh']
		},
		{
			duration: 2000,
			delay: 800,
			easing: 'ease',
			fill: 'forwards',
		}
	);

	// ローディング中テキスト
	loadingText.animate(
		[
			{
				opacity: 1,
				offset: .8  //80%
			},
			{
				opacity: 0,
				offset: 1  //100%
			},
		],
		{
			duration: 1200,
			easing: 'ease',
			fill: 'forwards',
		}
	);
});


/* スムーズスクロール */
/* ------------------------------------------------------------- */
const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const smoothScrollTo = (element, headerHeight = 0, duration = 600) => {
	const start = window.scrollY;
	const target = element.offsetTop - headerHeight;
	const startTime = performance.now();

	const animateScroll = currentTime => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		window.scrollTo(0, (target - start) * easeInOutQuad(progress) + start);
		if (progress < 1) requestAnimationFrame(animateScroll);
	};
	requestAnimationFrame(animateScroll);
};

const linkButton = (btnId, sectId) => {
	const button = document.getElementById(btnId);
	const section = document.getElementById(sectId);
	const header = document.querySelector('header');
	const headerHeight = header ? header.offsetHeight : 0;

	if (button && section) {
		button.addEventListener('click', event => {
			event.preventDefault();
			smoothScrollTo(section, headerHeight);
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	linkButton('scrollTop', 'scrollTop_sect');
});

// URLからハッシュを取得
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('header');
	const headerHeight = header ? header.offsetHeight : 0;

	const hash = window.location.hash;
	if (hash) {
		const targetElement = document.querySelector(hash);
		if (targetElement) {
			smoothScrollTo(targetElement, headerHeight, 600);
		}
	}
});




/* swiper */
/* ------------------------------------------------------------- */
document.addEventListener('load', () => {
	const swiper = new Swiper(".swiper", {
		loop: true,
		simulateTouch: false,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
});




/* タブ */
/* ------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	const allTabs = document.querySelectorAll('.bl_tab_menu_item');
	const panels = document.querySelectorAll('.bl_tab_panel_box');
	const tabContainer = document.querySelector('.bl_tab');
	const headerHeight = document.querySelector('header').offsetHeight;

	allTabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const activeTabId = tab.dataset.tab;

			// すべてのメニューアイテムからis_activeを削除し、適切なタブには追加
			allTabs.forEach(t => {
				t.classList.toggle('is_active', t.dataset.tab === activeTabId);
			});

			// すべてのパネルを隠し、選択されたタブに対応するパネルだけを表示
			panels.forEach(panel => {
				panel.classList.toggle('is_show', panel.dataset.panel === activeTabId);
			});

			// .bl_tab 要素までスクロール
			const tabTop = tabContainer.getBoundingClientRect().top + window.scrollY - headerHeight;
			window.scrollTo({
				top: tabTop,
				behavior: 'smooth'
			});
		});
	});
});
