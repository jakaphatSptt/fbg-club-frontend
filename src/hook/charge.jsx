export default function chargeCalculator(diff){
    let fees = {
        hr1: 34,
        hr2: 68,
        hr3: 102,
        hr4: 136,
        buffet: 159
    }

    let fee = 0
    if(diff > 1) fee = fees.hr1
    if(diff > 3600) fee = fees.hr2
    if(diff > 7200) fee = fees.hr3
    if(diff > 10800) fee = fees.hr4
    if(diff > 14400) fee = fees.buffet
    return fee
}