export const convertYTLink =(url)=>{
    let id = ''
    if(url.includes('youtu.be')){
        id = url.split('youtu.be/')[1]    
    }else if(url.includes('youtube.com')){
        id = url.split('v=')[1]
        const ampersandPosition = id.indexOf('&')
        if (ampersandPosition !== -1) {
            id = id.substring(0, ampersandPosition);
        }
    }
    
    return `https://www.youtube.com/embed/${id}`
}
