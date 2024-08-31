export default function formatTime(timeDiff){
  const pad = (num) => String(num).padStart(2,'0');
  const h = Math.floor(timeDiff / 3600);
  const m = Math.floor((timeDiff % 3600) / 60);
  const s = timeDiff % 60;

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

//let h = Math.floor(timeDiff / 3600);
// h = `${h<10?'0':''}${h}`
// let m = Math.floor((timeDiff % 3600) / 60);
// m = `${m<10?'0':''}${m}`
// let s = timeDiff % 60;
// s = `${s<10?'0':''}${s}`

  //return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;