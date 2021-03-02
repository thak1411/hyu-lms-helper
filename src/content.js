/**
 * Hyper Data
 * 
 * [rn_CourseStatus]
 * 0: NONE
 * 1: SUCCESS
 * 2: ERROR
 */



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
        window.rn_Loading = false;
        window.rn_CourseStatus = 1;
        window.rn_CourseData = res;
        getAttendance();
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
    window.rn_UserId = $('#custom_user_id')[0].value;
    window.rn_UserLogin = $('#custom_user_login')[0].value;
    for (var i = 0; i < rn_CourseData.length; ++i) {
        (function(id, name) {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + (a = "xn_api_token", b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)"), b ? b[2] : null)
                },
                url: `/learningx/api/v1/courses/${id}/sections/learnstatus_db?user_id=${rn_UserId}&user_login=${rn_UserLogin}&role=1`,
                type: 'GET'
            })
            .done(function(res) {
                rn_AttendanceTable.push({
                    name,
                    data: res,
                });
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
                    <h1 class="ic-Dashboard-header__title"><span class="hidden-phone">대시보드</span></h1>
                </div>
            </div>
            <table id="rn-table" style="width: 100%;">
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

    function makeTableLine(items) {
        var line = document.createElement('tr');
        for (var item of items) {
            var cell = document.createElement('td');
            cell.textContent = item;
            line.appendChild(cell);
        }
        return line;
    }
    var tbody = document.querySelector('#rn-table tbody');
    for (var course of rn_AttendanceTable) {
        for (var section of course.data.sections) {
            if (!section.has_component) continue;
            for (var subsection of section.subsections) {
                for (var unit of subsection.units) {
                    for (var component of unit.components) {
                        tbody.appendChild(makeTableLine([course.name, section.title, subsection.title, component.title, component.type, component.completed, component.use_attendance, component.due_at]));
                    }
                }
            }
        }
    }
}



/**
 * Main Workflow
 */
var main = function() {
    setTimeout(() => {
        getCourse();
        addButtton();
    }, 1000);
}
main();