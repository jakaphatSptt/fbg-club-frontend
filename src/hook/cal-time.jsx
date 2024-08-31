export default function calculatorTime(dateB,price) {
    const startStamp = dateB
    const nowStamp = new Date().getTime()
    const diff = Math.round((nowStamp - startStamp)/1000)

    //const pad = (num) => String(num).padStart(2,'0');
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    const calculatorCharge = (diff) =>{
        let fees = {
            hr1: price.hrs1,
            hr2: price.hrs2,
            hr3: price.hrs3,
            hr4: price.hrs4,
            buffet: price.hrs5
        }
        let fee = 0
        if(diff > 1) fee = fees.hr1
        if(diff > 3600) fee = fees.hr2
        if(diff > 7200) fee = fees.hr3
        if(diff > 10800) fee = fees.hr4
        if(diff > 14400) fee = fees.buffet
        return fee
    }
    const charge  = calculatorCharge(diff)

    //return `${pad(h)}:${pad(m)}:${pad(s)}:${charge}`;
    return {
        hrs: h,
        mins: m,
        secs: s,
        charge: charge
        }
    
}
