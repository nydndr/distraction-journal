var distractionArray = [];

chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
    
    if(msg.note == "archive")
    {
        chrome.storage.local.get("noteStorage", (ret) => { 
            chrome.runtime.sendMessage({content: JSON.stringify(ret)});
        })

    } else {

        distractionArray.push(msg.note);
        
        chrome.storage.local.set({noteStorage: JSON.stringify(distractionArray)});
    }

})