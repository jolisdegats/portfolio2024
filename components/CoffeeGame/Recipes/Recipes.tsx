import  { useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';



const Recipes = () => {
  const [openPages, setOpenPages] = useState<(number|undefined)[]>([]);

  const pagesData = [
    {
content : <>
<h2>Coffee Recipes</h2>
<div className={styles.couvCoffeeContainer}>
        <div className={styles.couvCoffee}>
          <div className={styles["couvCoffee--inside"]}>
            <div className={styles["couvCoffee--coffee"]}>
            </div>
          </div>
        </div>
      </div>
</>
    },{
      content : <p>Ristretto</p>
    },
    {
      content : <p>page 3</p>
    },
    {
      content : <p>page 4</p>
    }
  ];

  const frontPageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFrontClick = (index:number) => {
    if(index < pagesData.length){
    const currentFrontPage = frontPageRefs.current[index-1]
    if(currentFrontPage){
      currentFrontPage.classList.add(styles['paper--open'])

    // {[styles['paper--open']] : openPages.includes(index+1)}}
    setTimeout(() => {
      currentFrontPage.classList.add(styles['paper--opened'])
      const openPagesSet = new Set(openPages);
      openPagesSet.add(index)
      setOpenPages(Array.from(openPagesSet))
    }, index === 1 ? 500 :300)

    }
  }
  };

  const handleBackClick = (index:number) => {
    const currentFrontPage = frontPageRefs.current[index-1]
    if(currentFrontPage){
      currentFrontPage.classList.remove(styles['paper--open'])
      setTimeout(() => {
        currentFrontPage.classList.remove(styles['paper--opened'])
      },  index === 1 ? 200 :300)

      const openPagesSet = new Set(openPages);
      openPagesSet.delete(index)
      setOpenPages(Array.from(openPagesSet))
  };}


  return (
    <div className={styles.container}>
      <div className={styles.recipesBook}>
      <div className={classNames(styles.book, {[styles['book--open']] : openPages.length > 0 })}>
        
        {pagesData.map((page, index) => (
          <div
            ref={(el) => (frontPageRefs.current[index] = el)}
            style={{zIndex: openPages.includes(index)?  pagesData.length + index : pagesData.length - index }} 
            key={index + 1}
            className={classNames(styles.paper)}
          >
            <div
             className={classNames(styles.page,styles.front,{[styles.couvBg] : index ===0})}
            onClick={() => openPages.includes(index+1)? handleBackClick(index+1) : handleFrontClick(index + 1)}>
              <div className={index === 0 ? styles.intro : ""}>
              {page.content}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.side}></div>
        <div className={styles.bottom}></div>
        <div className={styles.shadow}></div>
      </div>
    </div>
    </div>
  );
};

export default Recipes;