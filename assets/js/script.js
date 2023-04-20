var dateEl = document.querySelector('#date')
var date = dayjs().format('dddd, MMMM D, YYYY h:mm A')
dateEl.textContent = date
