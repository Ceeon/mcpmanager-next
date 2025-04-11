(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2971:function(e,s,t){Promise.resolve().then(t.bind(t,1119))},1119:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return Home}});var a=t(7437),n=t(2265),r=t(612),i=t(4811),l=t(5035),o=t(6224),c=t(9883),d=t(1827),m=t(2549),x=t(3523),g=t(7158),f=t(6714),u=t(7444),h=t(9617),p=t(2442),j=t(6245),y=t(1295),v=t(1038),b=t(5042);function parseJsonConfig(e){let s={success:!1,config:null,error:null};try{let t=e.trim();if(t.includes('"mcpServers"')){let e=JSON.parse(t);if(e.mcpServers){let t=Object.keys(e.mcpServers)[0];if(t)return s.config=e.mcpServers[t],s.success=!0,s}}let a=JSON.parse(t);a&&"object"==typeof a?(s.config={},a.url&&(s.config.url=a.url),s.config.command=a.command||null,s.config.args=Array.isArray(a.args)?a.args:[],s.config.env=a.env||{},s.success=!0):s.error="无法识别的配置格式"}catch(e){s.error=e.message}return s}function convertConfig(e,s){if(!e)return{command:null,args:[],env:{}};let t=JSON.parse(JSON.stringify(e));if(t.url)return t;t.command||(t.command=null),t.args||(t.args=[]),t.env||(t.env={});try{if("windows"===s){if(t.command&&"cmd"!==t.command){let e=t.command,s=[...t.args];return{command:"cmd",args:["/c",e,...s],env:t.env}}}else if("mac"===s&&"cmd"===t.command&&t.args&&t.args.length>=2&&"/c"===t.args[0]){let e=t.args[1],s=t.args.slice(2);return{command:e,args:s,env:t.env}}}catch(e){console.error("配置转换错误:",e)}return t}function getConfigPreview(e){if(!e||0===Object.keys(e).length)return"无配置信息";let s=e.command||"无命令",t=Array.isArray(e.args)&&e.args.length>0?"".concat(e.args.length," 参数"):"无参数",a=e.env&&Object.keys(e.env).length>0?"".concat(Object.keys(e.env).length," 环境变量"):"无环境变量";return"".concat(s," • ").concat(t," • ").concat(a)}function createFullConfig(e){let s=!(arguments.length>1)||void 0===arguments[1]||arguments[1],t=s?e.filter(e=>e.enabled):e;if(0===t.length)return null;let a={};return t.forEach(e=>{a[e.name]=e.config}),{mcpServers:a}}function Home(){let[e,s]=(0,n.useState)([]),[t,N]=(0,n.useState)(""),[w,C]=(0,n.useState)("windows"),[S,k]=(0,n.useState)(null),[M,T]=(0,n.useState)(!1),[F,Z]=(0,n.useState)(!1),[E,O]=(0,n.useState)(!1),[J,A]=(0,n.useState)(!1),[V,q]=(0,n.useState)(null),[D,P]=(0,n.useState)(""),[L,W]=(0,n.useState)("{}"),[_,z]=(0,n.useState)(""),[I,R]=(0,n.useState)(!1),[B,H]=(0,n.useState)("");(0,n.useEffect)(()=>{let e=localStorage.getItem("mcpManagerData");if(e)try{let t=JSON.parse(e);Array.isArray(t.servers)&&s(t.servers),t.platform&&C(t.platform)}catch(t){console.error("加载服务器数据失败:",t);let e=localStorage.getItem("servers");if(e)try{let t=JSON.parse(e);s(t)}catch(e){console.error("加载旧版服务器数据失败:",e)}}},[]);let saveToLocalStorage=s=>{localStorage.setItem("mcpManagerData",JSON.stringify({servers:s||e,platform:w}))},showToastMessage=e=>{H(e),R(!0),setTimeout(()=>R(!1),3e3)},openAddModal=()=>{T(!0),P(""),W("{}"),z("")},closeAddModal=()=>{T(!1)},validateConfig=()=>{try{return JSON.parse(L),z(""),!0}catch(e){return z("JSON格式错误: ".concat(e.message)),!1}},toggleServerEnabled=t=>{let a=e.map(e=>e.id===t?{...e,enabled:!e.enabled}:e);s(a),saveToLocalStorage(a);let n=a.find(e=>e.id===t);showToastMessage("服务器 ".concat(n.name," ").concat(n.enabled?"已启用":"已禁用"))},deleteServer=t=>{if(window.confirm("确定要删除此服务器吗？")){let a=e.filter(e=>e.id!==t);s(a),saveToLocalStorage(a),showToastMessage("服务器已删除")}},copySingleServerConfig=e=>{let s={[e.name]:e.config},t=JSON.stringify({mcpServers:s},null,2);navigator.clipboard.writeText(t).then(()=>showToastMessage("服务器 ".concat(e.name," 配置已复制到剪贴板"))).catch(e=>showToastMessage("复制失败，请重试"))},closeDetailModal=()=>{Z(!1),q(null)},openEditModal=e=>{q(e),P(e.name),W(JSON.stringify(e.config,null,2)),z(""),O(!0)},closeEditModal=()=>{O(!1),q(null)},toggleExpandServer=e=>{k(S===e?null:e)},handlePlatformChange=e=>{if(e!==w){C(e);let t=convertAllConfigs(e);s(t),saveToLocalStorage(t),showToastMessage("平台已切换至 ".concat("windows"===e?"Windows":"Mac"))}},convertAllConfigs=s=>e.map(e=>({...e,config:convertConfig(e.config,s)})),closeContactModal=()=>{A(!1)};return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-gray-50",children:[(0,a.jsx)("header",{className:"bg-white shadow-sm sticky top-0 z-10",children:(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"flex justify-between h-16 items-center",children:[(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsxs)("div",{className:"flex-shrink-0 flex items-center",children:[(0,a.jsx)(r.Z,{className:"h-8 w-8 text-indigo-600"}),(0,a.jsx)("h1",{className:"ml-2 text-2xl font-bold text-gray-900",children:"MCP"})]})}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsxs)("div",{className:"bg-gray-100 rounded-md hidden sm:flex",children:[(0,a.jsxs)("button",{onClick:()=>handlePlatformChange("windows"),className:"px-3 py-2 text-sm font-medium rounded-l-md flex items-center ".concat("windows"===w?"bg-indigo-600 text-white":"text-gray-700 hover:bg-gray-200"),children:[(0,a.jsx)(i.Z,{className:"h-4 w-4 mr-1.5"}),"Windows"]}),(0,a.jsxs)("button",{onClick:()=>handlePlatformChange("mac"),className:"px-3 py-2 text-sm font-medium rounded-r-md flex items-center ".concat("mac"===w?"bg-indigo-600 text-white":"text-gray-700 hover:bg-gray-200"),children:[(0,a.jsx)(l.Z,{className:"h-4 w-4 mr-1.5"}),"Mac"]})]}),(0,a.jsxs)("button",{onClick:()=>{let s=e.filter(e=>!1!==e.enabled);if(0===s.length){showToastMessage("没有开启的服务器配置可供复制");return}let t=createFullConfig(s),a=JSON.stringify(t,null,2);navigator.clipboard.writeText(a).then(()=>showToastMessage("配置已复制到剪贴板")).catch(e=>showToastMessage("复制失败，请重试"))},className:"hidden sm:inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(o.Z,{className:"h-4 w-4 mr-2"}),"复制配置"]}),(0,a.jsxs)("button",{onClick:openAddModal,className:"inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(c.Z,{className:"h-4 w-4 mr-1.5"}),"添加服务器"]})]})]})})}),(0,a.jsx)("main",{className:"flex-grow",children:(0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,a.jsxs)("div",{className:"md:flex md:items-center md:justify-between mb-6",children:[(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold leading-7 text-gray-900 sm:truncate",children:"服务器列表"}),(0,a.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:"管理和监控您的所有服务器"})]}),(0,a.jsx)("div",{className:"mt-4 md:mt-0 md:ml-4 relative",children:(0,a.jsxs)("div",{className:"relative rounded-md shadow-sm",children:[(0,a.jsx)("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:(0,a.jsx)(d.Z,{className:"h-4 w-4 text-gray-400"})}),(0,a.jsx)("input",{type:"text",value:t,onChange:e=>N(e.target.value),className:"focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md",placeholder:"搜索服务器..."}),t&&(0,a.jsx)("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:(0,a.jsx)("button",{onClick:()=>N(""),className:"text-gray-400 hover:text-gray-500",children:(0,a.jsx)(m.Z,{className:"h-4 w-4"})})})]})})]}),(0,a.jsx)("div",{className:"bg-white shadow overflow-hidden sm:rounded-md",children:0===e.length?(0,a.jsx)("div",{className:"py-12",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h14M12 5v14"})}),(0,a.jsx)("h3",{className:"mt-2 text-sm font-medium text-gray-900",children:"尚无服务器"}),(0,a.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:'点击"添加服务器"按钮开始创建您的第一个服务器配置'}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsxs)("button",{type:"button",onClick:openAddModal,className:"inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(c.Z,{className:"h-4 w-4 mr-1.5"}),"添加服务器"]})})]})}):(0,a.jsx)("ul",{className:"divide-y divide-gray-200",children:e.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())).map(e=>(0,a.jsxs)("li",{className:"px-6 py-4 ".concat(!1===e.enabled?"bg-gray-50":""),children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"flex-shrink-0 cursor-pointer mr-3",onClick:()=>toggleExpandServer(e.id),children:S===e.id?(0,a.jsx)(x.Z,{className:"h-5 w-5 text-gray-500"}):(0,a.jsx)(g.Z,{className:"h-5 w-5 text-gray-500"})}),(0,a.jsxs)("div",{className:"min-w-0 flex-1 flex items-center",children:[(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)("div",{className:"h-10 w-10 rounded-full ".concat(!1===e.enabled?"bg-gray-200":"bg-indigo-100"," flex items-center justify-center"),children:(0,a.jsx)(f.Z,{className:"h-6 w-6 ".concat(!1===e.enabled?"text-gray-400":"text-indigo-600")})})}),(0,a.jsx)("div",{className:"min-w-0 flex-1 px-4",children:(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium ".concat(!1===e.enabled?"text-gray-500":"text-indigo-600"," truncate"),children:e.name}),(0,a.jsx)("div",{className:"mt-1 flex items-center flex-wrap gap-2",children:(0,a.jsxs)("span",{className:"text-xs ".concat(!1===e.enabled?"text-gray-400":"text-gray-500"," flex items-center"),children:[(0,a.jsx)(u.Z,{className:"h-3 w-3 mr-1"}),getConfigPreview(e.config)]})})]})})]}),(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)("button",{onClick:()=>toggleServerEnabled(e.id),className:"relative inline-flex items-center h-6 rounded-full w-11 ".concat(!1!==e.enabled?"bg-indigo-600":"bg-gray-200"," transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),children:(0,a.jsx)("span",{className:"".concat(!1!==e.enabled?"translate-x-6":"translate-x-1"," inline-block w-4 h-4 transform bg-white rounded-full transition-transform")})})})]}),S===e.id&&(0,a.jsxs)("div",{className:"mt-4 pt-3 border-t border-gray-100",children:[(0,a.jsxs)("div",{className:"bg-gray-50 p-3 rounded-md mb-3",children:[(0,a.jsxs)("div",{className:"mb-2 text-xs text-gray-500 flex items-center",children:["当前显示的是",(0,a.jsx)("span",{className:"font-medium flex items-center mx-1",children:"windows"===w?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.Z,{className:"h-3 w-3 mr-0.5"}),"Windows"]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.Z,{className:"h-3 w-3 mr-0.5"}),"Mac"]})}),"平台配置："]}),(0,a.jsx)("pre",{className:"text-xs font-mono text-gray-700 overflow-x-auto whitespace-pre-wrap",children:JSON.stringify(e.config,null,2)})]}),(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsxs)("button",{onClick:()=>openEditModal(e),className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(h.Z,{className:"h-3 w-3 mr-1.5"}),"编辑"]}),(0,a.jsxs)("button",{onClick:()=>copySingleServerConfig(e),className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(o.Z,{className:"h-3 w-3 mr-1.5"}),"复制"]}),(0,a.jsxs)("button",{onClick:()=>deleteServer(e.id),className:"inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:[(0,a.jsx)(m.Z,{className:"h-3 w-3 mr-1.5"}),"删除"]})]})]})]},e.id))})})]})}),(0,a.jsx)(v.u,{appear:!0,show:M,as:n.Fragment,children:(0,a.jsxs)(b.Vq,{as:"div",className:"relative z-10",onClose:closeAddModal,children:[(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,a.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,a.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsxs)(b.Vq.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[(0,a.jsxs)(b.Vq.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900 flex justify-between items-center",children:[(0,a.jsx)("span",{children:"添加新服务器"}),(0,a.jsx)("button",{type:"button",className:"text-gray-400 hover:text-gray-500",onClick:closeAddModal,children:(0,a.jsx)(m.Z,{className:"h-5 w-5"})})]}),(0,a.jsxs)("div",{className:"mt-4 space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"server-name",className:"block text-sm font-medium text-gray-700",children:"服务器名称"}),(0,a.jsx)("input",{type:"text",id:"server-name",value:D,onChange:e=>P(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",placeholder:"输入服务器名称"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"server-config",className:"flex justify-between text-sm font-medium text-gray-700",children:[(0,a.jsx)("span",{children:"JSON配置"}),(0,a.jsxs)("span",{className:"text-xs text-gray-500 flex items-center",children:["当前平台:","windows"===w?(0,a.jsxs)("span",{className:"flex items-center ml-1",children:[(0,a.jsx)(i.Z,{className:"h-3 w-3 mr-0.5"}),"Windows"]}):(0,a.jsxs)("span",{className:"flex items-center ml-1",children:[(0,a.jsx)(l.Z,{className:"h-3 w-3 mr-0.5"}),"Mac"]})]})]}),(0,a.jsx)("textarea",{id:"server-config",value:L,onChange:e=>W(e.target.value),rows:5,className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono",placeholder:'{"command": "npx", "args": ["-y", "mcprouter"], "env": {"SERVER_KEY": "value"}}'}),(0,a.jsx)("p",{className:"mt-1 text-xs text-gray-500",children:"windows"===w?(0,a.jsxs)("span",{className:"flex items-center",children:[(0,a.jsx)(i.Z,{className:"h-3 w-3 mr-0.5"}),"在Windows平台上，命令会自动转换为CMD格式"]}):(0,a.jsxs)("span",{className:"flex items-center",children:[(0,a.jsx)(l.Z,{className:"h-3 w-3 mr-0.5"}),"在Mac平台上，命令会以原始格式运行"]})}),_&&(0,a.jsx)("p",{className:"mt-1 text-sm text-red-600",children:_}),(0,a.jsxs)("button",{type:"button",onClick:validateConfig,className:"mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(p.Z,{className:"h-3 w-3 mr-1.5"}),"验证JSON"]})]})]}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsxs)("button",{type:"button",className:"inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:()=>{if(!D.trim()){showToastMessage("请输入服务器名称");return}if(!validateConfig())return;let t=parseJsonConfig(L);if(!t.success){z(t.error||"无法解析配置");return}let a=convertConfig(t.config,w),n={id:Date.now(),name:D.trim(),config:a,enabled:!0,createdAt:new Date().toISOString()},r=[...e,n];s(r),saveToLocalStorage(r),closeAddModal(),showToastMessage("服务器添加成功")},children:[(0,a.jsx)(j.Z,{className:"h-4 w-4 mr-1.5"}),"保存服务器"]})})]})})})})]})}),(0,a.jsx)(v.u,{appear:!0,show:F,as:n.Fragment,children:(0,a.jsxs)(b.Vq,{as:"div",className:"relative z-10",onClose:closeDetailModal,children:[(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,a.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,a.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsx)(b.Vq.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:V&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(b.Vq.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900 flex justify-between items-center",children:[(0,a.jsx)("span",{children:"服务器详情"}),(0,a.jsx)("button",{type:"button",className:"text-gray-400 hover:text-gray-500",onClick:closeDetailModal,children:(0,a.jsx)(m.Z,{className:"h-5 w-5"})})]}),(0,a.jsxs)("div",{className:"mt-4",children:[(0,a.jsxs)("div",{className:"bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"服务器名称"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0",children:V.name})]}),(0,a.jsxs)("div",{className:"bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"状态"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0",children:(0,a.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(!1!==V.enabled?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800"),children:!1!==V.enabled?"已启用":"已禁用"})})]}),(0,a.jsxs)("div",{className:"bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"命令"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono",children:V.config.command||"无"})]}),(0,a.jsxs)("div",{className:"bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"参数"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-mono",children:V.config.args&&V.config.args.length>0?V.config.args.join(" "):"无参数"})]}),(0,a.jsxs)("div",{className:"bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"环境变量"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0",children:V.config.env&&Object.keys(V.config.env).length>0?(0,a.jsx)("ul",{className:"border border-gray-200 rounded-md divide-y divide-gray-200",children:Object.entries(V.config.env).map(e=>{let[s,t]=e;return(0,a.jsx)("li",{className:"pl-3 pr-4 py-2 flex items-center justify-between text-sm",children:(0,a.jsx)("div",{className:"w-0 flex-1 flex items-center",children:(0,a.jsxs)("span",{className:"ml-2 flex-1 w-0 truncate font-mono",children:[s," = ",t]})})},s)})}):(0,a.jsx)("span",{className:"text-gray-500",children:"无环境变量"})})]}),(0,a.jsxs)("div",{className:"bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",children:[(0,a.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"创建时间"}),(0,a.jsx)("dd",{className:"mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0",children:new Date(V.createdAt).toLocaleString()})]})]}),(0,a.jsxs)("div",{className:"mt-6 flex space-x-3",children:[(0,a.jsxs)("button",{type:"button",className:"inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:()=>{closeDetailModal(),openEditModal(V)},children:[(0,a.jsx)(h.Z,{className:"h-4 w-4 mr-1.5"}),"编辑"]}),(0,a.jsxs)("button",{type:"button",className:"inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:()=>{copySingleServerConfig(V),closeDetailModal()},children:[(0,a.jsx)(o.Z,{className:"h-4 w-4 mr-1.5"}),"复制配置"]})]})]})})})})})]})}),(0,a.jsx)(v.u,{appear:!0,show:E,as:n.Fragment,children:(0,a.jsxs)(b.Vq,{as:"div",className:"relative z-10",onClose:closeEditModal,children:[(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,a.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,a.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsxs)(b.Vq.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[(0,a.jsxs)(b.Vq.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900 flex justify-between items-center",children:[(0,a.jsx)("span",{children:"编辑服务器"}),(0,a.jsx)("button",{type:"button",className:"text-gray-400 hover:text-gray-500",onClick:closeEditModal,children:(0,a.jsx)(m.Z,{className:"h-5 w-5"})})]}),(0,a.jsxs)("div",{className:"mt-4 space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"edit-server-name",className:"block text-sm font-medium text-gray-700",children:"服务器名称"}),(0,a.jsx)("input",{type:"text",id:"edit-server-name",value:D,onChange:e=>P(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",placeholder:"输入服务器名称"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"edit-server-config",className:"flex justify-between text-sm font-medium text-gray-700",children:[(0,a.jsx)("span",{children:"JSON配置"}),(0,a.jsxs)("span",{className:"text-xs text-gray-500 flex items-center",children:["当前平台:","windows"===w?(0,a.jsxs)("span",{className:"flex items-center ml-1",children:[(0,a.jsx)(i.Z,{className:"h-3 w-3 mr-0.5"}),"Windows"]}):(0,a.jsxs)("span",{className:"flex items-center ml-1",children:[(0,a.jsx)(l.Z,{className:"h-3 w-3 mr-0.5"}),"Mac"]})]})]}),(0,a.jsx)("textarea",{id:"edit-server-config",value:L,onChange:e=>W(e.target.value),rows:5,className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono",placeholder:'{"command": "npx", "args": ["-y", "mcprouter"], "env": {"SERVER_KEY": "value"}}'}),(0,a.jsx)("p",{className:"mt-1 text-xs text-gray-500",children:"windows"===w?(0,a.jsxs)("span",{className:"flex items-center",children:[(0,a.jsx)(i.Z,{className:"h-3 w-3 mr-0.5"}),"在Windows平台上，命令会自动转换为CMD格式"]}):(0,a.jsxs)("span",{className:"flex items-center",children:[(0,a.jsx)(l.Z,{className:"h-3 w-3 mr-0.5"}),"在Mac平台上，命令会以原始格式运行"]})}),_&&(0,a.jsx)("p",{className:"mt-1 text-sm text-red-600",children:_}),(0,a.jsxs)("button",{type:"button",onClick:validateConfig,className:"mt-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(p.Z,{className:"h-3 w-3 mr-1.5"}),"验证JSON"]})]})]}),(0,a.jsxs)("div",{className:"mt-6 flex space-x-3",children:[(0,a.jsxs)("button",{type:"button",className:"inline-flex flex-1 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:()=>{if(!D.trim()){showToastMessage("请输入服务器名称");return}if(!validateConfig())return;let t=parseJsonConfig(L);if(!t.success){z(t.error||"无法解析配置");return}let a=convertConfig(t.config,w),n=e.map(e=>e.id===V.id?{...e,name:D.trim(),config:a,updatedAt:new Date().toISOString()}:e);s(n),saveToLocalStorage(n),closeEditModal(),showToastMessage("服务器更新成功")},children:[(0,a.jsx)(j.Z,{className:"h-4 w-4 mr-1.5"}),"保存更改"]}),(0,a.jsx)("button",{type:"button",className:"inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:closeEditModal,children:"取消"})]})]})})})})]})}),(0,a.jsx)("div",{className:"fixed bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg transition-all transform ".concat(I?"translate-y-0 opacity-100":"translate-y-10 opacity-0"),children:B}),(0,a.jsx)("footer",{className:"bg-white border-t border-gray-200 mt-auto",children:(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",children:(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-4",children:[(0,a.jsxs)("button",{onClick:()=>{A(!0)},className:"inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors",children:[(0,a.jsx)(y.Z,{className:"h-3.5 w-3.5 mr-1"}),"联系我"]}),(0,a.jsx)("div",{className:"text-center",children:(0,a.jsx)("p",{className:"text-sm text-gray-400",children:"MCP 服务器管理工具 • 简单高效的配置解决方案"})})]})})}),(0,a.jsx)(v.u,{appear:!0,show:J,as:n.Fragment,children:(0,a.jsxs)(b.Vq,{as:"div",className:"relative z-10",onClose:closeContactModal,children:[(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,a.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,a.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,a.jsx)(v.u.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsxs)(b.Vq.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[(0,a.jsxs)(b.Vq.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900 flex justify-between items-center",children:[(0,a.jsx)("span",{children:"联系我"}),(0,a.jsx)("button",{type:"button",className:"text-gray-400 hover:text-gray-500",onClick:closeContactModal,children:(0,a.jsx)(m.Z,{className:"h-5 w-5"})})]}),(0,a.jsxs)("div",{className:"mt-4 flex flex-col items-center",children:[(0,a.jsx)("div",{className:"text-center mb-4",children:(0,a.jsx)("p",{className:"text-sm font-medium text-gray-900",children:"扫一扫下面的二维码图案，加我为朋友"})}),(0,a.jsx)("div",{className:"bg-white rounded-lg p-4 inline-flex justify-center",children:(0,a.jsx)("img",{src:"/qrcode.png",alt:"微信二维码",className:"w-64 h-64 object-contain",onError:e=>{e.target.onerror=null,e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='14' fill='%236b7280'%3E请放置您的二维码图片%3C/text%3E%3C/svg%3E"}})})]}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsx)("button",{type:"button",className:"inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:closeContactModal,children:"关闭"})})]})})})})]})})]})}}},function(e){e.O(0,[630,971,472,744],function(){return e(e.s=2971)}),_N_E=e.O()}]);