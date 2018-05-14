import request from '../utils/request';

export function fetch(query) {
    /**
     **** 类型为company
     **** staffNumber=001819&secretKey=D20A0DC32E78FECDBA6D895711A5A75E
     **** 1、localhost:8000/auth?login=company&userName="小小"&idNo="3333333"&companyName=杭州鑫合汇互联网金融服务有限公司&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D&isCanUpdateList=true&isCanUpdateDetail=true
     **** 1、localhost:8000/auth?login=company&userName="小小"&idNo="3333333"&companyName=杭州鑫合汇互联网金融服务有限公司&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D&isCanUpdateList=true&isCanUpdateDetail=true
     **** 1、localhost:8000/auth?login=company&userName="小小"&idNo="3333333"&companyName=中新力合股份有限公司&staffNumber=001819&secretKey=D20A0DC32E78FECDBA6D895711A5A75E&isCanUpdateList=true&isCanUpdateDetail=true
     **** 1、localhost:8000/auth?login=company&userName="小小"&idNo="3333333"&companyName=湖南天润数字娱乐文化传媒股份有限公司&staffNumber=001819&secretKey=D20A0DC32E78FECDBA6D895711A5A75E&isCanUpdateList=true&isCanUpdateDetail=true
     **** 2、localhost:8000/auth?login=company&userName="小小"&idNo="3333333"&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D
     --------------------------------------------
     **** 类型为loanee
     **** 1、localhost:8000/auth?login=loanee&id=1&loaneeName=曾咏仪&loaneeIdNo=360730199112110028&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D&isCanUpdateList=true&isCanUpdateDetail=true
     **** 2、localhost:8000/auth?login=loanee&id=1&loaneeName=皇甫立军&loaneeIdNo=33012219740903281X&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D
     **** 3、localhost:8000/auth?login=loanee&userName="小小"&idNo="3333333"&staffNumber=001830&secretKey=D20A0DC32E78FECD9A9DEDA5064A7B8D
     --------------------------------------------
     **** 接口示范
     ****  1、http://172.19.18.27/perJudDocment/verifyCrmLogin.jhtml?staffNumber=001830&secretKey=14F0C573EEEE816B324E77828353751C8D6C59B0381D240AD20A0DC32E78FECD9A9DEDA5064A7B8D
     */


    /**
     *localhost:8000/auth?login=company&id=1&companyName=杭州鑫合汇互联网金融服务有限公司&staffNumber=mscrmadmin&projectNo=G20180411002005&queryType=2&queryName=杭州鑫合汇互联网金融服务有限公司&queryNumber=&secretKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987
     *localhost:8000/auth?login=company&id=1&companyName=杭州鑫合汇互联网金融服务有限公司&staffNumber=mscrmadmin&projectNo=G20180413004051&queryType=2&queryName=杭州鑫合汇互联网金融服务有限公司&queryNumber=&secretKey=B8CB8B8A472EDD05E7CBFD29963D41A38782DA3356DC0987
     */


    return request(`/perJudDocment/verifyCrmLogin.jhtml?staffNumber=${query.staffNumber}&secretKey=${query.secretKey}`);
}
