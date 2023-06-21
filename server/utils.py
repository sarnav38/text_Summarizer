from youtube_transcript_api import YouTubeTranscriptApi
import requests, json

try:
    with open('secerts.json', 'r') as f:
        api_key = json.load(f)['api_key']
except Exception:
    ...

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": f"Bearer {api_key}"}

def strTime(time):
    t = int(time)
    if (t % 60) < 10:
      return str(t // 60) + ":0" + str(t % 60)
    else:
      return str(t // 60) + ":" + str(t % 60)


def query(payload: dict) -> list:
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def bardSummarize(text: str, token: int = 512) -> str:
    tex_lis = []
    if len(text.split()) > token:
        tex_len = (len(text.split())) // token
        for i in range(tex_len):
            lr = i * token
            ur = (i + 1) * token
            tex_lis.append(query({"inputs": text[lr:ur]})[0]['summary_text'])
        res = ' '.join(tex_lis)
        return res
    else:
        res = query({"inputs": text})[0]['summary_text']
        return res

def video2sumText(url: str) -> list:
    try:
        video_id = (url.split('=')[1]).split("&")[0]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        #  split subtitles into 10 min or 1/10th of the video ending time
        duration = max(10 * 60, (transcript[-1]['start'] + transcript[-1]['duration']) // 10)
        i, end, st = 0, 0, 0
        ps_text = ""
        summary_content = []
        while i < len(transcript):
            if end - st < duration:
                end = transcript[i]['start'] + transcript[i]['duration']
                ps_text += transcript[i]['text']
                # ps_text += '.'
            else:
                summary_content.append(
                    {"start": strTime(st), "end": strTime(end), "text": bardSummarize(ps_text)})
                st = end
                end = transcript[i]['start'] + transcript[i]['duration']
                ps_text = transcript[i]['text']

            i += 1
        summary_content.append({"start": strTime(st), "end": strTime(end), "text": bardSummarize(ps_text)})
        return summary_content
    except Exception:
        return [{"start": strTime(0), "end": strTime(0), "text": str('Video not contain Subtiles in english')}]

if __name__ == '__main__':
    # a = YouTubeTranscriptApi.get_transcript('jpP-knzu8gE')
    # print(a[-1]['start'])
    # print(a[-1]['duration'])
    ...
