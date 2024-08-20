import React, { useState } from 'react';
import { modalClose, showSwal } from '../../util/util';
import Up from '../../img/위쪽.png'
import Down from '../../img/아래쪽.png'
import Right from '../../img/오른쪽.png'
import './Category.scss'
import { choicRankingCategory, isStrCheck } from '../../util/utilStr';


let categoryState = [false, false, false, false, false, false, false, false]


const Category = ({dic, setDic, categoryData}) => {

    function getChoiceRankingData(value){
        let result = null;
        switch(value)
        {
            case categoryData[1]:
                result = choicRankingCategory.skinCare
                break;    
            case categoryData[2]:
                result = choicRankingCategory.cleanSing
                break;
            case categoryData[3]:
                result = choicRankingCategory.maskPack
                break;
            case categoryData[4]:
                result = choicRankingCategory.sunCare
                break;
            case categoryData[5]:
                result = choicRankingCategory.body
                break;
            case categoryData[6]:
                result = choicRankingCategory.hair
                break;
            case categoryData[7]:
                result = choicRankingCategory.nail
                break;
            case categoryData[8]:
                result = choicRankingCategory.perfume
                break;
            case categoryData[9]:
                result = choicRankingCategory.other
                break;
        }
        return result
    }


    function showView(){
        
        
        if(categoryData[0] === '건성' || categoryData[0] === '10대')
        {
            return (
                <>
                    {categoryData.map((item, idx)=>{
                        return <button className={dic == item ? "category_btn" :"category_item"} key={idx} onClick={(e)=>categoryClickEvent(e)}>{item}</button>
                    })}
                </>
            )
        }
        else if(categoryData[0] === "카테고리 전체")
        {
            return (
                <>
                    <button className='category_btn cursor' onClick={() =>showModal()}>
                    {dic.maintitle}
                    </button>
                    {
                        dic.list === null ?
                        ""
                        :
                         dic.list.map((item, idx)=>{
                            return <button className={dic.subtitle == item ? "category_btn" :"category_item"} key={idx} onClick={(e)=>categoryClickEvent(e)}>{item}</button>
                        })

                    }
                </>
            )
        }
    }

    function showModal()
    {
        let str = "";
        if(categoryData[0] === '건성')
        {

        }
        else if(categoryData[0] === "카테고리 전체")
        {
            categoryData.map((item, idx)=>{
                str += `<div class='subtitle cursor'>${item} <img class="category_arrow" src="${idx === 0? Up : Right}" alt="팀로고" /></div>`;
                return null;
            })
        }
        
        showSwal(str, underView)
    }
    
    function underView(e, idx)
    {

        let titleTag = document.getElementsByClassName("subtitle");
        if(idx === 0)
        {
            
            setDic({
                ...dic,
                maintitle:categoryData[0],
                list : [],
                subtitle : ""
            }
                )
            modalClose()
            return
        }
        // e.stopPropagation() 
        let result = getChoiceRankingData(categoryData[idx])
        let imgTag = document.getElementsByClassName("category_arrow");
    
        if(categoryState[idx])
        {
            titleTag[idx].innerHTML =categoryData[idx] + `<img class="category_arrow" src="${idx === 0? Up : Right}" alt="팀로고" />`;
            categoryState[idx] = !categoryState[idx]
            return;
        }
        else
        {
            imgTag[idx].src = Down;
            categoryState[idx] = !categoryState[idx]
        }
    
        let tag ='<div class="flex_col flex_wrap">';
        result.map((item)=>{
            tag += `<div class="category_item">${item}</div>`;
            return null;
        })
        tag += '</div>';
        
        titleTag[idx].innerHTML += tag;
    
    
        let itemTag = document.getElementsByClassName("category_item");
        for(let i=0; i< itemTag.length; i++)
        {
            itemTag[i].addEventListener("click", (e)=>{
                
                if(isStrCheck(e.target.innerText))
                {
                    return;
                }
                e.stopPropagation() // 부모요소의 이벤트 차단
                // 이벤트 요소의 부모태그의 스트링값을 찾아서 맞는 데이터 리턴
                let title = e.target.parentNode.parentNode.innerText.split("\n")[0];
                
                let list1 = getChoiceRankingData(title); 
                
                if(title === "검색하기"){
                    title = categoryData[0]
                    
                }

                setDic({
                    ...dic,
                    list : list1,
                    maintitle:title,
                    subtitle : e.target.innerText
                });               

                modalClose()
            })
        }
    
    }

    function categoryClickEvent(e){
        e.stopPropagation()
        
        if(categoryData[0] === '건성' || categoryData[0] === "10대")
        {
            setDic(e.target.innerText)
        }
        else if(categoryData[0] === "카테고리 전체")
        {
            setDic({
                ...dic,
                subtitle : e.target.innerText
            })
        }
    }


    const [isMoving, setIsMoving] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    let scroll = document.getElementsByClassName('category_container');
    const handleMouseDown = (e) => {
        setIsMoving(true);
        setStartX(e.pageX - scroll[0].offsetLeft);
        setScrollLeft(scroll[0].scrollLeft);
    };
    
    const handleMouseMove = (e) => {
        if (!isMoving) return;
        e.preventDefault();
        const x = e.pageX - scroll[0].offsetLeft;
        const walk = (x - startX) * 1.5; // 스크롤 속도 조절
        scroll[0].scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsMoving(false);
    };

    const mouseout = () => {
        
        setIsMoving(false);
    }
    return (
        <div className='category_container cursor' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={mouseout}>
            {
                showView()
            }
        </div>
    );
};

export default Category;