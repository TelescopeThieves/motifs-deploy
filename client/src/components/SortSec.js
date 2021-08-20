
import React from 'react'
import { Heart} from "phosphor-react";


const SortSec = (props) => {

    return(
        
        <div className="sortSec">
            {/* <span>Sort by:</span> */}
            <section className="formBtn">
                    <button className={props.sortClassAll} onClick={props.onClickAll}>
                        <span className="margin-top margin-bottom sortBtn">All</span>
                    </button>      
                    <button className={props.sortClassBookmark} onClick={props.onClickBookmark}>
                        {/* <span className="margin-top margin-bottom sortBtn">Bookmarked</span> */}
                        <Heart size={24} weight='regular' color={props.sortColor}/>
                    </button>      
                    <button className={props.sortClassFollow} onClick={props.onClickFollow}>
                        <span className="margin-top margin-bottom sortBtn">Following</span>
                    </button>      
            </section>
        </div>
       
    )
}

export default SortSec




