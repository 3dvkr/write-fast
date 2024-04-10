let startWarnings = false
let lastTypedTime = Date.now()
let draft = ''

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <button id="plz-no" class="hide" type="button">Plz no :(</button>
    </div>
    <div id="console" class="console">
    <textarea id="textbox"></textarea>
    <div id="warning-meter" class="warning-meter">
      <div class="warning-meter_indicator hide" id="yellow"></div>
      <div class="warning-meter_indicator hide" id="orange"></div>
      <div class="warning-meter_indicator hide" id="red"></div>
    </div>
    </div>
  </div>
`

const textbox = document.querySelector('textarea')
const regretBtn = document.getElementById('plz-no')
const indicators = document.querySelectorAll('.warning-meter_indicator')

textbox?.addEventListener('input', () => {
	if (textbox.value !== '') {
		startWarnings = true
	}
	lastTypedTime = Date.now()
})

regretBtn.addEventListener('click', () => {
	textbox.value = draft
	regretBtn?.classList.add('hide')
	startWarnings = false
	draft = ''
})

timeTracker(indicators)


function findTimeWindow() {
	if (!lastTypedTime || !startWarnings) return 0
	const currentTime = Date.now()
	const differenceInSeconds = (currentTime - lastTypedTime) / 1000
	return differenceInSeconds
}

function timeTracker(indicators) {
	console.log(`🎈 indicators:`,  indicators)
	const step = 2
	setInterval(() => {
		if (findTimeWindow() >= step * 3) {
			indicators[2].classList.remove('hide')
			if (!draft) {
				draft = textbox.value
			}
			textbox.value = ''
			regretBtn?.classList.remove('hide')
		} else if (findTimeWindow() >= step * 2) {
			indicators[1].classList.remove('hide')
		} else if (findTimeWindow() >= step) {
			indicators[0].classList.remove('hide')
		} else {
			indicators.forEach((el) => el.classList.add('hide'))
		}
	}, 1000)
}
