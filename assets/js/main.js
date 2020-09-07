
window.addEventListener('DOMContentLoaded', () => {
  var player = new Clappr.Player({
      autoPlay: true,
      height: '100%',
      width: '100%',
      source: 'https://vc1.asotcdn.xyz/hls/ournetworks/live.m3u8',
      parentId: '.player',
      plugins: [LevelSelector],
      levelSelectorConfig: {
        title: 'Quality',
        labels: {
          2: '1080p',
          1: '720p',
          0: '480p',
        },
        onLevelsAvailable: function(levels) {
          return levels.reverse()
        }
      }
    }
  )
})

// Clock element

const clockElement = document.getElementById('clock-element')
let currentDate = ''

const currentTime = () => {
  currentDate = new Date()
  const hours = () => {
    if (currentDate.getUTCHours() < 4) {
      return currentDate.getUTCHours() + 20
    } else {
      const offSetHours = currentDate.getUTCHours() - 4
      return (offSetHours < 10 ? '0' : '') + offSetHours
    }
  }
  const minutes = (currentDate.getUTCMinutes() < 10 ? '0' : '') + currentDate.getUTCMinutes()
  const seconds = (currentDate.getUTCSeconds() < 10 ? '0' : '') + currentDate.getUTCSeconds()
  return `${hours()}:${minutes}:${seconds}`
}

clockElement.innerHTML = currentTime()

setInterval(() => {
  clockElement.innerHTML = currentTime()
}, 1000)

// Schedule select

document.querySelectorAll('.schedule-button').forEach((e) => {
  e.addEventListener('click', () => {
    document.querySelectorAll('.schedule-day').forEach((e) => {
      e.classList.remove('db')
      e.classList.add('dn')
    })
    document.getElementById(e.dataset.target).classList.add('db')
    document.querySelectorAll('.schedule-button').forEach((e) => {
      e.classList.remove('bg-accent')
    })
    e.classList.add('bg-accent')
  })
})

// Schedule set

const DateToFormattedString = (d) => {
  var yyyy = d.getFullYear().toString()
  var mm = (d.getMonth() + 1).toString()
  var dd = d.getDate().toString()
  return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
}

const scheduleDateInit = DateToFormattedString(currentDate)

document.querySelectorAll(`[data-target='${scheduleDateInit}']`).forEach((e) => {
  document.querySelectorAll('.schedule-button').forEach((e) => {
    e.classList.remove('bg-accent')
  })
  document.querySelectorAll('.schedule-day').forEach((e) => {
    e.classList.remove('db')
    e.classList.add('dn')
  })
  document.getElementById(`${scheduleDateInit}`).classList.add('db')
  e.classList.add('bg-accent')
})

// Chat toggle

document.getElementById('chat-hide').addEventListener('click', (e) => {
  document.getElementById('chat-area').classList.toggle('dn')
  document.getElementById('live-stream-area').classList.toggle('w-100')
  if (e.target.innerHTML === '⇤ Open chat') {
    e.target.innerHTML = 'Hide chat ⇥'
  } else {
    e.target.innerHTML = '⇤ Open chat'
  }
})
