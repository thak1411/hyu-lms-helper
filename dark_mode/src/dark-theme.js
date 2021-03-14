const darkmode = document.createElement('style');

darkmode.textContent = `
.ic-Layout-contentMain{
background-color: #222;
}

.PlannerApp div:first-child{
color:white
}

#planner-today-btn{
background-color:#222 !important;
border:none;
}

.ic-Dashboard-header__layout{
background-color: #333;
border:none !important;
border-radius : 0 0 10px 10px;
padding:0 0 0 20px;
color:white;
}

.PlannerHeader-styles__root{
background: #333;
border-radius: 5px;
}

.Day-styles__root{
padding: 10px;
background: #444;
color: #fff;
border-radius:10px;
}

.PlannerHeader-styles__root button, .PlannerItem-styles__due span, .PlannerItem-styles__score span, .PlannerItem-styles__title a, .PlannerItem-styles__type span, .PlannerItem-styles__title a:hover, .tray-with-space-for-global-nav div ul li a, .tray-with-space-for-global-nav div ul li a:hover, .tray-with-space-for-global-nav div h2, .tray-with-space-for-global-nav div ul li div,.tray-with-space-for-global-nav div,.tray-with-space-for-global-nav div div div label span,.course-title,
.mini-cal-header,.current_month {
color:white !important;
}

a{
text-decoration: none !important;
}

.EmptyDays-styles__root{
background:none !important;
}

.EmptyDays-styles__nothingPlanned span{
background-color:#333;
padding:10px;
border-radius:10px;
}

.Grouping-styles__overlay{
filter:brightness(0.5)
}

.ic-app-footer{
margin : 0px !important;
padding: 12px 24px !important;
border-top:none !important;
background-color: black !important;
color:white;
}

.tray-with-space-for-global-nav div{
background-color: #333;
color:grey;
}

#rn-table{
margin-top:10px;
background-color: #444;

}
#rn-table thead{
color:white;
}
#rn-table tbody{
color:black;
}

#new_activity_button{
margin-left: 20px;

}
.ic-app-header{
background-color:black !important;
}
.ic-app-header__menu-list-item.ic-app-header__menu-list-item--active .ic-app-header__menu-list-link{
background: #333;
}

.ic-app-header__menu-list-item.ic-app-header__menu-list-item--active .ic-app-header__menu-list-link div, .ic-app-header__menu-list-item.ic-app-header__menu-list-item--active .ic-app-header__menu-list-link div svg,.events_list, .section a{
color:white !important;
fill:white;
}

.ic-Layout-watermark{
background-color: #222;
}

.fc-day-grid-container{
background-color: #333;
border-color:black;
color:white;
}
.fc-unthemed tbody{
border:none !important;
}

.fc-widget-header{
color:white;
}
.header-bar{
padding:10px;
border-radius: 10px;
border:none !important;
background-color:#444 !important;
color:white;
}

#application{
background-color: #222;
}

.profile-tray{
background-color: #333;
}

.Grouping-styles__title{
background-color: #fff4 !important;
color:white !important;

}

#wiki_page_show{
color:white;
}
.button-sidebar-wide{
background-color: #333;
color:white;
}

#breadcrumbs,#breadcrumbs a{
background-color:transparent;
color:white !important;
}

.conversations .panel{
background-color:#333
}
.conversations .panel button,.conversations .panel select, .conversations .ac-input-box{
color:white;
background-color: transparent;
}
.conversations input{
color:white !important;
}

.message-detail{
padding:10px;
color:white;
}
.messages ,.messages li{
background-color:#444 !important;
color:white !important;
}
.messages .date, .messages .author, .messages .subject{
color:white !important;
}
.messages .summary{
color:#aaa !important;
}
.messages .message-count{
background-color:black;
}
.messages .read-state{
filter:brightness(1.5);
}

#announcements_on_home_page, .ic-Layout-contentMain{
color:white;
}

#group_categories_tabs .tab-panel{
background-color:black;
color:white;

}

.ic-Table.ic-Table--striped tbody tr:nth-child(odd){
background-color:#333
}
.user_content iframe, .user_content video{
background-color:white;
padding:10px;
}
#right-side-wrapper{
color:white;
}
.mini_calendar .selected{
background-color: #444 !important;
}

#right-side-wrapper th,
#right-side-wrapper td{
background-color:transparent;
}
#syllabus tr.date.date_passed td, #syllabus tr.date.date_passed th{
background-color:#333 !important;
}
#syllabus tr.date.related td, #syllabus tr.date.related th, #syllabus tr.date.selected td, #syllabus tr.date.selected th{
background-color: #444;
}

.headerBar{
background-color: #444 !important;
}
.headerBar input, .headerBar label, .headerBar button, .headerBar .al-trigger{
background-color: transparent !important;
color:white !important;
}

.announcements-v2__wrapper select,.announcements-v2__wrapper input{
background-color: transparent !important;
color:white !important;
}
.ic-app-main-content iframe{
padding:10px;
/*filter:invert(1) brightness(3);*/
}

#GradeSummarySelectMenuGroup span,#GradeSummarySelectMenuGroup select{
color:white !important;
background-color:transparent;
}
#assignments{
background-color:#333;
color:white;
}

.ic-Table.ic-Table--hover-row tbody tr:hover{
background-color:#444;
}

.navigation-tray-container .courses-tray{
background-color:#333 !important;
}


#calendar-app .fc-event, #calendar-drag-and-drop-container .fc-event{
background-color:black !important;
filter: brightness(1.5);
}

.fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-popover{
border:none;
}
#minical{
background-color: #333;
color:white;
border:none;
}

.sticky-toolbar .header-bar button, .sticky-toolbar .header-bar a, .sticky-toolbar .header-bar span{
color:white !important;
background-color: transparent;
text-decoration:none !important;
}
.sticky-toolbar .header-bar button .active{
background-color:white !important;
color:#333 !important;
}

#context-list-holder{
background-color:transparent !important;
}

#minical .fc-widget-content{
border:none;
color:white;
}

#minical .fc-bg .fc-state-highlight{
background-color: #666;
}
.fc td.fc-today{
border:none;
}

#context-list .context_list_context:hover{
background-color: #444
}

.fc-toolbar button,.fc-toolbar h2{
color:white !important;
}

.ui-dialog .ui-dialog-titlebar.ui-widget-header, .ui-dialog .ui-datepicker .ui-widget-header.ui-datepicker-header, .ui-datepicker .ui-dialog .ui-widget-header.ui-datepicker-header{
color:white !important;
background-color:#222;
}
#edit_event{
background-color:#333;

}
.ui-tabs .ui-tabs-panel{
background-color:#444;
color:white;
}

.ui-tabs button, .ui-tabs input, .ui-tabs-panel button, .ui-tabs-panel input{
background-color:transparent;
color:white;
}

.ic-Layout-contentMain table{
color:white;
background-color:transparent;
}

`;
document.head.append(darkmode);
$('#wrapper').animate({opacity:'1'},500);