function solution(video_len, pos, op_start, op_end, commands) {
    const videoSec = transferMMSSToSec(video_len)
    const posSec = transferMMSSToSec(pos)
    const opStartToSec =  transferMMSSToSec(op_start)
    const opEndToSec = transferMMSSToSec(op_end)
    let curPos = posSec
    
    function openingSkip() {
        if(curPos >= opStartToSec && curPos <= opEndToSec) {
            curPos = opEndToSec
        }
    }
    openingSkip()
    
    for(const command of commands) {
        switch(command) {
            case 'prev': {
                curPos -= 10
                if(curPos < 0) curPos = 0
                openingSkip()
                break
            }
            case 'next': {
                curPos += 10
                if(curPos > videoSec) curPos = videoSec
                openingSkip()
                break
            }
            default: {
                break
            }
        }
    }
    
    const curMM = Math.floor(curPos/60)
    const curSS = curPos % 60
    const strCurMM = String(curMM).padStart(2, 0)
    const strCurSS = String(curSS).padStart(2, 0)
    
    return strCurMM + ":" + strCurSS
}
function transferMMSSToSec(str) {
    const [strMM, strSS] = str.split(":").map(Number)
    return strMM * 60 + strSS
}