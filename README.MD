# Hanyang University LMS Helper

## 소개

![](./LMSHelperMain.png)

[한양대학교 LMS](https://learning.hanyang.ac.kr/) 출석 현황을 보기 쉽게 만들어주는 크롬 익스텐션입니다.

* 개인정보를 수집하지 않습니다.
* MIT라이센스로 배포됩니다.
* 사용시 발생하는 모든 문제의 책임은 실행한 사람에게 있습니다.

## 사용 방법

### 수동 설치

~~~
git clone https://github.com/thak1411/hyu-lms-helper.git

혹은

zip 파일 내려받기 후 압축해제
~~~

내려받은 폴더를 그대로 [크롬 익스텐션 등록](https://developer.chrome.com/extensions/getstarted)하면 됩니다.

이후 사이트 접속시 HELPER라는 메뉴가 생성되는데 이 메뉴를 눌러 사용가능합니다.

### 스토어에서 설치

[크롬 웹스토어](https://chrome.google.com/webstore/detail/hyu-lms-helper/ahkbicmdpaknajbgefiolmhakkkojaml?hl=ko&)에서 크롬에 추가 혹은

## History

### v1.2.0

* 표에서 셀 병합시 생기는 버그 수정
* 강의명에 하이퍼링크 기능추가
* 출결 현황 메시지 업데이트
* 마감 기한이 UTC +0 으로 뜨던 문제 해결 및 남은 시간으로 표시하도록 수정

### v1.1.0

* 토큰을 받아오지 못하던 문제 해결
* 테이블 그릴 때 데이터 로딩이 되지 않으면 아무것도 그려지지 않던 문제 해결

### v1.0.0

* 첫 번째 버전 릴리즈
