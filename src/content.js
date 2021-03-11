/**
 * Hyper Data
 * 
 * [rn_CourseStatus]
 * 0: NONE
 * 1: SUCCESS
 * 2: ERROR
 */

const LIGHTGREEN = "#C3FDB8";
const LIGHTRED   = "#FFCCCB";



/**
 * Add Button In Menu Tab
 */
var addButtton = function() {
    var list = document.querySelector('#menu');
    var item = document.createElement('li');
    item.classList.add('menu-item');
    item.classList.add('ic-app-header__menu-list-item');
    item.innerHTML = `
    <a class="ic-app-header__menu-list-link">
        <div class="menu-item-icon-container" aria-hidden="true">
            <img src="https://learning.hanyang.ac.kr/learningx/customs/canvas/help_icon.png">
        </div>
        <div class="menu-item__text">
            HELPER
        </div>
    </a>
    `;
    item.onclick = function() {
        drawTable();
    }
    list.appendChild(item);
}



/**
 * Crawling Data
 * 
 * https://learning.hanyang.ac.kr/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollments&sort=nickname
 * Get Course List
 */
var getCourse = function() {
    window.rn_Loading = true;
    window.rn_CourseStatus = 0;
    $.ajax({
        url: '/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollments&sort=nickname',
        type: 'GET'
    })
    .done(function(res) {
        window.rn_CourseData = res;
        $.ajax(`https://learning.hanyang.ac.kr/courses/${res[0].id}/external_tools/9`)
        .then(res => {
            var rn_Form = document.createElement('div');
            rn_Form.innerHTML = '<iframe class="hide" name="rn-frame"></iframe>' + res.slice(res.search('<form'), res.search('</form>') + 7).replace('id="tool_form"', 'id="rn-form"').replace('target="tool_content"', 'target="rn-frame"');
            document.body.appendChild(rn_Form);
            window.rn_UserId = document.querySelector('#rn-form #custom_user_id').value;
            window.rn_UserLogin = document.querySelector('#rn-form #custom_user_login').value;
            document.querySelector('#rn-form').submit();
            getAttendance();
        });
    })
    .fail(function() {
        window.rn_Loading = false;
        window.rn_CourseStatus = 2;
    });
}



/**
 * Crawling Data
 * 
 * https://learning.hanyang.ac.kr/learningx/api/v1/courses/[COURSE_ID]/sections/learnstatus_db?user_id=[USER_LMS_ID]&user_login=[STUDENT_ID]&role=1
 * Get Course Attendance Table
 * 
 * 
 * https://learning.hanyang.ac.kr/learningx/api/v1/courses/[COURSE_ID]/total_learnstatus/users/[USER_LMS_ID]
 * For Movie Content - Not Used
 */
var getAttendance = function() {
    window.rn_AttendanceTable = [];
    var rn_LoadingCount = rn_CourseData.length;
    window.rn_Loading = rn_CourseData.length > 0;
    for (var i = 0; i < rn_CourseData.length; ++i) {
        (function req(id, name) {
            var jwt = (a = "xn_api_token", b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)"), b ? b[2] : null);
            if (jwt == null) {
                setTimeout(function() {
                    req(id, name);
                }, 500);
                return;
            }
            $.ajax({
                headers: {
                    Authorization: "Bearer " + jwt
                },
                url: `/learningx/api/v1/courses/${id}/sections/learnstatus_db?user_id=${rn_UserId}&user_login=${rn_UserLogin}&role=1`,
                type: 'GET'
            })
            .done(function(res) {
                rn_AttendanceTable.push({
                    name,
                    data: res,
                });
                if (!--rn_LoadingCount) {
                    window.rn_Loading = false;
                    window.rn_CourseStatus = 1;
                }
            })
            .fail(function() {
                rn_LoadingCount = -1;
                window.rn_Loading = false;
                window.rn_CourseStatus = 2;
            });
        })(rn_CourseData[i].id, rn_CourseData[i].name);
    }
}



/**
 * Draw Table
 */
var drawTable = function() {
    var wrapper = document.querySelector('#wrapper');
    var rn_DefaultPages = wrapper.innerHTML;
    wrapper.innerHTML = `
    <div id="main">
        <div id="content" class="ic-Layout-contentMain" role="main">
            <div id="dashboard_header_container" class="ic-Dashboard-header">
                <div class="medium ic-Dashboard-header__layout">
                    <h1 class="ic-Dashboard-header__title"><span class="hidden-phone">LMS Helper - Made By Rn</span></h1>
                </div>
            </div>
            <table id="rn-table" style="width: 100%;" border="3">
                <thead>
                    <tr>
                        <th>과목명</th>
                        <th>주차</th>
                        <th>차시</th>
                        <th>학습 제목</th>
                        <th>학습 유형</th>
                        <th>학습 현황</th>
                        <th>출결 현황</th>
                        <th>마감 기한</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
    `;
    var list = document.querySelector('#menu');
    for (var i = 0; i < list.childNodes.length; ++i) {
        list.childNodes[i].classList && list.childNodes[i].classList.remove('ic-app-header__menu-list-item--active');
    }
    list.childNodes[list.childNodes.length - 1].classList.add('ic-app-header__menu-list-item--active');

    if (window.rn_Loading) {
        setTimeout(function() {
            drawTable();
        }, 500);
        return;
    }

    function makeTableLine(items) {
        var line = document.createElement('tr');
        for (var item of items) {
            var cell = document.createElement('td');
            if (items[5] == '완료') cell.style.backgroundColor = LIGHTGREEN;
            else if (items[5] == '-') cell.style.backgroundColor = LIGHTRED;
            cell.textContent = item;
            line.appendChild(cell);
        }
        return line;
    }
    function calcTime(time) {
        if (!time) return '';
        var t = parseInt((new Date(time) - new Date()) / 1000);
        return t < 0 ? '기한 마감' : `${parseInt(t / (3600 * 24))}D ${parseInt(t / 3600) % 24}H ${parseInt(t / 60) % 60}M`;
    }
    var tbody = document.querySelector('#rn-table tbody');
    var comType = {
        'pdf': 'PDF',
        'movie': '동영상',
        'embed': '웹링크',
        'assignment': '과제',
        'video_conference': '화상 강의',
    }
    var flag = false;
    for (var course of rn_AttendanceTable) {
        for (var section of course.data.sections) {
            if (!section.has_component) continue;
            for (var subsection of section.subsections) {
                for (var unit of subsection.units) {
                    for (var component of unit.components) {
                        tbody.appendChild(makeTableLine([
                            course.name,
                            section.title,
                            subsection.title,
                            component.title,
                            comType[component.type] || component.type,
                            (component.completed ? '완료' : '-'),
                            (component.use_attendance ? '출결 대상' : '출결 대상 아님'),
                            calcTime(component.due_at)
                        ]));
                        flag = true;
                    }
                }
            }
        }
        if (flag) tbody.appendChild(makeTableLine(['', '', '', '', '', '', '', '']));
        flag = false;
    }
    $.fn.setRowspan = function(num) {
        var mergeItem = "";
        var mergeCount = 0;
        var mergeRowNum = 0;
      
        $('tr').each(function(row) {
            if(row > 0 ){
                var item = $(':eq(' + num +')',$(this)).html();
                if (mergeItem != item ) {
                    mergeCount = 1;
                    mergeItem = item;
                    mergeRowNum = row;
                } else {
                    mergeCount = mergeCount + 1;
                    $("tr:eq("+mergeRowNum+") > td:eq("+num+")").attr("rowspan",mergeCount);
                    if ($('td:eq('+5+')',$(this)).css('background-color') == 'rgb(255, 204, 203)') {
                        $("tr:eq("+mergeRowNum+") > td:eq("+num+")").css('background-color', LIGHTRED);
                    }
                    $('td:eq('+num+')',$(this)).hide();
                }
            }
        })
    }
    $(tbody).setRowspan(0);
    $(tbody).setRowspan(1);
    $(tbody).setRowspan(2);
}



/**
 * Main Workflow
 */
var main = function() {
    getCourse();
    addButtton();
}
main();