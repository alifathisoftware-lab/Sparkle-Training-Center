import { createApp, h, ref, computed } from 'vue';
import { ConfigProvider, Table, Select, Tag, Alert, Button } from 'ant-design-vue';

// Transcribed from the supplied IGCSE timetable. No AM/PM is specified in the image.
const early=['Chemistry · الكيمياء'];
const other=['Biology · الأحياء','Physics · الفيزياء','English 2nd · الإنجليزية لغة ثانية'];
const late=['Arabic 1st · العربية لغة أولى','English 1st · الإنجليزية لغة أولى'];
const rows=[
 {key:'sat',day:'السبت',first:early,second:['Math · الرياضيات']},
 {key:'sun',day:'الأحد',first:other,second:late},
 {key:'mon',day:'الإثنين',first:early,second:['Math · الرياضيات']},
 {key:'tue',day:'الثلاثاء',first:other,second:late},
 {key:'wed',day:'الأربعاء',first:early,second:['Math · الرياضيات']},
 {key:'thu',day:'الخميس',first:other,second:late},
];
const subjects=[...new Set(rows.flatMap(row=>[...row.first,...row.second]))];
const columns=[{title:'اليوم',dataIndex:'day',key:'day',width:110},
 {title:'4–6',dataIndex:'first',key:'first',customRender:({text})=>h('div',{class:'subject-tags'},text.map(subject=>h(Tag,{color:'purple'},()=>subject)))},
 {title:'6–8',dataIndex:'second',key:'second',customRender:({text})=>h('div',{class:'subject-tags'},text.map(subject=>h(Tag,{color:'gold'},()=>subject)))}];

createApp({setup(){
 const subject=ref('all');
 const filtered=computed(()=>rows.filter(row=>subject.value==='all'||[...row.first,...row.second].includes(subject.value)).map(row=>subject.value==='all'?row:{...row,first:row.first.filter(x=>x===subject.value),second:row.second.filter(x=>x===subject.value)}));
 return ()=>h(ConfigProvider,{direction:'rtl',theme:{token:{colorPrimary:'#7638ac',borderRadius:8,fontFamily:'IBM Plex Sans Arabic, Tahoma, sans-serif'}}},()=>[
   h(Alert,{type:'info',showIcon:true,message:'جدول مرجعي من إعلان المركز — يُرجى تأكيد المواعيد قبل التسجيل.',description:'الفترتان 4–6 و6–8 كما وردتا في الصورة؛ لم يُذكر فيها صباحًا أو مساءً. ظهور عدة مواد في الفترة نفسها يعكس مجموعات مختلفة.'}),
   h('div',{class:'schedule-controls'},[
     h('label',{for:'subject-filter'},'اختر المادة'),
     h(Select,{id:'subject-filter',value:subject.value,'onUpdate:value':v=>subject.value=v,options:[{value:'all',label:'كل المواد'},...subjects.map(value=>({value,label:value}))],'aria-label':'تصفية جدول الحصص حسب المادة',style:{width:'min(100%, 340px)'}}),
     h(Button,{onClick:()=>subject.value='all'},()=> 'عرض الكل')
   ]),
   h(Table,{columns,dataSource:filtered.value,pagination:false,rowKey:'key',scroll:{x:660},bordered:true,locale:{emptyText:'لا توجد حصص لهذه المادة'}}),
   h('p',{class:'note'},'المواد العلمية والرياضيات باللغة الإنجليزية، مع مجموعات لمواد الإنجليزية والعربية كما في الجدول.')
 ]);
}}).mount('#schedule-app');
