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
    if (!list) return;
    // console.log('list', list);
    var item = document.createElement("li");
    item.classList.add("menu-item");
    item.classList.add("ic-app-header__menu-list-item");
    item.innerHTML = `
    <style>
        .hpIcon{ width: 28px; height:28px; background-image: url('data:image/png;base64,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'); }
    </style>
    <a class="ic-app-header__menu-list-link">
        <div class="menu-item-icon-container hpIcon" aria-hidden="true">
        </div>
        <div class="menu-item__text">
            HELPER
        </div>
    </a>
    `;

    let st = document.createElement('style');
    st.textContent = `.limited-length:hover:after {
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
    list.appendChild(st);
    // insert item to list at the second position
    list.insertBefore(item, list.childNodes[2]);
    // list.appendChild(item);

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
                url: `/learningx/api/v1/courses/${id}/modules?include_detail=true`,
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
        <style>
            #rn-table td:nth-child(1n + 4), #rn-table td:nth-child(2) {
                text-align: center;
            }
            #rn-table td:nth-child(2) {
                min-width: 70px;
            }
            #rn-table td:nth-child(4) {
                min-width: 85px;
            }
            #rn-table td:nth-child(5) {
                min-width: 40px;
            }
            #rn-table td:nth-child(6) {
                min-width: 120px;
            }
            #rn-table td:nth-child(7) {
                min-width: 120px;
            }
            #rn-table td {
                padding: 4px 8px;
                box-sizing: border-box;
            }
        </style>
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
    list.childNodes[2].classList.add(
        "ic-app-header__menu-list-item--active"
    );

    if (window.rn_Loading) {
        setTimeout(function () {
            drawTable();
        }, 500);
        return;
    }

    function makeTableLine(items, IDs, link, dlink) {
        var line = document.createElement("tr");

        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            var cell = document.createElement("td");
            if (items[4] == "완료" || items[4] == "오프라인 학습") cell.style.backgroundColor = LIGHTGREEN;
            else if (items[4] == "-") cell.style.backgroundColor = LIGHTRED;

            if (item && i == 0) {
                // 교과목 제목
                var link_title = document.createElement("a");
                link_title.setAttribute("href", `/courses/${IDs[0]}/external_tools/140`);
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
            } else if (item && i == 1) {
                // 주차
                let splitedSectionName = item.split('/');
                cell.textContent = splitedSectionName[0];
                cell.classList.add('limited-length');
                cell.setAttribute('full-name', item);
            } else if (item && i == 2) {
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
            } else if (item && i == 3) {
                if (dlink) {
                    var link_title = document.createElement("a");
                    link_title.setAttribute("href", `https://hycms.hanyang.ac.kr/index.php?module=xn_media_content2013&act=dispXn_media_content2013DownloadContent&content_id=${IDs[2]}`);
                    link_title.setAttribute("target", "_blank");
                    link_title.textContent = item;

                    cell.appendChild(link_title);
                } else {
                    cell.textContent = item;
                }
            } else {
                cell.textContent = item;
            }

            if (i <= 1) {
                cell.setAttribute('rn_id', IDs ? IDs[i] : 'asdf');
            }

            if (i == 5) {
                if (items[5] == "출석") {
                    cell.style.backgroundColor = LIGHTGREEN;
                } else if (items[5] == "-" || items[5] == "결석") {
                    cell.style.backgroundColor = LIGHTRED;
                }
            }

            line.appendChild(cell);
        }
        return line;
    }

    function calcTime(time) {
        if (!time) return '-';
        var t = parseInt((new Date(time) - new Date()) / 1000);
        return t < 0 ? '기한 마감' : `${parseInt(t / (3600 * 24))}D ${parseInt(t / 3600) % 24}H ${parseInt(t / 60) % 60}M`;
    }
    var tbody = document.querySelector('#rn-table tbody');

    var comType = {
        pdf: "PDF",
        file: "파일",
        zoom: "줌",
        movie: "동영상",
        mp4: "동영상",
        embed: "웹링크",
        assignment: "과제",
        video_conference: "화상 강의",
        discussion:"토론",
        smart_attendance:"스마트 출석",
        text:"텍스트",
    };
    const attendanceType = {
        absent: "결석",
        attendance: "출석"
    };
    var flag = false;
    for (var course of rn_AttendanceTable) {
        // console.log(course);

        for (var item of course.data) {
            // console.log(item);
            for (var mitem of item.module_items) {
                // console.log(mitem);

                // var link = `/learningx/coursebuilder/course/${course.course_id}/learn/${section.section_id}/unit/${unit.unit_id}/view?user_id=${rn_UserId}&user_login=${rn_UserLogin}&user_name=${encodeURIComponent(rn_UserName)}&user_email=${encodeURIComponent(rn_UserEmail)}&role=1&locale=ko&mode=default&component_id=${component.component_id}`;
                link = `/courses/${course.course_id}/modules/items/${mitem.module_item_id}?return_url=/courses/${course.course_id}/external_tools/140`;
                // https://learning.hanyang.ac.kr/courses/145397/modules/items/7801000?return_url=/courses/145397/external_tools/140

                // 강의명에서 강의 코드 제거
                let splitedCourseName = course.name.split('_');
                if (splitedCourseName.length != 1) {
                    splitedCourseName.shift();
                    course.name = splitedCourseName.join(' ');
                }

                function makeContentType(v) {
                    if (v.content_type == 'assignment') return '과제';
                    if (v.content_type == 'quiz') return '퀴즈';
                    if (v.content_type == 'discussion') return '토론';
                    if (v.content_data && v.content_data.item_content_type == 'video_conference') return '화상 강의';
                    if (v.content_data && v.content_data.item_content_data && v.content_data.item_content_data.content_type) return comType[v.content_data.item_content_data.content_type] || v.content_data.item_content_data.content_type;
                    console.log('undefined content type', v);
                    return '???';
                }

                tbody.appendChild(
                    makeTableLine(
                        [
                            course.name,
                            item.title, // subsection.title,
                            // item.title,
                            mitem.title,
                            makeContentType(mitem),
                            // comType[mitem.content_data.item_content_data.content_type] || mitem.content_data.item_content_data.content_type,
                            mitem.completed ? "완료" : "-",
                            mitem.content_data.use_attendance ? (attendanceType[mitem.attendance_status] || (mitem.attendance_status === "none" ? "-" : mitem.attendance_status)) : "출결 대상 아님",
                            calcTime(mitem.content_data.due_at),
                        ],
                        [
                            course.course_id,
                            item.module_id,
                            mitem.content_data && mitem.content_data.item_content_data && mitem.content_data.item_content_data.content_id,
                        ],
                        link,
                        mitem.content_data && mitem.content_data.item_content_data && mitem.content_data.item_content_data.view_url,
                    )
                );
                flag = true;
            }
        }
        if (flag)
            tbody.appendChild(makeTableLine(["", "", "", "", "", "", ""]));
        flag = false;
    }
    $.fn.setRowspan = function (num) {
        var mergeItem = "";
        var mergeCount = 0;
        var mergeRowNum = 0;

        $("tr").each(function (row) {
            if (row > 0) {
                var item = $("td:eq(" + num + ")", $(this)).attr('rn_id');
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
                        $("td:eq(" + 4 + ")", $(this)).css("background-color") ==
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
    // $(tbody).setRowspan(2);
};

var listenToggleMenu = function () {
    var btn = document.querySelector('#mobile-header > button');
    // console.log(btn);
    if (!btn) return;

    function drawMobileBtn() {
        var list = document.querySelector('body > span > span > div > div > span > ul');
        // console.log(list);
        if (!list) {
            setTimeout(function() {
                drawMobileBtn();
            }, 500);
            return;
        }
        var li = document.createElement('li');
        li.innerHTML = `
<a href="/#HYU-LMS-HELPER" cursor="pointer" class="fOyUs_bGBk eHiXd_bGBk eHiXd_brAJ eHiXd_doqw eHiXd_eESV eHiXd_cuTS" style="margin: 0px; cursor: pointer;"><span class="eHiXd_caGd"><span class="fOyUs_bGBk fOyUs_desw cGJLp_bGBk cGJLp_busO cGJLp_fZWR cGJLp_qOas"><span class="fOyUs_bGBk dHGMZ_bGBk" style="width: 3rem;"><img src="data:image/png;base64,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" /></span><span class="fOyUs_bGBk dHGMZ_bGBk"><span class="cjUyb_bGBk cjUyb_ycrn cjUyb_eQnG">HELPER</span></span></span></span></a>
`;
        li.classList.add('fOyUs_bGBk', 'dxCCp_bGBk', 'dxCCp_fLbg', 'dxCCp_ycrn', 'dxCCp_cfzP', 'dxCCp_cYsY');

        li.onclick = function (e) {
            history.replaceState(null, "hyu lms helper", "/#HYU-LMS-HELPER");
            drawTable();
            document.querySelector('body > span > span > div > div > span > span > span:nth-child(1) > button').click();
        }

        list.insertBefore(li, list.childNodes[0]);
        list.appendChild(document.createElement('li'));
    }

    btn.onclick = function (e) {
        drawMobileBtn();
    }
}

/**
 * Main Workflow
 */
var main = function () {
    listenToggleMenu();
    getCourse();
    addButtton();
    // console.log(document.querySelectorAll('iframe'));
};
main();
