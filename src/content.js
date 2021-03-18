/**
 * Hyper Data
 *
 * [rn_CourseStatus]
 * 0: NONE
 * 1: SUCCESS
 * 2: ERROR
 */

const LIGHTGREEN = "#C3FDB8";
const LIGHTRED = "#FFCCCB";
const MAXCOURSETITLELENGTH = 50;

/**
 * Add Button In Menu Tab
 */
var addButtton = function () {
    var list = document.querySelector("#menu");
    var item = document.createElement("li");
    item.classList.add("menu-item");
    item.classList.add("ic-app-header__menu-list-item");
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

    let style = document.createElement('style');
    style.textContent = `.limited-length:hover:after {
        position: absolute;
        content: attr(full-name);
        display: inline-block;
        padding: 5px;
        margin: 5px;
        background-color: black;
        color: white;
    }`

    item.onclick = function () {
        history.replaceState(null, "hyu lms helper", "/#HYU-LMS-HELPER");
        drawTable();
    };
    list.appendChild(style);
    list.appendChild(item);

    if (location.hash.indexOf("HYU-LMS-HELPER") !== -1) {
        drawTable();
    }
};

/**
 * Crawling Data
 *
 * https://learning.hanyang.ac.kr/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollments&sort=nickname
 * Get Course List
 */
var getCourse = function () {
    window.rn_Loading = true;
    window.rn_CourseStatus = 0;
    $.ajax({
            url: "/api/v1/users/self/favorites/courses?include[]=term&exclude[]=enrollments&sort=nickname",
            type: "GET",
        })
        .done(function (res) {
            window.rn_CourseData = res;
            $.ajax(
                `https://learning.hanyang.ac.kr/courses/${res[0].id}/external_tools/9`
            ).then((res) => {
                var rn_Form = document.createElement("div");
                rn_Form.innerHTML =
                    '<iframe class="hide" name="rn-frame"></iframe>' +
                    res
                    .slice(res.search("<form"), res.search("</form>") + 7)
                    .replace('id="tool_form"', 'id="rn-form"')
                    .replace('target="tool_content"', 'target="rn-frame"');
                document.body.appendChild(rn_Form);
                window.rn_UserId = document.querySelector(
                    "#rn-form #custom_user_id"
                ).value;
                window.rn_UserLogin = document.querySelector(
                    "#rn-form #custom_user_login"
                ).value;
                window.rn_UserEmail = document.querySelector(
                    "#rn-form #custom_user_email"
                ).value;
                window.rn_UserName = document.querySelector(
                    "#rn-form #custom_user_name_full"
                ).value;
                document.querySelector("#rn-form").submit();
                getAttendance();
            });
        })
        .fail(function () {
            window.rn_Loading = false;
            window.rn_CourseStatus = 2;
        });
};

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
var getAttendance = function () {
    window.rn_AttendanceTable = [];
    var rn_LoadingCount = rn_CourseData.length;
    window.rn_Loading = rn_CourseData.length > 0;
    for (var i = 0; i < rn_CourseData.length; ++i) {
        (function req(id, name) {
            var jwt =
                ((a = "xn_api_token"),
                    (b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)")),
                    b ? b[2] : null);
            if (jwt == null) {
                setTimeout(function () {
                    req(id, name);
                }, 500);
                return;
            }
            $.ajax({
                    headers: {
                        Authorization: "Bearer " + jwt,
                    },
                    url: `/learningx/api/v1/courses/${id}/sections/learnstatus_db?user_id=${rn_UserId}&user_login=${rn_UserLogin}&role=1`,
                    type: "GET",
                })
                .done(function (res) {
                    rn_AttendanceTable.push({
                        name,
                        data: res,
                        course_id: id,
                    });

                    if (!--rn_LoadingCount) {
                        window.rn_Loading = false;
                        window.rn_CourseStatus = 1;
                    }
                })
                .fail(function () {
                    rn_LoadingCount = -1;
                    window.rn_Loading = false;
                    window.rn_CourseStatus = 2;
                });
        })(rn_CourseData[i].id, rn_CourseData[i].name);
    }
};

/**
 * Draw Table
 */
var drawTable = function () {
    var wrapper = document.querySelector("#wrapper");
    wrapper.style.maxWidth = "none";
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
    var list = document.querySelector("#menu");
    for (var i = 0; i < list.childNodes.length; ++i) {
        list.childNodes[i].classList &&
            list.childNodes[i].classList.remove(
                "ic-app-header__menu-list-item--active"
            );
    }
    list.childNodes[list.childNodes.length - 1].classList.add(
        "ic-app-header__menu-list-item--active"
    );

    if (window.rn_Loading) {
        setTimeout(function () {
            drawTable();
        }, 500);
        return;
    }

    function makeTableLine(items, IDs, link) {
        var line = document.createElement("tr");

        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            var cell = document.createElement("td");
            if (items[5] == "완료") cell.style.backgroundColor = LIGHTGREEN;
            else if (items[5] == "-") cell.style.backgroundColor = LIGHTRED;

            if (item && (i == 1 || i == 2)) {
                // 주차
                let splitedSectionName = item.split('/');
                cell.textContent = splitedSectionName[0];
                cell.classList.add('limited-length');
                cell.setAttribute('full-name', item);
            } else if (i == 3) {
                // 학습 제목
                var link_title = document.createElement("a");
                link_title.setAttribute("href", link);
                link_title.setAttribute("target", "_blank");

                if (item.length > MAXCOURSETITLELENGTH) {
                    let limitedTitle = item.substr(0, MAXCOURSETITLELENGTH) + "...";
                    link_title.textContent = limitedTitle;
                    cell.classList.add('limited-length');
                    cell.setAttribute('full-name', item);
                } else {
                    link_title.textContent = item;
                }

                cell.appendChild(link_title);
            } else {
                cell.textContent = item;
            }

            if (i <= 2) {
                cell.setAttribute('rn_id', IDs ? IDs[i] : '');
            }

            if (i == 6) {
                if (items[6] == "출석") {
                    cell.style.backgroundColor = LIGHTGREEN;
                } else if (items[6] == "-" || items[6] == "결석") {
                    cell.style.backgroundColor = LIGHTRED;
                }
            }

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
        pdf: "PDF",
        movie: "동영상",
        embed: "웹링크",
        assignment: "과제",
        video_conference: "화상 강의",
    };
    const attendanceType = {
        absent: "결석",
        attendance: "출석"
    };
    var flag = false;
    for (var course of rn_AttendanceTable) {
        for (var section of course.data.sections) {
            if (!section.has_component) continue;
            for (var subsection of section.subsections) {
                for (var unit of subsection.units) {
                    for (var component of unit.components) {
                        var link = `/learningx/coursebuilder/course/${course.course_id}/learn/${section.section_id}/unit/${unit.unit_id}/view?user_id=${rn_UserId}&user_login=${rn_UserLogin}&user_name=${encodeURIComponent(rn_UserName)}&user_email=${encodeURIComponent(rn_UserEmail)}&role=1&locale=ko&mode=default&component_id=${component.component_id}`;

                        // 동영상 바로보기
                        // var link = `/learningx/coursebuilder/view/contents/${component.commons_content.content_id}?user_login=${rn_UserLogin}&course_id=${course.course_id}&section_id=${section.section_id}&component_id=${component.component_id}&role=1&locale=ko&content_type=${component.type}&use_content_progress=true`

                        // 강의명에서 강의 코드 제거
                        let splitedCourseName = course.name.split('_');
                        if (splitedCourseName.length != 1) {
                            splitedCourseName.shift();
                            course.name = splitedCourseName.join(' ');
                        }

                        tbody.appendChild(
                            makeTableLine(
                                [
                                    course.name,
                                    section.title,
                                    subsection.title,
                                    component.title,
                                    comType[component.type] || component.type,
                                    component.completed ? "완료" : "-",
                                    component.use_attendance ? (attendanceType[component.attendance_status] || (component.attendance_status === "none" ? "-" : component.attendance_status)) : "출결 대상 아님",
                                    calcTime(component.due_at),
                                ],
                                [
                                    course.course_id,
                                    section.section_id,
                                    unit.unit_id
                                ],
                                link
                            )
                        );
                        flag = true;
                    }
                }
            }
        }
        if (flag)
            tbody.appendChild(makeTableLine(["", "", "", "", "", "", "", ""]));
        flag = false;
    }
    $.fn.setRowspan = function (num) {
        var mergeItem = "";
        var mergeCount = 0;
        var mergeRowNum = 0;

        $("tr").each(function (row) {
            if (row > 0) {
                var item = $(":eq(" + num + ")", $(this)).attr('rn_id');
                if (mergeItem != item) {
                    mergeCount = 1;
                    mergeItem = item;
                    mergeRowNum = row;
                } else {
                    mergeCount = mergeCount + 1;
                    $("tr:eq(" + mergeRowNum + ") > td:eq(" + num + ")").attr(
                        "rowspan",
                        mergeCount
                    );
                    if (
                        $("td:eq(" + 5 + ")", $(this)).css("background-color") ==
                        "rgb(255, 204, 203)"
                    ) {
                        $("tr:eq(" + mergeRowNum + ") > td:eq(" + num + ")").css(
                            "background-color",
                            LIGHTRED
                        );
                    }
                    $("td:eq(" + num + ")", $(this)).hide();
                }
            }
        });
    };
    $(tbody).setRowspan(0);
    $(tbody).setRowspan(1);
    $(tbody).setRowspan(2);
};

/**
 * Main Workflow
 */
var main = function () {
    getCourse();
    addButtton();
};
main();