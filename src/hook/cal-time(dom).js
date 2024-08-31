export default function calTime() {
    document.querySelectorAll('.list').forEach(function(set){

        const startStamp = set.querySelector('.c-date').innerHTML

        //const cDate = set.querySelector('.c-date')
        const idProfile = set.querySelector('.id-icon')
        const stopBtn = set.querySelector('.clearDate')
        const startBtn = set.querySelector('.startDate')
        const timerDisplay = set.querySelector('.timer-cal')
        const chargeDisplay = set.querySelector('.charge-cal')

        setInterval(runTimer, 1000)

        function runTimer() {
            let nowStamp = new Date().getTime()
            const fee = Math.round((nowStamp-startStamp)/1000)
            let diff = Math.round((nowStamp-startStamp)/1000)

            let h = Math.floor(diff/(60*60))
            diff = diff-(h*60*60)
            let m = Math.floor(diff/60)
            diff = diff-(m*60)
            let s = diff

            if(startStamp == 0){
                timerDisplay.innerHTML='--:--:--'
                stopBtn.classList.add('hide')
                startBtn.classList.remove('hide')
                idProfile.classList.remove('playing')
            }else{
                timerDisplay.innerHTML=`${(h<10?'0':'')+h}:${(m<10?'0':'')+m}:${(s<10?'0':'')+s}`
                stopBtn.classList.remove('hide')
                startBtn.classList.add('hide')
                idProfile.classList.add('playing')

                if(fee == 0){
                    chargeDisplay.innerHTML='--'
                  }if(fee > 1){
                    chargeDisplay.innerHTML='฿34'
                  }if(fee > 3600){
                    chargeDisplay.innerHTML='฿68'
                  }if(fee > 7200){
                    chargeDisplay.innerHTML='฿102'
                  }if(fee > 10800){
                    chargeDisplay.innerHTML='฿136'
                  }if(fee > 14400){
                    chargeDisplay.innerHTML='฿159'
                  }
            }
        }
    })
}
