webpackJsonp([1],{"1/oy":function(t,e){},"45c4":function(t,e,s){t.exports=s.p+"static/img/undraw_experts3_3njd.8f05786.svg"},"4r4C":function(t,e,s){t.exports=s.p+"static/img/undraw_data_trends_b0wg.57a833b.svg"},"9M+g":function(t,e){},GfHa:function(t,e){},H3kZ:function(t,e){},Id91:function(t,e){},Jmt5:function(t,e){},Ml02:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),r=s("mvHQ"),n=s.n(r),i=s("e6fC"),o=s("M4fF"),u=s.n(o),c=(s("Jmt5"),s("9M+g"),s("jKqc"),s("UKw4"));a.a.use(i.a);var l={name:"App",data:function(){return{user:{},authToken:{}}},computed:{isLoggedIn:function(){return!u.a.isEmpty(this.user)}},mounted:function(){this.user=JSON.parse(c.getItem("user"))||{},this.authToken=JSON.parse(c.getItem("authToken"))||{}},methods:{saveToken:function(t){console.log(t),this.user=t.user,this.authToken=t.authToken,c.setItem("user",n()(t.user)),c.setItem("authToken",n()(t.authToken))},logout:function(){this.user={},this.authToken={},c.setItem("user",{}),c.setItem("authToken",{})}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("b-navbar",{attrs:{toggleable:"md",type:"light",variant:"light"}},[s("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),s("b-navbar-brand",{attrs:{to:"/"}},[t._v("Mindlogger")]),t._v(" "),s("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[s("b-navbar-nav",[t.isLoggedIn?s("b-nav-item",{attrs:{to:"/activitySets",exact:""}},[t._v("Your Activity Sets")]):t._e()],1),t._v(" "),s("b-navbar-nav",{staticClass:"ml-auto"},[t.isLoggedIn?s("b-nav-item-dropdown",{attrs:{right:""}},[s("template",{slot:"button-content"},[s("em",[t._v(t._s(t.user.login))])]),t._v(" "),s("b-dropdown-item",{attrs:{href:"#"}},[t._v("Profile")]),t._v(" "),s("b-dropdown-item",{on:{click:t.logout}},[t._v("Signout")])],2):s("b-nav-item",{attrs:{to:"/login"}},[t._v("Login")])],1)],1)],1),t._v(" "),s("div",{},[s("router-view",{attrs:{isLoggedIn:t.isLoggedIn,user:t.user,authToken:t.authToken},on:{login:t.saveToken}})],1)],1)},staticRenderFns:[]};var m=s("VU/8")(l,d,!1,function(t){s("Ml02")},null,null).exports,v=s("/ocq"),p={name:"HelloWorld",props:{isLoggedIn:{type:Boolean},user:{type:Object}},data:function(){return{msg:"Welcome to Your Vue.js App"}},mounted:function(){}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home mt-3"},[a("b-container",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 text-center"},[a("h1",[t._v("Mindlogger Admin Dashboard v2")]),t._v(" "),a("p",{staticClass:"lead"},[t._v("A dashboard to build mindlogger applications and visualize data")])])]),t._v(" "),a("b-row",{staticClass:"mt-3 pt-3"},[a("b-col",{staticClass:"text-center"},[a("img",{staticClass:"mx-auto w-100",attrs:{src:s("f47A")}})]),t._v(" "),a("b-col",{staticClass:"text-center"},[a("img",{staticClass:"mx-auto w-100",attrs:{src:s("4r4C")}})]),t._v(" "),a("b-col",{staticClass:"text-center"},[a("img",{staticClass:"mx-auto w-100",attrs:{src:s("45c4")}})])],1),t._v(" "),a("b-row",{staticClass:"mt-2 mb-3 pb-3"},[a("b-col",{staticClass:"text-center"},[a("p",[t._v("\n          Build Mindlogger EMAs\n        ")])]),t._v(" "),a("b-col",{staticClass:"text-center"},[a("p",[t._v("\n          Visualize, interact with, and download data\n        ")])]),t._v(" "),a("b-col",{staticClass:"text-center"},[a("p",[t._v("\n          Manage study roles\n        ")])])],1),t._v(" "),a("div",{staticClass:"row mt-3"},[t.isLoggedIn?a("div",{staticClass:"col-12 text-center"},[a("h3",[t._v("Welcome, "+t._s(t.user.firstName)+" !")]),t._v(" "),a("b-button",{attrs:{variant:"primary",to:"/activitySets"}},[t._v("Manage Activity Sets")])],1):a("div",{staticClass:"col-12 text-center"},[a("b-button",{attrs:{variant:"primary",to:"/login"}},[t._v("Log In")]),t._v(" "),a("b-button",{attrs:{variant:"success",to:"/signup"}},[t._v("Sign Up")])],1)])],1)],1)},staticRenderFns:[]};var h=s("VU/8")(p,f,!1,function(t){s("Vdvp")},"data-v-6e3aeddb",null).exports,g=(s("+6Bu"),s("Dd8w")),b=s.n(g),_=s("fZjL"),y=s.n(_),w=s("mtWM"),j=s.n(w),k="https://api.mindlogger.info/api/v1";var x=function(t){var e=t.user,s=t.password;return j()({method:"get",url:k+"/user/authentication",headers:{"Girder-Authorization":"Basic "+btoa(e+":"+s)}})},I=function(t){return j()({method:"GET",url:k+"/folder?parentId="+t+"&parentType=collection"})},C=function(t){return k+"/"+t+"/download?contentDisposition=inline"},S=function(t){return j()({method:"GET",url:k+"/user/"+t})};console.log(x);var D={name:"login",data:function(){return{form:{username:null,password:null},errors:{message:null,show:!1,code:null}}},methods:{onSubmit:function(t){var e=this;t.preventDefault(),x({user:this.form.username,password:this.form.password}).then(function(t){e.$emit("login",t.data),e.$router.push("/activitySets")}).catch(function(t){e.errors.code=t.response,401===e.errors.code.status?e.errors.message="We have no record of your username. Please create a new account!":e.errors.message=t.message,e.errors.show=!0})}}},A={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-center",attrs:{id:"login"}},[s("h1",[t._v(" Log In ")]),t._v(" "),s("div",{staticClass:"container fluid",attrs:{id:"signupForm"}},[s("b-alert",{attrs:{show:t.errors.show,variant:"danger"}},[t._v(t._s(t.errors.message))]),t._v(" "),s("b-form",{on:{submit:t.onSubmit}},[s("b-form-group",{attrs:{id:"usernameInputGroup",label:"Username:","label-for":"username"}},[s("b-form-input",{attrs:{id:"username",required:"",placeholder:"Enter email"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"passwordInputGroup",label:"Password:","label-for":"passwordInput"}},[s("b-form-input",{attrs:{id:"passwordInput",type:"password",required:"",placeholder:"Password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),s("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")])],1),t._v(" "),s("p",{staticClass:"mt-3"},[t._v("\n      Don't have an account? "),s("router-link",{attrs:{to:"/signup"}},[t._v("Create one")])],1),t._v(" "),s("p",{staticClass:"mt-3"},[t._v("\n      Forgot your password? "),s("router-link",{attrs:{to:"/login"}},[t._v("Reset it")])],1)],1)])},staticRenderFns:[]};var T=s("VU/8")(D,A,!1,function(t){s("aecc")},null,null).exports,U={name:"signup",data:function(){return{form:{email:"",password:"",password2:"",login:"",firstName:"",lastName:""},show:!0,errors:{show:!1,message:null,code:null}}},computed:{validated:function(){return this.form.password===this.form.password2}},methods:{onSubmit:function(t){var e,s=this;t.preventDefault(),(e={email:this.form.email,password:this.form.password,login:this.form.login,firstName:this.form.firstName,lastName:this.form.lastName},j()({method:"post",url:k+"/user",params:b()({},e,{admin:!0})})).then(function(t){var e=u.a.filter(y()(t.data),function(t){return"authToken"!==t}),a={};u.a.map(e,function(e){a[e]=t.data[e]}),s.$emit("login",{authToken:t.data.authToken,user:a}),s.$router.push("/activitySets")}).catch(function(t){s.errors.show=!0,s.errors.code=t.response,s.errors.message=t.response.data.message})}}},N={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pt-3",attrs:{id:"signup"}},[s("h1",{staticClass:"text-center"},[t._v(" Sign Up ")]),t._v(" "),s("div",{staticClass:"container fluid",attrs:{id:"signupForm"}},[s("b-form",{attrs:{validated:""},on:{submit:t.onSubmit}},[s("b-alert",{attrs:{show:t.errors.show,variant:"danger"}},[t._v(t._s(t.errors.message))]),t._v(" "),s("b-form-group",{attrs:{id:"emailAddressInputGroup",label:"Email address:","label-for":"emailAddress",description:"We'll never share your email with anyone else."}},[s("b-form-input",{attrs:{id:"emailAddress",type:"email",required:"",placeholder:"Enter email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"usernameInputGroup",label:"Username:","label-for":"usernameInput",description:""}},[s("b-form-input",{attrs:{id:"usernameInput",type:"text",required:"",placeholder:"Choose a username"},model:{value:t.form.login,callback:function(e){t.$set(t.form,"login",e)},expression:"form.login"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"firstNameInputGroup",label:"First Name:","label-for":"firstNameInput",description:""}},[s("b-form-input",{attrs:{id:"firstNameInput",type:"text",required:"",placeholder:"First Name"},model:{value:t.form.firstName,callback:function(e){t.$set(t.form,"firstName",e)},expression:"form.firstName"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"lastNameInputGroup",label:"Last Name:","label-for":"lastNameInput",description:""}},[s("b-form-input",{attrs:{id:"lastNameInput",type:"text",required:"",placeholder:"Last Name"},model:{value:t.form.lastName,callback:function(e){t.$set(t.form,"lastName",e)},expression:"form.lastName"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"passwordInputGroup",label:"Password:","label-for":"passwordInput"}},[s("b-form-input",{attrs:{id:"passwordInput",type:"password",required:"",placeholder:"Password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),s("b-form-group",{attrs:{id:"password2InputGroup",label:"Confirm Password:","label-for":"password2Input"}},[s("b-alert",{attrs:{show:!t.validated,variant:"danger"}},[t._v("\n          Make sure your passwords match!\n        ")]),t._v(" "),s("b-form-input",{attrs:{id:"password2Input",type:"password",required:"",placeholder:"Confirm password"},model:{value:t.form.password2,callback:function(e){t.$set(t.form,"password2",e)},expression:"form.password2"}})],1),t._v(" "),s("b-button",{attrs:{type:"submit",variant:"primary",disabled:!t.validated}},[t._v("Submit")]),t._v(" "),s("p",{staticClass:"mt-3"},[t._v("\n        Already have an account? "),s("router-link",{attrs:{to:"/login"}},[t._v("Log In")])],1)],1)],1)])},staticRenderFns:[]};var z=s("VU/8")(U,N,!1,function(t){s("VlMO")},null,null).exports,M={name:"ActivitySets",props:{isLoggedIn:{type:Boolean},user:{type:Object}},data:function(){return{allActivitySets:[],userTableFields:["logo","shortName","role","actions"],remainingTableFields:["logo","shortName","description"]}},computed:{userActivitySets:function(){var t=this;return this.isLoggedIn?u.a.filter(this.allActivitySets,function(e){return t.isEditor(e)||t.isManager(e)||t.isViewer(e)}):[]},remainingActivitySets:function(){var t=this;return this.isLoggedIn?u.a.filter(this.allActivitySets,function(e){return!t.isEditor(e)&&!t.isManager(e)&&!t.isViewer(e)}):this.allActivitySets},userActivityMeta:function(){return u.a.map(this.userActivitySets,function(t){return t.meta})},userActivityTable:function(){var t=this;return u.a.map(this.userActivityMeta,function(e,s){return{logoImage:e.logoImage,shortName:e.shortName,description:e.description,role:t.getRole(t.userActivitySets[s]).join([", "]),activityId:t.userActivitySets[s]._id}})},remainingActivityMeta:function(){return u.a.map(this.remainingActivitySets,function(t){return t.meta})},remainingActivityTable:function(){return u.a.map(this.remainingActivityMeta,function(t){return{logoImage:t.logoImage,shortName:t.shortName,description:t.description}})}},mounted:function(){var t=this;j()({method:"GET",url:k+"/collection/?text=Volumes"}).then(function(t){return t.data[0]._id}).then(I).then(function(e){t.allActivitySets=e.data})},methods:{isEditor:function(t){var e=this.user._id;return t.meta.members.editors.indexOf(e)>-1},isManager:function(t){var e=this.user._id;return t.meta.members.managers.indexOf(e)>-1},isViewer:function(t){var e=this.user._id;return y()(t.meta.members.viewers).indexOf(e)>-1},getRole:function(t){this.user._id;var e=[this.isEditor(t),this.isManager(t),this.isViewer(t)];return u.a.filter(["Editor","Manager","Viewer"],function(t,s){return e[s]})},getImageURL:function(t){return C(t)}}},L={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{staticClass:"p-3"},[s("b-row",[s("b-col",{staticClass:"text-center"},[s("h1",[t._v("Activity Sets")]),t._v(" "),s("p",{staticClass:"lead"},[t._v("A collection of activities.")])])],1),t._v(" "),t.isLoggedIn?s("b-row",[s("b-col",[s("h2",[t._v("Your Activity Sets")]),t._v(" "),s("p",{staticClass:"lead"},[t._v("\n        Here are the activies you own, manage, or can view.\n      ")]),t._v(" "),s("b-table",{attrs:{striped:"",hover:"",items:t.userActivityTable,fields:t.userTableFields},scopedSlots:t._u([{key:"logo",fn:function(e){return[e.item.logoImage?s("span",[s("img",{staticClass:"tableLogo",attrs:{src:t.getImageURL(e.item.logoImage["@id"])}})]):t._e()]}},{key:"actions",fn:function(e){return[e.item.role.indexOf("Editor")>-1?s("span",[s("b-button",{attrs:{size:"sm",variant:"secondary",to:"/edit_activity/"+e.item.activityId}},[t._v("\n               Edit\n             ")])],1):t._e(),t._v(" "),e.item.role.indexOf("Viewer")>-1?s("span",[s("b-button",{attrs:{size:"sm",variant:"info",to:"/view_activity/"+e.item.activityId}},[t._v("\n               View\n             ")])],1):t._e()]}}])})],1)],1):t._e(),t._v(" "),s("b-row",{staticClass:"mt-3"},[s("b-col",[s("h2",[t._v("Public Activity Sets")]),t._v(" "),s("p",{staticClass:"lead"},[t._v("\n        Here are all the other activity sets. You don't have permission to see them, though.\n      ")]),t._v(" "),s("b-table",{attrs:{striped:"",hover:"",items:t.remainingActivityTable,fields:t.remainingTableFields},scopedSlots:t._u([{key:"logo",fn:function(e){return[e.item.logoImage?s("span",[s("img",{staticClass:"tableLogo",attrs:{src:t.getImageURL(e.item.logoImage["@id"])}})]):t._e()]}}])})],1)],1)],1)},staticRenderFns:[]};var E=s("VU/8")(M,L,!1,function(t){s("H3kZ")},"data-v-9ffb16c2",null).exports,F={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"layer-preloader"},[e("div",{staticClass:"loading"},[e("div",{staticClass:"loader firstColor"},[e("div",{staticClass:"loader secondColor"},[e("div",{staticClass:"loader thirdColor"})])])])])}]};var V=s("VU/8")({},F,!1,function(t){s("xbA5")},null,null).exports,O={render:function(){var t=this.$createElement;return(this._self._c||t)("h1",[this._v(" Unauthorized ")])},staticRenderFns:[]},R=s("VU/8")(null,O,!1,null,null,null).exports,q={name:"viewActivity",props:{user:{type:Object},isLoggedIn:{type:Boolean},authToken:{type:Object}},components:{Loading:V,Unauthorized:R},data:function(){return{activityData:{},status:"loading",userData:{},userSearch:""}},computed:{activityId:function(){return this.$route.params.activityId},viewableUsers:function(){return this.activityData.meta.members.viewers[this.user._id]},currentRoute:function(){return this.$router.currentRoute.name},searchUsers:function(){var t=this;return this.userSearch?u.a.filter(this.viewableUsers,function(e){return(t.userData[e].firstName.toLowerCase()+t.userData[e].lastName.toLowerCase()).indexOf(t.userSearch.toLowerCase())>-1}):this.viewableUsers}},methods:{getActivitySet:function(){var t,e=this;return(t=this.activityId,j()({method:"GET",url:k+"/folder/"+t})).then(function(t){e.activityData=t.data})},isViewer:function(t){var e=this.user._id;return y()(t.meta.members.viewers).indexOf(e)>-1},getUserMetadata:function(t){var e=this;console.log("getting usermetedata",t),S(t).then(function(s){e.userData[t]=s.data,e.$forceUpdate()})}},mounted:function(){var t=this;this.status="loading",this.getActivitySet().then(function(){t.status="complete",u.a.map(t.viewableUsers,t.getUserMetadata),t.isViewer(t.activityData)&&t.isLoggedIn||(t.status="unauthorized")})}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["loading"===t.status?s("Loading"):"unauthorized"===t.status?s("Unauthorized"):t.isLoggedIn?s("div",{staticClass:"activitySetOverview"},[s("b-row",[s("b-col",{staticClass:"pt-3 bg-light",attrs:{cols:"3"}},[s("b-nav",{staticClass:"w-100",attrs:{vertical:"",pills:""}},[t.isLoggedIn?s("b-nav-item",{attrs:{to:"/activitySets",exact:""}},[s("i",{staticClass:"fas fa-long-arrow-alt-left"}),t._v("\n          Your Activity Sets\n          ")]):t._e(),t._v(" "),s("b-nav-item",{attrs:{to:"/view_activity/"+t.activityId+"/overview"}},[t._v("\n            Overview\n          ")]),t._v(" "),s("b-nav-text",{staticClass:"text-center"},[t._v("Users")]),t._v(" "),s("b-nav-form",{staticClass:"ml-3"},[s("b-form-input",{staticClass:"mx-auto w-100",attrs:{type:"text",placeholder:"Search"},model:{value:t.userSearch,callback:function(e){t.userSearch=e},expression:"userSearch"}})],1),t._v(" "),s("div",{staticClass:"mt-3"},t._l(t.searchUsers,function(e){return s("b-nav-item",{key:e,staticClass:"w-100",attrs:{to:"/view_activity/"+t.activityId+"/view_user/"+e}},[t.userData[e]?s("span",[t._v("\n                "+t._s(t.userData[e].lastName)+", "+t._s(t.userData[e].firstName)+"\n               ")]):t._e()])}),1)],1)],1),t._v(" "),s("b-col",{staticClass:"p-3",attrs:{cols:"9"}},[s("router-view",{attrs:{activityData:t.activityData,authToken:t.authToken}})],1)],1)],1):s("Unauthorized")],1)},staticRenderFns:[]};var H=s("VU/8")(q,$,!1,function(t){s("fBNg")},"data-v-639055e0",null).exports,P={name:"ActivitySetOverview",props:{activityData:{type:Object}},methods:{getImageURL:function(t){return C(t)}}},G={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",[s("b-row",[s("b-col",[s("h1",{staticClass:"text-center"},[t.activityData.meta.logoImage?s("b-img",{attrs:{thumbnail:"",rounded:"",width:"75",height:"75","blank-color":"#777",src:t.getImageURL(t.activityData.meta.logoImage["@id"])}}):t._e(),t._v("\n        "+t._s(t.activityData.name)+"\n      ")],1)])],1),t._v(" "),s("b-row",[s("b-col",[s("p",{staticClass:"lead text-center"},[t._v("\n        "+t._s(t.activityData.meta.description)+"\n      ")])])],1),t._v(" "),s("b-row",[s("b-col",{staticClass:"text-center"},[s("h3",[t._v(t._s(t.activityData.meta.members.editors.length))]),t._v(" "),s("p",[t._v("Editors")])]),t._v(" "),s("b-col",{staticClass:"text-center"},[s("h3",[t._v(t._s(t.activityData.meta.members.managers.length))]),t._v(" "),s("p",[t._v("Managers")])]),t._v(" "),s("b-col",{staticClass:"text-center"},[s("h3",[t._v(t._s(t.activityData.meta.members.users.length))]),t._v(" "),s("p",[t._v("Users")])]),t._v(" "),s("b-col",{staticClass:"text-center"},[s("h3",[t._v(t._s(Object.keys(t.activityData.meta.members.viewers).length))]),t._v(" "),s("p",[t._v("Viewers")])])],1)],1)},staticRenderFns:[]};var B=s("VU/8")(P,G,!1,function(t){s("QHl5")},null,null).exports,W=s("PJh5"),X=s.n(W),J={name:"SubTable",props:{responseData:{type:Array}},methods:{extractData:function(t){return t.data?t.data.survey?t.data.survey:t.data.text?t.data.text:"FIX":null}},computed:{tableData:function(){var t=this;return u.a.filter(u.a.map(this.responseData,function(e){return{text:e.text,survey:t.extractData(e)}}),function(t){return null!=t.survey})}}},K={render:function(){var t=this.$createElement;return(this._self._c||t)("b-table",{attrs:{striped:"",items:this.tableData,"thead-class":"hidden"}})},staticRenderFns:[]};var Z=s("VU/8")(J,K,!1,function(t){s("scZD")},null,null).exports;window.moment=X.a;var Q={name:"ActivityView",props:{activity:{type:Array}},components:{SubTable:Z},data:function(){return{tableFields:["datetime","response"]}},computed:{activityDataTable:function(){return u.a.map(this.activity,function(t){return{datetime:X()(t.created).format("MMM Do, Y @ h:mm A"),responses:t.meta.responses}})}}},Y={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("b-table",{attrs:{hover:"",items:this.activityDataTable,fields:this.tableFields},scopedSlots:this._u([{key:"response",fn:function(t){return[e("SubTable",{attrs:{responseData:t.item.responses}})]}}])})],1)},staticRenderFns:[]},tt=s("VU/8")(Q,Y,!1,null,null,null).exports,et={name:"ViewActivityUser",props:{authToken:{type:Object},activityData:{type:Object}},components:{ActivityView:tt,Loading:V},computed:{userId:function(){return this.$route.params.userId},activities:function(){return u.a.groupBy(this.userData,function(t){return t.meta.activity["@id"]})}},data:function(){return{userMetaData:{},userData:[],status:"loading"}},methods:{getUserMetadata:function(){var t=this;return S(this.userId).then(function(e){t.userMetaData=e.data})},getUserData:function(){var t,e,s=this;return this.status="loading",(t=this.userId,e=this.authToken.token,j()({method:"get",url:k+"/folder?parentType=user&parentId="+t+"&name=Responses",headers:{"Girder-Token":""+e}})).then(function(t){return t.data[0]._id}).then(function(t){return(e=t,a=s.authToken.token,j()({method:"get",url:k+"/folder?parentType=folder&parentId="+e,headers:{"Girder-Token":""+a}})).then(function(t){return u.a.filter(t.data,function(t){return t.name===s.activityData.name})[0]._id}).then(function(t){var e,a;(e=t,a=s.authToken.token,j()({method:"get",url:k+"/item?folderId="+e+"&limit=5000",headers:{"Girder-Token":""+a}})).then(function(t){s.userData=t.data,s.status="ready"})});var e,a})},scrollTo:function(t){console.log("going to scroll to",t),setTimeout(function(){location.href=t},1e3)}},watch:{userId:function(){this.status="loading",this.getUserMetadata().then(this.getUserData)}},mounted:function(){var t=this;this.getUserMetadata().then(this.getUserData).then(function(){console.log("hash?",t.$route.hash),t.$route.hash&&setTimeout(function(){return t.scrollTo(t.$route.hash)},1e3)})}},st={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["loading"===t.status?s("Loading"):s("b-container",[s("b-row",[s("b-col",{staticClass:"text-center"},[s("h1",{attrs:{id:"user"}},[s("b-img",{attrs:{thumbnail:"",rounded:"",width:"75",height:"75","blank-color":"#777",src:t.userMetaData.gravatar_baseUrl}}),t._v("\n\n          "+t._s(t.userMetaData.firstName)+" "+t._s(t.userMetaData.lastName)+"\n        ")],1),t._v(" "),s("p",{staticClass:"lead"},[t._v(t._s(t.userMetaData.login))])])],1),t._v(" "),s("b-row",[s("b-col",[s("h5",[t._v(" Activities in "+t._s(t.activityData.name)+": ")])]),t._v(" "),s("b-col",{attrs:{offset:"1",cols:"11"}},t._l(t.activities,function(e){return s("div",{key:e._id,staticClass:"mt-2"},[s("p",[s("a",{attrs:{href:"#"+e[0].meta.activity.name}},[t._v("\n                "+t._s(e[0].meta.activity.name)+" ("+t._s(e.length)+")\n              ")])])])}),0)],1),t._v(" "),s("b-row",[s("b-col",t._l(t.activities,function(e){return s("div",{key:e._id,staticClass:"mt-2"},[s("h2",{staticClass:"mb-0 pb-0",attrs:{id:e[0].meta.activity.name}},[t._v("\n            "+t._s(e[0].meta.activity.name)+" ("+t._s(e.length)+")\n          ")]),t._v(" "),s("div",{staticClass:"mb-3"},[s("small",[s("a",{attrs:{href:"#user"}},[t._v("go to top")])])]),t._v(" "),s("ActivityView",{attrs:{activity:e}})],1)}),0)],1)],1)],1)},staticRenderFns:[]};var at=s("VU/8")(et,st,!1,function(t){s("tRtJ")},"data-v-3c690c45",null).exports;a.a.use(v.a);var rt=new v.a({mode:"history",routes:[{path:"/",name:"Home",component:h},{path:"/login",name:"Login",component:T},{path:"/signup",name:"SignUp",component:z},{path:"/signup",name:"SignUp",component:z},{path:"/activitySets",name:"ActivitySets",component:E},{path:"/view_activity/:activityId",component:H,redirect:"/view_activity/:activityId/overview",children:[{name:"overview",path:"overview",component:B},{name:"view_user",path:"view_user/:userId",component:at}]}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:rt,components:{App:m},template:"<App/>"})},QHl5:function(t,e){},Vdvp:function(t,e){},VlMO:function(t,e){},aecc:function(t,e){},f47A:function(t,e,s){t.exports=s.p+"static/img/undraw_prototyping_process_rswj.67fa892.svg"},fBNg:function(t,e){},jKqc:function(t,e){},scZD:function(t,e){},tRtJ:function(t,e){},uslO:function(t,e,s){var a={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function r(t){return s(n(t))}function n(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=n,t.exports=r,r.id="uslO"},xbA5:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.469fd2d4d65e1466cc04.js.map