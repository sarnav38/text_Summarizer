// create declarative rule or use host_permission for YouTube page data
const MyRules1 = [{
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'youtube.com', schemes: ['https']},
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}];

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules(MyRules1);
    });
});

chrome.tabs.onUpdated.addListener(async (tabId,changeInfo, tab)=>{
    if (changeInfo.url){
        if(changeInfo.url.match('https:\\/\\/.*.youtube..*\\/.*')){
            await chrome.tabs.sendMessage(tabId, {
                action: 'initialize',
                data: 'data initializing data'
            });
        }
    }
});
