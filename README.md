
# Youtube Videos Summerizer

This extension helps to generate english Summerization of youtube videos having english subtitles.

This repository contains two entities:
1. [client](/client) folder contains chrome extension files
2. [server](/server) folder conatins files for text summariation api for server deployment. which process the request and send it back to client as http response. It is a simple flask app, which has a API ```your url/textSum?youtube_url='paste url'``` which can be used to get the summary of a desired youtube video by simply making a get request.


## Demo
1. Open youtube video then click on extension and inside extension click summarize button to get videos summarization below youtube player.

![1.](https://github.com/sarnav38/text_Summarizer/blob/main/img/demo1.gif)

![2.](https://github.com/sarnav38/text_Summarizer/blob/main/img/demo2.gif)


## Installation

1. Clone Repository.
2. Goto server folder and install requirements.

```bash
  cd server
  python -m venv myenv
  myenv/Script/activate
  pip install -r requirements.txt
```
3. Login  [```hugging face```](https://huggingface.co/) goto setting->access token click show  and copy Access Token from your account and paste it in [secrets.json](https://github.com/sarnav38/text_Summarizer/blob/main/server/secerts.json) file.

![1.](https://github.com/sarnav38/text_Summarizer/blob/main/img/hugging.gif)

5. Now deploy tetxSummarizer_api folder on server but for testing use ngrok temporarily.
6. Everthing is done. now run ngrok to generate url and paste this url in [line number 18 of popup.js](https://github.com/sarnav38/text_Summarizer/blob/main/client/popup/popup.js#L18).

![1.](https://github.com/sarnav38/text_Summarizer/blob/main/img/ng1.PNG)  

![2.](https://github.com/sarnav38/text_Summarizer/blob/main/img/ng2.PNG)

![3.](https://github.com/sarnav38/text_Summarizer/blob/main/img/line18.png)

6. Now load chrome extension folder [client](/client), load unpacked from [chrome://extensions/](chrome://extensions). open [youtube](https://youtube.com/) video and click on summarize and see the summary as shown in demo section. 

![1.](https://github.com/sarnav38/text_Summarizer/blob/main/img/ext1.gif)

![2.](https://github.com/sarnav38/text_Summarizer/blob/main/img/ext2.gif)

![2.](https://github.com/sarnav38/text_Summarizer/blob/main/img/summary.png)

    
## Authors

- [Arnav Sharma](https://github.com/sarnav38)
