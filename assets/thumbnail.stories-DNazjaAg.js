import{j as t}from"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";const l=({title:e,date:a,beginColor:m,middleColor:c,endColor:p,tags:n})=>t.jsx("div",{className:`w-full p-4 my-10 rounded-lg bg-gradient-to-r ${m} ${c} ${p}`,children:t.jsxs("div",{className:"w-full  text-basic rounded-lg p-10 bg-white shadow-sm",children:[n&&n,t.jsx("h1",{className:"text-5xl font-bold text-left text-basic my-10",children:e}),t.jsx("p",{className:"date",children:a})]})});l.__docgenInfo={description:"",methods:[],displayName:"Thumbnail",props:{title:{required:!0,tsType:{name:"string"},description:""},date:{required:!0,tsType:{name:"string"},description:""},beginColor:{required:!0,tsType:{name:"string"},description:""},middleColor:{required:!0,tsType:{name:"string"},description:""},endColor:{required:!0,tsType:{name:"string"},description:""},tags:{required:!1,tsType:{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"},description:""}}};const C={title:"Thumbnail",component:l,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{},decorators:[e=>t.jsx("div",{className:"w-full max-w-[800px] h-full flex justify-center items-center",children:t.jsx(e,{})})]},s=["tag1","tag2"],u=s==null?void 0:s.map(e=>({id:Math.random().toString(32).substring(2),name:e})),g=u.map(e=>t.jsx("span",{className:"tag mr-3",children:e.name},e.id)),r={args:{title:"title",date:new Date().toISOString().split("T")[0]??"",beginColor:"from-[#FEAC5E]",middleColor:"via-[#C779D0]",endColor:"to-[#4BC0C8]",tags:g}};var i,o,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: "title",
    date: new Date().toISOString().split("T")[0] ?? "",
    beginColor: "from-[#FEAC5E]",
    middleColor: "via-[#C779D0]",
    endColor: "to-[#4BC0C8]",
    tags: renderTags
  }
}`,...(d=(o=r.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const h=["Default"];export{r as Default,h as __namedExportsOrder,C as default};
