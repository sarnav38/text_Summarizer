let create_block = (block, url, data)=>{
    let timeBlock = document.createElement("div");
    timeBlock.appendChild(document.createElement("h5"));
    timeBlock.firstChild.innerHTML = "[ " + data.start + " - " + data.end + " ]";
    timeBlock.className = "time-block";
    let textBlock = document.createElement("div");
    textBlock.className="text-block";
    textBlock.appendChild(document.createElement("p"));
    textBlock.firstChild.innerHTML = data.text;
    let subBlock = document.createElement("div");
    subBlock.className = "sub-block";
    subBlock.appendChild(timeBlock);
    subBlock.appendChild(textBlock);
    block.appendChild(subBlock);
};
chrome.runtime.onMessage.addListener((message) =>{

    if (message.action ==="loading"){
        console.log(message.data)
        let playerBelow = document.getElementById('top-row');
        let mBlock = document.getElementById('MyBlock');
        if(mBlock != null)
            mBlock.remove();
        mBlock = document.createElement("div");
        playerBelow.parentNode.insertBefore(mBlock, playerBelow.nextSibling);
        // while(txt.childNodes.length > 0)
        //     txt.removeChild(txt.firstChild());
        mBlock.className = 'style-scope ytd-watch-metadata my_block';
        mBlock.id = "MyBlock";
        let lBlock = document.createElement("p");
        lBlock.id = "LoadingBlock";
        lBlock.innerHTML = "Text Summarizer Model Loading..";
        mBlock.appendChild(lBlock);
    }

    else if (message.action === 'sent'){
        console.log(message)
        let mBlock = document.getElementById("MyBlock");
        mBlock.removeChild(document.getElementById("LoadingBlock"));
        for(let i = 0; i < message.data.length; i ++){
            create_block(mBlock, message.youtube_url, (message.data)[i]);
        }
    }

    else if (message.action ==="error"){
        console.log(message.data)
        let mBlock= document.getElementById("MyBlock");
        mBlock.removeChild(document.getElementById("LoadingBlock"));
        // create_box(box, message.youtube_url, message.data);
        for(let i = 0; i < message.data.length; i ++){
            create_block(mBlock, message.youtube_url, (message.data)[i]);
        }
    }

    else if (message.action === 'initialize'){
        console.log('initialize')
        let mBlock = document.getElementById('MyBlock');
        if(mBlock != null)
            mBlock.remove();
    }
})