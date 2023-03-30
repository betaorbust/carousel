"use strict";(self.webpackChunk_betaorbust_carousel=self.webpackChunk_betaorbust_carousel||[]).push([[45],{"./src/carousel/carousel.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:function(){return Basic},WithControls:function(){return WithControls},WithLinkedCarousels:function(){return WithLinkedCarousels},__namedExportsOrder:function(){return carousel_stories_namedExportsOrder},default:function(){return carousel_stories}});var react=__webpack_require__("./node_modules/react/index.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),es=__webpack_require__("./node_modules/react-swipeable/es/index.js"),esm=__webpack_require__("./node_modules/usehooks-ts/dist/esm/index.js");function getRealIndex(virtualIndex,totalItems){return virtualIndex<0?(totalItems- -virtualIndex%totalItems)%totalItems:virtualIndex%totalItems}function positionCurrentIndex(virtualIndex,containerRef,wrapperRef){if(!containerRef.current||!wrapperRef.current)return 0;const target=containerRef.current.querySelector(`[data-virtual-index="${virtualIndex}"]`);if(!target)return 0;const targetDims=target.getBoundingClientRect(),containerDims=containerRef.current.getBoundingClientRect(),wrapperMidpoint=wrapperRef.current.getBoundingClientRect().width/2,targetMidpoint=targetDims.width/2;return wrapperMidpoint-(targetDims.left-containerDims.left+targetMidpoint)}function getNearestVirtualIndexMappingToReal(virtualIndex,realIndex,totalItems){return virtualIndex+function findNearest(next,previous,total){const difference=next-previous;if(difference>=0){const wrappedDifference=-total+difference;return Math.abs(difference)<=Math.abs(wrappedDifference)?difference:wrappedDifference}const wrappedDifference=total+difference;return Math.abs(difference)<Math.abs(wrappedDifference)?difference:wrappedDifference}(realIndex,getRealIndex(virtualIndex,totalItems),totalItems)}var emotion_react_jsx_runtime_browser_esm=__webpack_require__("./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js");const elementStyle=emotion_react_browser_esm.iv`
	align-items: stretch;
	flex: 1 1 auto;
`,CarouselElementWrapper=({children:children,isCurrent:isCurrent,index:index,width:width,identifier:identifier,onClickIndex:onClickIndex})=>(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{"aria-hidden":!0,"data-virtual-index":identifier,className:isCurrent?"current":void 0,css:elementStyle,style:{width:`${width}px`},onClick:()=>onClickIndex(index),children:children});CarouselElementWrapper.displayName="CarouselElementWrapper";const CarouselVirtualizedList=({totalBaseItems:totalBaseItems,renderItemAtIndex:renderItemAtIndex,currentOverallIndex:currentOverallIndex,startIndex:startIndex,endIndex:endIndex,onClickIndex:onClickIndex,itemWidth:itemWidth})=>{const contents=new Array(endIndex-startIndex+1).fill("").map(((_,i)=>{const currentIndex=startIndex+i;return(0,emotion_react_jsx_runtime_browser_esm.tZ)(CarouselElementWrapper,{identifier:`${currentIndex}`,isCurrent:currentIndex===currentOverallIndex,onClickIndex:onClickIndex,index:currentIndex,width:itemWidth,children:renderItemAtIndex(getRealIndex(startIndex+i,totalBaseItems),startIndex+i)},currentIndex)}));return(0,emotion_react_jsx_runtime_browser_esm.tZ)(emotion_react_jsx_runtime_browser_esm.HY,{children:contents})};try{CarouselVirtualizedList.displayName="CarouselVirtualizedList",CarouselVirtualizedList.__docgenInfo={description:"",displayName:"CarouselVirtualizedList",props:{totalBaseItems:{defaultValue:null,description:"",name:"totalBaseItems",required:!0,type:{name:"number"}},renderItemAtIndex:{defaultValue:null,description:"",name:"renderItemAtIndex",required:!0,type:{name:"(index: number, virtualIndex: number) => ReactElement<any, string | JSXElementConstructor<any>>"}},startIndex:{defaultValue:null,description:"",name:"startIndex",required:!0,type:{name:"number"}},endIndex:{defaultValue:null,description:"",name:"endIndex",required:!0,type:{name:"number"}},currentOverallIndex:{defaultValue:null,description:"",name:"currentOverallIndex",required:!0,type:{name:"number"}},onClickIndex:{defaultValue:null,description:"",name:"onClickIndex",required:!0,type:{name:"(index: number) => void"}},itemWidth:{defaultValue:null,description:"",name:"itemWidth",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/carousel/carousel-virtualized-list.tsx#CarouselVirtualizedList"]={docgenInfo:CarouselVirtualizedList.__docgenInfo,name:"CarouselVirtualizedList",path:"src/carousel/carousel-virtualized-list.tsx#CarouselVirtualizedList"})}catch(__react_docgen_typescript_loader_error){}const wrapperStyles=emotion_react_browser_esm.iv`
	position: relative;
	overflow: hidden;
`,shifterStyles=emotion_react_browser_esm.iv`
	display: flex;
`,preventDefault=e=>{e.preventDefault()},Carousel=({animationDurationMs:animationDurationMs,currentIndex:currentIndex,itemCount:itemCount,itemWidth:itemWidth,onClickIndex:onChange,preventScrolling:preventScrolling,renderItemAtIndex:renderItemAtIndex,swipeMaxDurationMs:swipeMaxDurationMs,swipeMinDistancePx:swipeMinDistancePx,virtualListSize:virtualListSize})=>{const wrapperRef=(0,react.useRef)(null),shifterRef=(0,react.useRef)(null),[transitionPhase,setTransitionPhase]=(0,react.useState)("rest"),[internalIndex,setInternalIndex]=(0,react.useState)(currentIndex),[startIndex,setStartIndex]=(0,react.useState)(currentIndex-Math.round(virtualListSize/2)),[endIndex,setEndIndex]=(0,react.useState)(currentIndex+Math.round(virtualListSize/2)),[transform,setTransform]=(0,react.useState)("none"),[manuallyDragging,setManuallyDragging]=(0,react.useState)(!1),interactionRef=(0,react.useRef)({startTime:0,touchXLast:0,touchXStart:0,carouselInitialOffset:0}),windowSize=(0,esm.iP)();(0,react.useEffect)((()=>{setInternalIndex(getNearestVirtualIndexMappingToReal(internalIndex,currentIndex,itemCount))}),[currentIndex,itemCount,internalIndex]),(0,react.useEffect)((()=>{"rest"===transitionPhase&&internalIndex!==getNearestVirtualIndexMappingToReal(internalIndex,currentIndex,itemCount)&&(setTransitionPhase("move"),window.setTimeout((()=>{setTransitionPhase("reconcile")}),animationDurationMs+50))}),[transitionPhase,currentIndex,internalIndex,itemCount,animationDurationMs]),(0,react.useEffect)((()=>{if("reconcile"===transitionPhase){const halfOfVirtualList=Math.round((virtualListSize-1)/2);setStartIndex((()=>internalIndex-halfOfVirtualList)),setEndIndex((()=>internalIndex+halfOfVirtualList)),setTransitionPhase("rest")}}),[transitionPhase,itemCount,internalIndex,virtualListSize]);const onManualMove=(0,react.useCallback)((event=>{if(manuallyDragging&&shifterRef.current){const x="clientX"in event?event.clientX:event.touches[0].clientX;interactionRef.current.touchXLast=x,shifterRef.current.style.transform=`translateX(${interactionRef.current.carouselInitialOffset-(interactionRef.current.touchXStart-interactionRef.current.touchXLast)}px)`}}),[manuallyDragging]);(0,react.useEffect)((()=>(manuallyDragging&&preventScrolling?document.addEventListener("touchmove",preventDefault,{passive:!1}):document.removeEventListener("touchmove",preventDefault),()=>{document.removeEventListener("touchmove",preventDefault)})),[manuallyDragging,preventScrolling]);const swipeableHandlers=(0,es.QS)({onTouchStartOrOnMouseDown:({event:event})=>{setManuallyDragging(!0),interactionRef.current.carouselInitialOffset=positionCurrentIndex(internalIndex,shifterRef,wrapperRef),interactionRef.current.startTime=Date.now(),"clientX"in event?(interactionRef.current.touchXStart=event.clientX,interactionRef.current.touchXLast=event.clientX):"touches"in event&&event.touches.length>0&&(interactionRef.current.touchXStart=event.touches[0].clientX,interactionRef.current.touchXLast=event.touches[0].clientX)},onTouchEndOrOnMouseUp:()=>{setManuallyDragging(!1);const{touchXStart:touchXStart,touchXLast:touchXLast,startTime:startTime}=interactionRef.current,delta=touchXStart-touchXLast,deltaUnits=Math.round(delta/itemWidth),duration=Date.now()-startTime;if(Math.abs(delta)<swipeMinDistancePx);else{setTransitionPhase("move");let swipeOffset=0;0===deltaUnits&&duration<swipeMaxDurationMs&&(swipeOffset=delta>0?1:-1);const newInternalIndex=internalIndex+deltaUnits+swipeOffset;setInternalIndex(newInternalIndex),onChange(getRealIndex(newInternalIndex,itemCount)),setTimeout((()=>{setTransitionPhase("reconcile")}),animationDurationMs+50)}},swipeDuration:500,touchEventOptions:{passive:!1},preventScrollOnSwipe:!0,trackMouse:!0}),refPassthrough=(0,react.useCallback)((el=>{swipeableHandlers.ref(el),wrapperRef.current=el}),[swipeableHandlers]),onClickIndex=(0,react.useCallback)((index=>{"rest"===transitionPhase&&index!==currentIndex&&onChange(getRealIndex(index,itemCount))}),[itemCount,onChange,currentIndex,transitionPhase]);(0,react.useLayoutEffect)((()=>{setTransform(`translateX(${positionCurrentIndex(internalIndex,shifterRef,wrapperRef)}px)`)}),[internalIndex,transitionPhase,windowSize,itemWidth]);const transition="move"!==transitionPhase||manuallyDragging?"none":`transform ${animationDurationMs/1e3}s ease-out`;return(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{"aria-hidden":!0,...swipeableHandlers,ref:refPassthrough,css:wrapperStyles,children:(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{ref:shifterRef,css:shifterStyles,onMouseMove:onManualMove,onTouchMove:onManualMove,style:{transition:transition,transform:transform},children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(CarouselVirtualizedList,{itemWidth:itemWidth,onClickIndex:onClickIndex,startIndex:startIndex,endIndex:endIndex,currentOverallIndex:internalIndex,totalBaseItems:itemCount,renderItemAtIndex:renderItemAtIndex})})})};Carousel.displayName="Carousel";try{Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"A swipeable, clickable, infinitely scrolling carousel that does not itself\nhold the state of the current index. As the parent component changes the\ncurrent index, the container will animate to the closest instance of that\nindex. It does this by creating a virtualized list of elements based on the\n`renderItemAtIndex` function passed in which is in charge of rendering the\nappropriate `<CarouselItem>` give an arbitrary index. With a fully\nvirtualized list, we can make sure there are always enough elements to fill\nthe screen.\n\nThe component itself tries to be as dumb as possible. It does have an\ninternal index that is used to track the current index of the virtualized\nlist. Any time the parent component changes the current index, the container\nwill animate to the nearest virtual index that maps to the real index.\n\nOn internal swipes and drags, the container will animate and update its\ninternal state before calling the parent component's onChangeIndex function\n-- only committing the change after the action is complete.\n\n```tsx\nimport { Carousel, CarouselItem } from '@betaorbust/react-carousel';\nimport { useState, useCallback } from 'react';\n\nconst plans = ['Basic', 'Premium', 'Ultimate', 'Enterprise'];\nconst width = 200;\n\nconst Demo = () => {\n\t// Index is controlled outside of the component so we can\n\t// have multiple controls -- like a navigation, button or\n\t// other carousel -- all managing the same state.\n\tconst [currentIndex, setCurrentIndex] = useState(0);\n\n\t// How to render a card at any given index\n\tconst renderItemAtIndex = useCallback(\n\t\t// You get the real index and the virtual index\n\t\t(index, virtualIndex) => {\n\t\t\tconst name = plans[index];\n\t\t\treturn (\n\t\t\t\t// Wrap in a CarouselItem and Style to have the\n\t\t\t\t// width provided to the Carousel\n\t\t\t\t<CarouselItem itemKey={`${name}-{virtualIndex}`}>\n\t\t\t\t\t<div style={{ width: `${width}px` }}>\n\t\t\t\t\t\t{name} at virtual index {virtualIndex}\n\t\t\t\t\t</div>\n\t\t\t\t</CarouselItem>\n\t\t\t);\n\t\t},\n\t\t[plans],\n\t);\n\n\treturn (\n\t\t<Carousel\n\t\t\tanimationDurationMs={500}\n\t\t\tcurrentIndex={currentIndex}\n\t\t\titemCount={plans.length}\n\t\t\titemWidth={width}\n\t\t\tonClickIndex={setCurrentIndex}\n\t\t\tpreventScrolling={true}\n\t\t\trenderItemAtIndex={renderItemAtIndex}\n\t\t\tswipeMaxDurationMs={500}\n\t\t\tswipeMinDistancePx={10}\n\t\t\tvirtualListSize={plans.length * 3}\n\t\t/>\n\t);\n};\n```",displayName:"Carousel",props:{onClickIndex:{defaultValue:null,description:"What to do when a user clicks on a carousel item.",name:"onClickIndex",required:!0,type:{name:"(index: number) => void"}},currentIndex:{defaultValue:null,description:"The real index in the carousel to show.",name:"currentIndex",required:!0,type:{name:"number"}},itemCount:{defaultValue:null,description:"Number of real elements in the carousel.",name:"itemCount",required:!0,type:{name:"number"}},itemWidth:{defaultValue:null,description:"How wide each element is.",name:"itemWidth",required:!0,type:{name:"number"}},virtualListSize:{defaultValue:null,description:"How many elements to have in the virtual slider",name:"virtualListSize",required:!0,type:{name:"number"}},animationDurationMs:{defaultValue:null,description:"How long the animation should take in ms.",name:"animationDurationMs",required:!0,type:{name:"number"}},swipeMaxDurationMs:{defaultValue:null,description:"Max swipe duration. After this it becomes a drag.",name:"swipeMaxDurationMs",required:!0,type:{name:"number"}},swipeMinDistancePx:{defaultValue:null,description:"Min swipe distance. Before this, it's a tap.",name:"swipeMinDistancePx",required:!0,type:{name:"number"}},renderItemAtIndex:{defaultValue:null,description:"How to render a card at any given index",name:"renderItemAtIndex",required:!0,type:{name:"(index: number, virtualIndex: number) => ReactElement<any, string | JSXElementConstructor<any>>"}},preventScrolling:{defaultValue:null,description:"Whether to prevent scrolling on the page when swiping or dragging.",name:"preventScrolling",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/carousel/carousel.tsx#Carousel"]={docgenInfo:Carousel.__docgenInfo,name:"Carousel",path:"src/carousel/carousel.tsx#Carousel"})}catch(__react_docgen_typescript_loader_error){}const containerStyles=emotion_react_browser_esm.iv`
	display: flex;
	align-items: center;
	justify-content: center;
`,controlsStyles=emotion_react_browser_esm.iv`
	background: none;
	border: none;
	font-size: 1.5rem;
	padding: 0.5rem 0.7rem;
	margin: 0;
	color: #333;
	transition: font-size 0.2s ease-in-out;
	height: 3rem;
	&:last-of-type {
		margin-left: 1rem;
	}
	&:first-of-type {
		margin-right: 1rem;
	}
	display: flex;
	align-items: center;
`,selectedStyle=emotion_react_browser_esm.iv`
	background-color: rebeccapurple;
	height: 1.5rem;
	width: 1.5rem;
`,indicatorStyles=emotion_react_browser_esm.iv`
	display: inline-block;
	height: 1.1rem;
	width: 1.1rem;
	border: solid 2px #555;
	background-color: none;
	border-radius: 50%;
	transition: background-color 0.2s ease-in-out, height 0.2s ease-in-out,
		width 0.2s ease-in-out;
`,CarouselControls=({indexLabels:indexLabels,onChange:onChange,currentIndex:currentIndex})=>(0,emotion_react_jsx_runtime_browser_esm.BX)("div",{css:containerStyles,children:[(0,emotion_react_jsx_runtime_browser_esm.tZ)("button",{css:controlsStyles,type:"button",title:"Previous",onClick:()=>onChange(currentIndex<=0?indexLabels.length-1:currentIndex-1),children:"◀"}),indexLabels.map(((label,index)=>(0,emotion_react_jsx_runtime_browser_esm.tZ)("button",{css:[controlsStyles],type:"button",title:label,onClick:()=>onChange(index),children:(0,emotion_react_jsx_runtime_browser_esm.tZ)("span",{css:[indicatorStyles,index===currentIndex?selectedStyle:null]})},label))),(0,emotion_react_jsx_runtime_browser_esm.tZ)("button",{css:controlsStyles,type:"button",title:"Next",onClick:()=>onChange(currentIndex>=indexLabels.length-1?0:currentIndex+1),children:"▶"})]});CarouselControls.displayName="CarouselControls";try{CarouselControls.displayName="CarouselControls",CarouselControls.__docgenInfo={description:"",displayName:"CarouselControls",props:{indexLabels:{defaultValue:null,description:"",name:"indexLabels",required:!0,type:{name:"string[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(index: number) => void"}},currentIndex:{defaultValue:null,description:"",name:"currentIndex",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/carousel/carousel-controls.tsx#CarouselControls"]={docgenInfo:CarouselControls.__docgenInfo,name:"CarouselControls",path:"src/carousel/carousel-controls.tsx#CarouselControls"})}catch(__react_docgen_typescript_loader_error){}const CarouselItem=({children:children,itemKey:itemKey})=>(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{"aria-hidden":!0,children:children},itemKey);CarouselItem.displayName="CarouselItem";try{CarouselItem.displayName="CarouselItem",CarouselItem.__docgenInfo={description:"",displayName:"CarouselItem",props:{itemKey:{defaultValue:null,description:"",name:"itemKey",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/carousel/carousel-item.tsx#CarouselItem"]={docgenInfo:CarouselItem.__docgenInfo,name:"CarouselItem",path:"src/carousel/carousel-item.tsx#CarouselItem"})}catch(__react_docgen_typescript_loader_error){}const elementStyles=emotion_react_browser_esm.iv`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 25%;
	border: solid 1px gray;
	border-radius: 6%;
	box-sizing: border-box;
	overflow: hidden;
	margin: 5% 3%;
	opacity: 0.5;
	// This is set unrealistically high so that the animation barely starts
	// before we supersede the transition with the on-element style
	transition: transform 10s ease-in-out, opacity 10s ease-in-out;
	color: white;
	z-index: 1;
	position: relative;
	user-select: none;
	background: linear-gradient(
			318.25deg,
			#e50914 0%,
			rgba(74, 42, 150, 0.5) 92.16%,
			rgba(74, 42, 150, 0) 128.15%
		),
		#1d529d;
	.current & {
		transform: scale(1.1);
		opacity: 1;
		z-index: 1000;
	}
	h3 {
		margin: 0;
	}
`,indexStyle=emotion_react_browser_esm.iv`
	position: absolute;
	bottom: 4px;
	right: 4px;
	min-width: 3em;
	min-height: 3em;
	font-size: 0.6em;
	text-align: center;
	background-color: white;
	color: darkgray;
	border-radius: 50%;
	border: solid 1px gray;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`,plans=[{name:"0. Crunch Wrap Supreme",price:"$40.00"},{name:"1. Family, but not for Mark",price:"$20.00"},{name:"2. Jr. One Bedroom",price:"$10.00"},{name:"3. Please don't pick this one",price:"$5.99"}],makeIndexLabels=()=>plans.map((({name:name})=>name)),makeRenderItem=({itemWidth:itemWidth,animationDurationMs:animationDurationMs})=>index=>{const planIndex=getRealIndex(index,plans.length),{name:name,price:price}=plans[planIndex];return(0,emotion_react_jsx_runtime_browser_esm.tZ)(CarouselItem,{itemKey:name,children:(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{css:elementStyles,style:{width:`${itemWidth}px`,height:`${itemWidth}px`,transition:`transform ${animationDurationMs/1e3}s ease-in-out, opacity ${animationDurationMs/1e3}s ease-in-out`},children:(0,emotion_react_jsx_runtime_browser_esm.BX)("div",{children:[(0,emotion_react_jsx_runtime_browser_esm.tZ)("h3",{children:name}),(0,emotion_react_jsx_runtime_browser_esm.tZ)("sub",{children:price}),(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{css:indexStyle,children:index})]})})},name)};try{makeRenderItem.displayName="makeRenderItem",makeRenderItem.__docgenInfo={description:"",displayName:"makeRenderItem",props:{itemWidth:{defaultValue:null,description:"How wide each element is.",name:"itemWidth",required:!0,type:{name:"number"}},animationDurationMs:{defaultValue:null,description:"How long the animation should take in ms.",name:"animationDurationMs",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/renderable-items.tsx#makeRenderItem"]={docgenInfo:makeRenderItem.__docgenInfo,name:"makeRenderItem",path:".storybook/renderable-items.tsx#makeRenderItem"})}catch(__react_docgen_typescript_loader_error){}var carousel_stories={title:"Carousel/Carousel",component:Carousel,parameters:{layout:"centered"},decorators:[(Story,context)=>(0,emotion_react_jsx_runtime_browser_esm.tZ)("div",{style:{maxWidth:"700px",border:"dashed 1px darkgray"},children:(0,emotion_react_jsx_runtime_browser_esm.tZ)(Story,{...context})})]};const useSharedIndex=(currentIndex,onClickIndex)=>{const[internalIndex,setInternalIndex]=react.useState(currentIndex);(0,react.useEffect)((()=>{setInternalIndex(currentIndex)}),[currentIndex]);return[internalIndex,(0,react.useCallback)((index=>{setInternalIndex(index),onClickIndex(index)}),[onClickIndex])]},Basic=args=>{const{currentIndex:currentIndex,onClickIndex:onClickIndex,itemWidth:itemWidth,animationDurationMs:animationDurationMs}=args,[internalCurrentIndex,internalOnClickIndex]=useSharedIndex(currentIndex,onClickIndex),renderItemAtIndex=(0,react.useMemo)((()=>makeRenderItem({itemWidth:itemWidth,animationDurationMs:animationDurationMs})),[itemWidth,animationDurationMs]);return(0,emotion_react_jsx_runtime_browser_esm.tZ)(Carousel,{...args,currentIndex:internalCurrentIndex,onClickIndex:internalOnClickIndex,renderItemAtIndex:renderItemAtIndex})};Basic.displayName="Basic",Basic.args={currentIndex:0,animationDurationMs:250,itemCount:4,virtualListSize:16,itemWidth:250,preventScrolling:!0,swipeMaxDurationMs:500,swipeMinDistancePx:50};const WithControls=args=>{const{currentIndex:currentIndex,onClickIndex:onClickIndex,itemWidth:itemWidth,animationDurationMs:animationDurationMs}=args,[internalCurrentIndex,internalOnClickIndex]=useSharedIndex(currentIndex,onClickIndex),renderItemAtIndex=(0,react.useMemo)((()=>makeRenderItem({itemWidth:itemWidth,animationDurationMs:animationDurationMs})),[itemWidth,animationDurationMs]),indexLabels=(0,react.useMemo)((()=>makeIndexLabels()),[]);return(0,emotion_react_jsx_runtime_browser_esm.BX)(emotion_react_jsx_runtime_browser_esm.HY,{children:[(0,emotion_react_jsx_runtime_browser_esm.tZ)(Carousel,{...args,currentIndex:internalCurrentIndex,onClickIndex:internalOnClickIndex,renderItemAtIndex:renderItemAtIndex}),(0,emotion_react_jsx_runtime_browser_esm.tZ)(CarouselControls,{currentIndex:internalCurrentIndex,indexLabels:indexLabels,onChange:internalOnClickIndex})]})};WithControls.args=Basic.args;const WithLinkedCarousels=args=>{const{currentIndex:currentIndex,onClickIndex:onClickIndex,itemWidth:itemWidth,animationDurationMs:animationDurationMs}=args,[internalCurrentIndex,internalOnClickIndex]=useSharedIndex(currentIndex,onClickIndex),renderItemAtIndex=(0,react.useMemo)((()=>makeRenderItem({itemWidth:itemWidth,animationDurationMs:animationDurationMs})),[itemWidth,animationDurationMs]),indexLabels=(0,react.useMemo)((()=>makeIndexLabels()),[]);return(0,emotion_react_jsx_runtime_browser_esm.BX)(emotion_react_jsx_runtime_browser_esm.HY,{children:[(0,emotion_react_jsx_runtime_browser_esm.tZ)(Carousel,{...args,currentIndex:internalCurrentIndex,onClickIndex:internalOnClickIndex,renderItemAtIndex:renderItemAtIndex}),(0,emotion_react_jsx_runtime_browser_esm.tZ)(CarouselControls,{currentIndex:internalCurrentIndex,indexLabels:indexLabels,onChange:internalOnClickIndex}),(0,emotion_react_jsx_runtime_browser_esm.tZ)(Carousel,{...args,currentIndex:internalCurrentIndex,onClickIndex:internalOnClickIndex,renderItemAtIndex:renderItemAtIndex})]})};WithLinkedCarousels.args=Basic.args;const carousel_stories_namedExportsOrder=["Basic","WithControls","WithLinkedCarousels"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"args => {\n  const {\n    currentIndex,\n    onClickIndex,\n    itemWidth,\n    animationDurationMs\n  } = args;\n  const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(currentIndex, onClickIndex);\n  const renderItemAtIndex = useMemo(() => makeRenderItem({\n    itemWidth,\n    animationDurationMs\n  }), [itemWidth, animationDurationMs]);\n  return _jsx(Carousel, {\n    ...args,\n    currentIndex: internalCurrentIndex,\n    onClickIndex: internalOnClickIndex,\n    renderItemAtIndex: renderItemAtIndex\n  });\n}",...Basic.parameters?.docs?.source}}},WithControls.parameters={...WithControls.parameters,docs:{...WithControls.parameters?.docs,source:{originalSource:"args => {\n  const {\n    currentIndex,\n    onClickIndex,\n    itemWidth,\n    animationDurationMs\n  } = args;\n  const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(currentIndex, onClickIndex);\n  const renderItemAtIndex = useMemo(() => makeRenderItem({\n    itemWidth,\n    animationDurationMs\n  }), [itemWidth, animationDurationMs]);\n  const indexLabels = useMemo(() => makeIndexLabels(), []);\n  return _jsxs(_Fragment, {\n    children: [_jsx(Carousel, {\n      ...args,\n      currentIndex: internalCurrentIndex,\n      onClickIndex: internalOnClickIndex,\n      renderItemAtIndex: renderItemAtIndex\n    }), _jsx(CarouselControls, {\n      currentIndex: internalCurrentIndex,\n      indexLabels: indexLabels,\n      onChange: internalOnClickIndex\n    })]\n  });\n}",...WithControls.parameters?.docs?.source},description:{story:"As an infinite list is not friendly for screen readers or keyboard\nnavigation, the carousel itself is hidden from both keyboard focus as well as\nscreen readers. Instead a navigation unit like this can be used to provide\naccessible access.\n\n```tsx\nconst Demo = () => {\n\tconst [currentIndex, setCurrentIndex] = useState(0);\n\n\t// Provide human readable titles for each navigation item;\n\tconst indexLabels = useMemo(() => {\n\t\t// ...\n\t}, []);\n\n\treturn (\n\t\t<>\n\t\t\t<Carousel\n\t\t\t\t{...otherPropsLeftOutForBrevity}\n\t\t\t\tcurrentIndex={currentIndex}\n\t\t\t\tonClickIndex={setCurrentIndex}\n\t\t\t/>\n\t\t\t<CarouselControls\n\t\t\t\tcurrentIndex={currentIndex}\n\t\t\t\tindexLabels={indexLabels}\n\t\t\t\tonChange={setCurrentIndex}\n\t\t\t/>\n\t\t</>\n\t);\n};\n```",...WithControls.parameters?.docs?.description}}},WithLinkedCarousels.parameters={...WithLinkedCarousels.parameters,docs:{...WithLinkedCarousels.parameters?.docs,source:{originalSource:"args => {\n  const {\n    currentIndex,\n    onClickIndex,\n    itemWidth,\n    animationDurationMs\n  } = args;\n  const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(currentIndex, onClickIndex);\n  const renderItemAtIndex = useMemo(() => makeRenderItem({\n    itemWidth,\n    animationDurationMs\n  }), [itemWidth, animationDurationMs]);\n  const indexLabels = useMemo(() => makeIndexLabels(), []);\n  return _jsxs(_Fragment, {\n    children: [_jsx(Carousel, {\n      ...args,\n      currentIndex: internalCurrentIndex,\n      onClickIndex: internalOnClickIndex,\n      renderItemAtIndex: renderItemAtIndex\n    }), _jsx(CarouselControls, {\n      currentIndex: internalCurrentIndex,\n      indexLabels: indexLabels,\n      onChange: internalOnClickIndex\n    }), _jsx(Carousel, {\n      ...args,\n      currentIndex: internalCurrentIndex,\n      onClickIndex: internalOnClickIndex,\n      renderItemAtIndex: renderItemAtIndex\n    })]\n  });\n}",...WithLinkedCarousels.parameters?.docs?.source}}};try{WithControls.displayName="WithControls",WithControls.__docgenInfo={description:"As an infinite list is not friendly for screen readers or keyboard\nnavigation, the carousel itself is hidden from both keyboard focus as well as\nscreen readers. Instead a navigation unit like this can be used to provide\naccessible access.\n\n```tsx\nconst Demo = () => {\n\tconst [currentIndex, setCurrentIndex] = useState(0);\n\n\t// Provide human readable titles for each navigation item;\n\tconst indexLabels = useMemo(() => {\n\t\t// ...\n\t}, []);\n\n\treturn (\n\t\t<>\n\t\t\t<Carousel\n\t\t\t\t{...otherPropsLeftOutForBrevity}\n\t\t\t\tcurrentIndex={currentIndex}\n\t\t\t\tonClickIndex={setCurrentIndex}\n\t\t\t/>\n\t\t\t<CarouselControls\n\t\t\t\tcurrentIndex={currentIndex}\n\t\t\t\tindexLabels={indexLabels}\n\t\t\t\tonChange={setCurrentIndex}\n\t\t\t/>\n\t\t</>\n\t);\n};\n```",displayName:"WithControls",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/carousel/carousel.stories.tsx#WithControls"]={docgenInfo:WithControls.__docgenInfo,name:"WithControls",path:"src/carousel/carousel.stories.tsx#WithControls"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=carousel-carousel-stories.20427668.iframe.bundle.js.map