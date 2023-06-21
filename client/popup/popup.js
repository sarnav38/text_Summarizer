console.log('hello popup dot js')
const fetchData = async (url) => {
    const a = await fetch(url)
    return a.json()
}
const btn = document.querySelector('.btn')
btn.onclick = async (e)=>{
    e.preventDefault()
    const tabs = await chrome.tabs.query({
        url:["https://www.youtube.com/watch?v=*"],
        active: true
    })
    const url = new URL(tabs[0].url).href
    const videoId = url.split('=')[1].split('&')[0].trim()
    let youtube_url = `https://www.youtube.com/watch?v=${videoId}`

    // for NGROK Run paste ngrok create link below at every run ngrok chg url
    // let ngrok = 'https://2e85-103-95-83-57.ngrok-free.app'
    // let api_url = `${ngrok}/textSum?youtube_url='${youtube_url}'`

    // paste server url below...below used is deploy with aws lambda
    let api_url = `https://tguch7y3xu72nbbxcv4hhqaquu0pfdqv.lambda-url.us-east-1.on.aws/?name=${videoId}`
    await chrome.tabs.sendMessage(tabs[0].id, {action:"loading",youtube_url:youtube_url ,data:"fetching from server"})
    fetchData(api_url).then((result)=>{
        // console.log('result')
        chrome.tabs.sendMessage(tabs[0].id, {action:"sent",youtube_url:youtube_url, data:result})
    }).catch(()=>{
        chrome.tabs.sendMessage(tabs[0].id, {action:"error",youtube_url:youtube_url,data:{start:'0:0',end:'0:0',text:'error'}})
    })
}

